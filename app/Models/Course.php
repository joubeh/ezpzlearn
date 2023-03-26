<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function instructors()
    {
        return $this->belongsToMany(Instructor::class, 'course_instructor');
    }

    public function chapters()
    {
        return $this->hasMany(Chapter::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'course_user');
    }

    public function learningTracks()
    {
        return $this->hasMany(LearningTrack::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
