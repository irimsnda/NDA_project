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
use Modules\UserManagement\Http\Controllers\UserManagementController;
Route::group(['prefix' => 'usermanagement','middleware' => ['web']], function() {
    Route::post('saveUserInformation', [UserManagementController::class, 'saveUserInformation']);
    Route::post('saveUpdateUserInformation', [UserManagementController::class, 'saveUpdateUserInformation']);
     Route::post('saveUserImage', [UserManagementController::class, 'saveUserImage']);
});

Route::group(['middleware' => ['web'], 'prefix' => 'usermanagement'], function(){
    Route::get('/', [UserManagementController::class, 'index']);
    Route::get('getActiveSystemUsers', [UserManagementController::class, 'getActiveSystemUsers']);
    Route::get('getUserParamFromModel', [UserManagementController::class, 'getUserParamFromModel']);
    Route::post('saveUserCommonData', [UserManagementController::class, 'saveUserCommonData']);
    Route::post('deleteUserRecord', [UserManagementController::class, 'deleteUserRecord']);
    Route::post('softDeleteUserRecord', [UserManagementController::class, 'softDeleteUserRecord']);
    Route::post('undoUserSoftDeletes', [UserManagementController::class, 'undoUserSoftDeletes']);
    Route::get('getOpenUserRoles', [UserManagementController::class, 'getOpenUserRoles']);
    Route::get('getAssignedUserRoles', [UserManagementController::class, 'getAssignedUserRoles']);
    Route::get('getOpenUserGroups', [UserManagementController::class, 'getOpenUserGroups']);
    Route::get('getAssignedUserGroups', [UserManagementController::class, 'getAssignedUserGroups']);
    Route::post('resetUserPassword', [UserManagementController::class, 'resetUserPassword']);
    Route::post('updateUserPassword', [UserManagementController::class, 'updateUserPassword']);
    Route::post('blockSystemUser', [UserManagementController::class, 'blockSystemUser']);
    Route::get('getBlockedSystemUsers', [UserManagementController::class, 'getBlockedSystemUsers']);
    Route::post('unblockSystemUser', [UserManagementController::class, 'unblockSystemUser']);
    Route::get('getUnBlockedSystemUsers', [UserManagementController::class, 'getUnBlockedSystemUsers']);
    Route::get('getUserSignatures', [UserManagementController::class, 'getUserSignatures']);
    Route::post('uploadUserSignature', [UserManagementController::class, 'uploadUserSignature']);
//     //api users
    Route::get('getApiSystemUsers', [UserManagementController::class, 'getApiSystemUsers']);
    Route::post('saveApiUserInformation', [UserManagementController::class, 'saveApiUserInformation']);
     Route::get('activateSystemApiUser', [UserManagementController::class, 'activateSystemApiUser']);
    Route::post('blockSystemApiUser', [UserManagementController::class, 'blockSystemApiUser']);

//     //external Users
    Route::get('getExternalSystemUsers', [UserManagementController::class, 'getExternalSystemUsers']);
    Route::post('saveExternalUserInformation', [UserManagementController::class, 'saveExternalUserInformation']);
    Route::get('activateSystemExternalUser', [UserManagementController::class, 'activateSystemExternalUser']);
    Route::post('blockSystemExternalUser', [UserManagementController::class, 'blockSystemExternalUser']);

    Route::post('saveExternalUsersDetails', [UserManagementController::class, 'saveExternalUsersDetails']);
    Route::get('getResubmissionApplications', [UserManagementController::class, 'getResubmissionApplications']);

    Route::get('getUserList', [UserManagementController::class, 'getUserList']);
    Route::get('getUpdateInfo', [UserManagementController::class, 'getUpdateInfo']);
     Route::get('applicationResubmissionVisibleRequest', [UserManagementController::class, 'applicationResubmissionVisibleRequest']);

     Route::get('applicationResubmissionHideRequest', [UserManagementController::class, 'applicationResubmissionHideRequest']);
    Route::get('getTaskReassignmentApplications', [UserManagementController::class, 'getTaskReassignmentApplications']);
    Route::post('doReassignApplicationTask', [UserManagementController::class, 'doReassignApplicationTask']);
// //online resubmision
    Route::get('getOnlineResubmissionApplications', [UserManagementController::class, 'getOnlineResubmissionApplications']);
//     Route::get('onlineResubmissionRequest', [UserManagementController::class, 'onlineResubmissionRequest']);

    Route::get('getActingUsersPositionDetails', [UserManagementController::class, 'getActingUsersPositionDetails']);

// //integration users
//     Route::get('getRegionalIntegrationUsers', [UserManagementController::class, 'getRegionalIntegrationUsers']);
//     Route::post('saveRegionalIntegrationUsers', [UserManagementController::class, 'saveRegionalIntegrationUsers']);
    Route::get('getPortalAppSubmissions', [UserManagementController::class, 'getPortalAppSubmissions']);
//     Route::get('showHideonlineResubmissionRequest', [UserManagementController::class, 'showHideonlineResubmissionRequest']);
    Route::get('getUserPasswordResetLogs', [UserManagementController::class, 'getUserPasswordResetLogs']);
//     Route::get('getUserDetailsUpdateLogs', [UserManagementController::class, 'getUserDetailsUpdateLogs']);
    Route::post('changeUserPassword', [UserManagementController::class, 'changeUserPassword']);
    Route::get('getUserGroupsdetails', [UserManagementController::class, 'getUserGroupsdetails']);
    Route::post('assignUsertoEnquiryApplication', [UserManagementController::class, 'assignUsertoEnquiryApplication']);

});
