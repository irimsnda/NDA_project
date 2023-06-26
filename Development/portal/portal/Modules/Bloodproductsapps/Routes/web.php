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

Route::prefix('bloodproductsapps')->group(function() {
    Route::get('/', 'BloodproductsappsController@index');
    
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'bloodproductsapps'], function()
{

    
    Route::get('getBloodEstabishmentApplicationsLoading', 'BloodproductsappsController@getBloodEstabishmentApplicationsLoading');
    Route::post('saveBloodEstabishmentApplications', 'BloodproductsappsController@saveBloodEstabishmentApplications');
    Route::post('saveDisposalPermitProductdetails', 'BloodproductsappsController@saveDisposalPermitProductdetails');
    
    Route::get('getAllRegisteredNonRedProducts', 'BloodproductsappsController@getAllRegisteredNonRedProducts');
    Route::get('getDisposalPermitProductsDetails', 'BloodproductsappsController@getDisposalPermitProductsDetails');
    
});

