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

// Route::prefix('reports')->group(function() {
//     Route::get('/', 'ReportsController@index');
// });
use Modules\Reports\Http\Controllers\ReportsController;
//Route::group(['middleware' => ['web'], 'prefix' => 'reports'], function(){
Route::group(['middleware' => 'web', 'prefix' => 'reports'], function () {
    Route::get('/', [ReportsController::class, 'index']);
     Route::get('generateReport',[ReportsController::class,'generateReport']);
    Route::get('generateApplicationInvoice',[ReportsController::class,'generateApplicationInvoice']);
    Route::get('generateApplicationReceipt',[ReportsController::class,'generateApplicationReceipt']);
    Route::get('generateApplicationReceipts',[ReportsController::class,'generateApplicationReceipt']);
   
    Route::get('generatePremiseCertificate',[ReportsController::class,'generatePremiseCertificate']);
    Route::get('generatePremisePermit',[ReportsController::class,'generatePremisePermit']);
    Route::get('generateProductRegCertificate',[ReportsController::class,'generateProductRegCertificate']);
    Route::get('generateGmpCertificate',[ReportsController::class,'generateGmpCertificate']);
    Route::get('generateGmpApprovalLetter',[ReportsController::class,'generateGmpApprovalLetter']);
    Route::get('generateClinicalTrialCertificate',[ReportsController::class,'generateClinicalTrialCertificate']);
    Route::get('genenerateImportExportPermit',[ReportsController::class,'genenerateImportExportPermit']);

    
    Route::get('generateProductNotificationCertificate',[ReportsController::class,'generateProductNotificationCertificate']);
    Route::get('generateProductNotificationApprovalLetter',[ReportsController::class,'generateProductNotificationApprovalLetter']);
    Route::get('generateProductRejectionLetter',[ReportsController::class,'generateProductRejectionLetter']);
   
   //added for system report view
   Route::get('getProductsReport',[ReportsController::class,'getProductsReport']);
   Route::get('funcExportInspectedpermits',[ReportsController::class,'funcExportInspectedpermits']);
   Route::get('printSampleSubmissionReport',[ReportsController::class,'printSampleSubmissionReport']);
   Route::get('generateProductEvaluationReport',[ReportsController::class,'generateProductEvaluationReport']);
   Route::get('generateProductAuditReport',[ReportsController::class,'generateProductAuditReport']);

   
   Route::get('print_test_report',[ReportsController::class,'print_test_report']);

   Route::get('printProductInformationReport',[ReportsController::class,'printProductInformationReport']);
   Route::get('printHospitalNarcoticsPermit',[ReportsController::class,'printHospitalNarcoticsPermit']);
   Route::get('generateProductsNotificationRpt',[ReportsController::class,'generateProductsNotificationRpt']);
   Route::get('printRetentionPaymentsStatement',[ReportsController::class,'printRetentionPaymentsStatement']);
    
   Route::get('disposalCertificate',[ReportsController::class,'disposalCertificate']);
   Route::get('getServiceCharterReportDetails',[ReportsController::class,'getServiceCharterReportDetails']);
   Route::get('generatePromotionalRegCertificate',[ReportsController::class,'generatePromotionalRegCertificate']);
   
   
   Route::get('funcPrintServiceCharterSectionsSummaryRpt',[ReportsController::class,'funcPrintServiceCharterSectionsSummaryRpt']);
   Route::get('funcPrintServiceCharterSummaryRpt',[ReportsController::class,'funcPrintServiceCharterSummaryRpt']);
   Route::get('funcExportServiceCharterSummaryRpt',[ReportsController::class,'funcExportServiceCharterSummaryRpt']);
   
   Route::get('printSpecialRequestScreeningfrm',[ReportsController::class,'printSpecialRequestScreeningfrm']);
   Route::get('generateBatchPaymentsStatement',[ReportsController::class,'generateBatchPaymentsStatement']);
   Route::get('generateRetentionBatchPaymentsStatement',[ReportsController::class,'generateRetentionBatchPaymentsStatement']);
   Route::get('generateRetentionBatchInvoiceStatement',[ReportsController::class,'generateRetentionBatchInvoiceStatement']);
   Route::get('generateDisposalpermit',[ReportsController::class,'generateDisposalpermit']);
   Route::get('generateBatchInvoiceStatement',[ReportsController::class,'generateBatchInvoiceStatement']);
   Route::get('printRequestForAdditionalInformation',[ReportsController::class,'printRequestForAdditionalInformation']);
   
});