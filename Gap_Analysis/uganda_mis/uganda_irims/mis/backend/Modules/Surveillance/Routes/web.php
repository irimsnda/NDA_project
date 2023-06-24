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

// Route::prefix('surveillance')->group(function() {
//     Route::get('/', 'SurveillanceController@index');
// });

use Modules\Surveillance\Http\Controllers\SurveillanceController;

Route::group(['prefix' => 'surveillance','middleware' => ['auth:api', 'web']], function() {
    Route::post('savePvReceivingBaseDetails', [SurveillanceController::class, 'savePvReceivingBaseDetails']);
    Route::post('saveSurveillanceCommonData', [SurveillanceController::class, 'saveSurveillanceCommonData']);
    Route::post('saveSurveillancePlansDetailsCommonData', [SurveillanceController::class, 'saveSurveillancePlansDetailsCommonData']);
    Route::post('deleteSurveillanceRecord', [SurveillanceController::class, 'deleteSurveillanceRecord']);
    Route::post('savePmsProgramRegions', [SurveillanceController::class, 'savePmsProgramRegions']);
    Route::post('savePmsProgramSamplingSite', [SurveillanceController::class, 'savePmsProgramSamplingSite']);
    Route::post('savePmsProgramProducts', [SurveillanceController::class, 'savePmsProgramProducts']);
    Route::get('getPmsProgramRegions', [SurveillanceController::class, 'getPmsProgramRegions']);
    Route::get('getPmsProgramSamplingSites', [SurveillanceController::class, 'getPmsProgramSamplingSites']);
    Route::get('getPmsProgramSamplingSitesLevels', [SurveillanceController::class, 'getPmsProgramSamplingSitesLevels']);
    Route::get('getPmsProgramProducts', [SurveillanceController::class, 'getPmsProgramProducts']);
    Route::get('getPmsPrograms', [SurveillanceController::class, 'getPmsPrograms']);
    Route::get('getPmsProgramsImplementation', [SurveillanceController::class, 'getPmsProgramsImplementation']);
    Route::get('getPmsProgramsImplementationDetails', [SurveillanceController::class, 'getPmsProgramsImplementationDetails']);
    Route::get('getAppSelectionPmsPrograms', [SurveillanceController::class, 'getAppSelectionPmsPrograms']);
    Route::get('getPmsProgramPlans', [SurveillanceController::class, 'getPmsProgramPlans']);
    Route::get('getSurveillanceApplications', [SurveillanceController::class, 'getSurveillanceApplications']);
    Route::post('saveNewReceivingBaseDetails', [SurveillanceController::class, 'saveNewReceivingBaseDetails']);
    //start prepare
    Route::get('prepareStructuredPmsReceivingStage', [SurveillanceController::class, 'prepareStructuredPmsReceivingStage']);
    Route::get('prepareStructuredPmsTCMeetingStage', [SurveillanceController::class, 'prepareStructuredPmsTCMeetingStage']);
    Route::post('saveSurveillanceSampleDetails', [SurveillanceController::class, 'saveSurveillanceSampleDetails']);
    Route::get('getPmsApplicationSamplesReceiving', [SurveillanceController::class, 'getPmsApplicationSamplesReceiving']);
    Route::get('getPmsApplicationSamplesLabStages', [SurveillanceController::class, 'getPmsApplicationSamplesLabStages']);
    Route::get('getPmsApplicationSamplesApprovalStages', [SurveillanceController::class, 'getPmsApplicationSamplesApprovalStages']);
    Route::get('getManagerApplicationsGeneric', [SurveillanceController::class, 'getManagerApplicationsGeneric']);
    Route::get('getPmsApplicationMoreDetails', [SurveillanceController::class, 'getPmsApplicationMoreDetails']);
    Route::post('savePmsPIRRecommendation', [SurveillanceController::class, 'savePmsPIRRecommendation']);
    Route::get('getPmsSampleIngredients', [SurveillanceController::class, 'getPmsSampleIngredients']);
    Route::get('getSampleLabAnalysisResults', [SurveillanceController::class, 'getSampleLabAnalysisResults']);
    Route::post('saveTCMeetingDetails', [SurveillanceController::class, 'saveTCMeetingDetails']);
    Route::get('getSurveillanceSampleDetails', [SurveillanceController::class, 'getSurveillanceSampleDetails']);
    Route::get('getDismissedSurveillanceApplications', [SurveillanceController::class, 'getDismissedSurveillanceApplications']);
    Route::post('processReturnBackApplicationSubmission', [SurveillanceController::class, 'processReturnBackApplicationSubmission']);
    Route::get('getPmsPremisesList', [SurveillanceController::class, 'getPmsPremisesList']);
    Route::get('getGroupSampleAnalysisDetails', [SurveillanceController::class, 'getGroupSampleAnalysisDetails']);
    Route::post('submitProgramsForApproval', [SurveillanceController::class, 'submitProgramsForApproval']);
    Route::get('getWorkflowPmsPrograms', [SurveillanceController::class, 'getWorkflowPmsPrograms']);
    Route::post('onSavePmsProgramApprovalDecision', [SurveillanceController::class, 'onSavePmsProgramApprovalDecision']);
    Route::get('getPmsSamplingSitesList', [SurveillanceController::class, 'getPmsSamplingSitesList']);
    Route::get('getManagerGenericPmsProgramPlans', [SurveillanceController::class, 'getManagerGenericPmsProgramPlans']);
    Route::get('getProgramImplementationDetails', [SurveillanceController::class, 'getProgramImplementationDetails']);
    Route::get('getSampleCollectionList', [SurveillanceController::class, 'getSampleCollectionList']);
    Route::get('prepareSampleCollectionPnl', [SurveillanceController::class, 'prepareSampleCollectionPnl']);
    Route::get('getSampleLabResults', [SurveillanceController::class, 'getSampleLabResults']);
    Route::get('getPMSPlanTestParameters', [SurveillanceController::class, 'getPMSPlanTestParameters']);
    Route::post('saveSurveillanceFinalRecommendation', [SurveillanceController::class, 'saveSurveillanceFinalRecommendation']);
    Route::get('getCollectedSamplesDetails', [SurveillanceController::class, 'getCollectedSamplesDetails']);
    Route::post('updatePMSProgramDetails', [SurveillanceController::class, 'updatePMSProgramDetails']);
    Route::post('updateImplementationPlanDates', [SurveillanceController::class, 'updateImplementationPlanDates']);
    Route::get('getPMSProgramRevisions', [SurveillanceController::class, 'getPMSProgramRevisions']);
    Route::get('getRemainingSampleSize', [SurveillanceController::class, 'getRemainingSampleSize']);
    Route::get('getRegisteredProducts', [SurveillanceController::class, 'getRegisteredProducts']);
    Route::get('getPlanListDetails', [SurveillanceController::class, 'getPlanListDetails']);
    Route::post('saveAltenativeSampleCollectionSite', [SurveillanceController::class, 'saveAltenativeSampleCollectionSite']);
    Route::get('getMeetingPmsApplicationsList', [SurveillanceController::class, 'getMeetingPmsApplicationsList']);
    Route::get('getSampleCollectorsList', [SurveillanceController::class, 'getSampleCollectorsList']);
    Route::post('saveSampleCollectorsAssignment', [SurveillanceController::class, 'saveSampleCollectorsAssignment']);
    Route::post('getPlanSampleCollectors', [SurveillanceController::class, 'getPlanSampleCollectors']);
    Route::get('getSamplingRegions', [SurveillanceController::class, 'getSamplingRegions']);

});