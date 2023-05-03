<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppController extends Controller
{
    public function index() {
        $latestCourses = Course::with('instructors')->where('status', 'available')->orderBy('id', 'DESC')->take(4)->get();
        $topTopics = Topic::with(['courses', 'courses.instructors'])->take(2)->get();
        return Inertia::render('App/Index', ['latestCourses' => $latestCourses, 'topTopics' => $topTopics]);
    }
}
