<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('topic_id')->constrained('topics');
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->text('summery');
            $table->text('description');
            $table->string('language');
            $table->text('what_you_will_learn');
            $table->string('image');
            $table->string('preview_video');
            $table->string('publisher');
            $table->string('course_link');
            $table->string('videos_length');
            $table->string('level');
            $table->float('stars');
            $table->enum('status', ['available', 'hidden']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
};
