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
//,'middleware' => ['web']
use Modules\Authentication\Http\Controllers\AuthenticationController;

Route::group(['prefix' => 'authentication'], function() {

        Route::post('onUserLogin', [AuthenticationController::class, 'onUserLogin']);
    Route::post('onAdminlogin', [AuthenticationController::class,'onAdminlogin']);

    
    Route::post('onFuncRecoverPasswordRequest', [AuthenticationController::class,'onFuncRecoverPasswordRequest']);

    
    //get requests
    Route::get('onRecoverAccountPassword', [AuthenticationController::class,'onRecoverAccountPassword']);
   
    
});
// Route::prefix('authentication')->group(function() {
//     Route::post('onUserLogin', 'AuthenticationController@onUserLogin');
//     Route::post('onAdminlogin', 'AuthenticationController@onAdminlogin');

    
//     Route::post('onFuncRecoverPasswordRequest', 'AuthenticationController@onFuncRecoverPasswordRequest');

    
//     //get requests
//     Route::get('onRecoverAccountPassword', 'AuthenticationController@onRecoverAccountPassword');
// });

Route::group(['prefix' => 'authentication', 'namespace' => 'Modules\Authentication\Http\Controllers'], function()
{

});

Route::group(['middleware' =>'auth:api', 'prefix' => 'authentication', 'namespace' => 'Modules\Authentication\Http\Controllers'], function()
{
     Route::post('onFuncChangePassword', 'AuthenticationController@onFuncChangePassword');
  
});
