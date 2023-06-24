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
//['middleware' => ['auth:api', 'web'],
use Modules\Onlineservices\Http\Controllers\OnlineServicesConfigController;

Route::group( ['prefix' => 'onlineservices'], function()
{
    Route::get('/', [OnlineServicesConfigController::class, 'index']);
    Route::post('doDeleteConfigWidgetParam', [OnlineServicesConfigController::class,'doDeleteConfigWidgetParam']);
    Route::post('saveApplicationstatusactions', [OnlineServicesConfigController::class,'saveApplicationstatusactions']);
    Route::post('saveOnlineservices', [OnlineServicesConfigController::class,'saveOnlineservices']);

    Route::post('saveOnlinePortalData', [OnlineServicesConfigController::class,'saveOnlinePortalData']);
    Route::post('saveUniformOnlinePortalData', [OnlineServicesConfigController::class,'saveUniformOnlinePortalData']);
    
    
    Route::post('saveApplicationstatusactions', [OnlineServicesConfigController::class,'saveApplicationstatusactions']);
    
    
    Route::get('getapplicationstatusactions', [OnlineServicesConfigController::class,'getapplicationstatusactions']);
    Route::get('getApplicationTermsConditions', [OnlineServicesConfigController::class,'getApplicationTermsConditions']);

    Route::get('getOnlineMenuLevel0', [OnlineServicesConfigController::class,'getOnlineMenuLevel0']);
    Route::get('getSystemNavigationMenuItems', [OnlineServicesConfigController::class,'getSystemNavigationMenuItems']);
    Route::get('getOnlinePortalServicesDetails', [OnlineServicesConfigController::class,'getOnlinePortalServicesDetails']);
    Route::get('getApplicationdocumentdefination', [OnlineServicesConfigController::class,'getApplicationdocumentdefination']);
    Route::get('getOnlineProcessTransitionsdetails', [OnlineServicesConfigController::class,'getOnlineProcessTransitionsdetails']);
   
    Route::get('getapplicationstatus', [OnlineServicesConfigController::class,'getapplicationstatus']);
    Route::get('getApplicationprocessguidelines', [OnlineServicesConfigController::class,'getApplicationprocessguidelines']);
    Route::post('deleteSystemMenuItem',[OnlineServicesConfigController::class,'deleteSystemMenuItem']);
    Route::get('getOnlineProcesdetails',[OnlineServicesConfigController::class,'getOnlineProcesdetails']);
    Route::post('deleteSystemProcess',[OnlineServicesConfigController::class,'deleteSystemProcess']);
    Route::get('getOnlineFormsParams',[OnlineServicesConfigController::class,'getOnlineFormsParams']);
});