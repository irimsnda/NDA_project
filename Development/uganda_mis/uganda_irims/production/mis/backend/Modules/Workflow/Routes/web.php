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

// Route::prefix('workflow')->group(function() {
//     Route::get('/', 'WorkflowController@index');
// });
use Modules\Workflow\Http\Controllers\WorkflowController;

Route::group(['prefix' => 'workflow','middleware' => ['web']], function() {
Route::get('/', [WorkflowController::class, 'index']);
Route::post('saveWorkflowCommonData', [WorkflowController::class,'saveWorkflowCommonData']);
    Route::get('getWorkflowParamFromModel', [WorkflowController::class,'getWorkflowParamFromModel']);
    Route::get('getTfdaSystemProcesses', [WorkflowController::class,'getTfdaSystemProcesses']);
    Route::post('softDeleteWorkflowRecord', [WorkflowController::class,'softDeleteWorkflowRecord']);
    Route::post('undoWorkflowSoftDeletes', [WorkflowController::class,'undoWorkflowSoftDeletes']);
    Route::post('deleteWorkflowRecord', [WorkflowController::class,'deleteWorkflowRecord']);
    Route::get('getWorkflowStages', [WorkflowController::class,'getWorkflowStages']);
    Route::get('getWorkflowActions', [WorkflowController::class,'getWorkflowActions']);
    Route::get('getWorkflowTransitions', [WorkflowController::class,'getWorkflowTransitions']);
    Route::post('saveWorkflowStage', [WorkflowController::class,'saveWorkflowStage']);
    Route::post('saveWorkflowTransition', [WorkflowController::class,'saveWorkflowTransition']);
    Route::get('getMenuWorkflowLinkages', [WorkflowController::class,'getMenuWorkflowLinkages']);
    Route::post('saveMenuWorkflowLinkage', [WorkflowController::class,'saveMenuWorkflowLinkage']);
    Route::post('saveMenuWorkFlowsLinkage', [WorkflowController::class,'saveMenuWorkFlowsLinkage']);
    Route::get('showWorkflowDiagram', [WorkflowController::class,'showWorkflowDiagram']);
    Route::post('deleteMenuWorkflowLinkage', [WorkflowController::class,'deleteMenuWorkflowLinkage']);
    Route::post('deleteMenuWorkFlowsLinkage', [WorkflowController::class,'deleteMenuWorkFlowsLinkage']);
    Route::get('getBasicWorkflowDetails', [WorkflowController::class,'getBasicWorkflowDetails']);
    Route::get('getInitialWorkflowDetails', [WorkflowController::class,'getInitialWorkflowDetails']);
    Route::get('getAllWorkflowDetails', [WorkflowController::class,'getAllWorkflowDetails']);
    Route::get('getApplicationSubmissionDetails', [WorkflowController::class,'getApplicationSubmissionDetails']);
    Route::get('getProcessWorkflowStages', [WorkflowController::class,'getProcessWorkflowStages']);
    Route::get('getMenuWorkFlowsLinkages', [WorkflowController::class,'getMenuWorkFlowsLinkages']);
    Route::get('getStageGroups', [WorkflowController::class,'getStageGroups']);
    Route::get('getSystemSubModules', [WorkflowController::class,'getSystemSubModules']);
    Route::get('getProcessApplicableChecklistCategories', [WorkflowController::class,'getProcessApplicableChecklistCategories']);
    Route::get('getProcessEditableFormFields', [WorkflowController::class,'getProcessEditableFormFields']);
    Route::get('getProcessEditableOtherParts', [WorkflowController::class,'getProcessEditableOtherParts']);
    //Route::get('getProcessApplicableChecklistTypes', [WorkflowController::class,'getProcessApplicableChecklistTypes');
    //Route::get('getProcessApplicableChecklistItems', [WorkflowController::class,'getProcessApplicableChecklistItems');
    Route::post('syncProcessApplicableChecklistCategories', [WorkflowController::class,'syncProcessApplicableChecklistCategories']);
    Route::post('syncProcessAmendableParts', [WorkflowController::class,'syncProcessAmendableParts']);
    Route::get('getWorkflowStageResponsibleGroups', [WorkflowController::class,'getWorkflowStageResponsibleGroups']);
    Route::get('getSubmissionWorkflowStages', [WorkflowController::class,'getSubmissionWorkflowStages']);
    Route::get('getSubmissionNextStageDetails', [WorkflowController::class,'getSubmissionNextStageDetails']);
    Route::get('getSubmissionResponsibleUsers', [WorkflowController::class,'getSubmissionResponsibleUsers']);
    Route::get('getPremiseInspectionSubmissionResponsibleUsers', [WorkflowController::class,'getPremiseInspectionSubmissionResponsibleUsers']);
    Route::get('getWorkflowStagePossibleResponsibleGroups', [WorkflowController::class,'getWorkflowStagePossibleResponsibleGroups']);
    Route::post('syncWorkflowStageResponsibleGroups', [WorkflowController::class,'syncWorkflowStageResponsibleGroups']);
    Route::get('getWorkflowAssociatedMenus', [WorkflowController::class,'getWorkflowAssociatedMenus']);
    Route::post('handleApplicationSubmission', [WorkflowController::class,'handleApplicationSubmission']);
    Route::post('handleManagersApplicationSubmissions', [WorkflowController::class,'handleManagersApplicationSubmissions']);
    Route::post('submitApplication', [WorkflowController::class,'submitApplication']);
    Route::post('submitManagerApplicationsGeneric', [WorkflowController::class,'submitManagerApplicationsGeneric']);
    Route::post('submitApplicationReceiving', [WorkflowController::class,'submitApplicationReceiving']);
    Route::post('updateInTrayReading', [WorkflowController::class,'updateInTrayReading']);
    Route::get('getSubmissionRecommendations', [WorkflowController::class,'getSubmissionRecommendations']);
    Route::get('getApplicationStatuses', [WorkflowController::class,'getApplicationStatuses']);
    Route::get('getApplicationReturnDirectives', [WorkflowController::class,'getApplicationReturnDirectives']);
    Route::get('getApplicationTransitioning', [WorkflowController::class,'getApplicationTransitioning']);
    Route::get('getFormFieldsAuth', [WorkflowController::class,'getFormFieldsAuth']);
    Route::get('getProcessOtherPartsAuth', [WorkflowController::class,'getProcessOtherPartsAuth']);
    Route::get('getAlterationFormFieldsAuth', [WorkflowController::class,'getAlterationFormFieldsAuth']);
    Route::get('getAlterationOtherPartsAuth', [WorkflowController::class,'getAlterationOtherPartsAuth']);
    Route::get('getOnlineApplicationSubmissionDetails', [WorkflowController::class,'getOnlineApplicationSubmissionDetails']);
    Route::get('getApplicationAlterationFormFields', [WorkflowController::class,'getApplicationAlterationFormFields']);
    Route::get('getApplicationAlterationOtherParams', [WorkflowController::class,'getApplicationAlterationOtherParams']);
    Route::get('getApplicationAlterationForms', [WorkflowController::class,'getApplicationAlterationForms']);
    Route::post('receiveOnlineApplicationDetails', [WorkflowController::class,'receiveOnlineApplicationDetails']);
    Route::post('receiveMultipleOnlineApplicationDetails', [WorkflowController::class,'receiveMultipleOnlineApplicationDetails']);

    
    Route::post('getModulesTableData', [WorkflowController::class,'getModulesTableData']);
    Route::get('getProcessApplicableDocumentTypes', [WorkflowController::class,'getProcessApplicableDocumentTypes']);
    Route::post('syncProcessApplicableDocumentTypes', [WorkflowController::class,'syncProcessApplicableDocumentTypes']);
    Route::get('getPortalApplicationStatuses', [WorkflowController::class,'getPortalApplicationStatuses']);
    Route::get('getWorkflowDetails', [WorkflowController::class,'getWorkflowDetails']);
    Route::get('getWorkflowInterfacedetails', [WorkflowController::class,'getWorkflowInterfacedetails']);
    Route::get('getApplicationSubmissionDetailsFromSubmissionsTable', [WorkflowController::class,'getApplicationSubmissionDetailsFromSubmissionsTable']);
    Route::get('getOnlineProcessApplicableChecklistTypes', [WorkflowController::class,'getOnlineProcessApplicableChecklistTypes']);
    Route::get('getOnlineProcessApplicableChecklistItems', [WorkflowController::class,'getOnlineProcessApplicableChecklistItems']);

    Route::get('getInitialWorkflowDetailsNoProcess', [WorkflowController::class,'getInitialWorkflowDetailsNoProcess']);
     Route::get('getApplicableChecklistItemsHistory', [WorkflowController::class,'getApplicableChecklistItemsHistory']);
     
     Route::get('getRevenueApplicationSubmissionDetails', [WorkflowController::class,'getRevenueApplicationSubmissionDetails']);
     Route::get('getRevProcessSubmissionWorkflowStages', [WorkflowController::class,'getRevProcessSubmissionWorkflowStages']);
     Route::post('handleRevenueRequestApplicationSubmission', [WorkflowController::class,'handleRevenueRequestApplicationSubmission']);
     
     Route::post('unlinkWorkflowRecord', [WorkflowController::class,'unlinkWorkflowRecord']);
     
     Route::post('saveonlineapplicationreceiceinvoiceDetails', [WorkflowController::class,'saveonlineapplicationreceiceinvoiceDetails']);
     
     Route::get('getSubmissionWorkflowStages', [WorkflowController::class,'getSubmissionWorkflowStages']);


     //Route::get('getAllWorkflow', [WorkflowController::class,'getAllWorkflow');

     Route::get('getGroupMappedWorkflowStages', [WorkflowController::class,'getGroupMappedWorkflowStages']);


     Route::post('saveRegistrationCancellationRequest', [WorkflowController::class,'saveRegistrationCancellationRequest']);
     Route::get('getCancelledRegistrationApplications', [WorkflowController::class,'getCancelledRegistrationApplications']);
     Route::get('getCancelledRegistrationApplicationDetails', [WorkflowController::class,'getCancelledRegistrationApplicationDetails']);
     Route::post('RevertRegistrationCancellation', [WorkflowController::class,'RevertRegistrationCancellation']);

     Route::get('getChecklistRevisionLogs', [WorkflowController::class,'getChecklistRevisionLogs']);
     Route::post('getApplicationNextStageActionDetails', [WorkflowController::class,'getApplicationNextStageActionDetails']);
         Route::get('getProcessApplicableChecklistTypes',[WorkflowController::class,'getProcessApplicableChecklistTypes']);
    Route::get('getProcessApplicableChecklistItems',[WorkflowController::class,'getProcessApplicableChecklistItems']);
    Route::get('getChecklistQueriesApplicableChecklistItems',[WorkflowController::class,'getChecklistQueriesApplicableChecklistItems']);
    
    Route::post('saveApplicationDataAmmendmentRequest',[WorkflowController::class,'saveApplicationDataAmmendmentRequest']);
});