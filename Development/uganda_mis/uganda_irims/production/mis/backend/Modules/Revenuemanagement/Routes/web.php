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

// Route::prefix('revenuemanagement')->group(function() {
//     Route::get('/', 'RevenuemanagementController@index');
// });
use Modules\RevenueManagement\Http\Controllers\RevenueManagementController;
use Modules\RevenueManagement\Http\Controllers\RetentionmanagementController;

Route::group(['prefix' => 'revenuemanagement','middleware' => ['auth:api', 'web']], function() {
    Route::get('getApplicationRaisedInvoices', [RevenueManagementController::class, 'getApplicationRaisedInvoices']);
    Route::get('/', [RevenueManagementController::class,'index']);
    
    Route::get('getGepgbillinvoicepostingdetails', [RevenueManagementController::class,'getGepgbillinvoicepostingdetails']);
    Route::get('getGepgbillPaymentspostingdetails', [RevenueManagementController::class,'getGepgbillPaymentspostingdetails']);
    Route::post('saveBatchInvoiceDetails', [RevenueManagementController::class,'saveBatchInvoiceDetails']);
    Route::get('getBatchInvoiceApplications', [RevenueManagementController::class,'getBatchInvoiceApplications']);
    Route::get('getBatchRetentionsInvoices', [RevenueManagementController::class,'getBatchRetentionsInvoices']);
    Route::get('getBatchApplicationInvoicesDetails', [RevenueManagementController::class,'getBatchApplicationInvoicesDetails']);
    Route::get('getRetentionChargesInvoicesdetails', [RevenueManagementController::class,'getRetentionChargesInvoicesdetails']);
    
    
    Route::get('getReversedRequestsApplicationInvoices', [RevenueManagementController::class,'getReversedRequestsApplicationInvoices']);
    
    Route::get('getApplicationInvoicesDetails', [RevenueManagementController::class,'getApplicationInvoicesDetails']);
    Route::get('prepareCancellationREquestDetails', [RevenueManagementController::class,'prepareCancellationREquestDetails']);
    Route::post('approveInvoiceCancellationRequest', [RevenueManagementController::class,'approveInvoiceCancellationRequest']);
    Route::get('getPaymentsReversalRequestApplications', [RevenueManagementController::class,'getPaymentsReversalRequestApplications']);
    Route::get('getGepgbillPaymentspostingdetails', [RevenueManagementController::class,'getGepgbillPaymentspostingdetails']);
    Route::get('getPaymentspostingdetails', [RevenueManagementController::class,'getPaymentspostingdetails']);
    Route::post('approvePaymentCancellationRequest', [RevenueManagementController::class,'approvePaymentCancellationRequest']);
    Route::post('funcOnFetchCurrencyExchangeRate', [RevenueManagementController::class,'funcOnFetchCurrencyExchangeRate']);
    
    
    
    Route::get('getWavePaymentManagementDashDetails', [RevenueManagementController::class,'getWavePaymentManagementDashDetails']);
    Route::post('approveCreditNoteRequest', [RevenueManagementController::class,'approveCreditNoteRequest']);
    
    Route::get('getApplicationRaisedInvoices', [RevenueManagementController::class,'getApplicationRaisedInvoices']);
    Route::get('getNewInvoiceQuotation', [RevenueManagementController::class,'getNewInvoiceQuotation']);
    Route::get('getOnlineAppNewInvoiceQuotation', [RevenueManagementController::class,'getOnlineAppNewInvoiceQuotation']);
    
    Route::get('getImportFOBApplicationInvoiceDetails', [RevenueManagementController::class,'getImportFOBApplicationInvoiceDetails']);
   
    Route::get('getAdhocInvoicingApplicationsDetails', [RevenueManagementController::class,'getAdhocInvoicingApplicationsDetails']);
    Route::post('saveInspectionAtOwnersPremises', [RevenueManagementController::class,'saveInspectionAtOwnersPremises']);
    Route::get('prepareInspectionatownerpremreceiving', [RevenueManagementController::class,'prepareInspectionatownerpremreceiving']);
    Route::get('prepareadhocinvoicingreceiptingpnl', [RevenueManagementController::class,'prepareadhocinvoicingreceiptingpnl']);
   
    Route::get('getApplicationInvoiceDetails', [RevenueManagementController::class,'getApplicationInvoiceDetails']);
    Route::get('getRetentionPendingInvoicesdetails', [RevenueManagementController::class,'getRetentionPendingInvoicesdetails']);
    Route::get('getRetentionAplicantsDetails', [RetentionmanagementController::class, 'getRetentionAplicantsDetails']);
    Route::get('getRetentionChargesPaymentsdetails', [RetentionmanagementController::class,'getRetentionChargesPaymentsdetails']);
    Route::get('prepareAdhocInvoiceRequestpnl', [RetentionmanagementController::class,'prepareAdhocInvoiceRequestpnl']);
    Route::post('saveAdhocApplicationInvoiceDetails', [RevenueManagementController::class,'saveAdhocApplicationInvoiceDetails']);
    
    Route::post('saveapplicationreceiceinvoiceDetails', [RevenueManagementController::class,'saveapplicationreceiceinvoiceDetails']);
    Route::post('saveonlineapplicationreceiceinvoiceDetails', [RevenueManagementController::class,'saveonlineapplicationreceiceinvoiceDetails']);
    Route::post('checkApplicationInvoiceBalance', [RevenueManagementController::class,'checkApplicationInvoiceBalance']);
    Route::get('getRaisedApplicationReinvoices', [RevenueManagementController::class,'getRaisedApplicationReinvoices']);
 
    Route::get('onCancelGeneratedApplicationInvoice', [RevenueManagementController::class,'onCancelGeneratedApplicationInvoice']);
     Route::get('/', [RetentionmanagementController::class,'index']);
    Route::get('getRetentionChargesInvoicesdetails', [RetentionmanagementController::class,'getRetentionChargesInvoicesdetails']);
   
    
    Route::get('generateSingleProductRetentionCharge', [RetentionmanagementController::class,'generateSingleProductRetentionCharge']);

    Route::get('generateProductRetentionCharges', [RetentionmanagementController::class,'generateProductRetentionCharges']);
    Route::get('generateProductRetentionPenalty', [RetentionmanagementController::class,'generateProductRetentionPenalty']);

    //post notifications
    Route::get('sendProductRetentionChargesNotifications', [RetentionmanagementController::class,'sendProductRetentionChargesNotifications']);
    Route::get('getRetentionReport', [RetentionmanagementController::class,'getRetentionReport']);
    Route::get('exportRevenueReportsData', [RetentionmanagementController::class,'exportRevenueReportsData']); 
});


   