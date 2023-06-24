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

Route::prefix('administration')->group(function() {
    Route::get('/', 'AdministrationController@index');

    Route::get('getUsers', 'AdministrationController@getUsers');
    Route::post('onUserLogOut', 'AdministrationController@onUserLogOut');
    Route::get('onApplicationInitialisation', 'AdministrationController@onApplicationInitialisation');
});


