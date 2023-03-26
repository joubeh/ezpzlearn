<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = [];
    protected $hidden = ['password'];
    protected $appends = ['plus_status'];

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_user');
    }

    public function learningTracks()
    {
        return $this->hasMany(LearningTrack::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function learnLaters()
    {
        return $this->hasMany(LearnLater::class);
    }

    public function getPlusStatusAttribute() {
        if($this->plus_until != null){
            $date1 = Carbon::make($this->plus_until);
            $date2 = Carbon::now();
            $result = $date1->gte($date2);
            if($result){
                return true;
            }
        }
        return false;
    }
}
