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

// Route::prefix('systemadminprocess')->group(function() {
//     Route::get('/', 'SystemadminprocessController@index');
// });

use Modules\Systemadminprocess\Http\Controllers\SystemadminprocessController;

Route::group(['prefix' => 'systemadminprocess','middleware' => ['auth:api', 'web']], function() {
    Route::get('getChangemarketAuthorisationdetails', [SystemadminprocessController::class,'getChangemarketAuthorisationdetails']);
    Route::get('getMarketauthorisationProducts', [SystemadminprocessController::class,'getMarketauthorisationProducts']);
    Route::post('saveChangemarketAuthorisationdetails', [SystemadminprocessController::class,'saveChangemarketAuthorisationdetails']);
    Route::post('saveChangeLocalTechnicalRepresentative', [SystemadminprocessController::class,'saveChangeLocalTechnicalRepresentative']);
    Route::get('getChangeLocalTechnicalRepresentative', [SystemadminprocessController::class,'getChangeLocalTechnicalRepresentative']);
    Route::get('getApplicationOwnershipAmmendmentsdata', [SystemadminprocessController::class,'getApplicationOwnershipAmmendmentsdata']);
    Route::post('saveApplicationownershipammendmentsDetails', [SystemadminprocessController::class,'saveApplicationownershipammendmentsDetails']);
});
   