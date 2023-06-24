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

use Modules\ClinicalTrial\Http\Controllers\ClinicalTrialController;

Route::group(['prefix' => 'clinicaltrial','middleware' => ['auth:api', 'web']], function() {
    Route::get('/', [ClinicalTrialController::class, 'index']);
    Route::get('printApplicationMeetingDetails', [ClinicalTrialController::class, 'printApplicationMeetingDetails']);
    Route::get('getClinicalTrialApplications',  [ClinicalTrialController::class,'getClinicalTrialApplications']);
    Route::post('saveClinicalTrialCommonData',  [ClinicalTrialController::class,'saveClinicalTrialCommonData']);
    Route::get('getClinicalTrialParamFromModel',  [ClinicalTrialController::class,'getClinicalTrialParamFromModel']);
    Route::post('deleteClinicalTrialRecord',  [ClinicalTrialController::class,'deleteClinicalTrialRecord']);
    Route::post('softDeleteClinicalTrialRecord',  [ClinicalTrialController::class,'softDeleteClinicalTrialRecord']);
    Route::get('getStudySitesList',  [ClinicalTrialController::class,'getStudySitesList']);
    Route::post('saveNewReceivingBaseDetails',  [ClinicalTrialController::class,'saveNewReceivingBaseDetails']);
    Route::post('saveProgressReportingBaseDetails',  [ClinicalTrialController::class,'saveProgressReportingBaseDetails']);

    
    Route::post('saveNewApplicationClinicalTrialDetails',  [ClinicalTrialController::class,'saveNewApplicationClinicalTrialDetails']);
    Route::post('saveNewApplicationClinicalTrialOtherDetails',  [ClinicalTrialController::class,'saveNewApplicationClinicalTrialOtherDetails']);
    Route::get('prepareNewClinicalTrialReceivingStage',  [ClinicalTrialController::class,'prepareNewClinicalTrialReceivingStage']);
    Route::get('prepareNewClinicalTrialInvoicingStage',  [ClinicalTrialController::class,'prepareNewClinicalTrialInvoicingStage']);
    Route::get('prepareNewClinicalTrialPaymentStage',  [ClinicalTrialController::class,'prepareNewClinicalTrialPaymentStage']);
    Route::get('prepareNewClinicalTrialAssessmentStage',  [ClinicalTrialController::class,'prepareNewClinicalTrialAssessmentStage']);
    Route::get('prepareCtrProgressReportAssessment',  [ClinicalTrialController::class,'prepareCtrProgressReportAssessment']);

    
    Route::get('prepareNewClinicalTrialManagerMeetingStage',  [ClinicalTrialController::class,'prepareNewClinicalTrialManagerMeetingStage']);
    Route::post('addClinicalStudySite',  [ClinicalTrialController::class,'addClinicalStudySite']);
    Route::get('getClinicalStudySites',  [ClinicalTrialController::class,'getClinicalStudySites']);
    Route::get('getClinicalTrialPersonnelList',  [ClinicalTrialController::class,'getClinicalTrialPersonnelList']);
    Route::post('addApplicationOtherInvestigators',  [ClinicalTrialController::class,'addApplicationOtherInvestigators']);
    Route::get('getClinicalTrialOtherInvestigators',  [ClinicalTrialController::class,'getClinicalTrialOtherInvestigators']);
    Route::get('getClinicalTrialMonitors',  [ClinicalTrialController::class,'getClinicalTrialMonitors']);

    
    Route::get('getImpProducts',  [ClinicalTrialController::class,'getImpProducts']);
    Route::get('getImpProductIngredients',  [ClinicalTrialController::class,'getImpProductIngredients']);
    Route::get('getClinicalTrialManagerApplicationsGeneric',  [ClinicalTrialController::class,'getClinicalTrialManagerApplicationsGeneric']);
    Route::get('getstrProgressReportingManagerApplicationsGeneric',  [ClinicalTrialController::class,'getstrProgressReportingManagerApplicationsGeneric']);
   
    
    Route::get('getClinicalTrialManagerMeetingApplications',  [ClinicalTrialController::class,'getClinicalTrialManagerMeetingApplications']);
    Route::get('getClinicalTrialRecommReviewApplications',  [ClinicalTrialController::class,'getClinicalTrialRecommReviewApplications']);
    Route::get('getClinicalTrialApplicationsAtApproval',  [ClinicalTrialController::class,'getClinicalTrialApplicationsAtApproval']);
    Route::post('saveTCMeetingDetails',  [ClinicalTrialController::class,'saveTCMeetingDetails']);
    Route::post('syncTcMeetingParticipants',  [ClinicalTrialController::class,'syncTcMeetingParticipants']);
    Route::get('getTcMeetingParticipants',  [ClinicalTrialController::class,'getTcMeetingParticipants']);
    Route::get('getTcMeetingAgendas',  [ClinicalTrialController::class,'getTcMeetingAgendas']);
    
    Route::get('getExternalAssessorDetails',  [ClinicalTrialController::class,'getExternalAssessorDetails']);
    Route::get('getTcMeetingDetails',  [ClinicalTrialController::class,'getTcMeetingDetails']);
    Route::get('getClinicalTrialApplicationMoreDetails',  [ClinicalTrialController::class,'getClinicalTrialApplicationMoreDetails']);
    Route::get('getClinicalTrialsList',  [ClinicalTrialController::class,'getClinicalTrialsList']);
    Route::post('saveAmendmentReceivingBaseDetails',  [ClinicalTrialController::class,'saveAmendmentReceivingBaseDetails']);
    Route::get('getOnlineApplications',  [ClinicalTrialController::class,'getOnlineApplications']);
    Route::get('prepareOnlineClinicalTrialPreview',  [ClinicalTrialController::class,'prepareOnlineClinicalTrialPreview']);
    Route::get('prepareOnlineClinicalTrialRegistryPreview',  [ClinicalTrialController::class,'prepareOnlineClinicalTrialRegistryPreview']);
    Route::get('getCtrRegistryInterventions',  [ClinicalTrialController::class,'getCtrRegistryInterventions']);
    Route::get('getClinicalOutcomesDetails',  [ClinicalTrialController::class,'getClinicalOutcomesDetails']);
    Route::get('getClinicalRecruiptmentDetails',  [ClinicalTrialController::class,'getClinicalRecruiptmentDetails']);
    Route::get('getClinicalEthicsApprovalDetails',  [ClinicalTrialController::class,'getClinicalEthicsApprovalDetails']);
    Route::get('getClinicaltrailSponsorsData',  [ClinicalTrialController::class,'getClinicaltrailSponsorsData']);
    Route::get('getClinicalContactPersonsDetails',  [ClinicalTrialController::class,'getClinicalContactPersonsDetails']);
    
    
    Route::get('getOnlineClinicalStudySites',  [ClinicalTrialController::class,'getOnlineClinicalStudySites']);
    Route::get('getOnlineClinicalTrialOtherInvestigators',  [ClinicalTrialController::class,'getOnlineClinicalTrialOtherInvestigators']);
    Route::get('getOnlineImpProducts',  [ClinicalTrialController::class,'getOnlineImpProducts']);
    Route::get('getOnlineImpProductIngredients',  [ClinicalTrialController::class,'getOnlineImpProductIngredients']);
    Route::get('getClinicalTrialCompareDetails',  [ClinicalTrialController::class,'getClinicalTrialCompareDetails']);
    Route::get('getDismissedClinicalTrialApplications',  [ClinicalTrialController::class,'getDismissedClinicalTrialApplications']);

    Route::get('getOnlineClinicalTrialMonitors',  [ClinicalTrialController::class,'getOnlineClinicalTrialMonitors']);
    Route::get('prepareOnlineClinicalTrialProgressRptPreview',  [ClinicalTrialController::class,'prepareOnlineClinicalTrialProgressRptPreview']);

    Route::get('getClinicalTrialCtrgcpInspectionscheduleDetails',  [ClinicalTrialController::class,'getClinicalTrialCtrgcpInspectionscheduleDetails']);

    Route::post('saveGcpScheduleInspectionDetails',  [ClinicalTrialController::class,'saveGcpScheduleInspectionDetails']);

    Route::get('prepareClinicalTrialGCPInspectionStage',  [ClinicalTrialController::class,'prepareClinicalTrialGCPInspectionStage']);
    Route::post('saveGcpClinicalApplicationdetails',  [ClinicalTrialController::class,'saveGcpClinicalApplicationdetails']);
    Route::get('getClinicalTrialCtrgcpInspectionDetails',  [ClinicalTrialController::class,'getClinicalTrialCtrgcpInspectionDetails']);
    Route::get('getGCPInspectionRecommendationDetails',  [ClinicalTrialController::class,'getGCPInspectionRecommendationDetails']);

    Route::post('saveGcpInspectionRecommendation',  [ClinicalTrialController::class,'saveGcpInspectionRecommendation']);
    Route::post('saveGcpInspectionApproval',  [ClinicalTrialController::class,'saveGcpInspectionApproval']);
    Route::get('getAllClinicalTrialApplications',  [ClinicalTrialController::class,'getAllClinicalTrialApplications']);
    Route::get('getApprovedClinicalTrialApplications',  [ClinicalTrialController::class,'getApprovedClinicalTrialApplications']);

    Route::post('saveEditAppBaseDetails',  [ClinicalTrialController::class,'saveEditAppBaseDetails']);
 
    Route::post('save_clinicalregdetails',  [ClinicalTrialController::class,'save_clinicalregdetails']);
    Route::post('save_clinicalseconaryids',  [ClinicalTrialController::class,'save_clinicalseconaryids']);
    Route::post('save_clinicalstudyDesign',  [ClinicalTrialController::class,'save_clinicalstudyDesign']);
    Route::post('save_clinicaleligibilitycriteria',  [ClinicalTrialController::class,'save_clinicaleligibilitycriteria']);
    Route::post('save_clinicalfundingsource',  [ClinicalTrialController::class,'save_clinicalfundingsource']);
    Route::post('save_clinicalcollaborators',  [ClinicalTrialController::class,'save_clinicalcollaborators']);
 
    Route::post('onSaveInterventionDetails',  [ClinicalTrialController::class,'onSaveInterventionDetails']);
    Route::post('onSaveOutcomesDetails',  [ClinicalTrialController::class,'onSaveOutcomesDetails']);
    Route::post('onSaverecruitmentCenter',  [ClinicalTrialController::class,'onSaverecruitmentCenter']);
    Route::post('onsaveclinicaltSponsorDetails',  [ClinicalTrialController::class,'onsaveclinicaltSponsorDetails']);
    Route::post('onSaveContactPersonDetails',  [ClinicalTrialController::class,'onSaveContactPersonDetails']);
    Route::post('onSaveethicsApproval',  [ClinicalTrialController::class,'onSaveethicsApproval']);
    Route::get('getPharmacoVigilanceApps',  [ClinicalTrialController::class,'getClinicalTrialApplications']);
 
    
});
