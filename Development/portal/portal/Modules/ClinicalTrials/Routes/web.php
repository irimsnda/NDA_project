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

Route::prefix('clinicaltrials')->group(function() {
    Route::get('/', 'ClinicalTrialsController@index');

    Route::get('/', 'ClinicalTrialsController@index');
    Route::post('saveClinicalTrialApplication', 'ClinicalTrialsController@saveClinicalTrialApplication');

    Route::post('saveClinicalTrialRegistryApplication', 'ClinicalTrialsController@saveClinicalTrialRegistryApplication');

    
    Route::post('saveAltClinicalTrialApplication', 'ClinicalTrialsController@saveAltClinicalTrialApplication');
    
    Route::post('onSaveClinicalStudySite', 'ClinicalTrialsController@onSaveClinicalStudySite');
    Route::post('onsaveclinicaltInvestigatorDetails', 'ClinicalTrialsController@onsaveclinicaltInvestigatorDetails');
    Route::post('onsaveclinicaltSponsorDetails', 'ClinicalTrialsController@onsaveclinicaltSponsorDetails');
    Route::post('onsaveclinicaltMonitorDetails', 'ClinicalTrialsController@onsaveclinicaltMonitorDetails');
    
    Route::post('saveiMPProductDetailsDetails', 'ClinicalTrialsController@saveiMPProductDetailsDetails');
    Route::post('savePlaceboProductDetailsDetails', 'ClinicalTrialsController@savePlaceboProductDetailsDetails');
    Route::post('saveComparatorProductDetailsDetails', 'ClinicalTrialsController@saveComparatorProductDetailsDetails');
    Route::post('onsaveclinicaltrailVariationRequests', 'ClinicalTrialsController@onsaveclinicaltrailVariationRequests');
    
    Route::post('onsaveStudySiteDetails', 'ClinicalTrialsController@onsaveStudySiteDetails');
    
    Route::get('getClinicalApplicationsDetails', 'ClinicalTrialsController@getClinicalApplicationsDetails');
    Route::get('getClinicalTrialSites', 'ClinicalTrialsController@getClinicalTrialSites');
    Route::get('getClinicaltrailinvestigatorsData', 'ClinicalTrialsController@getClinicaltrailinvestigatorsData');
    Route::get('getClinicaltrailMonitorssData', 'ClinicalTrialsController@getClinicaltrailMonitorssData');

    
    Route::get('getClinicaltrailIMPProdData', 'ClinicalTrialsController@getClinicaltrailIMPProdData');
    Route::get('getClinicalTrialsList', 'ClinicalTrialsController@getClinicalTrialsList');
    Route::get('getClinicaltrailVariationsrequests', 'ClinicalTrialsController@getClinicaltrailVariationsrequests');
    
    Route::get('getRegisteredProductsDetails', 'ClinicalTrialsController@getRegisteredProductsDetails');
    Route::post('saveCtrProgressReportingApplication', 'ClinicalTrialsController@saveCtrProgressReportingApplication');
    Route::post('onSaveSecondaryIdentifiers', 'ClinicalTrialsController@onSaveSecondaryIdentifiers');
    Route::post('onSaveStudyDesign', 'ClinicalTrialsController@onSaveStudyDesign');
    Route::post('onSaveInterventionDetails', 'ClinicalTrialsController@onSaveInterventionDetails');
    
    
    Route::get('getclinicalStudySitesData', 'ClinicalTrialsController@getclinicalStudySitesData');
   
    Route::get('getClinicalRegistryDetails', 'ClinicalTrialsController@getClinicalRegistryDetails');
    Route::get('getClinicalRegistryAppData', 'ClinicalTrialsController@getClinicalRegistryAppData');
    Route::get('getClinicalInterventionsDetails', 'ClinicalTrialsController@getClinicalInterventionsDetails');
    Route::get('getClinicalOutcomesDetails', 'ClinicalTrialsController@getClinicalOutcomesDetails');
   
    

    Route::post('onDeleteClinicalRegistryDetails', 'ClinicalTrialsController@onDeleteClinicalRegistryDetails');
   
    Route::post('onSaveEligibilityCriteria', 'ClinicalTrialsController@onSaveEligibilityCriteria');
    Route::post('onSaveOutcomesDetails', 'ClinicalTrialsController@onSaveOutcomesDetails');
    Route::post('onSaverecruitmentCenter', 'ClinicalTrialsController@onSaverecruitmentCenter');
   
    Route::get('getClinicalRecruiptmentDetails', 'ClinicalTrialsController@getClinicalRecruiptmentDetails');
    Route::get('getClinicalEthicsApprovalDetails', 'ClinicalTrialsController@getClinicalEthicsApprovalDetails');
    Route::get('getClinicaltrailSponsorsData', 'ClinicalTrialsController@getClinicaltrailSponsorsData');
    
    Route::post('onSaveethicsApproval', 'ClinicalTrialsController@onSaveethicsApproval');

    Route::post('onSavefundingSourceDetails', 'ClinicalTrialsController@onSavefundingSourceDetails');
    Route::post('onSaveCollaboratorsDetails', 'ClinicalTrialsController@onSaveCollaboratorsDetails');
    Route::post('onSaveContactPersonDetails', 'ClinicalTrialsController@onSaveContactPersonDetails');
    
    
    Route::get('getClinicalContactPersonsDetails', 'ClinicalTrialsController@getClinicalContactPersonsDetails');
    Route::post('onValidateClinicalTrialApp', 'ClinicalTrialsController@onValidateClinicalTrialApp');
    
    Route::get('getClinicalTrialDiseasesDetails', 'ClinicalTrialsController@getClinicalTrialDiseasesDetails');
    
});
