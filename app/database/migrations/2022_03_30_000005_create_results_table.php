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
        Schema::create('results', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('participant_id');
            $table->foreign('participant_id')->references('id')->on('participants');

            $table->unsignedBigInteger('question_id');
            $table->foreign('question_id')->references('id')->on('questions');

            $table->unsignedBigInteger('answer_id');
            $table->foreign('answer_id')->references('id')->on('answers');

            $table->unsignedBigInteger('survey_id');
            $table->foreign('survey_id')->references('id')->on('surveys');

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
        Schema::dropIfExists('results');
    }
};
