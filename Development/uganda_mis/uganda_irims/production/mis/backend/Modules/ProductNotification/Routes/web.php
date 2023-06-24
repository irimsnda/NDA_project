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

// Route::prefix('productnotification')->group(function() {
//     Route::get('/', [ProductNotificationController::class,'index']);
// });
use Modules\Productnotification\Http\Controllers\ProductNotificationController;

Route::group(['middleware' => 'web', 'prefix' => 'productnotification'], function () {
    Route::get('getOnlineApplications', [ProductNotificationController::class,'getOnlineApplications']);
    Route::get('prepareOnlineProductNotReceivingStage', [ProductNotificationController::class,'prepareOnlineProductNotReceivingStage']);
    Route::get('onLoadOnlineproductNotificationManufacturer', [ProductNotificationController::class,'onLoadOnlineproductNotificationManufacturer']);
    Route::get('getMedicalDevicesNotificationapps', [ProductNotificationController::class,'getMedicalDevicesNotificationapps']);
    
    Route::get('onLoadproductManufacturer', [ProductNotificationController::class,'onLoadproductManufacturer']);
    Route::get('prepareProductNotificationReceivingStage', [ProductNotificationController::class,'prepareProductNotificationReceivingStage']);
    Route::get('prepareMedicaldevicesUniformStage', [ProductNotificationController::class,'prepareMedicaldevicesUniformStage']);
    
    
    Route::post('saveProductNotificationReceivingBaseDetails', [ProductNotificationController::class,'saveProductNotificationReceivingBaseDetails']);
   
    Route::post('onSaveProductNotificationinformation', [ProductNotificationController::class,'onSaveProductNotificationinformation']);
    Route::get('getProductNotificationDetails', [ProductNotificationController::class,'getProductNotificationDetails']);
    
    
    Route::get('getManagerEvaluationApplications', [ProductNotificationController::class,'getManagerEvaluationApplications']);
    Route::get('getProductNotificationApprovalApplications', [ProductNotificationController::class,'getProductNotificationApprovalApplications']);

    Route::post('saveOnlineProductNotificationReceiving', [ProductNotificationController::class,'saveOnlineProductNotificationReceiving']);
   
   Route::get('ScheduledExpiryNotificationScript', [ProductNotificationController::class,'ScheduledExpiryNotificationScript']);

});