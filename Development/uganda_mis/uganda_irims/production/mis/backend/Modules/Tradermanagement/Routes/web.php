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
    Route::get('/', 'TradermanagementController@index');
});
use Modules\Tradermanagement\Http\Controllers\TradermanagementController;
use Modules\Tradermanagement\Http\Controllers\TradermanagementReportsController;

Route::group(['middleware' => 'web', 'prefix' => 'tradermanagement'], function () {
    Route::get('/', [TradermanagementController::class,'index']);
    Route::post('saveTraderInformation', [TradermanagementController::class,'saveTraderInformation']);
    Route::post('updateAccountApprovalStatus', [TradermanagementController::class,'updateAccountApprovalStatus']);
    Route::post('saveTraderAccountUsers', [TradermanagementController::class,'saveTraderAccountUsers']);
    
    Route::post('saveAuthorisedtradersdetails', [TradermanagementController::class,'saveAuthorisedtradersdetails']);

    Route::post('getDownloadTinCertificateUrl', [TradermanagementController::class,'getDownloadTinCertificateUrl']);
   

    Route::get('gettraderAccountsManagementDetails', [TradermanagementController::class,'gettraderAccountsManagementDetails']);
    Route::get('getTraderStatusesCounter', [TradermanagementController::class,'getTraderStatusesCounter']);

    Route::get('printtraderAccountsManagementDetails', [TradermanagementReportsController::class,'printtraderAccountsManagementDetails']);


    Route::get('gettraderUsersAccountsManagementDetails', [TradermanagementController::class,'gettraderUsersAccountsManagementDetails']);
    Route::get('getAuthorisedTradersDetailsinformation', [TradermanagementController::class,'getAuthorisedTradersDetailsinformation']);
    Route::get('getTradersProductsDetailsinformation', [TradermanagementController::class,'getTradersProductsDetailsinformation']);
    Route::post('saveTraderProductAuthorisation', [TradermanagementController::class,'saveTraderProductAuthorisation']);
    Route::post('updateTraderProductAuthorisation', [TradermanagementController::class,'updateTraderProductAuthorisation']);
   
    Route::get('getApplicantsList', [TradermanagementController::class,'getApplicantsList']);

    Route::get('gettraderSyncApplicationsDetails', [TradermanagementController::class,'gettraderSyncApplicationsDetails']);
    Route::get('gettraderSyncApplicationsRequestCounters', [TradermanagementController::class,'gettraderSyncApplicationsRequestCounters']);
    
//email notifications
    Route::post('SendTraderNotificationEmail', [TradermanagementController::class,'SendTraderNotificationEmail']);
    Route::get('GetTraderEmailNotifications', [TradermanagementController::class,'GetTraderEmailNotifications']);
    Route::post('DeleteTraderNotificationMail', [TradermanagementController::class,'DeleteTraderNotificationMail']);
    

    

    //for migration
    Route::post('mergeTraderSyncApplications', [TradermanagementController::class,'mergeTraderSyncApplications']);
    Route::get('getTraderRegisteredProductsDetails', [TradermanagementController::class,'getTraderRegisteredProductsDetails']);
    Route::get('getTraderRegisteredPremisesDetails', [TradermanagementController::class,'getTraderRegisteredPremisesDetails']);
    Route::get('getTraderApprovedGmpDetails', [TradermanagementController::class,'getTraderApprovedGmpDetails']);

    Route::post('mergeTraderSelectedSyncApplications', [TradermanagementController::class,'mergeTraderSelectedSyncApplications']);

    Route::get('getTraderAuthorisedProducts', [TradermanagementController::class,'getTraderAuthorisedProducts']);
});