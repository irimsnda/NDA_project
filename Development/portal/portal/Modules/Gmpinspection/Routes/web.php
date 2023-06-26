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

Route::prefix('gmpinspection')->group(function() {
    Route::get('/', 'GmpinspectionController@index');
});


// Route::group(['middleware' => 'web', 'prefix' => 'gmpinspection', 'namespace' => 'Modules\Gmpinspection\Http\Controllers'], function()
// {
//     Route::get('/', 'GmpinspectionController@index');
// });

Route::group(['middleware' => 'auth:api', 'prefix' => 'gmpinspection'], function()
{
   
    Route::post('onSaveGmpApplication', 'GmpinspectionController@onSaveGmpApplication');
    Route::post('onSaveRenewalGmpApplication', 'GmpinspectionController@onSaveRenewalGmpApplication');
    
    Route::post('onSaveGmpOtherDetails', 'GmpinspectionController@onSaveGmpOtherDetails');
    Route::post('onSavePremisesPersonnel', 'GmpinspectionController@onSavePremisesPersonnel');
    Route::post('onDeletePremisesDetails', 'GmpinspectionController@onDeletePremisesDetails');
    Route::post('onNewGmpApplicationSubmit', 'GmpinspectionController@onNewGmpApplicationSubmit');
    Route::post('onNewPremisesApplicationArchive', 'GmpinspectionController@onNewPremisesApplicationArchive');
    
    Route::post('onSavePersonnelQualification', 'GmpinspectionController@onSavePersonnelQualification');
    Route::post('onSavePremisesAmmendmentsRequest', 'GmpinspectionController@onSavePremisesAmmendmentsRequest');
    Route::post('onSaveGmpProductLinedetails', 'GmpinspectionController@onSaveGmpProductLinedetails');
    Route::post('onSavemanufatcuringSiteBlocks', 'GmpinspectionController@onSavemanufatcuringSiteBlocks');
    
    //get 
    Route::get('getGMPOtherDetails', 'GmpinspectionController@getGMPOtherDetails');
    Route::get('getGmpProductLinedetails', 'GmpinspectionController@getGmpProductLinedetails');
    
    
    Route::get('getGmpApplicationLoading', 'GmpinspectionController@getGmpApplicationLoading');
    Route::get('getPremisesArchivedApplicationLoading', 'GmpinspectionController@getPremisesArchivedApplicationLoading');
    
    Route::get('getPersonnelInformations', 'GmpinspectionController@getPersonnelInformations');
    Route::get('getgmpApplicationDetails', 'GmpinspectionController@getgmpApplicationDetails');
    Route::get('getPersonnelQualifications', 'GmpinspectionController@getPersonnelQualifications');
    Route::get('getAppSubmissionGuidelines', 'GmpinspectionController@getAppSubmissionGuidelines');
    Route::get('getPremisesDocploads', 'GmpinspectionController@getPremisesDocploads');
    Route::get('getTradersRegisteredPremises', 'GmpinspectionController@getTradersRegisteredPremises');
    Route::get('getTradersRegisteredGMPApplications', 'GmpinspectionController@getTradersRegisteredGMPApplications');
    
    
    Route::get('checkPendingPremisesRenewal', 'GmpinspectionController@checkPendingPremisesRenewal');
    Route::get('getPremisesAmmendementsRequest', 'GmpinspectionController@getPremisesAmmendementsRequest');
    
    Route::get('getGMPApplicationcounterDetails', 'GmpinspectionController@getGMPApplicationcounterDetails');
   
    
    Route::get('getPremisesPersonnelDetails', 'GmpinspectionController@getPremisesPersonnelDetails');
    Route::get('getManufacturingSiteInformation', 'GmpinspectionController@getManufacturingSiteInformation');
    Route::get('onLoadgmpManufacturingBlocksData', 'GmpinspectionController@onLoadgmpManufacturingBlocksData');


    Route::get('getManufacturingSiteRegisteredProductsData', 'GmpinspectionController@getManufacturingSiteRegisteredProductsData');
    Route::get('getgmpproductDetailsInformationData', 'GmpinspectionController@getgmpproductDetailsInformationData');
    
});


