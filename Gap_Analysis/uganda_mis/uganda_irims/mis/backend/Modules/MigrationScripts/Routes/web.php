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

use Modules\Migrationscripts\Http\Controllers\MigrationScriptsController;

Route::group(['middleware' => ['auth:api', 'web'], 'prefix' => 'migrationscripts'], function()
{
    Route::get('/', [MigrationScriptsController::class, 'index']);
    Route::get('initiatVetemigrateNewProductsDetails', [MigrationScriptsController::class, 'initiatVetemigrateNewProductsDetails']);
    Route::get('initiatNewMedicinesProductsemigrateDetails', [MigrationScriptsController::class, 'initiatNewMedicinesProductsemigrateDetails']);
    Route::get('testemail', [MigrationScriptsController::class, 'testemail']);
    Route::get('initiatemappingProductRegistrationSubmission', [MigrationScriptsController::class, 'initiatemappingProductRegistrationSubmission']);
    Route::get('initiatNewCosmeticsProductsemigrateDetails', [MigrationScriptsController::class, 'initiatNewCosmeticsProductsemigrateDetails']);
    Route::get('initiatemigrateClinicalTrialDatasets', [MigrationScriptsController::class, 'initiatemigrateClinicalTrialDatasets']);
    Route::get('initiatemappingClincialTrialRegistrationSubmission', [MigrationScriptsController::class, 'initiatemappingClincialTrialRegistrationSubmission']);
});