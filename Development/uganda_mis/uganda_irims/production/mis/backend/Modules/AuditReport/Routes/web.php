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
use Modules\Auditreport\Http\Controllers\AuditReportController;
Route::group(['prefix' => 'auditreport','middleware' => ['web']], function() {
    Route::get('generateReportData', [AuditReportController::class, 'generateReportData']);
    Route::post('saveAuditDefinationConfigParam', [AuditReportController::class, 'saveAuditDefinationConfigParam']);
    Route::post('dropAuditDefinationParam', [AuditReportController::class, 'dropAuditDefinationParam']);
    Route::get('exportAuditLogs', [AuditReportController::class, 'exportAuditLogs']);
   
    
});

