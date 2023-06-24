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

use Modules\Configurations\Http\Controllers\ConfigurationsController;
  
   Route::group(['middleware' => ['web'], 'prefix' => 'configurations'], function(){
    Route::get('/', [ConfigurationsController::class, 'index']);
    Route::post('saveConfigCommonData', [ConfigurationsController::class, 'saveConfigCommonData']);
    Route::post('saveSystemModuleData', [ConfigurationsController::class, 'saveSystemModuleData']);
   Route::get('getConfigParamFromModel', [ConfigurationsController::class, 'getConfigParamFromModel']);
    Route::post('saveParameterConfig', [ConfigurationsController::class, 'saveParameterConfig']);
    Route::get('getTableslist', [ConfigurationsController::class, 'getTableslist']);
    Route::get('getTablescolumns', [ConfigurationsController::class, 'getTablescolumns']);
    Route::get('getParameterConfig', [ConfigurationsController::class, 'getParameterConfig']);
    Route::get('checkParamMenuDefination', [ConfigurationsController::class, 'checkParamMenuDefination']);
    Route::post('deleteConfigRecord', [ConfigurationsController::class, 'deleteConfigRecord']);
    Route::post('softDeleteConfigRecord', [ConfigurationsController::class, 'softDeleteConfigRecord']);
    Route::post('undoConfigSoftDeletes', [ConfigurationsController::class, 'undoConfigSoftDeletes']);
    Route::get('getChecklistTypes', [ConfigurationsController::class, 'getChecklistTypes']);
    Route::get('getChecklistItems', [ConfigurationsController::class, 'getChecklistItems']);
    Route::get('getAllApplicationStatuses', [ConfigurationsController::class, 'getAllApplicationStatuses']);
    Route::get('getAlterationParameters', [ConfigurationsController::class, 'getAlterationParameters']);
    Route::get('getConfigParamFromTable', [ConfigurationsController::class, 'getConfigParamFromTable']);
    Route::get('getproductApplicationParameters', [ConfigurationsController::class, 'getproductApplicationParameters']);
    Route::get('getproductSubCategoryParameters', [ConfigurationsController::class, 'getproductSubCategoryParameters']);
    Route::get('getRegistrationApplicationParameters', [ConfigurationsController::class, 'getRegistrationApplicationParameters']);
    Route::get('getCertificateConditionsApplicationParameters',[ConfigurationsController::class, 'getCertificateConditionsApplicationParameters']);
    Route::get('getproductGeneraicNameParameters', [ConfigurationsController::class, 'getproductGeneraicNameParameters']);
    Route::get('getsystemSubModules', [ConfigurationsController::class, 'getsystemSubModules']);
    Route::get('getsystemModules', [ConfigurationsController::class, 'getsystemModules']);
    Route::get('getRefnumbersformats', [ConfigurationsController::class, 'getRefnumbersformats']);
    Route::get('getregistrationexpirytime_span', [ConfigurationsController::class, 'getregistrationexpirytime_span']);
    Route::get('getVariationCategoriesParameters', [ConfigurationsController::class, 'getVariationCategoriesParameters']);

    Route::get('getPayingCurrency', [ConfigurationsController::class, 'getPayingCurrency']);
    Route::get('getNonrefParameter', [ConfigurationsController::class, 'getNonrefParameter']);
    Route::get('getSubmoduleRefFormats', [ConfigurationsController::class, 'getSubmoduleRefFormats']);
    Route::get('getApplicationSections', [ConfigurationsController::class, 'getApplicationSections']);

    Route::get('getUnstructuredQueryChecklistItem', [ConfigurationsController::class, 'getUnstructuredQueryChecklistItem']);
    Route::get('getUnstructuredQueryChecklistTypes', [ConfigurationsController::class, 'getUnstructuredQueryChecklistTypes']);
    Route::get('getproductGenericApplicationParameters', [ConfigurationsController::class, 'getproductGenericApplicationParameters']);
    Route::get('getGenericNamesAtcCodes', [ConfigurationsController::class, 'getGenericNamesAtcCodes']);

    Route::get('getPersonnelDetails', [ConfigurationsController::class, 'getPersonnelDetails']);
    Route::get('getProductClassRules', [ConfigurationsController::class, 'getProductClassRules']);
    Route::get('getClassRulesParameters', [ConfigurationsController::class, 'getClassRulesParameters']);
    Route::get('getManRolesParameters', [ConfigurationsController::class, 'getManRolesParameters']);
    Route::get('getPortalAppsInitialStatuses', [ConfigurationsController::class, 'getPortalAppsInitialStatuses']);
    Route::post('saveEditedConfigCommonData', [ConfigurationsController::class, 'saveEditedConfigCommonData']);

    Route::get('getApplicationAmmendment', [ConfigurationsController::class, 'getApplicationAmmendment']);
    Route::get('getConfigDirectors', [ConfigurationsController::class, 'getConfigDirectors']);


    Route::get('getProductInvoiceChargesConfig', [ConfigurationsController::class, 'getProductInvoiceChargesConfig']);
    Route::get('getPremiseInvoiceChargesConfig', [ConfigurationsController::class, 'getPremiseInvoiceChargesConfig']);
    Route::get('getRetentionChargesConfig', [ConfigurationsController::class, 'getRetentionChargesConfig']);
    Route::get('getElementCostWithCurrency', [ConfigurationsController::class, 'getElementCostWithCurrency']);
    Route::get('free', [ConfigurationsController::class, 'getChecklistItems']);





    Route::get('getDirectoratesUnits', [ConfigurationsController::class, 'getDirectoratesUnits']);
    Route::post('saveDocumentMasterListConfig', [ConfigurationsController::class, 'saveDocumentMasterListConfig']);
    //dynamic config
    Route::get('getParameterGridColumnsConfig', [ConfigurationsController::class, 'getParameterGridColumnsConfig']);
    Route::get('getParameterGridConfig', [ConfigurationsController::class, 'getParameterGridConfig']);
    Route::get('getParameterFormColumnsConfig', [ConfigurationsController::class, 'getParameterFormColumnsConfig']);

    Route::get('getCountryMappedProcedures', [ConfigurationsController::class, 'getCountryMappedProcedures']);
    Route::post('mapProcedureToCountry', [ConfigurationsController::class, 'mapProcedureToCountry']);
    Route::get('getOnlineApplicationStatus', [ConfigurationsController::class, 'getOnlineApplicationStatus']);
    Route::post('saveConfigPortalCommonData', [ConfigurationsController::class, 'saveConfigPortalCommonData']);
    Route::get('getConfigParamFromPortalTable', [ConfigurationsController::class, 'getConfigParamFromPortalTable']);
    Route::post('saveAuditedTableLogger', [ConfigurationsController::class, 'saveAuditedTableLogger']);
    Route::get('getAppModuleFeeConfig', [ConfigurationsController::class, 'getAppModuleFeeConfig']);
    Route::get('getFormFieldRelations', [ConfigurationsController::class, 'getFormFieldRelations']);
    Route::post('saveFormFieldRelations', [ConfigurationsController::class, 'saveFormFieldRelations']);
    Route::get('prepareInterfaceBasedonConfig', [ConfigurationsController::class, 'prepareInterfaceBasedonConfig']);
    Route::get('getMappedFormFieldCombosTable', [ConfigurationsController::class, 'getMappedFormFieldCombosTable']);
    Route::post('saveModuleFeeConfigCommonData', [ConfigurationsController::class, 'saveModuleFeeConfigCommonData']);
    Route::post('getNewInvoiceQuotation', [ConfigurationsController::class, 'getNewInvoiceQuotation']);
    Route::get('getTableslist', [ConfigurationsController::class, 'getTableslist']);
    Route::get('getelementcost', [ConfigurationsController::class, 'getelementcost']);
    Route::get('getApplicationApplicantDetails', [ConfigurationsController::class, 'getApplicationApplicantDetails']);
    Route::get('getApplicationComments', [ConfigurationsController::class, 'getApplicationComments']);
    Route::get('checkApplicationEvaluationOverralRecom', [ConfigurationsController::class, 'checkApplicationEvaluationOverralRecom']);
    Route::get('checkApplicationChecklistUploadDetails', [ConfigurationsController::class, 'checkApplicationChecklistUploadDetails']);
    Route::get('checkApplicationRaisedQueries', [ConfigurationsController::class, 'checkApplicationRaisedQueries']);
    Route::post('saveDocDefinationrequirement', [ConfigurationsController::class, 'saveDocDefinationrequirement']);
    Route::get('getCountryRegions', [ConfigurationsController::class, 'getCountryRegions']);
    Route::get('getMeetingSchedules', [ConfigurationsController::class, 'getMeetingSchedules']);
    Route::get('getGridColumnsFromSchema', [ConfigurationsController::class, 'getGridColumnsFromSchema']);
    Route::get('getFormFields', [ConfigurationsController::class, 'getFormFields']);
    Route::get('checkIfHasGeneratedInvoiceDEtails', [ConfigurationsController::class, 'checkIfHasGeneratedInvoiceDEtails']);
    Route::get('validateHasImportExportProductDetils', [ConfigurationsController::class, 'validateHasImportExportProductDetils']);
    Route::get('validateHasUploadedDocumentsDetils', [ConfigurationsController::class, 'validateHasUploadedDocumentsDetils']);
    Route::get('getReviewerRejectionReason', [ConfigurationsController::class, 'getReviewerRejectionReason']);

    Route::post('synchronizeAQuestionToItsPredecessor',[ConfigurationsController::class,'synchronizeAQuestionToItsPredecessor']);
    Route::get('getCustomerList',[ConfigurationsController::class,'getCustomerList']);
    Route::get('getClinicalAssessmentForm',[ConfigurationsController::class,'getClinicalAssessmentForm']);
   });
   Route::group(['middleware' => ['web'], 'prefix' => 'configurations'], function(){
      Route::post('saveAllQuestionsForMedicalAssesment', [ConfigurationsController::class,'saveAllQuestionsForMedicalAssesment']);
   });


