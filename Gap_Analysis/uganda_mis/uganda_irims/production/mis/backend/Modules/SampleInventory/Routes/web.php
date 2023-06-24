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

// Route::prefix('sampleinventory')->group(function() {
//     Route::get('/',  [SampleInventoryController::class,'index');
// });
use Modules\Sampleinventory\Http\Controllers\SampleInventoryController;

Route::group(['prefix' => 'sampleinventory','middleware' => ['auth:api', 'web']], function() {
    Route::get('/', [SampleInventoryController::class,'index']);
    Route::get('getReceivedSampleInventory',  [SampleInventoryController::class,'getReceivedSampleInventory']);
    Route::get('getSampledProductList',  [SampleInventoryController::class,'getSampledProductList']);
    Route::get('getIssuedSampleInventory',  [SampleInventoryController::class,'getIssuedSampleInventory']);
    Route::get('getInventoryDashboard',  [SampleInventoryController::class,'getInventoryDashboard']);
    Route::post('saveInventoryItemData',  [SampleInventoryController::class,'saveInventoryItemData']);
    Route::get('getConfigFormDetails',  [SampleInventoryController::class,'getConfigFormDetails']);
    Route::post('doSubmitInventoryIssueFormDetails',  [SampleInventoryController::class,'doSubmitInventoryIssueFormDetails']);
    Route::get('getStockOutflowInventory',  [SampleInventoryController::class,'getStockOutflowInventory']);
    Route::get('getStockInflowInventory',  [SampleInventoryController::class,'getStockInflowInventory']);
    Route::get('getrequestedItems',  [SampleInventoryController::class,'getrequestedItems']);
    Route::post('doSubmitRequestedInventoryIssueFormDetails',  [SampleInventoryController::class,'doSubmitRequestedInventoryIssueFormDetails']);
    Route::get('getDisposalApprovalRequests',  [SampleInventoryController::class,'getDisposalApprovalRequests']);
    Route::post('saveDisposalRequest',  [SampleInventoryController::class,'saveDisposalRequest']);
    Route::get('getDisposalItems',  [SampleInventoryController::class,'getDisposalItems']);
    Route::get('getNewDisposalRequests',  [SampleInventoryController::class,'getNewDisposalRequests']);
    Route::get('getDisposalApprovalRequestsItems',  [SampleInventoryController::class,'getDisposalApprovalRequestsItems']);
    Route::post('ApproveItemDisposalRequest',  [SampleInventoryController::class,'ApproveItemDisposalRequest']);
    Route::get('getDisposalApprovedRequests',  [SampleInventoryController::class,'getDisposalApprovedRequests']);
    Route::get('getDisposalRequestDetails',  [SampleInventoryController::class,'getDisposalRequestDetails']);
    Route::post('removeDisposalItemEntry',  [SampleInventoryController::class,'removeDisposalItemEntry']);
    


    //reports
    Route::get('getInventoryStockReportgrid',  [SampleInventoryController::class,'getInventoryStockReport']);
    Route::get('getInventoryStockReportchart',  [SampleInventoryController::class,'getInventoryStockReport']);

});
