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
use Modules\APIIntegrations\Http\Controllers\APIIntegrationsController;
use Modules\APIIntegrations\Http\Controllers\AuthenticationController;
use Modules\APIIntegrations\Http\Controllers\EACHarmonizationController;
use Modules\APIIntegrations\Http\Controllers\PaymentsIntegrationController;
use Modules\APIIntegrations\Http\Controllers\TeswsIntegrationController;


Route::group(['prefix' => 'apiintegrations','middleware' => ['auth:api', 'web']], function() {
Route::get('getLtrsDetails', [EACHarmonizationController::class, 'getLTRTradersWithLimit']);
Route::get('getLtrDetails/{id}', [EACHarmonizationController::class, 'showLTR']);  
Route::get('getInvoiceService', [EACHarmonizationController::class, 'funcGetInvoiceService']);  
Route::get('getPaymentService', [EACHarmonizationController::class, 'funcGetPaymentService']);  
Route::get('evaluation', [EACHarmonizationController::class, 'getFirstAssessmentReportPullService']);  
Route::get('getMarketAuthorisationService', [EACHarmonizationController::class, 'getMarketAuthorisationService']);  
Route::get('getStatusChangeNotificationService', [EACHarmonizationController::class, 'getStatusChangeNotificationService']);  
Route::post('postDrugApplicationDetailsSrv', [EACHarmonizationController::class, 'postDrugApplicationDetailsSrv']); 
Route::post('createInvoiceService', [EACHarmonizationController::class, 'funcCreateInvoiceService']);  
Route::post('postSampleSubmissionService', [EACHarmonizationController::class, 'postSampleSubmissionService']);  
Route::post('postAssessmentSchedulesNotification', [EACHarmonizationController::class, 'postAssessmentSchedulesNotification']); 
Route::post('getPlenaryReportService', [EACHarmonizationController::class, 'getPlenaryReportService']);  
Route::get('getMalInformationSharingSrv', [EACHarmonizationController::class, 'getMalRecallInformationSharingSrv']);  
Route::get('getPremisesInformationSharingSrv', [EACHarmonizationController::class, 'getPremisesInformationSharingSrv']);  
Route::get('getGmpInformationSharingSrv', [EACHarmonizationController::class, 'getGmpInformationSharingSrv']); 
Route::get('getMalRecallInformationSharingSrv', [EACHarmonizationController::class, 'getMalRecallInformationSharingSrv']); 
Route::get('getEACJointAssessmentMedicinesSubmissions', [EACHarmonizationController::class, 'getEACJointAssessmentMedicinesSubmissions']); 

Route::post('auth', [AuthenticationController::class, 'getPlenaryReportService']);  
Route::get('logout', [AuthenticationController::class, 'getMalRecallInformationSharingSrv']);

Route::post('gepgReconcResp', [PaymentsIntegrationController::class, 'gepgReconcResp']);  
Route::post('gepgPmtSpInfo', [PaymentsIntegrationController::class, 'gepgPmtSpInfo']); 
Route::post('gepgBillSubResp', [PaymentsIntegrationController::class, 'gepgBillSubResp']);  
Route::get('gepgBillSubReq', [PaymentsIntegrationController::class, 'postBillSubmissionRequest']);  
Route::get('gepgBillCanclReq', [PaymentsIntegrationController::class, 'gepgBillCanclReq']);  
Route::get('gepgReconcReq', [PaymentsIntegrationController::class, 'gepgReconcReq']); 

Route::get('permitApprovalNotification', [TeswsIntegrationController::class, 'permitApprovalNotification']);  
Route::get('processDeclaredImportExportapps', [TeswsIntegrationController::class, 'processDeclaredImportExportapps']); 
});


