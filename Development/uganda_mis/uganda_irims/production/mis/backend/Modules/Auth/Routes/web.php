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
use Modules\Auth\Http\Controllers\AuthController;

Route::post('login',[AuthController::class,'handleLogin'])->name('login');
Route::post('forgotPassword',[AuthController::class,'forgotPassword']);
Route::post('saveNewPassword',[AuthController::class,'saveNewPassword']);
Route::post('resetPassword',[AuthController::class,'resetPassword']);
Route::post('updatePassword',[AuthController::class,'updatePassword']);
Route::post('saveNewPassword',[AuthController::class,'saveNewPassword']);
Route::get('authenticateUserSession',[AuthController::class,'authenticateUserSession']);
Route::post('logout',[AuthController::class,'logout']);

// Authenticated routes
Route::group(['prefix' => 'auth','middleware' => ['auth:api', 'web']], function() {
    Route::post('reValidateUser',[AuthController::class,'reValidateUser']);
    Route::post('createAdminPwd/{username}/{uuid}/{pwd}',[AuthController::class,'createAdminPwd']);
});
