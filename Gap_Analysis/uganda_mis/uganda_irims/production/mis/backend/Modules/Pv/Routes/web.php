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


use Modules\Pv\Http\Controllers\PvController;
Route::group(['prefix' => 'pv','middleware' => ['auth:api', 'web']], function() {
    Route::post('savePvReceivingBaseDetails', [PvController::class, 'savePvReceivingBaseDetails']);
    Route::get('onLoadSuspectedDrugs', [PvController::class, 'onLoadSuspectedDrugs']);
    Route::get('getDashboardApplications', [PvController::class, 'getDashboardApplications']);
    Route::get('prepareNewPvReceivingStage', [PvController::class, 'prepareNewPvReceivingStage']);
    Route::get('getStagePvApplications', [PvController::class, 'getStagePvApplications']);
    Route::get('getPvApplicationMoreDetails', [PvController::class, 'getPvApplicationMoreDetails']);
    Route::post('sendReporterNotification', [PvController::class, 'sendReporterNotification']);
    Route::post('publishReport', [PvController::class, 'publishReport']);

    
});
//non json calls
Route::group(['prefix' => 'pv','middleware' => ['web']], function() {
    Route::get('exportAdrReport', [PvController::class, 'exportAdrReport']);
});
