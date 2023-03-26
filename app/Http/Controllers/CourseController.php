<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Course;
use App\Models\LearningTrack;
use App\Models\LearnLater;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function courses(Request $request)
    {
        if(in_array('topic', $request->keys())){
            $topic = Topic::where('name', $request->topic)->firstOrFail();
            $courses = Course::where('topic_id', $topic->id)->where('status', 'available')->orderBy('id', 'DESC')->with('instructors')->paginate(20)->withQueryString();
        } else {
            $courses = Course::with('instructors')->where('status', 'available')->orderBy('id', 'DESC')->paginate(20)->withQueryString();
        }
        return Inertia::render('Course/Courses', ['courses' => $courses]);
    }

    public function show(Request $request, $slug)
    {
        $newComment = false;
        if(array_key_exists('comment', $request->all())){
            $newComment = true;
        }
        $course = Course::where('slug', $slug)->with(['topic', 'chapters', 'chapters.sessions', 'instructors', 'comments', 'comments.user'])->firstOrFail();
        if ($course->status == 'hidden') abort(404);
        $alreadyStarted = [false, null];
        if(Auth::check()){
            if(count(DB::table('course_user')->where('user_id', Auth::user()->id)->where('course_id', $course->id)->get()) == 1){
                $alreadyStarted[0] = true;
                $alreadyStarted[1] = LearningTrack::with('session')->where('user_id', Auth::user()->id)->where('course_id', $course->id)->orderBy('session_id', 'DESC')->first()->session;
            }
        }
        $CLearnLater = LearnLater::where('user_id', Auth::id())->where('course_id', $course->id)->get();
        if (count($CLearnLater) > 0) $addedToLearnLater = true;
        else $addedToLearnLater = false;
        $comments = Comment::where('course_id', $course->id)->where('parent_id', null)->with('user', 'replies', 'replies.user')->where('status', 'approved')->get();
        return Inertia::render('Course/Show',
            ['course' => $course, 'alreadyStarted' => $alreadyStarted, 'addedToLearnLater' => $addedToLearnLater, 'comments' => $comments, 'newComment' => $newComment]
        );
    }

    public function comment(Request $request, Course $course){
        $commentAdded = false;
        if(array_key_exists('text', $request->all())){
            $commentAdded = true;
            $status = 'pending';
            if(Auth::user()->role == 'admin' || Auth::user()->role == 'editor'){
                $status = 'approved';
                $commentAdded = false;
            }
            Comment::create([
                'parent_id' => null,
                'course_id' => $course->id,
                'user_id' => Auth::id(),
                'text' => $request->all()['text'],
                'status' => $status,
            ]);
        }
        $retUrl = "/course/$course->slug";
        if($commentAdded) $retUrl = "/course/$course->slug?comment=true";
        return redirect($retUrl);
    }

    public function reply(Request $request, Course $course, Comment $comment){
        $commentAdded = false;
        if(array_key_exists('text', $request->all())){
            $commentAdded = true;
            $status = 'pending';
            if(Auth::user()->role == 'admin' || Auth::user()->role == 'editor'){
                $status = 'approved';
                $commentAdded = false;
            }
            Comment::create([
                'parent_id' => $comment->id,
                'course_id' => $course->id,
                'user_id' => Auth::id(),
                'text' => $request->all()['text'],
                'status' => $status,
            ]);
        }
        $retUrl = "/course/$course->slug";
        if($commentAdded) $retUrl = "/course/$course->slug?comment=true";
        return redirect($retUrl);
    }

    public function learnLater(Course $course){
        $ll = LearnLater::where('course_id', $course->id)->where('user_id', Auth::id())->get();
        if(count($ll) > 0){
            $ll[0]->delete();
        } else {
            LearnLater::create([
                'user_id' => Auth::id(),
                'course_id' => $course->id
            ]);
        }
        return redirect()->back();
    }

    public function search(Request $request){
        $query = $request->all()['q'];
        $courses = Course::where('name', 'LIKE', "%$query%")->with('instructors')->get();
        $result = [];
        foreach($courses as $c){
            $course = [
                'id' => $c->id,
                'slug' => $c->slug,
                'name' => $c->name,
                'instructors' => []
            ];
            foreach($c->instructors as $i){
                array_push($course['instructors'], ['id' => $i->id, 'name' => $i->name]);
            }
            array_push($result, $course);
        }
        return $result;
    }
}
