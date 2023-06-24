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

use Modules\Administration\Http\Controllers\AdministrationController;

Route::group(['prefix' => 'administration','middleware' => ['web']], function() {
    Route::get('getSystemNavigationMenuItems',[AdministrationController::class,'getSystemNavigationMenuItems']);
    Route::get('getSystemMenus',[AdministrationController::class,'getSystemMenus']);
    Route::get('getParentMenus',[AdministrationController::class,'getParentMenus']);

    Route::get('getChildMenus', [administrationController::class, 'getChildMenus']);
    Route::post('saveMenuItem', [administrationController::class, 'saveMenuItem']);
    Route::post('deleteAdminRecord', [administrationController::class, 'deleteAdminRecord']);
    Route::post('softDeleteAdminRecord', [administrationController::class, 'softDeleteAdminRecord']);
    Route::post('undoAdminSoftDeletes', [administrationController::class, 'undoAdminSoftDeletes']);
    //Route::get('deleteAdminMenu', [administrationController::class, 'getAdminParamFromModel']);
    Route::post('saveAdminCommonData', [administrationController::class, 'saveAdminCommonData']);
    Route::get('getSystemRoles', [administrationController::class, 'getSystemRoles']);
    Route::post('updateSystemNavigationAccessRoles', [administrationController::class, 'updateSystemNavigationAccessRoles']);
    Route::post('updateSystemPermissionAccessRoles', [administrationController::class, 'updateSystemPermissionAccessRoles']);
    Route::get('getNonMenuItems',[administrationController::class, 'getNonMenuItems']);
    Route::get('getNonMenuItemsSystemRoles',[administrationController::class, 'getNonMenuItemsSystemRoles']);
    Route::get('getMenuProcessesRoles',[administrationController::class, 'getMenuProcessesRoles']);
    Route::post('removeSelectedUsersFromGroup',[administrationController::class, 'removeSelectedUsersFromGroup']);
    Route::post('addSelectedUsersFromGroup',[administrationController::class, 'addSelectedUsersFromGroup']);
    Route::get('getSystemUserGroups',[administrationController::class, 'getSystemUserGroups']);
    Route::get('getFormFields',[administrationController::class, 'getFormFields']);
    Route::post('testApi',[administrationController::class, 'test']);
    Route::post('saveExternalUsersDetails',[administrationController::class, 'saveExternalUsersDetails']);

    
    Route::post('mapGroupToStage',[administrationController::class, 'mapGroupToStage']);
    Route::get('getApplicationAssignmentProcessList',[administrationController::class, 'getApplicationAssignmentProcessList']);
    Route::post('mapApplicationAssignmentSetup',[administrationController::class, 'mapApplicationAssignmentSetup']);
    Route::get('getTablescolumns',[administrationController::class, 'getTablescolumns']);
    Route::post('saveParameterConfig',[administrationController::class, 'saveParameterConfig']);
    Route::get('getParameterConfig',[administrationController::class, 'getParameterConfig']);
    Route::get('checkParamMenuDefination',[administrationController::class, 'checkParamMenuDefination']);
    Route::get('getParameterGridColumnsConfig',[administrationController::class, 'getParameterGridColumnsConfig']);
    Route::get('getParameterFormColumnsConfig',[administrationController::class, 'getParameterFormColumnsConfig']);
    Route::get('getAdminParamFromModel',[administrationController::class, 'getAdminParamFromModel']);
    Route::get('getParameterGridConfig',[administrationController::class, 'getParameterGridConfig']);
    Route::get('index',[administrationController::class, 'index']);
        
});
