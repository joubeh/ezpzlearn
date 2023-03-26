<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\LearningTrack;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LearnController extends Controller
{
    public function learn(Request $request, $slug) {
        $course = Course::where('slug', $slug)->with(['chapters', 'chapters.sessions'])->firstOrFail();
        if ($course->status == 'hidden') abort(404);
        if(count($course->chapters) == 0) return redirect('/course/'.$slug);

        if(in_array('session', $request->keys())){
            $session = Session::findOrFail($request->query('session'));
            if($session->chapter->course->id != $course->id) {
                abort(404);
            }
        } else {
            $session = $course->chapters[0]->sessions[0];
        }

        if($session->type == 'resource') {
            return redirect($session->url);
        }

        $learnedSessions = [];
        $LSS = [];
        if(Auth::check()){
            if(count(DB::table('course_user')->where('user_id', Auth::user()->id)->where('course_id', $course->id)->get()) == 1){
                $learnedSessions = LearningTrack::where('user_id', Auth::id())->where('course_id', $course->id)->get();
            } else {
                Auth::user()->courses()->attach([$course->id]);
                $session = $course->chapters[0]->sessions[0];
            }

            $LSS = [];
            foreach($learnedSessions as $ls){
                array_push($LSS, $ls->session_id);
            }
            if(!in_array($session->id, $LSS)) {
                LearningTrack::create([
                    'user_id' => Auth::id(),
                    'course_id' => $course->id,
                    'session_id' => $session->id
                ]);
            }
        }
        
        return Inertia::render('Learn/Learn', 
            ['course' => $course, 'current_session' => $session, 'current_chapter' => $session->chapter,
             'learnedSessions' => $LSS]);
    }
}
