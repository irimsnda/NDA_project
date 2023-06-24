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

Route::prefix('configurations')->group(function() {
    Route::get('/', 'ConfigurationsController@index');

    Route::get('getNavigationItems', 'ConfigurationsController@getNavigationItems');
    Route::get('getCommonMisParams', 'ConfigurationsController@getCommonMisParams');
    Route::get('getPortalCommonMisParams', 'ConfigurationsController@getPortalCommonMisParams');
    
    Route::get('getProhibitedProducts', 'ConfigurationsController@getProhibitedProducts');
    Route::get('getonApplicationProcessGuidelines', 'ConfigurationsController@getonApplicationProcessGuidelines');
    
    
    //controlled 
    Route::get('getApplicationProcess', 'ConfigurationsController@getApplicationProcess');
    Route::get('getUniformSectionApplicationProcess', 'ConfigurationsController@getUniformSectionApplicationProcess');

    Route::get('getContactdetails', 'ConfigurationsController@getContactdetails');
    Route::get('getAppSubmissionGuidelines', 'ConfigurationsController@getAppSubmissionGuidelines');
    
    Route::get('dmsFunctioncall', 'ConfigurationsController@dmsFunctioncall');
    Route::post('uploadDMSDocument', 'ConfigurationsController@uploadDMSDocument');
    Route::get('sendNotification', 'ConfigurationsController@sendNotification');
  

    Route::get('getOrganisationServices', 'ConfigurationsController@getOrganisationServices');
    Route::get('getSectionUniformApplicationProcesWithValidation', 'ConfigurationsController@getSectionUniformApplicationProcesWithValidation');

});

Route::group(['prefix' => 'configurations', 'namespace' => 'Modules\Configurations\Http\Controllers'], function()
{
   
    
    
});
//authenticated routes
Route::group(['middleware' => ['auth:api'], 'prefix' => 'configurations', 'namespace' => 'Modules\Configurations\Http\Controllers'], function()
{
	//Route::get('sendNotification', 'ConfigurationsController@sendNotification');
    //Route::get('getContactdetails', 'ConfigurationsController@getContactdetails');
  
});