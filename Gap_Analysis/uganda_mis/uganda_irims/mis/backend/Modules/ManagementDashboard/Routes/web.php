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


use Modules\Managementdashboard\Http\Controllers\ManagementDashboardController;

Route::group(['middleware' => ['auth:api', 'web'], 'prefix' => 'managementdashboard'], function()
{
    Route::get('/', [ManagementDashboardController::class, 'index']);
    Route::get('getApplicationsCartesianDasboardReport', [ManagementDashboardController::class, 'getApplicationsCartesianDasboardReport']);
    Route::get('getApplicationsGridDasboardReport', [ManagementDashboardController::class, 'getApplicationsGridDasboardReport']);
    Route::get('ProductgetApplicationsDasboardReport', [ManagementDashboardController::class, 'ProductgetApplicationsDasboardReport']);
    Route::get('getSectionRevenueApplicationsDasboardReport', [ManagementDashboardController::class, 'getSectionRevenueApplicationsDasboardReport']);
    Route::get('getZonalRevenueApplicationsDasboardReport', [ManagementDashboardController::class, 'getZonalRevenueApplicationsDasboardReport']);
});
