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

use Modules\Organisationconfig\Http\Controllers\OrganisationConfigController;

Route::group(['middleware' => ['auth:api', 'web'], 'prefix' => 'organisationconfig'], function()
{
    Route::get('/', [OrganisationConfigController::class, 'index']);
     Route::get('getOrgConfigParamFromModel', [OrganisationConfigController::class,'getOrgConfigParamFromModel']);
    Route::get('getDepartments', [OrganisationConfigController::class,'getDepartments']);
});