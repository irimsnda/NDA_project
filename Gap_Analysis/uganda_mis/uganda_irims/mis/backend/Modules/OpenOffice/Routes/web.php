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

use Modules\Openoffice\Http\Controllers\OpenOfficeController;

Route::group(['middleware' => ['auth:api', 'web'], 'prefix' => 'openoffice'], function()
{
    Route::get('/', [OpenOfficeController::class, 'index']);
    Route::get('getProductsApplicationColumns',[OpenOfficeController::class, 'getProductsApplicationColumns']);
        Route::get('getPoeApplicationDetails',[OpenOfficeController::class, 'getPoeApplicationDetails']);
        Route::get('getProductIngredients',[OpenOfficeController::class, 'getProductIngredients']);
        Route::get('getProductNutrients',[OpenOfficeController::class, 'getProductNutrients']);
        Route::get('getProductPackaging',[OpenOfficeController::class, 'getProductPackaging']);
        Route::get('getproductimage',[OpenOfficeController::class, 'getproductimage']);
        Route::get('getManInfo',[OpenOfficeController::class, 'getManInfo']);
        Route::get('getInspectionInfo',[OpenOfficeController::class, 'getInspectionInfo']);
        Route::get('getSampleInfo',[OpenOfficeController::class, 'getSampleInfo']);
        //premise
        Route::get('getPremiseApplicationColumns',[OpenOfficeController::class, 'getPremiseApplicationColumns']);
        Route::get('getPremisebsnInfo',[OpenOfficeController::class, 'getPremisebsnInfo']); 
        Route::get('getPremisePersonnelInfo',[OpenOfficeController::class, 'getPremisePersonnelInfo']);
        //gmp
        Route::get('getGmpSpreadSheet',[OpenOfficeController::class, 'getGmpSpreadSheet']); 
        Route::get('getgmpmanblock',[OpenOfficeController::class, 'getgmpmanblock']); 
        Route::get('getGmpManLine',[OpenOfficeController::class, 'getGmpManLine']);
        Route::get('getGmpManSite',[OpenOfficeController::class, 'getGmpManSite']);
        Route::get('getGmpBsnDetails',[OpenOfficeController::class, 'getGmpBsnDetails']);
        //import export
        Route::get('getIESpreadSheet',[OpenOfficeController::class, 'getIESpreadSheet']);
        Route::get('getIEproducts',[OpenOfficeController::class, 'getIEproducts']);
        Route::get('getIESections',[OpenOfficeController::class, 'getIESections']);
        Route::get('getIEPermitSpreadSheet',[OpenOfficeController::class, 'getIEPermitSpreadSheet']);
        //Clinical trial
        Route::get('getClinicalTrialsSpreadsheet',[OpenOfficeController::class, 'getClinicalTrialsSpreadsheet']);
        Route::get('getClinicalTrialsStudySite',[OpenOfficeController::class, 'getClinicalTrialsStudySite']);
        Route::get('getClinicalTrialsInvestigators',[OpenOfficeController::class, 'getClinicalTrialsInvestigators']);
        Route::get('getClinicalTrialsIMPProducts',[OpenOfficeController::class, 'getClinicalTrialsIMPProducts']);
         //product notification
        Route::get('getDeviceNotificationSpreadsheet',[OpenOfficeController::class, 'getDeviceNotificationSpreadsheet']);
        //promtion and advertisement
        Route::get('getPromAdvertSpreadsheet',[OpenOfficeController::class, 'getPromAdvertSpreadsheet']);
        Route::get('getProductPaticulars',[OpenOfficeController::class, 'getProductPaticulars']); 
        Route::get('getPromotionMaterialDetails',[OpenOfficeController::class, 'getPromotionMaterialDetails']); 

        //disposal product
        Route::get('getDisposalSpreadsheetColumns',[OpenOfficeController::class, 'getDisposalSpreadsheetColumns']);
        Route::get('getdisposalproductdetails',[OpenOfficeController::class, 'getDisposalProductDetails']); 
       

        Route::get('getSubmissionEnquiriesCounter',[OpenOfficeController::class, 'getSubmissionEnquiriesCounters']); 
        Route::get('getSubmissionEnquiriesApplications',[OpenOfficeController::class, 'getSubmissionEnquiriesApplications']); 
        Route::get('getOnlineSubmissionStatuses',[OpenOfficeController::class, 'getOnlineSubmissionStatuses']); 
        
        Route::get('getUploadedDocumentPerApplication',[OpenOfficeController::class, 'getUploadedDocumentPerApplication']); 

        //survelliance
        Route::get('getSurvellianceSpreadsheetApplications',[OpenOfficeController::class, 'getSurvellianceSpreadsheetApplications']); 
        Route::get('getSurvellianceSampleandProductDetails',[OpenOfficeController::class, 'getSurvellianceSampleandProductDetails']); 
        Route::get('getSampleDetails',[OpenOfficeController::class, 'getSampleDetails']); 
        Route::get('getSurvellianceSampleSpreadsheetApplications',[OpenOfficeController::class, 'getSurvellianceSampleSpreadsheetApplications']); 

        Route::post('assignUsertoEnquiryApplication',[OpenOfficeController::class, 'assignUsertoEnquiryApplication']); 
        Route::get('getGMPInspectionTeam',[OpenOfficeController::class, 'getGMPInspectionTeam']); 
        Route::get('getProductManufacturers',[OpenOfficeController::class, 'getProductManufacturers']); 
        
        
        

        //excell export
        Route::post('exportall',[OpenOfficeController::class, 'exportall']);
        Route::get('exportall',[OpenOfficeController::class, 'exportData']);


        Route::get('getProductsReport',[OpenOfficeController::class, 'getProductsReport']);
        Route::get('getEnquiries',[OpenOfficeController::class, 'getEnquiries']);
        Route::get('test',[OpenOfficeController::class, 'test']);
        
        
});