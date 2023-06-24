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


use Modules\Summaryreport\Http\Controllers\SummaryReportController;

Route::group(['middleware' => 'web', 'prefix' => 'summaryreport'], function () {
    Route::get('getSummaryReports', 'SummaryReportController@getSummaryReports');
    Route::get('GetChartProductApplications', 'SummaryReportController@GetChartProductApplications');
    Route::get('getGridRevenueReport', 'SummaryReportController@getGridRevenueReport');
    Route::get('getChatRevenueReport', 'SummaryReportController@getChatRevenueReport');
    Route::get('exportPaymentDetails', 'SummaryReportController@exportPaymentDetails');
    Route::get('getUploadedDocs', 'SummaryReportController@getUploadedDocumentDetails');
    Route::get('getAgeAnalysis', 'SummaryReportController@getAgeAnalysis');
    Route::get('exportSummaryAgeAnalysis', 'SummaryReportController@exportSummaryAgeAnalysis');
   
    
    //revenue report routes
    Route::get('getRevenueSummaryReports', 'SummaryReportController@getRevenueSummaryReports');
    Route::get('getDailyFinanceTrans', 'SummaryReportController@getDailyFinanceTrans');
    Route::get('getGLCodedRevenueReport', 'SummaryReportController@getGLCodedRevenueReport');
    Route::get('getPaymentReversalsSummaryReports', 'SummaryReportController@getPaymentReversalsSummaryReports');
    Route::get('ExportGLCodedReport', 'SummaryReportController@ExportGLCodedReport');
    Route::get('exportDailyTransactions', 'SummaryReportController@exportDailyTransactions');
    Route::get('printRevenueSummaryReport', 'SummaryReportController@printRevenueSummaryReport');
    Route::get('printGlSummaryReport', 'SummaryReportController@printGlSummaryReport');

    //new Reports
    Route::get('getProductRegistrationCartesianReport', 'SummaryReportController@getProductRegistrationCartesianReport');
    Route::get('getProductGridRegistrationReport', 'SummaryReportController@getProductGridRegistrationReport');
    Route::get('getProductRegistrationAgeAnalysisReport', 'SummaryReportController@getProductRegistrationAgeAnalysisReport');

    Route::get('getPremiseRegistrationCartesianReport', 'SummaryReportController@getPremiseRegistrationCartesianReport');
    Route::get('getPremiseGridRegistrationReport', 'SummaryReportController@getPremiseGridRegistrationReport');
    Route::get('getPremiseRegistrationAgeAnalysisReport', 'SummaryReportController@getPremiseRegistrationAgeAnalysisReport');

    Route::get('getGmpRegistrationCartesianReport', 'SummaryReportController@getGmpRegistrationCartesianReport');
    Route::get('getGmpGridRegistrationReport', 'SummaryReportController@getGmpGridRegistrationReport');
    Route::get('getGmpRegistrationAgeAnalysisReport', 'SummaryReportController@getGmpRegistrationAgeAnalysisReport');


    Route::get('getClinicalTrialRegistrationCartesianReport', 'SummaryReportController@getClinicalTrialRegistrationCartesianReport');
    Route::get('getClinicalTrialGridRegistrationReport', 'SummaryReportController@getClinicalTrialGridRegistrationReport');
    Route::get('getClinicalTrialRegistrationAgeAnalysisReport', 'SummaryReportController@getClinicalTrialRegistrationAgeAnalysisReport');

     Route::get('getImportExportRegistrationCartesianReport', 'SummaryReportController@getImportExportRegistrationCartesianReport');
    Route::get('getImportExportGridRegistrationReport', 'SummaryReportController@getImportExportGridRegistrationReport');
    Route::get('getImportExportRegistrationAgeAnalysisReport', 'SummaryReportController@getImportExportRegistrationAgeAnalysisReport');

    Route::get('getPromAdvertRegistrationCartesianReport', 'SummaryReportController@getPromAdvertRegistrationCartesianReport');
    Route::get('getPromAdvertGridRegistrationReport', 'SummaryReportController@getPromAdvertGridRegistrationReport');
    Route::get('getPromAdvertRegistrationAgeAnalysisReport', 'SummaryReportController@getPromAdvertRegistrationAgeAnalysisReport');

    Route::get('getDisposalRegistrationCartesianReport', 'SummaryReportController@getDisposalRegistrationCartesianReport');
    Route::get('getDisposalGridRegistrationReport', 'SummaryReportController@getDisposalGridRegistrationReport');
    Route::get('getDisposalRegistrationAgeAnalysisReport', 'SummaryReportController@getDisposalRegistrationAgeAnalysisReport');

    
    Route::get('exportProductDefinedColumns', 'SummaryReportController@exportProductDefinedColumns');
    Route::get('exportPremiseDefinedColumns', 'SummaryReportController@exportPremiseDefinedColumns');
    Route::get('exportGmpDefinedColumns', 'SummaryReportController@exportGmpDefinedColumns');
    Route::get('exportImportExportDefinedColumns', 'SummaryReportController@exportImportExportDefinedColumns');
    Route::get('exportClinicalTrialDefinedColumns', 'SummaryReportController@exportClinicalTrialDefinedColumns');
    Route::get('exportPromAdvertDefinedColumns', 'SummaryReportController@exportPromAdvertDefinedColumns');
    Route::get('exportDisposalDefinedColumns', 'SummaryReportController@exportDisposalDefinedColumns');

    Route::get('getPremiseZonalGridReports', 'SummaryReportController@getPremiseZonalGridReports');
    Route::get('getProductAssessmentGridReports', 'SummaryReportController@getProductAssessmentGridReports');
    Route::get('getProductClassificationGridReports', 'SummaryReportController@getProductClassificationGridReports');
    Route::get('getDisposalTypeGridReports', 'SummaryReportController@getDisposalTypeGridReports');
    Route::get('getImportExportPermitGridReports', 'SummaryReportController@getImportExportPermitGridReports');
    Route::get('getAllUploadedDocumentDetails', 'SummaryReportController@getAllUploadedDocumentDetails');
    
    //registered applicantions
    Route::get('getregisteredApplicationsGridReports', 'SummaryReportController@getregisteredApplicationsGridReports');
    Route::get('getRegisteredApplicationsCounterGridReports', 'SummaryReportController@getRegisteredApplicationsCounterGridReports');
    Route::get('getRegistrationApplicableModules', 'SummaryReportController@getRegistrationApplicableModules');
    
    //PMS
    Route::get('getAnnualPMSImplementationReport', 'SummaryReportController@getAnnualPMSImplementationReport');
    Route::get('getPMSManufacturerReport', 'SummaryReportController@getPMSManufacturerReport');
    Route::get('ExportPmsReport', 'SummaryReportController@ExportPmsReport');
    Route::get('ExportPmsManufacturerReport', 'SummaryReportController@ExportPmsManufacturerReport');
    
    Route::get('getApplicationReceiptsReport', 'SummaryReportController@getApplicationReceiptsReport');
    Route::get('generatedSystemReport', 'SummaryReportController@generatedSystemReport');
    Route::get('getPremiseRegisterReport', 'SummaryReportController@getPremiseRegisterReport');
    Route::get('getPremiseRegisterChart', 'SummaryReportController@getPremiseRegisterChart');
    Route::get('getBusinessTypeScaleReport', 'SummaryReportController@getBusinessTypeScaleReport');
    

    //general
    Route::get('exportData', 'SummaryReportController@exportData');
    Route::get('exportDefinedColumnData', 'SummaryReportController@exportDefinedColumnData');
    Route::get('printProductRegSummary', 'SummaryReportController@printProductRegSummary');
    Route::get('printPremiseRegistrationReport', 'SummaryReportController@printPremiseRegistrationReport');
    Route::get('printPremiseRegister', 'SummaryReportController@printPremiseRegister');
    Route::get('printIERegSummaryReport', 'SummaryReportController@printIERegSummaryReport');
    Route::get('printGMPRegSummaryReport', 'SummaryReportController@printGMPRegSummaryReport');
    Route::get('printCTRegSummaryReport', 'SummaryReportController@printCTRegSummaryReport');
    
    Route::get('printPromAdvertRegSummaryReport', 'SummaryReportController@printPromAdvertRegSummaryReport');
    Route::get('printPremiseZonalSummaryReport', 'SummaryReportController@printPremiseZonalSummaryReport');
    Route::get('exportPremiseZonalSummaryData', 'SummaryReportController@exportPremiseZonalSummaryData');
    Route::get('printDisposalSummaryReport', 'SummaryReportController@printDisposalSummaryReport');
    Route::get('getModuleRegReport', 'SummaryReportController@getModuleRegReport');
    Route::get('printModuleRegReport', 'SummaryReportController@printModuleRegReport');
    Route::get('exportModuleRegReportData', 'SummaryReportController@exportModuleRegReportData');
    Route::get('printSectionRegReport', 'SummaryReportController@printSectionRegReport');
    Route::get('getSectionRegReport', 'SummaryReportController@getSectionRegReport');
    Route::get('getRequestCreditNoteSummaryReport', 'SummaryReportController@getRequestCreditNoteSummaryReport');
    Route::get('getApprovedCreditNoteSummaryReport', 'SummaryReportController@getApprovedCreditNoteSummaryReport');
    
     Route::get('getPMSZonalReport', 'SummaryReportController@getPMSZonalReport');
     Route::get('printPMSZonalReport', 'SummaryReportController@printPMSZonalReport');

     Route::get('getApprovedPaymentsREversalsummaryReport', 'SummaryReportController@getApprovedPaymentsREversalsummaryReport');
    
});
