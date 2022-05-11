<?php

use App\Http\Controllers\Api\AnswerController;
use App\Http\Controllers\Api\ParticipantController;
use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\ResultController;
use App\Http\Controllers\Api\SurveyController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get(
    '/user',
    function (Request $request) {
        return $request->user();
    }
);
Route::post('/login', UserController::class . '@login')->name('login');
Route::post('/register', UserController::class . '@register')->name('login');
Route::resources(
    [
        'survey' => SurveyController::class,
        'question' => QuestionController::class,
        'participant' => ParticipantController::class,
        'answer' => AnswerController::class,
        'result' => ResultController::class,
    ]
);
