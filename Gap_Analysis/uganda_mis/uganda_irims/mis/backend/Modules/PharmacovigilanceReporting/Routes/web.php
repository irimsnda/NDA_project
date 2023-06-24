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

use Modules\Pharmacovigilancereporting\Http\Controllers\PharmacovigilanceReportingController;

Route::group(['middleware' => ['auth:api', 'web'], 'prefix' => 'pharmacovigilancereporting'], function()
{
    Route::get('/', [PharmacovigilanceReportingController::class, 'index']);

    Route::post('saveReceivingSafetyAlertReportsDetails', [PharmacovigilanceReportingController::class,'saveReceivingSafetyAlertReportsDetails']);
    Route::get('getPharmacoVigilanceApps', [PharmacovigilanceReportingController::class,'getPharmacoVigilanceApps']);
    Route::get('prepareReceivingSafetyAlertReportsStage', [PharmacovigilanceReportingController::class,'prepareReceivingSafetyAlertReportsStage']);
    Route::get('getPharmacoVigilancerRptManagerApplicationsGeneric', [PharmacovigilanceReportingController::class,'getPharmacoVigilancerRptManagerApplicationsGeneric']);

    Route::get('getSafetyAlertApplicationMoreDetails', [PharmacovigilanceReportingController::class,'getSafetyAlertApplicationMoreDetails']);
    Route::get('prepareSafetyalertreportsassessment', [PharmacovigilanceReportingController::class,'prepareSafetyalertreportsassessment']);
});