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

use Modules\ControlDocumentsMng\Http\Controllers\ControlDocumentsMngController;

Route::group(['prefix' => 'controldocumentsmng','middleware' => ['auth:api', 'web']], function() {
    Route::get('/', [ControlDocumentsMngController::class, 'index']);
    Route::post('/saveNewControlDocumentDetails', [ControlDocumentsMngController::class, 'saveNewControlDocumentDetails']);
    Route::post('/saveReviewedControlDocumentDetails', [ControlDocumentsMngController::class, 'saveReviewedControlDocumentDetails']);
    Route::post('/saveControlDocumentsAccessDetails', [ControlDocumentsMngController::class, 'saveControlDocumentsAccessDetails']);
    Route::post('/saveApprovalControlDocumentDetails', [ControlDocumentsMngController::class, 'saveApprovalControlDocumentDetails']);
    Route::post('/addSelectedUserstoUnit', [ControlDocumentsMngController::class, 'addSelectedUserstoUnit']);
    Route::post('/removeSelectedUsersFromUnits', [ControlDocumentsMngController::class, 'removeSelectedUsersFromUnits']);
    Route::get('/getControlDocumentApplications', [ControlDocumentsMngController::class, 'getControlDocumentApplications']);
    Route::get('/prepareNewControlDocumentRequest', [ControlDocumentsMngController::class, 'prepareNewControlDocumentRequest']);
    Route::get('/validateDocumentUploadExists', [ControlDocumentsMngController::class, 'validateDocumentUploadExists']);
    Route::get('/getControlDocumentsAccessDetails', [ControlDocumentsMngController::class, 'getControlDocumentsAccessDetails']);
    Route::get('/getControlDocumentsreglist', [ControlDocumentsMngController::class, 'getControlDocumentsreglist']);
    Route::get('/getApprovedControlDocumentRelease', [ControlDocumentsMngController::class, 'getApprovedControlDocumentRelease']);
    Route::get('/getPreviousControlDocumentVersions', [ControlDocumentsMngController::class, 'getPreviousControlDocumentVersions']);
    Route::get('/getDocDirectiveBasedUsersList', [ControlDocumentsMngController::class, 'getDocDirectiveBasedUsersList']);
    Route::get('/getDocumentDistributionUsersList', [ControlDocumentsMngController::class, 'getDocumentDistributionUsersList']);
    Route::get('/revokeDistributionUserList', [ControlDocumentsMngController::class, 'revokeDistributionUserList']);
    Route::get('/getAccessControlDetails', [ControlDocumentsMngController::class, 'getAccessControlDetails']);

    Route::post('/saveDocumentDistributionUserList', [ControlDocumentsMngController::class, 'saveDocumentDistributionUserList']);
});