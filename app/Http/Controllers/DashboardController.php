<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Comment;
use App\Models\Course;
use App\Models\Instructor;
use App\Models\Session;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Elastic\Elasticsearch\ClientBuilder;

class DashboardController extends Controller
{
    public function index(){
        return Inertia::render('Dashboard/Index');
    }

    public function comments(){
        $comments = Comment::where('status', 'pending')->with(['user', 'course'])->get();
        return Inertia::render('Dashboard/Comments', ['comments' => $comments]);
    }

    public function approveComment(Comment $comment){
        $comment->status = 'approved';
        $comment->save();
        return redirect('/dashboard/comments');
    }

    public function removeComment(Comment $comment){
        $comment->delete();
        return redirect('/dashboard/comments');
    }

    public function courses(){
        $courses = Course::all();
        return Inertia::render('Dashboard/Courses', ['courses' => $courses]);
    }

    public function users(){
        if(Auth::user()->role != 'admin'){
            return abort(403);
        }
        $users = User::all();
        return Inertia::render('Dashboard/Users', ['users' => $users]);
    }

    public function createUser(Request $request){
        if(Auth::user()->role != 'admin'){
            return abort(403);
        }
        if(!array_key_exists('name', $request->all())){
            return Inertia::render('Dashboard/Users', ['flash' => "نام نباید خالی باشد", 'flashType' => "ERROR"]);
        }
        if(!array_key_exists('email', $request->all())){
            return Inertia::render('Dashboard/Users', ['flash' => "ایمیل نباید خالی باشد", 'flashType' => "ERROR"]);
        }
        if(!array_key_exists('password', $request->all())){
            return Inertia::render('Dashboard/Users', ['flash' => "رمزعبور نباید خالی باشد", 'flashType' => "ERROR"]);
        }
        if(!array_key_exists('password_confirmation', $request->all()) || $request->all()['password_confirmation'] != $request->all()['password']){
            return Inertia::render('Dashboard/Users', ['flash' => "رمزعبور با تکرار آن یکی نیست", 'flashType' => "ERROR"]);
        }
        $oldUser = User::where('email', $request->all()['email'])->first();
        if(isset($oldUser->id)){
            return Inertia::render('Dashboard/Users', ['flash' => "این ایمیل در سیستم موجود است", 'flashType' => "ERROR"]);
        }
        
        User::create([
            'name' => $request->all()['name'],
            'email' => $request->all()['email'],
            'password' => Hash::make($request->all()['password']),
            'role' => $request->all()['role']
        ]);
        $users = User::all();
        return Inertia::render('Dashboard/Users', ['users' => $users, 'flash' => "کاربر ساخته شد", 'flashType' => "SUCCESS"]);
    }

    public function removeUser(User $user){
        if(Auth::user()->role != 'admin'){
            return abort(403);
        }
        $user->delete();
        return redirect()->back();
    }

    public function courseContent(Course $course){
        $course = Course::where('id', $course->id)->with(['chapters', 'chapters.sessions'])->firstOrFail();
        return Inertia::render('Dashboard/CourseContent', ['course' => $course]);
    }

    public function editCourse(Course $course){
        $instructors = Instructor::all();
        $courseInstructors = $course->instructors;
        return Inertia::render('Dashboard/EditCourse', ['instructors' => $instructors, 'course' => $course, 'courseInstructors' => $courseInstructors]);
    }

    public function createCourse(){
        $instructors = Instructor::all();
        return Inertia::render('Dashboard/CreateCourse', ['instructors' => $instructors]);
    }

    public function saveCourse(Request $request){
        $WYWL = "";
        $FT = true;
        foreach($request->all()['what_you_will_learn'] as $item){
            if($FT){
                $WYWL = "$item";
                $FT = false;
            } else {
                $WYWL = "$WYWL(*|ezpz*|)$item";
            }
        }
        $course = Course::create([
            'topic_id' => $request->all()['topic']['value'],
            'name' => $request->all()['name'],
            'slug' => $request->all()['slug'],
            'summery' => $request->all()['summery'],
            'description' => $request->all()['description'],
            'language' => $request->all()['language'],
            'what_you_will_learn' => $WYWL,
            'image' => $request->all()['image'],
            'preview_video' => $request->all()['preview_video'],
            'publisher' => $request->all()['publisher'],
            'course_link' => $request->all()['course_link'],
            'videos_length' => "0:0:0",
            'level' => $request->all()['level'],
            'stars' => floatval($request->all()['stars']),
            'status' => 'hidden',
        ]);

        $instructors = $request->all()['instructors'];
        for ($i=0; $i<count($instructors); $i++) $instructors[$i] = $instructors[$i]['value'];
        $course->instructors()->attach($instructors);

        $this->indexForSearch($course);

        return redirect('/dashboard/course'.$course->id.'/content');
    }

    private function indexForSearch($course){
        $IS = $course->instructors;
        $instructors = [];
        foreach($IS as $I){
            array_push($instructors, $I->name);
        }
        $client = ClientBuilder::create()->setHosts([env('ELASTIC_SEARCH_HOST').':'.env('ELASTIC_SEARCH_PORT')])->build();
        $params = [
            'index' => 'course',
            'id' => $course->id,
            'body' => [
                'topic' => $course->topic->name,
                'instructors' => $instructors,
                'name' => $course->name,
                'slug' => $course->slug,
                'summery' => $course->summery,
                'description' => $course->description,
                'language' => $course->language,
                'what_you_will_learn' => $course->what_you_will_learn,
                'publisher' => $course->publisher,
                'videos_length' => "0:0:0",
                'level' => $course->level,
                'stars' => $course->stars,
            ]
        ];
        $client->index($params);
    }

    private function removeIndex($course){
        $client = ClientBuilder::create()->setHosts([env('ELASTIC_SEARCH_HOST').':'.env('ELASTIC_SEARCH_PORT')])->build();
        $params = [
            'index' => 'course',
            'id' => $course->id
        ];
        $client->delete($params);
    }

    public function createTopic(Request $request){
        $request->validate([
            'name' => 'required|unique:topics'
        ]);
        Topic::create([
            'name' => $request->all()['name']
        ]);
        return redirect('/dashboard/course/create');
    }

    public function createInstructor(Request $request){
        $request->validate([
            'name' => 'required|unique:instructors'
        ]);
        Instructor::create([
            'name' => $request->all()['name']
        ]);
        return redirect('/dashboard/course/create');
    }

    public function createChapter(Request $request, Course $course){
        Chapter::create([
            'course_id' => $course->id,
            'name' => $request->all()['name']
        ]);
        return redirect()->back();
    }

    public function removeChapter(Chapter $chapter){
        $chapter->delete();
        return redirect()->back();
    }

    public function createSession(Request $request, Chapter $chapter){
        if($request->all()['type'] == 'video'){
            Session::create([
                'chapter_id' => $chapter->id,
                'name' => $request->all()['name'],
                'url' => $request->all()['url'],
                'type' => $request->all()['type'],
                'video_length' => $request->all()['video_length']
            ]);
            $this->updateCourseVideosLength($chapter->course, $request->all()['video_length'], '+');
        } else {
            Session::create([
                'chapter_id' => $chapter->id,
                'name' => $request->all()['name'],
                'url' => $request->all()['url'],
                'type' => $request->all()['type'],
                'video_length' => null
            ]);
        }
        return redirect()->back();
    }

    public function removeSession(Session $session){
        if($session->type == 'video'){
            $this->updateCourseVideosLength($session->chapter->course, $session->video_length, '-');
        }
        $session->delete();
        return redirect()->back();
    }

    private function updateCourseVideosLength($course, $value, $opration){
        if($opration == '+'){
            $prevLength = explode(':', $course->videos_length);
            $addedLength = explode(':', $value);
            for ($i=0; $i<3; $i++){
                $prevLength[$i] = intval($prevLength[$i]);
                $addedLength[$i] = intval($addedLength[$i]);
            }
            if($prevLength[2] + $addedLength[2] > 59){
                $prevLength[2] = $prevLength[2] + $addedLength[2] - 60;
                $prevLength[1]++;
            } else {
                $prevLength[2] = $prevLength[2] + $addedLength[2];
            }
            if($prevLength[1] + $addedLength[1] > 59){
                $prevLength[1] = $prevLength[1] + $addedLength[1] - 60;
                $prevLength[0]++;
            } else {
                $prevLength[1] = $prevLength[1] + $addedLength[1];
            }
            $prevLength[0] = $prevLength[0] + $addedLength[0];
        } else {
            $prevLength = explode(':', $course->videos_length);
            $reducedLength = explode(':', $value);
            for ($i=0; $i<3; $i++){
                $prevLength[$i] = intval($prevLength[$i]);
                $reducedLength[$i] = intval($reducedLength[$i]);
            }
            if($prevLength[2] - $reducedLength[2] < 0){
                $prevLength[2] = $prevLength[2] - $reducedLength[2] + 60;
                $prevLength[1]--;
            } else {
                $prevLength[2] = $prevLength[2] - $reducedLength[2];
            }
            if($prevLength[1] - $reducedLength[1] < 0){
                $prevLength[1] = $prevLength[1] - $reducedLength[1] + 60;
                $prevLength[0]--;
            } else {
                $prevLength[1] = $prevLength[1] - $reducedLength[1];
            }
            $prevLength[0] = $prevLength[0] - $reducedLength[0];
        }
        $course->videos_length = implode(':', $prevLength);
        $course->save();
    }

    public function changeCourseStatus(Course $course){
        if($course->status == 'available') {
            $course->status = 'hidden';
        } else {
            $course->status = 'available';
        }
        $course->save();
        return redirect()->back();
    }

    public function updateCourse(Request $request, Course $course){
        $WYWL = "";
        $FT = true;
        foreach($request->all()['what_you_will_learn'] as $item){
            if($FT){
                $WYWL = "$item";
                $FT = false;
            } else {
                $WYWL = "$WYWL(*|ezpz*|)$item";
            }
        }

        $course->topic_id = $request->all()['topic']['value'];
        $course->name = $request->all()['name'];
        $course->slug = $request->all()['slug'];
        $course->summery = $request->all()['summery'];
        $course->description = $request->all()['description'];
        $course->language = $request->all()['language'];
        $course->what_you_will_learn = $WYWL;
        $course->image = $request->all()['image'];
        $course->preview_video = $request->all()['preview_video'];
        $course->publisher = $request->all()['publisher'];
        $course->course_link = $request->all()['course_link'];
        $course->level = $request->all()['level'];
        $course->stars = floatval($request->all()['stars']);
        $course->save();

        $instructors = $request->all()['instructors'];
        for ($i=0; $i<count($instructors); $i++) $instructors[$i] = $instructors[$i]['value'];
        $course->instructors()->sync($instructors);

        $this->indexForSearch($course);

        if($course->status == 'hidden') {
            return redirect()->back();
        }
        return redirect('/course'.$course->slug);
    }
}
