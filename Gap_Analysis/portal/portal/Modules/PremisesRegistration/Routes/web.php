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

Route::prefix('premisesregistration')->group(function() {
    Route::get('/', 'PremisesRegistrationController@index');
});

Route::group(['middleware' => ['api', 'cors'], 'prefix' => 'premisesregistration', 'namespace' => 'Modules\PremisesRegistration\Http\Controllers'], function()
{
    Route::get('getPremisesOtherDetails', 'PremisesRegistrationController@getPremisesOtherDetails');
    Route::get('getPremisesPersonnelDetails', 'PremisesRegistrationController@getPremisesPersonnelDetails');
    Route::get('getPremisesStaffDetails', 'PremisesRegistrationController@getPremisesStaffDetails');
    Route::get('getPremisesDirectorsDetails', 'PremisesRegistrationController@getPremisesDirectorsDetails');

    Route::get('getPremisesCounterDetails', 'PremisesRegistrationController@getPremisesCounterDetails');
    Route::get('onSearchPublicRegisteredpremises', 'PremisesRegistrationController@onSearchPublicRegisteredpremises');
Route::get('getPremisesStoreLocationDetails', 'PremisesRegistrationController@getPremisesStoreLocationDetails');
});
Route::group(['middleware' => 'auth:api', 'prefix' => 'premisesregistration', 'namespace' => 'Modules\PremisesRegistration\Http\Controllers'], function()
{
    Route::get('/', 'PremisesRegistrationController@index');
    Route::post('onSavePremisesApplication', 'PremisesRegistrationController@onSavePremisesApplication');
     Route::post('onSavePremisesStoreLocationDetails', 'PremisesRegistrationController@onSavePremisesStoreLocationDetails');
    Route::post('onSavePremisesDirectorsDetails', 'PremisesRegistrationController@onSavePremisesDirectorsDetails');

    Route::post('onSaveRenPremisesApplication', 'PremisesRegistrationController@onSaveRenPremisesApplication');
    
    Route::post('onSavePremisesOtherDetails', 'PremisesRegistrationController@onSavePremisesOtherDetails');
    Route::post('onSavePremisesPersonnel', 'PremisesRegistrationController@onSavePremisesPersonnel');
    Route::post('onSavePremisesStaff', 'PremisesRegistrationController@onSavePremisesStaff');
    Route::post('onSavePremisesDirectors', 'PremisesRegistrationController@onSavePremisesDirectors');
    Route::post('onDeletePremisesDetails', 'PremisesRegistrationController@onDeletePremisesDetails');
    Route::post('onNewPremisesApplicationSubmit', 'PremisesRegistrationController@onNewPremisesApplicationSubmit');
    Route::post('onNewPremisesApplicationArchive', 'PremisesRegistrationController@onNewPremisesApplicationArchive');
    
    Route::post('onSavePersonnelDetails', 'PremisesRegistrationController@onSavePersonnelDetails');
    Route::post('onSavePersonnelQualification', 'PremisesRegistrationController@onSavePersonnelQualification');
    Route::post('onSavePremisesAmmendmentsRequest', 'PremisesRegistrationController@onSavePremisesAmmendmentsRequest');
  
    //get 
    Route::get('getPremisesApplicationLoading', 'PremisesRegistrationController@getPremisesApplicationLoading');


    Route::get('getPremisesArchivedApplicationLoading', 'PremisesRegistrationController@getPremisesArchivedApplicationLoading');
    
    Route::get('getPersonnelInformations', 'PremisesRegistrationController@getPersonnelInformations');
    Route::get('getpremisesApplicationDetails', 'PremisesRegistrationController@getpremisesApplicationDetails');
    Route::get('getPersonnelQualifications', 'PremisesRegistrationController@getPersonnelQualifications');
    Route::get('getAppSubmissionGuidelines', 'PremisesRegistrationController@getAppSubmissionGuidelines');
  
    Route::get('getTradersRegisteredPremises', 'PremisesRegistrationController@getTradersRegisteredPremises');
    Route::get('checkPendingPremisesRenewal', 'PremisesRegistrationController@checkPendingPremisesRenewal');
    
    Route::get('getPremisesAmmendementsRequest', 'PremisesRegistrationController@getPremisesAmmendementsRequest');
    
    
    Route::get('IntiateREinspectionResponseProcesses', 'PremisesRegistrationController@IntiateREinspectionResponseProcesses');
    
    
});
