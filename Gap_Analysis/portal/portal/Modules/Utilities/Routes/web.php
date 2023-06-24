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

Route::prefix('utilities')->group(function() {
    Route::get('/', 'UtilitiesController@index');

    Route::post('/onSaveinitqueryresponse', 'UtilitiesController@onSaveinitqueryresponse');
    Route::post('/onDeleteUniformAppDetails', 'UtilitiesController@onDeleteUniformAppDetails');
    Route::post('/onsaveApplicationWithdrawalrequests', 'UtilitiesController@onsaveApplicationWithdrawalrequests');
    Route::post('/onPermitApplicationSubmit', 'UtilitiesController@onPermitApplicationSubmit');
    Route::post('/onAddUniformApplicantDataset', 'UtilitiesController@onAddUniformApplicantDataset');
    Route::post('/onMisPermitApplicationSubmit', 'UtilitiesController@onMisPermitApplicationSubmit');
   
    
   // Route::get('/', 'UtilitiesController@index');
    Route::get('/getApplicationPreRejectionDetails', 'UtilitiesController@getApplicationPreRejectionDetails');
    Route::get('/getApplicationPreQueriesDetails', 'UtilitiesController@getApplicationPreQueriesDetails');
    Route::get('/validateApplicationDocQuerySubmission', 'UtilitiesController@validateApplicationDocQuerySubmission');
    Route::get('/validateApplicationotherDetails', 'UtilitiesController@validateApplicationotherDetails');
    
    Route::post('/onApplicationArchive', 'UtilitiesController@onApplicationArchive');
    Route::post('/onsaveApplicationVariationsrequests', 'UtilitiesController@onsaveApplicationVariationsrequests');
    Route::post('/onSavesampleDetails', 'UtilitiesController@onSavesampleDetails');
   
    Route::get('/getapplicationVariationsrequests', 'UtilitiesController@getapplicationVariationsrequests');
    Route::get('/getapplicationWithdrawalrequests', 'UtilitiesController@getapplicationWithdrawalrequests');
    Route::get('/getSampleSubmissionDetails', 'UtilitiesController@getSampleSubmissionDetails');
    Route::get('/getApplicationProcessing', 'UtilitiesController@getApplicationProcessing');
    Route::get('getApplicationCounterDetails', 'UtilitiesController@getApplicationCounterDetails');
    Route::get('onValidateProductOtherdetails', 'UtilitiesController@onValidateProductOtherdetails');
    Route::get('getTraderApplicationProcessing', 'UtilitiesController@getTraderApplicationProcessing');
    Route::get('getDtaApplicationSubmissionData', 'UtilitiesController@getDtaApplicationSubmissionData');
    Route::get('getModuleApplicationdetails', 'UtilitiesController@getModuleApplicationdetails');

    
    Route::get('onValidateGmpProductOtherdetails', 'UtilitiesController@onValidateGmpProductOtherdetails');
    Route::get('getPersonnelDetails', 'UtilitiesController@getPersonnelDetails');
    Route::get('onloadProductRetetentionDetails', 'UtilitiesController@onloadProductRetetentionDetails');
    Route::get('onloadProductRetetentionPaymentsDetails', 'UtilitiesController@onloadProductRetetentionPaymentsDetails');
    
    Route::get('getApplicationQueriesData', 'UtilitiesController@getAllApplicationQueriesData');
    Route::post('onSavePrecheckingqueryresponse', 'UtilitiesController@onSavePrecheckingqueryresponse');
    Route::post('onSaveinitCAPAresponses', 'UtilitiesController@onSaveinitCAPAresponses');
  
    Route::get('onValidatePremisesOtherdetails', 'UtilitiesController@onValidatePremisesOtherdetails');
    Route::get('onValidateGMPOtherdetails', 'UtilitiesController@onValidateGMPOtherdetails');
    Route::get('onfuncValidatePermitDetails', 'UtilitiesController@onfuncValidatePermitDetails');
    
    
    Route::post('onSubmitApplicationDismissal', 'UtilitiesController@onSubmitApplicationDismissal');
    Route::get('validateApplicationQueryresponse', 'UtilitiesController@validateApplicationQueryresponse');
    Route::get('validateClinicalTrialOtherDetails', 'UtilitiesController@validateClinicalTrialOtherDetails');
    Route::post('onsaveProductConfigData', 'UtilitiesController@onsaveProductConfigData');
    Route::get('validateSampleProductDetails', 'UtilitiesController@validateSampleProductDetails');
    Route::get('onLoadApplicationNotifications', 'UtilitiesController@onLoadApplicationNotifications');
    Route::get('funcValidateApplicationLabels', 'UtilitiesController@funcValidateApplicationLabels');

    Route::post('onSaveUniformConfigData', 'UtilitiesController@onSaveUniformConfigData');
    Route::post('saveManufacturerSiteFulldetails', 'UtilitiesController@saveManufacturerSiteFulldetails');


    
    Route::get('getApplicationPaymentsDetails', 'UtilitiesController@getApplicationPaymentsDetails');
    Route::get('onLoadAssignedApplicationsAssignments', 'UtilitiesController@onLoadAssignedApplicationsAssignments');
    Route::get('onloadAsessmentProcedureProductsSubmissionDta', 'UtilitiesController@onloadAsessmentProcedureProductsSubmissionDta');


    
    Route::get('onLoadMeetingInvitations', 'UtilitiesController@onLoadMeetingInvitations');
    Route::get('getApplicationInformation', 'UtilitiesController@getApplicationInformation');

    Route::get('getapplicationQueriessrequests', 'UtilitiesController@getapplicationQueriessrequests');

    Route::get('getUnstructuredQueryChecklistItem', 'UtilitiesController@getUnstructuredQueryChecklistItem');
    Route::post('onsaveApplicationQueriesrequests', 'UtilitiesController@onsaveApplicationQueriesrequests');
    Route::get('onValidateApplicationAssesmentReport', 'UtilitiesController@onValidateApplicationAssesmentReport');
    Route::get('getSubmissionActionData', 'UtilitiesController@getSubmissionActionData');
    Route::get('getSubmissionNextStageDetails', 'UtilitiesController@getSubmissionNextStageDetails');
    Route::get('getSubmissionWorkflowStages', 'UtilitiesController@getSubmissionWorkflowStages');
    Route::post('onApplicationProcessSubmission', 'UtilitiesController@onApplicationProcessSubmission');
    Route::get('onLoadApplicationCounterDueforRenewal', 'UtilitiesController@onLoadApplicationCounterDueforRenewal');
    Route::get('onLoadApplicationDetailsDueforRenewal', 'UtilitiesController@onLoadApplicationDetailsDueforRenewal');
	
    Route::get('testEMail', 'UtilitiesController@testEMail');
    
      Route::post('onApplicationInvoiceGeneration', 'UtilitiesController@onApplicationInvoiceGeneration');
    Route::get('onLoadApplicationInvoice', 'UtilitiesController@onLoadApplicationInvoice');
    Route::get('onLoadGeneratedApplicationInvoice', 'UtilitiesController@onLoadGeneratedApplicationInvoice');
    Route::get('onCheckGeneratedApplicationInvoice', 'UtilitiesController@onCheckGeneratedApplicationInvoice');
    Route::get('onCancelGeneratedApplicationInvoice', 'UtilitiesController@onCancelGeneratedApplicationInvoice');

   


    
    Route::get('onLoadappUploadPaymentDeTailsData', 'UtilitiesController@onLoadappUploadPaymentDeTailsData');
	
    Route::post('onApplicationDelete', 'UtilitiesController@onApplicationDelete');
    Route::get('generateTraderIdentification_no', 'UtilitiesController@generateTraderIdentification_no');
    Route::get('addTraderAccountUsers', 'UtilitiesController@addTraderAccountUsers');
    
    Route::get('getapplicationCAPARequestsData', 'UtilitiesController@getapplicationCAPARequestsData');
   
    Route::post('onCustomerAccountRegistrationSubmission', 'UtilitiesController@onCustomerAccountRegistrationSubmission');
   
    Route::get('onLoadGroupApplicationInvoice', 'UtilitiesController@onLoadGroupApplicationInvoice');
    Route::post('onGroupedApplicationInvoiceGeneration', 'UtilitiesController@onGroupedApplicationInvoiceGeneration');
    Route::get('onCancelGroupedGeneratedApplicationInvoice', 'UtilitiesController@onCancelGroupedGeneratedApplicationInvoice');
});


Route::group(['prefix' => 'utilities', 'namespace' => 'Modules\Utilities\Http\Controllers'], function()
{


   
    
});
