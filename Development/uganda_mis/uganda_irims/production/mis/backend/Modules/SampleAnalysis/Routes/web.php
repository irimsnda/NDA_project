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

// Route::prefix('sampleanalysis')->group(function() {
//     Route::get('/', 'SampleAnalysisController@index');
// });
use Modules\Sampleanalysis\Http\Controllers\SampleAnalysisController;
use Modules\Sampleanalysis\Http\Controllers\SampleAnalysisRptController;

Route::group(['prefix' => 'sampleanalysis','middleware' => ['auth:api', 'web']], function() {
    Route::get('/', [SampleAnalysisController::class,'index']);
    Route::get('printSampleTestRequestReview', [SampleAnalysisRptController::class, 'printSampleTestRequestReview']);
    Route::get('getsampleanalysistestrequests',  [SampleAnalysisController::class,'getsampleanalysistestrequests']);
    Route::get('getSampleAnalyisParameter',  [SampleAnalysisController::class,'getSampleAnalyisParameter']);
    Route::get('getsampleanalysistestParameters',  [SampleAnalysisController::class,'getsampleanalysistestParameters']);
    Route::get('getTestParametersDetails',  [SampleAnalysisController::class,'getTestParametersDetails']);
    Route::get('getCostSubCategoryParameter',  [SampleAnalysisController::class,'getCostSubCategoryParameter']);
    Route::get('getSampleanalysistestrequestsprocesses',  [SampleAnalysisController::class,'getSampleanalysistestrequestsprocesses']);
    Route::get('getsampleanalysistestAnalysisResults',  [SampleAnalysisController::class,'getsampleanalysistestAnalysisResults']);
    Route::post('saveSampleAnalysisRequestdetails',  [SampleAnalysisController::class,'saveSampleAnalysisRequestdetails']);
    Route::post('funcAddSampleTestParameters',  [SampleAnalysisController::class,'funcAddSampleTestParameters']);
    Route::post('onDeleteLabSampleOtherDetails',  [SampleAnalysisController::class,'onDeleteLabSampleOtherDetails']);
    Route::post('funcSampleApplicationSubmissionWin',  [SampleAnalysisController::class,'funcSampleApplicationSubmissionWin']);
    Route::get('getLimsSampleIngredients',  [SampleAnalysisController::class,'getLimsSampleIngredients']);
    Route::get('prepareLabServicesSamplePaymentPanel',  [SampleAnalysisController::class,'prepareLabServicesSamplePaymentPanel']);
    Route::get('submitRegistrationToNextStage',  [SampleAnalysisController::class,'submitRegistrationToNextStage']);
});