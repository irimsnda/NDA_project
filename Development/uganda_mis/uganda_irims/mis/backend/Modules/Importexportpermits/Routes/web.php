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

use Modules\Importexportpermits\Http\Controllers\ImportexportpermitsController;

Route::group(['middleware' => ['auth:api', 'web'], 'prefix' => 'importexportpermits'], function()
{
    Route::get('getonlineimportexportappdetails', [ImportexportpermitsController::class, 'getonlineimportexportappdetails']);
    Route::get('prepareOnlineImportExporPermitReceivingStage', [ImportexportpermitsController::class, 'prepareOnlineImportExporPermitReceivingStage']);
    Route::get('prepareImportExporPermitReceivingStage', [ImportexportpermitsController::class, 'prepareImportExporPermitReceivingStage']);
    Route::get('getManagerEvaluationApplications', [ImportexportpermitsController::class, 'getManagerEvaluationApplications']);
    Route::get('getDisposalManagerEvaluationApplications', [ImportexportpermitsController::class, 'getDisposalManagerEvaluationApplications']);
    Route::get('prepareReceivingpoeinspectionswizard', [ImportexportpermitsController::class, 'prepareReceivingpoeinspectionswizard']);
    Route::get('getOnlineControlDrugsImpermitsproductsDetails', [ImportexportpermitsController::class, 'getOnlineControlDrugsImpermitsproductsDetails']);
    Route::get('getOnlineImportexportpermitsproductsDetails', [ImportexportpermitsController::class, 'getOnlineImportexportpermitsproductsDetails']);
    Route::get('getControlledImpproductsDetails', [ImportexportpermitsController::class, 'getControlledImpproductsDetails']);
    Route::get('getCompletedimportExportpermitsApps', [ImportexportpermitsController::class, 'getCompletedimportExportpermitsApps']);
    Route::get('getImportexportpermitsapps', [ImportexportpermitsController::class, 'getImportexportpermitsapps']);
    Route::get('getDeclaredImportExportPermitsApps', [ImportexportpermitsController::class, 'getDeclaredImportExportPermitsApps']);
    Route::get('getImportExportPermitDeclarations', [ImportexportpermitsController::class, 'getImportExportPermitDeclarations']);
    Route::get('getPreviousImportExportDocuploads', [ImportexportpermitsController::class, 'getPreviousImportExportDocuploads']);
    Route::get('getPreviousPreviousScreeningData', [ImportexportpermitsController::class, 'getPreviousPreviousScreeningData']);
    Route::get('getImportexportpermitsproductsDetails', [ImportexportpermitsController::class, 'getImportexportpermitsproductsDetails']);
    Route::get('getRegisteredNonRegisteredProddetails', [ImportexportpermitsController::class, 'getRegisteredNonRegisteredProddetails']);
    Route::get('getSenderreceiverinformation', [ImportexportpermitsController::class, 'getSenderreceiverinformation']);
    Route::get('getTraderRegisteredPremisesDetails', [ImportexportpermitsController::class, 'getTraderRegisteredPremisesDetails']);
    Route::get('prepapareImportpermitUniformStage', [ImportexportpermitsController::class, 'prepapareImportpermitUniformStage']);
    Route::get('prepareImportInvoicingStage', [ImportexportpermitsController::class, 'prepareImportInvoicingStage']);
    Route::get('getImportsInvoicingOtherDetails', [ImportexportpermitsController::class, 'getImportsInvoicingOtherDetails']);
    Route::get('prepareNewImportExportPaymentStage', [ImportexportpermitsController::class, 'prepareNewImportExportPaymentStage']);
    Route::get('getImportExportApprovedPermit', [ImportexportpermitsController::class, 'getImportExportApprovedPermit']);
    Route::post('saveDisposalApplicationDetails', [ImportexportpermitsController::class, 'saveDisposalApplicationDetails']);
    Route::post('updateDisposalApplicationDetails', [ImportexportpermitsController::class, 'updateDisposalApplicationDetails']);
    Route::post('saveControlDrugsReceivingBaseDetails', [ImportexportpermitsController::class, 'saveControlDrugsReceivingBaseDetails']);
    Route::post('saveImportPermittReceivingBaseDetails', [ImportexportpermitsController::class, 'saveImportPermittReceivingBaseDetails']);
    Route::post('saveTransitPermitReceivingBaseDetails', [ImportexportpermitsController::class, 'saveTransitPermitReceivingBaseDetails']);
    Route::post('updateonlineImportPermittReceivingBaseDetails', [ImportexportpermitsController::class, 'updateonlineImportPermittReceivingBaseDetails']);
    Route::post('onSavePermitProductsDetails', [ImportexportpermitsController::class, 'onSavePermitProductsDetails']);
    Route::post('onSaveDisposalPermitProductsDetails', [ImportexportpermitsController::class, 'onSaveDisposalPermitProductsDetails']);
    Route::post('onSaveImportPermitPremisesData', [ImportexportpermitsController::class, 'onSaveImportPermitPremisesData']);
    Route::post('onSaveImportPermitSenderReceiverData', [ImportexportpermitsController::class, 'onSaveImportPermitSenderReceiverData']);
    Route::post('onSavePermitinformation', [ImportexportpermitsController::class, 'onSavePermitinformation']);
    Route::post('getPermitsApplicationMoreDetails', [ImportexportpermitsController::class, 'getPermitsApplicationMoreDetails']);
    Route::get('getImportExportManagerReviewApplications', [ImportexportpermitsController::class, 'getImportExportManagerReviewApplications']);
    Route::get('getNarcoticsPermitsManagerReviewApplications', [ImportexportpermitsController::class, 'getNarcoticsPermitsManagerReviewApplications']);
    Route::get('getISpecialmportExportApprovalApplications', [ImportexportpermitsController::class, 'getISpecialmportExportApprovalApplications']);
    Route::get('getOnlineDisposalApplications', [ImportexportpermitsController::class, 'getOnlineDisposalApplications']);
    Route::get('getOnlineDisposalpermitsproductsDetails', [ImportexportpermitsController::class, 'getOnlineDisposalpermitsproductsDetails']);
    Route::get('prepapreDisposalOnlineReceiving', [ImportexportpermitsController::class, 'prepapreDisposalOnlineReceiving']);
    Route::get('getDisposalApplications', [ImportexportpermitsController::class, 'getDisposalApplications']);
    Route::get('getDisposalpermitsproductsDetails', [ImportexportpermitsController::class, 'getDisposalpermitsproductsDetails']);
    Route::post('getDisposalPermitsApplicationMoreDetails', [ImportexportpermitsController::class, 'getDisposalPermitsApplicationMoreDetails']);
    Route::get('getDisposalInspectors', [ImportexportpermitsController::class, 'getDisposalInspectors']);
    Route::post('deleteDisposalInspectors', [ImportexportpermitsController::class, 'deleteDisposalInspectors']);
    Route::post('onSaveDisposalinternalsupervisors', [ImportexportpermitsController::class, 'onSaveDisposalinternalsupervisors']);
    Route::post('saveDisposalDestructionDetails', [ImportexportpermitsController::class, 'saveDisposalDestructionDetails']);
    Route::get('getDisposalPermitApprovalApplications', [ImportexportpermitsController::class, 'getDisposalPermitApprovalApplications']);
    Route::get('getSummaryReports', [ImportexportpermitsController::class, 'getSummaryReports']);
    Route::get('searchProductsInformation', [ImportexportpermitsController::class, 'searchProductsInformation']);
    Route::get('prepareDisposalPermitReceivingStage', [ImportexportpermitsController::class, 'prepareDisposalPermitReceivingStage']);
    Route::get('prepareNarcoticsPermitReceivingStage', [ImportexportpermitsController::class, 'prepareNarcoticsPermitReceivingStage']);
    Route::get('getDisposalInvoicingOtherDetails', [ImportexportpermitsController::class, 'getDisposalInvoicingOtherDetails']);
    Route::get('prepareDisposalPermitsInvoicingStage', [ImportexportpermitsController::class, 'prepareDisposalPermitsInvoicingStage']);
    Route::post('saveSpecialpermitApprovalRecommendation', [ImportexportpermitsController::class, 'saveSpecialpermitApprovalRecommendation']);
    Route::get('getImportExportApprovedPermitDetails', [ImportexportpermitsController::class, 'getImportExportApprovedPermitDetails']);
    Route::get('getNarcoticsDrugsPermitRelease', [ImportexportpermitsController::class, 'getNarcoticsDrugsPermitRelease']);
    Route::get('getPoeInspectionPermitsProducts', [ImportexportpermitsController::class, 'getPoeInspectionPermitsProducts']);
    Route::get('getPoePreviousPermitsInspection', [ImportexportpermitsController::class, 'getPoePreviousPermitsInspection']);
    Route::post('savePOEInspectionPermitDetails', [ImportexportpermitsController::class, 'savePOEInspectionPermitDetails']);
    Route::get('getPoeinspectionprocessdetails', [ImportexportpermitsController::class, 'getPoeinspectionprocessdetails']);
    Route::post('savePOEPermitProductDetails', [ImportexportpermitsController::class, 'savePOEPermitProductDetails']);
    Route::post('savePOEPermitRecommendations', [ImportexportpermitsController::class, 'savePOEPermitRecommendations']);
    Route::get('getInspectedPoeinspectionprocessdetails', [ImportexportpermitsController::class, 'getInspectedPoeinspectionprocessdetails']);
    Route::get('getImportexportpermitsapps', [ImportexportpermitsController::class, 'getImportexportpermitsapps']);
    Route::get('getHospitalPermitsNarcoticsApps', [ImportexportpermitsController::class, 'getHospitalPermitsNarcoticsApps']);
    Route::get('getNarcoticImportPermitsApps', [ImportexportpermitsController::class, 'getNarcoticImportPermitsApps']);
    Route::get('getNarcoticspermitsproductsDetails', [ImportexportpermitsController::class, 'getNarcoticspermitsproductsDetails']);
    Route::post('onSaveNarcoticsPermitProductsDetails', [ImportexportpermitsController::class, 'onSaveNarcoticsPermitProductsDetails']);
     Route::get('getAllImportExportAppsDetails', [ImportexportpermitsController::class, 'getAllImportExportAppsDetails']);
     Route::post('saveImportExportEditionBaseDetails', [ImportexportpermitsController::class, 'saveImportExportEditionBaseDetails']);
     Route::get('getSenderReceiverList', [ImportexportpermitsController::class, 'getSenderReceiverList']);
    Route::post('saveImportExportExtensionBaseDetails', [ImportexportpermitsController::class, 'saveImportExportExtensionBaseDetails']);
    Route::post('savePOEPermitVerificationRecommendations', [ImportexportpermitsController::class, 'savePOEPermitVerificationRecommendations']);
    Route::get('getImportExportPersonalUsePermits', [ImportexportpermitsController::class, 'getImportExportPersonalUsePermits']);
    Route::post('savePersonalUsePermitReceivingBaseDetails', [ImportexportpermitsController::class, 'savePersonalUsePermitReceivingBaseDetails']);
    Route::get('getPersonalUsepermitsproductsDetails', [ImportexportpermitsController::class, 'getPersonalUsepermitsproductsDetails']);
    Route::get('prepaprePersonalPermitsReceiving', [ImportexportpermitsController::class, 'prepaprePersonalPermitsReceiving']);
    Route::post('onSavePersonalUsePermitProductsDetails', [ImportexportpermitsController::class, 'onSavePersonalUsePermitProductsDetails']);
    Route::get('getDeclaredOnlImportexportpermitsproductsDetails', [ImportexportpermitsController::class, 'getDeclaredOnlImportexportpermitsproductsDetails']);
    Route::get('prepapreDeclaredImportExportOnlineReceivingStage', [ImportexportpermitsController::class, 'prepapreDeclaredImportExportOnlineReceivingStage']);
    Route::get('getImportExportPermitDeclarations', [ImportexportpermitsController::class, 'getImportExportPermitDeclarations']);
    Route::post('savepermitReleaseRecommendation', [ImportexportpermitsController::class, 'savepermitReleaseRecommendation']);
    Route::get('validateImportExportAppReceivingDetails', [ImportexportpermitsController::class, 'validateImportExportAppReceivingDetails']);
    Route::post('validateImportExportAppReceiving', [ImportexportpermitsController::class, 'validateImportExportAppReceivingDetails']);
    Route::get('funcDrugsContentsCalculations', [ImportexportpermitsController::class, 'funcDrugsContentsCalculations']);
    Route::post('onSaveControlledDrugsPermitProductsDetails', [ImportexportpermitsController::class, 'onSaveControlledDrugsPermitProductsDetails']);
    Route::get('prepapareDisposalVerificationUniform', [ImportexportpermitsController::class, 'prepapareDisposalVerificationUniform']);
    Route::get('getInspectedPoeinspectionProductsdetails', 'ImportexportpermitsController@getInspectedPoeinspectionProductsdetails');
    Route::post('saveImportPermitAmmendmentsReceivingBaseDetails', 'ImportexportpermitsController@saveImporExportPermitAmmendmentsReceivingBaseDetails');
    Route::post('saveInitialPOEPermitAppDetails', [ImportexportpermitsController::class, 'saveInitialPOEPermitAppDetails']);
    Route::post('saveExemptionExporterDetails', [ImportexportpermitsController::class, 'saveExemptionExporterDetails']);
    Route::post('savePOEConsignmentPermitVerification', [ImportexportpermitsController::class, 'saveInitialPOEPermitAppDetails']);
    Route::get('prepareReceivingpoeConsignmentinspectionswizard', [ImportexportpermitsController::class, 'prepareReceivingpoeConsignmentinspectionswizard']);
    Route::post('savePermitCancellationDetails', [ImportexportpermitsController::class, 'savePermitCancellationDetails']);
    Route::get('getImportExportCancelledPermit', [ImportexportpermitsController::class, 'getImportExportCancelledPermit']);
    Route::post('savePermitCancellationApprovalDetails', [ImportexportpermitsController::class, 'savePermitCancellationApprovalDetails']);
    Route::get('getApprovedPermitAppsDetails', [ImportexportpermitsController::class, 'getApprovedPermitAppsDetails']);
    Route::get('getApprovedPermitRegisterDetails', [ImportexportpermitsController::class, 'getApprovedPermitRegisterDetails']);
    //
});
