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
//use Modules\DocumentManagement\Http\Controllers\DocumentManagementController;
use Modules\DocumentManagement\Http\Controllers\DmsConfigurationsController;

use Modules\DocumentManagement\Http\Controllers\DocumentManagementController;
//non json routes
Route::group(['prefix' => 'documentmanagement', 'middleware' => ['web']], function() {
    Route::post('uploadApplicationDocumentFile', [DocumentManagementController::class, 'uploadApplicationDocumentFile']);
    Route::post('uploadunstructureddocumentuploads', [DocumentManagementController::class, 'uploadunstructureddocumentuploads']);
    Route::post('resumableuploadApplicationDocumentFile', [DocumentManagementController::class, 'uploadLargeFiles']);
    Route::post('importExcelFile', [DocumentManagementController::class, 'importExcelFile']);
    
});
//json routes
Route::group(['middleware' => ['web'], 'prefix' => 'documentmanagement'], function(){
Route::post('saveDocumentRepositoryStructure', [DmsConfigurationsController::class, 'saveDocumentRepositoryStructure']);
    Route::post('saveDocumentRepositoryRootFolder', [DmsConfigurationsController::class, 'saveDocumentRepositoryRootFolder']);
    Route::post('saveDMSSiteDefinationDetails', [DmsConfigurationsController::class, 'saveDMSSiteDefinationDetails']);
    Route::post('saveDMSSectionDefinationDetails', [DmsConfigurationsController::class, 'saveDMSSectionDefinationDetails']);
    Route::post('saveDMSSecModulesDefinationDetails', [DmsConfigurationsController::class, 'saveDMSSecModulesDefinationDetails']);
    Route::post('saveDMSSecSubModulesDefinationDetails', [DmsConfigurationsController::class, 'saveDMSSecSubModulesDefinationDetails']);
    Route::post('saveDMSModulesDocTypeDefinationDetails', [DmsConfigurationsController::class, 'saveDMSModulesDocTypeDefinationDetails']);
    Route::post('saveDMSNoStructuredDocDefinationDetails', [DmsConfigurationsController::class, 'saveDMSNoStructuredDocDefinationDetails']);
      Route::get('onLoadApplicationPrevDocumentsUploads', [DocumentManagementController::class, 'onLoadApplicationPrevDocumentsUploads']);


    Route::post('saveUploadedApplicationPayments', [DocumentManagementController::class,'saveUploadedApplicationPayments']);
    
    
    Route::post('uploadProductImages', [DocumentManagementController::class, 'uploadProductImages']);
    Route::post('onApplicationDocumentDelete', [DocumentManagementController::class, 'onApplicationDocumentDelete']);
    Route::post('onDeleteProductImages', [DocumentManagementController::class, 'onDeleteProductImages']);
    Route::post('onDeleteNonStructureApplicationDocument', [DocumentManagementController::class, 'onDeleteNonStructureApplicationDocument']);
    
    Route::get('getDocumentsTypes', [DmsConfigurationsController::class, 'getDocumentsTypes']);
    Route::get('getDocumentsSubTypes', [DmsConfigurationsController::class, 'getDocumentsSubTypes']);
    Route::get('getParameterstableSchema', [DmsConfigurationsController::class, 'getParameterstableSchema']);
    Route::get('getdocdefinationrequirementDetails', [DmsConfigurationsController::class, 'getdocdefinationrequirementDetails']);
    Route::get('docdefinationrequirementfilterdetails', [DmsConfigurationsController::class, 'docdefinationrequirementfilterdetails']);
    Route::get('getdocumentreposirotystructureDetails', [DmsConfigurationsController::class, 'getdocumentreposirotystructureDetails']);
    Route::get('getdocumentsectionsrepstructure', [DmsConfigurationsController::class, 'getdocumentsectionsrepstructure']);
    Route::get('getRepositoryrootfolderDetails', [DmsConfigurationsController::class, 'getRepositoryrootfolderDetails']);
    Route::get('dmsAuthentication', [DmsConfigurationsController::class, 'dmsAuthentication']);
    Route::get('getDMSSiteDefinationDetails', [DmsConfigurationsController::class, 'getDMSSiteDefinationDetails']);
    Route::get('getDMSSectionsDefinationDetails', [DmsConfigurationsController::class, 'getDMSSectionsDefinationDetails']);
    Route::get('getDMSSectionsModulesDefinationDetails', [DmsConfigurationsController::class, 'getDMSSectionsModulesDefinationDetails']);
    Route::get('getDMSSectionsSubModulesDefinationDetails', [DmsConfigurationsController::class, 'getDMSSectionsSubModulesDefinationDetails']);
    Route::get('getDMSModulesDocumentTypesDefinationDetails', [DmsConfigurationsController::class, 'getDMSModulesDocumentTypesDefinationDetails']);
    Route::get('getSOPMasterListDetails', [DmsConfigurationsController::class, 'getSOPMasterListDetails']);
    Route::get('getnonStructuredDocumentsDefination', [DmsConfigurationsController::class, 'getnonStructuredDocumentsDefination']);
    Route::get('getDmsParamFromModel', [DmsConfigurationsController::class, 'getDmsParamFromModel']);
    Route::get('onLoadApplicationDocumentsUploads', [DocumentManagementController::class, 'onLoadApplicationDocumentsUploads']);
    Route::get('onLoadProductImagesUploads', [DocumentManagementController::class, 'onLoadProductImagesUploads']);
    Route::get('onLoadApplicationDocumentsRequirements', [DocumentManagementController::class, 'onLoadApplicationDocumentsRequirements']);
    Route::get('getApplicationDocumentDownloadurl', [DocumentManagementController::class, 'getApplicationDocumentDownloadurl']);
    Route::get('getApplicationDocumentPreviousVersions', [DocumentManagementController::class, 'getApplicationDocumentPreviousVersions']);
    Route::get('getProcessApplicableDocTypes', [DocumentManagementController::class, 'getProcessApplicableDocTypes']);
    Route::get('getProcessApplicableDocRequirements', [DocumentManagementController::class, 'getProcessApplicableDocRequirements']);
    Route::get('onLoadApplicationDocumentsUploadsPortal', [DocumentManagementController::class, 'onLoadApplicationDocumentsUploadsPortal']);
    Route::get('LoadAllApplicationUploadedDocuments', [DocumentManagementController::class, 'LoadAllApplicationUploadedDocuments']);
    Route::get('onLoadOnlineProductImagesUploads', [DocumentManagementController::class, 'onLoadOnlineProductImagesUploads']);
    Route::get('onLoadUnstructureApplicationDocumentsUploads', [DocumentManagementController::class, 'onLoadUnstructureApplicationDocumentsUploads']);
    Route::get('getDocumentArchive', [DocumentManagementController::class, 'getDocumentArchive']);
    Route::post('dmsUpdateAccountPassword', [DmsConfigurationsController::class, 'dmsUpdateAccountPassword']);
    });
