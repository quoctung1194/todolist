<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('api/login', 'UserController@login');

Route::group(['prefix' => 'api', 'middleware' => 'auth:api'], function () {
    Route::group(['prefix' => 'task'], function() {
        Route::post('/checking', 'TaskController@checking');
        Route::post('/sync', 'TaskController@sync');
    });
});
