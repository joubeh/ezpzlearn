<?php

use App\Http\Controllers\AccountController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LearnController;
use App\Http\Controllers\DashboardController;


/* App */
Route::get('/', [AppController::class, 'index']);


/* Auth */
Route::get('/login', [AuthController::class, 'loginPage'])->middleware(['guest'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->middleware(['guest']);
Route::get('/register', [AuthController::class, 'registerPage'])->middleware(['guest']);
Route::post('/register', [AuthController::class, 'register'])->middleware(['guest']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware(['auth'])->name('logout');
// todo: forget password


/* Course */
Route::get('/courses', [CourseController::class, 'courses']);
Route::get('/course/{slug}', [CourseController::class, 'show']);
Route::post('/course/{course}/comment', [CourseController::class, 'comment'])->middleware(['auth']);
Route::post('/course/{course}/comment/{comment}/reply', [CourseController::class, 'reply'])->middleware(['auth']);
Route::post('/course/{course}/learn-later', [CourseController::class, 'learnLater'])->middleware(['auth']);
Route::get('/search', [CourseController::class, 'search']);


/* Learn */
Route::get('/learn/{slug}', [LearnController::class, 'learn']);


/* Account */
Route::get('/my-account', [AccountController::class, 'myAccount'])->middleware(['auth']);
Route::get('/my-account/courses', [AccountController::class, 'myCourses'])->middleware(['auth']);
Route::get('/plus', [AccountController::class, 'plus'])->middleware(['auth']);
Route::get('/plus/check-discount-code/{code}/{user}', [AccountController::class, 'checkDiscountCode'])->middleware(['auth']);
Route::post('/plus/buy', [AccountController::class, 'buyPlus'])->middleware(['auth']);


/* Dashboard */
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'dashboard']);
Route::get('/dashboard/comments', [DashboardController::class, 'comments'])->middleware(['auth', 'dashboard']);
Route::post('/dashboard/comment/{comment}/approve', [DashboardController::class, 'approveComment'])->middleware(['auth', 'dashboard']);
Route::post('/dashboard/comment/{comment}/remove', [DashboardController::class, 'removeComment'])->middleware(['auth', 'dashboard']);
Route::get('/dashboard/courses', [DashboardController::class, 'courses'])->middleware(['auth', 'dashboard']);
Route::get('/dashboard/users', [DashboardController::class, 'users'])->middleware(['auth', 'dashboard']);
Route::post('/dashboard/user/create', [DashboardController::class, 'createUser'])->middleware(['auth', 'dashboard']);
Route::post('/dashboard/user/{user}/remove', [DashboardController::class, 'removeUser'])->middleware(['auth', 'dashboard']);
Route::get('/dashboard/course/{course}/content', [DashboardController::class, 'courseContent'])->middleware(['auth', 'dashboard']);
Route::get('/dashboard/course/{course}/edit', [DashboardController::class, 'editCourse'])->middleware(['auth', 'dashboard']);
Route::get('/dashboard/course/create', [DashboardController::class, 'createCourse'])->middleware(['auth', 'dashboard']);
Route::post('/dashboard/course/create', [DashboardController::class, 'saveCourse'])->middleware(['auth', 'dashboard']);
Route::post('/dashboard/topic/create', [DashboardController::class, 'createTopic'])->middleware(['auth', 'dashboard']);
Route::post('/dashboard/instructor/create', [DashboardController::class, 'createInstructor'])->middleware(['auth', 'dashboard']);
Route::post('/dashboard/course/{course}/chpater/create', [DashboardController::class, 'createChapter'])->middleware(['auth', 'dashboard']);
Route::post('/dashboard/chapter/{chapter}/remove', [DashboardController::class, 'removeChapter'])->middleware(['auth', 'dashboard']);
Route::post('/dashboard/chapter/{chapter}/session/create', [DashboardController::class, 'createSession'])->middleware(['auth', 'dashboard']);
Route::post('/dashboard/session/{session}/remove', [DashboardController::class, 'removeSession'])->middleware(['auth', 'dashboard']);
Route::post('/dashboard/course/{course}/change-status', [DashboardController::class, 'changeCourseStatus'])->middleware(['auth', 'dashboard']);
Route::post('/dashboard/course/{course}/update', [DashboardController::class, 'updateCourse'])->middleware(['auth', 'dashboard']);
