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

// Route::prefix('promotionmaterials')->group(function() {
//     Route::get('/', 'PromotionMaterialsController@index');
// });
use Modules\Promotionmaterials\Http\Controllers\PromotionMaterialsController;

Route::group(['prefix' => 'promotionmaterials','middleware' => ['auth:api', 'web']], function() {
    Route::get('/', [PromotionMaterialsController::class,'index']);
    Route::post('/saveApplicantDetails',[PromotionMaterialsController::class,'saveApplicantDetails']);
    Route::get('/getPromotionMaterialsApplications',[PromotionMaterialsController::class,'getPromotionMaterialsApplications']);
    Route::get('/getPromotionMaterialsProductParticular',[PromotionMaterialsController::class,'getPromotionMaterialsProductParticular']);
    
    Route::get('/getOnlinePromotionMaterialsProductParticular',[PromotionMaterialsController::class,'getOnlinePromotionMaterialsProductParticular']);
    Route::get('/getOnlinePromotionMaterialsDetails',[PromotionMaterialsController::class,'getOnlinePromotionMaterialsDetails']);
    Route::get('/prepareOnlinePromotionalAppReceiving',[PromotionMaterialsController::class,'prepareOnlinePromotionalAppReceiving']);
    Route::get('/preparePromotionalAppDetailsReceiving',[PromotionMaterialsController::class,'preparePromotionalAppDetailsReceiving']);


    Route::post('/insertUpdateProductParticulars',[PromotionMaterialsController::class,'insertUpdateProductParticulars']);
    Route::post('/genericDeleteRecord',[PromotionMaterialsController::class,'genericDeleteRecord']);//
    //Route::post('/insertUpdateProductIngredStren',[PromotionMaterialsController::class,'insertUpdateProductIngredinetsStrength']);//
    
    
    
    Route::get('/getPromotionMaterialsDetails',[PromotionMaterialsController::class,'getPromotionMaterialsDetails']);
    
    Route::get('/preparePromotionAndAdvertPaymentStage',[PromotionMaterialsController::class,'preparePromotionAndAdvertPaymentStage']);
    Route::get('/getManagerApplicationsGeneric',[PromotionMaterialsController::class,'getManagerApplicationsGeneric']);
    Route::get('/prepareForPromotionAndAdvertsEvaluation',[PromotionMaterialsController::class,'prepareForPromotionAndAdvertsEvaluation']);
    
    Route::get('/getPromotionAndAdvertsApplicationsAtApproval',[PromotionMaterialsController::class,'getPromotionAndAdvertsApplicationsAtApproval']);
    Route::post('/insertUpdatePromoAdvertComments',[PromotionMaterialsController::class,'insertUpdatePromoAdvertComments']);//
    Route::get('/getSponsorsList',[PromotionMaterialsController::class,'getSponsorsList']);
    
    Route::post('/insertUpdateSponsorDetails',[PromotionMaterialsController::class,'insertUpdateSponsorDetails']);
    Route::get('/getProductIngredientStrengthDetails',[PromotionMaterialsController::class,'getProductIngredientStrengthDetails']);
    Route::post('/insertUpdateProductIngredinetsStrength',[PromotionMaterialsController::class,'insertUpdateProductIngredinetsStrength']);
    
    
    //online
    
   Route::get('/getPromoAdvertsOnlineApplications',[PromotionMaterialsController::class,'getPromoAdvertsOnlineApplications']);
   Route::get('/preparePromotionAdvertInvoicingStage',[PromotionMaterialsController::class,'preparePromotionAdvertInvoicingStage']);
     Route::get('/getRegisteredPromotionMaterialsApps',[PromotionMaterialsController::class,'getRegisteredPromotionMaterialsApps']);
   
     Route::get('/onRegisteredPromotionalSearchdetails',[PromotionMaterialsController::class,'onRegisteredPromotionalSearchdetails']);
     Route::post('/savePromotionalApplicationRenewalsDetails',[PromotionMaterialsController::class,'savePromotionalApplicationRenewalsDetails']);
  
});
