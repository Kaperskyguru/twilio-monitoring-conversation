<?php

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/token', 'TokenController@generate');

Route::group(['prefix' => 'v1'], function () {
    Route::post('auth/login', "AuthController@login");
    Route::post('auth/register', "AuthController@signup");
    Route::get('events', "EventController@index");

    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('auth/logout', "AuthController@logout");
        Route::resource('events', "EventController")->except(['index']);
        Route::get('users/{user}/events', "EventController@userEvents");
        Route::post('events/{id}/ticket', "EventController@buy");
        Route::post('events/{id}/join', "EventController@join");
    });
});
