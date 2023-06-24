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
use Modules\GmpApplications\Http\Controllers\GmpApplicationsController;
Route::group(['prefix' => 'gmpapplications','middleware' => ['auth:api', 'web']], function() {
    Route::get('/', [GmpApplicationsController::class, 'index']);
    Route::get('getGmpApplicationParamFromModel', [GmpApplicationsController::class, 'getGmpApplicationParamFromModel']);
    Route::post('saveGmpApplicationCommonData', [GmpApplicationsController::class, 'saveGmpApplicationCommonData']);
    Route::post('deleteGmpApplicationRecord', [GmpApplicationsController::class, 'deleteGmpApplicationRecord']);
    Route::get('getGmpApplications', [GmpApplicationsController::class, 'getGmpApplications']);
    Route::get('getManagerApplicationsGeneric', [GmpApplicationsController::class, 'getManagerApplicationsGeneric']);
    Route::get('getManagerInspectionApplications', [GmpApplicationsController::class, 'getManagerInspectionApplications']);
    Route::get('getGmpInspectionSchedulingApplications', [GmpApplicationsController::class, 'getGmpInspectionSchedulingApplications']);
    Route::get('getTCMeetingSchedulingApplications', [GmpApplicationsController::class, 'getTCMeetingSchedulingApplications']);
    Route::get('getTCMeetingSchedulingReviewApplications', [GmpApplicationsController::class, 'getTCMeetingSchedulingReviewApplications']);
    Route::get('/onLoadManufacturingSitesDetails', [GmpApplicationsController::class, 'onLoadManufacturingSitesDetails']);

    Route::get('getGmpApplicationsAtApproval', [GmpApplicationsController::class, 'getGmpApplicationsAtApproval']);
    Route::post('saveNewGmpReceivingBaseDetails', [GmpApplicationsController::class, 'saveNewGmpReceivingBaseDetails']);
    Route::post('saveRenewalGmpReceivingBaseDetails', [GmpApplicationsController::class, 'saveRenewalGmpReceivingBaseDetails']);
    //start prepare
    Route::get('prepareNewGmpReceivingStage', [GmpApplicationsController::class, 'prepareNewGmpReceivingStage']);
    Route::get('prepareNewGmpInvoicingStage', [GmpApplicationsController::class, 'prepareNewGmpInvoicingStage']);
    Route::get('prepareNewGmpPaymentStage', [GmpApplicationsController::class, 'prepareNewGmpPaymentStage']);
    Route::get('prepareNewGmpChecklistsStage', [GmpApplicationsController::class, 'prepareNewGmpChecklistsStage']);
    Route::get('prepareNewGmpSmfUploadsStage', [GmpApplicationsController::class, 'prepareNewGmpSmfUploadsStage']);
    Route::get('prepareNewGmpManagerInspectionStage', [GmpApplicationsController::class, 'prepareNewGmpManagerInspectionStage']);
    //end prepare
    Route::get('getSitePersonnelDetails', [GmpApplicationsController::class, 'getSitePersonnelDetails']);
    Route::get('getSiteOtherDetails', [GmpApplicationsController::class, 'getSiteOtherDetails']);
    Route::get('getSiteBlockDetails', [GmpApplicationsController::class, 'getSiteBlockDetails']);
    Route::post('saveSiteOtherDetails', [GmpApplicationsController::class, 'saveSiteOtherDetails']);
    Route::get('getGmpCommonParams', [GmpApplicationsController::class, 'getGmpCommonParams']);
    Route::post('saveGmpInspectionLineDetails', [GmpApplicationsController::class, 'saveGmpInspectionLineDetails']);
    Route::get('getGmpInspectionLineDetails', [GmpApplicationsController::class, 'getGmpInspectionLineDetails']);
    Route::post('saveApplicationApprovalDetails', [GmpApplicationsController::class, 'saveApplicationApprovalDetails']);
    Route::get('getGmpApplicationMoreDetails', [GmpApplicationsController::class, 'getGmpApplicationMoreDetails']);
    Route::get('getManufacturingSitesList', [GmpApplicationsController::class, 'getManufacturingSitesList']);
    Route::get('getManSitesList', [GmpApplicationsController::class, 'getManSitesList']);
    Route::get('getOnlineApplications', [GmpApplicationsController::class, 'getOnlineApplications']);
    Route::get('prepareNewGmpOnlineReceivingStage', [GmpApplicationsController::class, 'prepareNewGmpOnlineReceivingStage']);
    Route::get('getOnlineAppGmpPersonnelDetails', [GmpApplicationsController::class, 'getOnlineAppGmpPersonnelDetails']);
    Route::get('getOnlineAppGmpOtherDetails', [GmpApplicationsController::class, 'getOnlineAppGmpOtherDetails']);
    Route::get('getOnlineProductLineDetails', [GmpApplicationsController::class, 'getOnlineProductLineDetails']);
    Route::get('getGmpScheduleTeamDetails', [GmpApplicationsController::class, 'getGmpScheduleTeamDetails']);
    Route::post('saveGmpScheduleInspectionTypes', [GmpApplicationsController::class, 'saveGmpScheduleInspectionTypes']);
    Route::get('getGmpScheduleInspectionTypes', [GmpApplicationsController::class, 'getGmpScheduleInspectionTypes']);
    Route::post('saveGmpScheduleInspectors', [GmpApplicationsController::class, 'saveGmpScheduleInspectors']);
    Route::get('getGmpScheduleInspectors', [GmpApplicationsController::class, 'getGmpScheduleInspectors']);
    Route::get('getAssignedGmpInspections', [GmpApplicationsController::class, 'getAssignedGmpInspections']);
    Route::get('getGmpApplicationsForInspection', [GmpApplicationsController::class, 'getGmpApplicationsForInspection']);
    Route::post('addGmpApplicationsIntoInspectionSchedule', [GmpApplicationsController::class, 'addGmpApplicationsIntoInspectionSchedule']);
    Route::post('addGmpApplicationIntoInspectionSchedule', [GmpApplicationsController::class, 'addGmpApplicationIntoInspectionSchedule']);
    Route::post('saveGmpProductInfoLinkage', [GmpApplicationsController::class, 'saveGmpProductInfoLinkage']);
    Route::post('updateGmpProductInfoLinkage', [GmpApplicationsController::class, 'updateGmpProductInfoLinkage']);
    Route::get('getGmpProductInfoLinkage', [GmpApplicationsController::class, 'getGmpProductInfoLinkage']);
    Route::get('getGmpProductInfoLinkageOnline', [GmpApplicationsController::class, 'getGmpProductInfoLinkageOnline']);
    Route::post('saveManSitePersonnelLinkageDetails', [GmpApplicationsController::class, 'saveManSitePersonnelLinkageDetails']);
    Route::post('updateGmpApplicationsInspectionType', [GmpApplicationsController::class, 'updateGmpApplicationsInspectionType']);
    Route::get('getNonComplianceObservations', [GmpApplicationsController::class, 'getNonComplianceObservations']);
    Route::post('saveGmpDeskReviewScheduleDetails', [GmpApplicationsController::class, 'saveGmpDeskReviewScheduleDetails']);
    Route::get('getPreviousProductLineDetails', [GmpApplicationsController::class, 'getGmpWithdrawalApplicationsAtApproval']);
    Route::get('getGmpWithdrawalApplicationsAtApproval', [GmpApplicationsController::class, 'getGmpWithdrawalApplicationsAtApproval']);
    Route::get('getGmpCompareDetails', [GmpApplicationsController::class, 'getGmpCompareDetails']);
    Route::get('getDismissedGmpApplications', [GmpApplicationsController::class, 'getDismissedGmpApplications']);
    Route::get('getGmpApprovedApplications', [GmpApplicationsController::class, 'getGmpApprovedApplications']);
    Route::get('getAllGmpApplications', [GmpApplicationsController::class, 'getAllGmpApplications']);
    Route::post('saveGmpEditAppBaseDetails', [GmpApplicationsController::class, 'saveGmpEditAppBaseDetails']);
    Route::get('getGmpBusinessTypes', [GmpApplicationsController::class, 'getGmpBusinessTypes']);
    Route::get('getGmpApprovedApplicationsRegister', [GmpApplicationsController::class, 'getGmpApprovedApplicationsRegister']);
});

