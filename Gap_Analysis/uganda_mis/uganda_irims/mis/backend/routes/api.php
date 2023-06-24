<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\commonController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::group(['middleware' => ['auth:api', 'web']], function () {
Route::group(['middleware' => ['auth:api']], function () {
    Route::post('saveApplicationChecklistDetails', [commonController::class, 'saveApplicationChecklistDetails']);

    Route::post('saveCommonData', [commonController::class, 'saveCommonData']);

    Route::post('deleteCommonRecord', [commonController::class, 'deleteCommonRecord']);

    Route::get('getApplicationInvoiceDetails', [commonController::class, 'getApplicationInvoiceDetails']);

    Route::get('getElementCosts', [commonController::class, 'getElementCosts']);

    Route::get('getApplicationPaymentDetails', [commonController::class, 'getApplicationPaymentDetails']);
     Route::get('getAllInspectionsCaparequests', [commonController::class, 'getAllInspectionsCaparequests']);

    Route::get('getOnlineApplicationRejections', [commonController::class, 'getOnlineApplicationRejections']);

    Route::get('getApplicationWithdrawalReasons', [commonController::class, 'getApplicationWithdrawalReasons']);

    Route::post('saveApplicationWithdrawalReasons', [commonController::class, 'saveApplicationWithdrawalReasons']);

    Route::get('getSystemNotifications', [commonController::class, 'getSystemNotifications']);

    Route::get('getApplicationVariationRequests', [commonController::class, 'getApplicationVariationRequests']);

    
    Route::get('getApplicationDataAmmendmentRequests', [commonController::class, 'getApplicationDataAmmendmentRequests']);

    
    Route::get('checkReviewREcommendationDEtails', [commonController::class, 'checkReviewREcommendationDEtails']);


    Route::get('checkApprovalREcommendationDEtails', [commonController::class, 'checkApprovalREcommendationDEtails']);

    Route::get('validateDocumentsSubmissonRecRecommendation', [commonController::class, 'validateDocumentsSubmissonRecRecommendation']);

    Route::get('checkPrecheckingrecommendation', [commonController::class, 'checkPrecheckingrecommendation']);


    
    
    Route::get('checkApplicationRaisedQueries', [commonController::class, 'checkApplicationRaisedQueries']);

    Route::get('getAllApplicationQueries', [commonController::class, 'getAllApplicationQueries']);

    Route::post('saveApplicationDismissalDetails', [commonController::class, 'saveApplicationDismissalDetails']);

    Route::get('getApplicationChecklistQueries', [commonController::class, 'getApplicationChecklistQueries']);

    Route::get('checkApplicationUnstructuredQueries', [commonController::class, 'checkApplicationUnstructuredQueries']);

    Route::post('closeApplicationQuery', [commonController::class, 'closeApplicationQuery']);

    Route::post('saveApplicationReQueryDetails', [commonController::class, 'saveApplicationReQueryDetails']);

    Route::get('checkApplicationRespondedUnclosedQueries', [commonController::class, 'checkApplicationRespondedUnclosedQueries']);

    Route::get('checkSampleSubmisisonDetails', [commonController::class, 'checkSampleSubmisisonDetails']);

    Route::get('checkOnlineApplicationChecklistDetails', [commonController::class, 'checkOnlineApplicationChecklistDetails']);

    Route::get('checkGeneratedInvoiceDetails', [commonController::class, 'checkGeneratedInvoiceDetails']);


    Route::get('checkApplicationChecklistUploadDetails', [commonController::class, 'checkApplicationChecklistUploadDetails']);

    Route::post('appDataAmmendmentStatusUpdate', [commonController::class, 'appDataAmmendmentStatusUpdate']);

    Route::get('getApplicationDetailsAlterationSetup', [commonController::class, 'getApplicationDetailsAlterationSetup']);

    Route::get('getApplicationDataAppealRequests', [commonController::class, 'getApplicationDataAppealRequests']);

    Route::post('saveApplicatioAppealReasons', [commonController::class, 'saveApplicatioAppealReasons']);

    Route::post('saveChecklistApplicationQuery', [commonController::class, 'saveChecklistApplicationQuery']);

    Route::get('checkApplicationEvaluationOverralRecom', [commonController::class, 'checkApplicationEvaluationOverralRecom']);

    Route::get('getUploadedApplicationPaymentDetails', [commonController::class, 'getUploadedApplicationPaymentDetails']);

    Route::post('deleteChecklistRaisedQuery', [commonController::class, 'deleteChecklistRaisedQuery']);

    
    Route::get('checkIfHasGeneratedInvoiceDEtails', [commonController::class, 'checkIfHasGeneratedInvoiceDEtails']);

    
    Route::get('validateHasUploadedDocumentsDetils', [commonController::class, 'validateHasUploadedDocumentsDetils']);

    
    Route::get('validateHasImportExportProductDetils', [commonController::class, 'validateHasImportExportProductDetils']);

    Route::get('checkSampleAnalysisReviewRecommendationDEtails', [commonController::class, 'checkSampleAnalysisReviewRecommendationDEtails']);

      Route::get('checkUserAccountActivities', [commonController::class, 'checkUserAccountActivities']);

    Route::get('getUploadedApplicationPaymentDetails', [commonController::class, 'getUploadedApplicationPaymentDetails']);

    Route::get('validateproductInformationdetails', [commonController::class, 'validateproductInformationdetails']);

    
    Route::get('checkApplicationChecklistDetails', [commonController::class, 'checkApplicationChecklistDetails']);

   
 });  

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();

});
