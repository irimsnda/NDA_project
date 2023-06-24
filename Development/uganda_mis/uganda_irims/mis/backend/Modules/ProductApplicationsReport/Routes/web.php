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


use Modules\Productapplicationsreport\Http\Controllers\ProductApplicationsReportController;
Route::group(['middleware' => 'web', 'prefix' => 'productapplicationsreport'], function () {
    //Route::get('/', [ProductApplicationsReportController::class, 'index']);
    Route::get('ExportProductApplicationDetails',  [ProductApplicationsReportController::class,'ExportProductApplicationDetails']);
    Route::get('ExportPremiseApplicationDetails',  [ProductApplicationsReportController::class,'ExportPremiseApplicationDetails']);
    Route::get('ExportGMPApplicationDetails',  [ProductApplicationsReportController::class,'ExportGMPApplicationDetails']);
    Route::get('ExportClinicalTrailApplicationDetails',  [ProductApplicationsReportController::class,'ExportClinicalTrailApplicationDetails']);
    Route::get('ExportImportExportApplicationDetails',  [ProductApplicationsReportController::class,'ExportImportExportApplicationDetails']);
});