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

// Route::prefix('registers')->group(function() {
//     Route::get('/', [RegistersController::class,'index']);
// });

use Modules\Registers\Http\Controllers\RegistersController;
Route::group(['middleware' => ['web'], 'prefix' => 'registers'], function(){
    Route::get('getProductRegister', [RegistersController::class,'getProductRegister']);
    Route::get('exportProductRegister', [RegistersController::class,'exportProductRegister']);
    Route::get('printProductGazzete', [RegistersController::class,'printProductGazzete']);
    Route::get('checkPrintProductGazzete', [RegistersController::class,'checkPrintProductGazzete']);

    //medicines routes
    Route::get('getMedicinesRegister', [RegistersController::class,'getMedicinesRegister']);
    Route::get('exportMedicinesRegister', [RegistersController::class,'exportMedicinesRegister']);
    Route::get('printMedicinesRegister', [RegistersController::class,'printMedicinesRegister']);

    //Premises routes
    Route::get('getPremiseRegister', [RegistersController::class,'getPremiseRegister']);
    Route::get('exportPremiseRegister', [RegistersController::class,'exportPremiseRegister']);
    Route::get('printPremisesRegister', [RegistersController::class,'printPremisesRegister']);
    Route::get('checkPrintPremisesRegister', [RegistersController::class,'checkPrintPremisesRegister']);

    

    //gmp facility
    Route::get('getGmpRegister', [RegistersController::class,'getGmpRegister']);
    Route::get('exportGmpRegister', [RegistersController::class,'exportGmpRegister']);
    Route::get('printGmpRegister', [RegistersController::class,'printGmpRegister']);
    Route::get('checkPrintGmpRegister', [RegistersController::class,'checkPrintGmpRegister']);


    

    //clinicaltrial 
    Route::get('getClinicalTrialRegister', [RegistersController::class,'getClinicalTrialRegister']);
    Route::get('printClinicalTrialRegister', [RegistersController::class,'printClinicalTrialRegister']);
    Route::get('exportClinicalTrialRegister', [RegistersController::class,'exportClinicalTrialRegister']);
     Route::get('checkPrintClinicalTrialRegister', [RegistersController::class,'checkPrintClinicalTrialRegister']);
    

    


    //Disposal
    Route::get('getDisposalRegister', [RegistersController::class,'getDisposalRegister']);
    Route::get('printDisposalRegister', [RegistersController::class,'printDisposalRegister']);
    Route::get('exportDisposalRegister', [RegistersController::class,'exportDisposalRegister']);
    Route::get('checkPrintDisposalRegister', [RegistersController::class,'checkPrintDisposalRegister']);

 
    //Promotion & Advertisement
    Route::get('getPromotionAdvertisementRegister', [RegistersController::class,'getPromotionAdvertisementRegister']);
    Route::get('printPromotionAdvertisementRegister', [RegistersController::class,'printPromotionAdvertisementRegister']);
    Route::get('exportPromotionAdvertisementRegister', [RegistersController::class,'exportPromotionAdvertisementRegister']);
    Route::get('checkPrintPromotionAdvertisementRegister', [RegistersController::class,'checkPrintPromotionAdvertisementRegister']);

     
    //Clinical Trial
    Route::get('getImportExportRegister', [RegistersController::class,'getImportExportRegister']);
    Route::get('printImportExportRegister', [RegistersController::class,'printImportExportRegister']);
    Route::get('exportImportExportRegister', [RegistersController::class,'exportImportExportRegister']);
    Route::get('checkPrintImportExportRegister', [RegistersController::class,'checkPrintImportExportRegister']);

    

   //common route
 Route::get('exportallRegisters', [RegistersController::class,'exportallRegisters']);
 Route::get('printControlledDrugsRegister', [RegistersController::class,'printControlledDrugsRegister']);
 Route::get('exportControlledDrugsRegister', [RegistersController::class,'exportControlledDrugsRegister']);
  Route::get('checkPrintControlledDrugsRegister', [RegistersController::class,'checkPrintControlledDrugsRegister']);
});


