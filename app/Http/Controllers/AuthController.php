<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function loginPage()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        if(!array_key_exists('email', $request->all())){
            return Inertia::render('Auth/Login', ['flash' => "ایمیل نباید خالی باشد", 'flashType' => "ERROR"]);
        }
        if(!array_key_exists('password', $request->all())){
            return Inertia::render('Auth/Login', ['flash' => "رمزعبور نباید خالی باشد", 'flashType' => "ERROR"]);
        }
        
        $user = User::where('email', $request->all()['email'])->first();
        if(isset($user->id) && Hash::check($request->all()['password'], $user->password)){
            Auth::login($user, true);
            if($user->role == 'user'){
                return redirect('/');
            } else {
                return redirect('/dashboard');
            }
        }
        
        return Inertia::render('Auth/Login', ['flash' => "ایمیل یا رمزعبور اشتباه است", 'flashType' => "ERROR"]);
    }

    public function registerPage()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        if(!array_key_exists('name', $request->all())){
            return Inertia::render('Auth/Register', ['flash' => "نام نباید خالی باشد", 'flashType' => "ERROR"]);
        }
        if(!array_key_exists('email', $request->all())){
            return Inertia::render('Auth/Register', ['flash' => "ایمیل نباید خالی باشد", 'flashType' => "ERROR"]);
        }
        if(!array_key_exists('password', $request->all())){
            return Inertia::render('Auth/Register', ['flash' => "رمزعبور نباید خالی باشد", 'flashType' => "ERROR"]);
        }
        if(!array_key_exists('password_confirmation', $request->all()) || $request->all()['password_confirmation'] != $request->all()['password']){
            return Inertia::render('Auth/Register', ['flash' => "رمزعبور با تکرار آن یکی نیست", 'flashType' => "ERROR"]);
        }
        $oldUser = User::where('email', $request->all()['email'])->first();
        if(isset($oldUser->id)){
            return Inertia::render('Auth/Register', ['flash' => "این ایمیل در سیستم موجود است اگر رمزعبور خود را فراموش کردید از صفحه ورود آن را بازیابی کنید", 'flashType' => "ERROR"]);
        }
        
        $user = User::create([
            'name' => $request->all()['name'],
            'email' => $request->all()['email'],
            'password' => Hash::make($request->all()['password']),
            'role' => 'user'
        ]);
        Auth::login($user, true);
        return redirect('/');
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/');
    }
}
