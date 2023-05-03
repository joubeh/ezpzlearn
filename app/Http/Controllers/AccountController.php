<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\DiscountCode;
use App\Models\LearningTrack;
use App\Models\Payment;
use App\Models\PlusPlan;
use App\Models\PlusSubscription;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

use function GuzzleHttp\Promise\all;

class AccountController extends Controller
{
    public function myAccount() {
        return Inertia::render('Account/MyAccount', ['userName' => Auth::user()->name]);
    }

    public function updateName(Request $request){
        if(!array_key_exists('name', $request->all())){
            return Inertia::render('Account/MyAccount', ['flash' => "نام نباید خالی باشد", 'flashType' => "ERROR", 'userName' => Auth::user()->name]);
        }

        Auth::user()->name = $request->all()['name'];
        Auth::user()->save();
        return Inertia::render('Account/MyAccount', ['flash' => "نام شما تغییر کرد", 'flashType' => "SUCCESS", 'userName' => Auth::user()->name]);
    }

    public function updatePassword(Request $request){
        if(!array_key_exists('old_password', $request->all())){
            return Inertia::render('Account/MyAccount', ['flash' => "رمز فعلی نباید خالی باشد", 'flashType' => "ERROR", 'userName' => Auth::user()->name]);
        } else {
            if(!Hash::check($request->all()['old_password'], Auth::user()->password)){
                return Inertia::render('Account/MyAccount', ['flash' => "رمز فعلی درست نیست", 'flashType' => "ERROR", 'userName' => Auth::user()->name]);
            }
        }
        if(!array_key_exists('password', $request->all())){
            return Inertia::render('Account/MyAccount', ['flash' => "رمزعبور نباید خالی باشد", 'flashType' => "ERROR", 'userName' => Auth::user()->name]);
        }
        if(!array_key_exists('password_confirmation', $request->all()) || $request->all()['password_confirmation'] != $request->all()['password']){
            return Inertia::render('Account/MyAccount', ['flash' => "رمزعبور با تکرار آن یکی نیست", 'flashType' => "ERROR", 'userName' => Auth::user()->name]);
        }

        Auth::user()->password = Hash::make($request->all()['password']);
        Auth::user()->save();
        return Inertia::render('Account/MyAccount', ['flash' => "رمز شما تغییر کرد", 'flashType' => "SUCCESS", 'userName' => Auth::user()->name]);
    }

    public function myCourses() {
        $onGoingIdsUnFiltered = DB::table('course_user')->select('course_id')->where('user_id', Auth::id())->get();
        $onGoingIds = [];
        foreach($onGoingIdsUnFiltered as $id) {
            array_push($onGoingIds, $id->course_id);
        }
        $onGoingCourses = Course::whereIn('id', $onGoingIds)->with('instructors')->get();
        $onGoing = [];
        foreach($onGoingCourses as $item) {
            $lts = LearningTrack::where('user_id', Auth::id())->where('course_id', $item->id)->with('session')->get();
            $learnedTime = 0;
            foreach($lts as $lt) {
                $str_time = $lt->session->video_length;
                $str_time = preg_replace("/^([\d]{1,2})\:([\d]{2})$/", "00:$1:$2", $str_time);
                sscanf($str_time, "%d:%d:%d", $hours, $minutes, $seconds);
                $time_seconds = $hours * 3600 + $minutes * 60 + $seconds;
                $learnedTime += $time_seconds;
            }
            $str_time = $item->videos_length;
            $str_time = preg_replace("/^([\d]{1,2})\:([\d]{2})$/", "00:$1:$2", $str_time);
            sscanf($str_time, "%d:%d:%d", $hours, $minutes, $seconds);
            $time_seconds = $hours * 3600 + $minutes * 60 + $seconds;
            array_push($onGoing, [$item, ($learnedTime * 100 / $time_seconds)]);
        }

        $learnLatersIdsUnFiltered = DB::table('learn_laters')->select('course_id')->where('user_id', Auth::id())->get();
        $learnLatersIds = [];
        foreach($learnLatersIdsUnFiltered as $id) {
            array_push($learnLatersIds, $id->course_id);
        }
        $learnLaters = Course::whereIn('id', $learnLatersIds)->with('instructors')->get();

        return Inertia::render('Account/MyCourses', ['onGoing' => $onGoing, 'learnLaters' => $learnLaters]);
    }

    public function plus(){
        $remainingDays = null;
        if (Auth::user()->plus_until != null){
            $date1 = Carbon::make(Auth::user()->plus_until);
            $date2 = Carbon::now();
            $result = $date1->gte($date2);
            if($result){
                $remainingDays = $date1->diffInDays($date2) + 1;
            }
        }
        return Inertia::render('Account/Plus', 
            ['user' => Auth::user(), 'remainingDays' => $remainingDays, 'plans' => PlusPlan::all()]);
    }

    public function checkDiscountCode($code, User $user){
        $ds = DiscountCode::where('code', $code)->get();
        if(count($ds) == 0) return ['percentage' => false];
        if($ds[0]->user_id != null && $ds[0]->user_id != $user->id) return ['percentage' => false];
        return ['percentage' => $ds[0]->percentage];
    }

    public function buyPlus(Request $request){
        $plan = PlusPlan::where('id', $request->all()['plan'])->firstOrFail();
        $discount = 0;
        $discount_info = null;
        $ds = DiscountCode::where('code', $request->all()['discountCode'])->get();
        if(count($ds) != 0 && !($ds[0]->user_id != null && $ds[0]->user_id != Auth::id())){
            $discount = $ds[0]->percentage;
            $discount_info = json_encode(['discount' => $ds[0]]);
            if($ds[0]->credit != null){
                $ds[0]->credit--;
                $ds[0]->save();
                if($ds[0]->credit == 0) $ds[0]->delete();
            }
        }

        $plusSub = PlusSubscription::create([
            'user_id' => Auth::id(),
            'payment_id' => null,
            'days' => $plan->duration,
            'price' => $plan->price * ((100-$discount)/100),
            'info' => $discount_info
        ]);

        /* Pay */
        $payment = Payment::create([
            'amount' => $plusSub->price,
            'info' => null,
            'status' => 'proceed'
        ]);

        $plusSub->payment_id = $payment->id;
        $plusSub->save();

        if(Auth::user()->plus_status){
            $PUDate = Carbon::make(Auth::user()->plus_until);
        } else {
            $PUDate = Carbon::now();
        }
        $PUDate->addDays($plusSub->days);
        Auth::user()->plus_until = $PUDate;
        Auth::user()->save();

        return redirect('/');
    }
}
