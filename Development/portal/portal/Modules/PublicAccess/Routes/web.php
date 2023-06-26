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

Route::prefix('publicaccess')->group(function() {
    Route::get('/', 'PublicAccessController@index');
});

Route::group(['middleware' => ['api'], 'prefix' => 'publicaccess'], function()
{
    Route::get('onSearchPublicRegisteredpremises', 'PublicAccessController@onSearchPublicRegisteredpremises');
    Route::get('onSearchPublicRegisteredproducts', 'PublicAccessController@onSearchPublicRegisteredproducts');
    Route::get('onSearchPublicGmpComplaints', 'PublicAccessController@onSearchPublicGmpComplaints');
    Route::get('onSearchPublicRegisteredclinicaltrials', 'PublicAccessController@onSearchPublicRegisteredclinicaltrials');
    Route::get('onSearchPublicGmpComplaints', 'PublicAccessController@onLoadRegulatedServicesCharges');

    
});
