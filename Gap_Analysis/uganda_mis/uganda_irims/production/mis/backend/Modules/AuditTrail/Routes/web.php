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

use Modules\AuditTrail\Http\Controllers\AuditTrailController;
Route::group(['prefix' => 'audittrail','middleware' => ['web']], function() {
    Route::get('getloginLogs', [AuditTrailController::class, 'getloginLogs']);
    Route::get('getloginAttemptsLogs', [AuditTrailController::class, 'getloginAttemptsLogs']);
    Route::get('getAllUsers/{table}/{id?}', [AuditTrailController::class, 'getAllUsers']);
    Route::get('exportAudit', [AuditTrailController::class, 'exportAudit']);
    Route::post('getAllAuditTrans', [AuditTrailController::class, 'getAllAuditTrans']);
    Route::get('getTableslist', [AuditTrailController::class, 'getTableslist']);
    Route::get('revertAuditRecord', [AuditTrailController::class, 'revertAuditRecord']);
    Route::get('getMISAuditTableData', [AuditTrailController::class, 'getMISAuditTableData']);
    Route::get('getPortalAuditTableData', [AuditTrailController::class, 'getPortalAuditTableData']);
    Route::get('getPortalAuditTrail', [AuditTrailController::class, 'getPortalAuditTrail']);
    Route::get('getMisAuditTrail', [AuditTrailController::class, 'getMisAuditTrail']);
    
    
});