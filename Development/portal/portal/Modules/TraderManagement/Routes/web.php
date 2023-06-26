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

Route::prefix('tradermanagement')->group(function() {
    Route::get('/', 'TraderManagementController@index');
    
});


Route::group(['middleware' => 'api', 'prefix' => 'tradermanagement'], function()
{
    Route::post('onAccountRegistration', 'TraderManagementController@onAccountRegistration');
    Route::post('onSaveTradersApplicationInformation', 'TraderManagementController@onSaveTradersApplicationInformation');
    Route::get('onLoadTradersApplicationInformation', 'TraderManagementController@onLoadTradersApplicationInformation');
    Route::get('onValidateAccountEmail', 'TraderManagementController@onValidateAccountEmail');
    Route::get('getTraderInformation', 'TraderManagementController@getTraderInformation');

    Route::get('gettraderUsersAccountsManagementDetails', 'TraderManagementController@gettraderUsersAccountsManagementDetails');
    Route::post('onAccountRegistration', 'TraderManagementController@onAccountRegistration');
    Route::post('onAccountUsersRegistration', 'TraderManagementController@onAccountUsersRegistration');

    Route::get('onValidateAdminAccess', 'TraderManagementController@onValidateAdminAccess');
   
    Route::post('onUpdateTraderAccountDetails', 'TraderManagementController@onUpdateTraderAccountDetails');
    
   
    
});