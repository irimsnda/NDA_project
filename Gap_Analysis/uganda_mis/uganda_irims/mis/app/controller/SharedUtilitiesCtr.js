Ext.define('Admin.controller.SharedUtilitiesCtr', {
    extend: 'Ext.app.Controller',

    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }, {
            ref: 'sampleanalysistestrequestspnl',
            selector: '#sampleanalysistestrequestspnl'
        },{
            ref:'promoadvertonlinepreviewwizard',
            selector:'promoadvertonlinepreviewwizard'
        },{
            ref:'onlineapplicationpermitmanagersubgrid',
            selector:'#onlineapplicationpermitmanagersubgrid'
        }],
        
        stores: [
            'Admin.store.common.CommonGridAbstractStore',
            'Admin.store.abstract.AbstractTreeStr'
        ],

        control: {
            'exportbtn menu menuitem[action=exportBtnPlugin]': {
                click: 'generateReport'
            },
            'externalExportBtn menu menuitem[action=exportExternalBtnPlugin]': {
                click: 'generateReportFromExternalGrid'
            },
            'transitionsbtn': {
                click: 'showApplicationTransitioning'
            },
            'applicationdismissalbtn': {
                click: 'showApplicationDismissalForm'
            },
            'applicationdismissalfrm button[name=save_dismissal_details]': {
                click: 'saveApplicationDismissalDetails'
            },

            'inspectionscaparequestsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            
            'transitionsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            'clinicaltrialstudysitesgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            'clinicaltrialotherinvestigatorsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            'clinicaltrialmonitorsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },

            'impproductsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            'sampledetailsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },'samplenonstructuredetailsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            
            'premisewithdrawalreasonsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            'gmpwithdrawalreasonsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            'gmpvariationrequestsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            'premisevariationrequestsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            'invoicepaymentverificationdetailsGrid': {
                refresh: 'addApplicationIdCodeParams'
            }, 
            'onlineapplicationpaymentsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            
            'uploadedapplicationpaymentsgrid': {
                refresh: 'addApplicationIdCodeParams'
            },
            'applicantselectioncmngrid': {
                beforerender: 'setPremiseRegModuleGridsStore'
            },
            'checklistresponsescmngrid': {
                beforerender: 'setWorkflowModuleGridsStore',
                showAppQueries: 'showApplicationQueriesWin'
            },
            'premisescreeninggrid': {
                refresh: 'refreshScreeningChecklistItemsGrid'
            },
            'premiseinspectionscreeninggrid': {
                refresh: 'refreshScreeningChecklistItemsGrid'
            },
            'premiseonlinescreeninggrid': {
                refresh: 'refreshOnlineScreeningChecklistItemsGrid'
            },
            'gmpscreeninggrid': {
                refresh: 'refreshScreeningChecklistItemsGrid'
            },
            'importexportscreeninggrid': {
                refresh: 'refreshScreeningChecklistItemsGrid'
            },

            'premiseManagerMeetingGrid button[action=process_returnsubmission_btn]': {
                click: 'showGridApplicationReturnSubmissionWinGeneric'
            },
            'gmponlinescreeninggrid': {
                refresh: 'refreshOnlineScreeningChecklistItemsGrid'
            },
            'clinicaltrialscreeninggrid': {
                refresh: 'refreshScreeningChecklistItemsGrid'
            },
            'clinicaltrialonlinescreeninggrid': {
                refresh: 'refreshOnlineScreeningChecklistItemsGrid'
            },
            'foodpreminspectionchecklistgrid': {
                refresh: 'refreshScreeningChecklistItemsGrid'
            },
            'foodpremevaluationchecklistgrid': {
                refresh: 'refreshScreeningChecklistItemsGrid'
            },

            'gmpinspectiongrid': {
                refresh: 'refreshScreeningChecklistItemsGrid'
            },
            'productscreeninggrid': {
                refresh: 'refreshScreeningChecklistItemsGrid'
            },
            'productauditingchecklistsGrid': {
                refresh: 'refreshScreeningChecklistItemsGrid'
            },

            'pmspirevaluationgrid': {
                refresh: 'refreshPIRChecklistItemsGrid'
            },
            'onlineproductdocuploadsgrid':{
                refresh: 'refreshApplicationDocUploadsGrid'
            },
            'applicationdocuploadsgrid': {
                refresh: 'refreshApplicationDocUploadsGrid'
            },
            'gmpprovisionalinspectionpanel button[name=save_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'newpremiseevaluationpanel button[name=save_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'renewpremiseevaluationpanel button[name=save_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'newpremiseinspectionpanel button[name=save_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'renewpremiseinspectionpanel button[name=save_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'newpremisereceivingwizard button[name=save_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'renewpremisereceivingwizard button[name=save_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'newgmpreceivingwizard button[name=save_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'renewgmpreceivingwizard button[name=save_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'newclinicaltrialreceivingwizard button[name=save_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'importexportdeclaredpermitmanagerreviewwizard button[name=save_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            },

            'newgmpinspectionpanel button[name=save_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'renewgmpinspectionpanel button[name=save_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'pmspirevaluationgrid button[name=save_btn]': {
                click: 'savePIRChecklistDetails'
            },

            'invoicingpanel button[name=save_btn]': {
                click: 'saveApplicationInvoicingDetails'
            },
            'invoicingpanel button[name=commit_btn]': {
                click: 'saveApplicationInvoicingDetails'
            },
            'invoicingpanel button[name=remove_selected]': {
                click: 'removeInvoiceCostElement'
            },
            'invoicingpanel button[name=process_submission_btn]': {
                click: 'showInvoicingApplicationSubmissionWin'
            },
            'invoicingpanel checkbox[name=is_fast_track]': {
                change: 'addInvoiceFastTrackChange'
            },
            'paymentspanel toolbar button[name=receive_payments]': {
                click: 'showPaymentReceptionForm'
            },
            'paymentspanel button[name=process_submission_btn]': {
                click: 'showPaymentApplicationSubmissionWin'
            },'labservicessamplepaymentpanel button[name=process_submission_btn]': {
                click: 'showLaboratoryPaymentApplicationSubmissionWin'
            },
            'managerevaluationgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'managerassigningafetyalertreportsgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'progressreportmanagerevaluationgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'productmanagerevaluationgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },

            'approvalproductdataammendgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'productmanagerauditinggrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'managerevaluationrenewalgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'managerinspectiongrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'managerinspectionrenewalgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'managerreviewgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'managerreviewrenewalgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },

            'approvalsgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'approvalsalterationgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'communicationsgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'communicationsrenewalgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'managerquerygrid': {//premise
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'premisemanagerqueryresponsegrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'gmpmanagerquerygrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'clinicaltrialmanagerquerygrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'gmpmanagerinspectiongrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            }, 'gmpmanagerprecheckingquerygrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'gmpmanagerqueryresponsegrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'importpermitreleaseapproval': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },

            'gmpinspectionreportsreviewgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'gmpaltmanagerevaluationgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'gmpaltmanagerreviewgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'gmpinspectionschedulinggrid': {
                refresh: 'addApplicationWorkflowParams'
            },
            'gmpinspectionschedulingphysicalgrid': {
                refresh: 'addApplicationWorkflowParams'
            },
            'gmpinspectionschedulingdeskreviewgrid': {
                refresh: 'addApplicationWorkflowParams'
            },
            'gmpdeskreviewschedulinggrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'gmpapprovalsgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'gmpconditionalapprovalsgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },

            'newgmpconditionalapprovals': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'approvalfordeskreviewgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'gmpcommunicationsgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'gmpwithdrawalcommunicationsgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'clinicaltrialmanagerassessmentgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'clinicaltrialmanagerauditinggrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },'clinicaltrialregreviewapplicationgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'progressreportmanagerreviewgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'clinicaltrialmanagerreviewgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'pmsmanagerevaluationgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'clinicaltrialapprovalsgrid': {
                moveRowTop: 'moveSelectedRecordRowToTop',
                refresh: 'tCMMeetingSchedulingRefreshGrid'
            },
            'clinicaltrialcommunicationsgrid': {
                moveRowTop: 'moveSelectedRecordRowToTop',
                refresh: 'tCMMeetingSchedulingRefreshGrid'
            },
            'approvalscancellationgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'gmpcancellationapprovalsgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'gmpalterationapprovalsgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'managerpostpaymentreviewgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'managerquery': {//premise
                afterrender: 'prepareManagerQueryInterfaceGeneric'
            },
            'premisemanagerprecheckingquery': {//premise
                afterrender: 'prepareManagerQueryInterfaceGeneric'
            },
            'premisemanagerqueryresponse': {
                afterrender: 'prepareManagerQueryInterfaceGeneric'
            },
            'gmpmanagerquery': {
                afterrender: 'prepareManagerQueryInterfaceGeneric'
            },
            'clinicaltrialmanagerquery': {
                afterrender: 'prepareManagerQueryInterfaceGeneric'
            },
            'newclinicaltrialmanagerassessment': {
                afterrender: 'prepareManagersInterfaceGeneric'
            },'preclinicaltrialmanagerassessment': {
                afterrender: 'prepareManagersInterfaceGeneric'
            },

            
            'clinicaltrialmanagerassessment': {
                afterrender: 'prepareManagersInterfaceGeneric'
            },
            'newclinicaltrialmanagerauditing': {
                afterrender: 'prepareManagersInterfaceGeneric'
            },
            'clinicaltrialmanagerauditing': {
                afterrender: 'prepareManagersInterfaceGeneric'
            },
            'structuredpmsmanagerevaluation': {
                afterrender: 'prepareManagersInterfaceGeneric'
            },
            'unstructuredpmsmanagerevaluation': {
                afterrender: 'prepareManagersInterfaceGeneric'
            },
            'newgmpapprovalfordeskreview': {
                afterrender: 'prepareManagersInterfaceGeneric'
            },
            'gmpcommunication': {
                afterrender: 'prepareManagersInterfaceGeneric'
            },
            'newgmpinspectionreportsreview': {
                afterrender: 'prepareManagersInterfaceGeneric'
            },
            'gmpmanagerevaluation': {
                afterrender: 'prepareManagersInterfaceGeneric'
            },
            'gmpmanagerreview': {
                afterrender: 'prepareManagersInterfaceGeneric'
            },
            'clinicaltrialmanagerreview': {
                afterrender: 'prepareManagersInterfaceGeneric'
            },
            'newpremisepostpaymentreview': {
                afterrender: 'prepareManagersInterfaceGeneric'
            },
            'managerevaluationgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            }, 
            'managerassigningafetyalertreportsgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            
            'progressreportmanagerevaluationgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'onlineimpexportmanagersubmissionpnl button[action=process_submission_btn]': {
                click: 'showOnlineManagerApplicationSubmissionWinGeneric'
            },
            'managerinspectionrenewalgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'managerevaluationrenewalgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'managerpostpaymentreviewgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'managerreviewgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'managerreviewrenewalgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'importexportpermitreleasepnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'importexportmanagersubmissionpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'importexportproductsvalidationpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'importexportpremisesvalidationpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'approvalsgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'approvalsalterationgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'approvalfordeskreviewgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'gmpinspectionreportsreviewgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'gmpapprovalsgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'gmpconditionalapprovalsgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },

            'newgmpconditionalapprovals button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'

            },
            'clinicaltrialmanagerassessmentgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'clinicaltrialmanagerauditinggrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },

            'progressreportmanagerreviewgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'clinicaltrialmanagerreviewgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },

            'clinicaltrialapprovalsgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'clinicaltrialcommunicationsgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },

             'approvalproductdataammendgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'productmanagerevaluationgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },




            'pmsmanagerevaluationgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'approvalscancellationgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'gmpcancellationapprovalsgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'gmpaltmanagerevaluationgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'gmpaltmanagerreviewgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'gmpevaluationpanel button[name=process_submission_btn]': {
                click: 'showApplicationSubmissionWithoutValidationWin'
            },
            'gmpalterationapprovalsgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },'controlleddrugsimppermitreleasepnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },'controldrugsimpmanagerevaluationpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },

            
            'newpremiseinspectionpanel button[name=inspection_details]': {
                click: 'showInspectionDetails'
            },
            'newpremiseinspectionpanel toolbar menu menuitem[name=inspection_details]': {
                click: 'showInspectionDetails'
            },
            'newpremiseinspectionpanel toolbar menu menuitem[name=prev_inspections]': {
                click: 'showPrevStructuredChecklistDetails'
            },
            'newpremiseevaluationpanel toolbar menu menuitem[name=inspection_details]': {
                click: 'showInspectionDetails'
            },
            'renewpremiseevaluationpanel toolbar menu menuitem[name=inspection_details]': {
                click: 'showInspectionDetails'
            },
            'renewpremiseinspectionpanel button[name=inspection_details]': {
                click: 'showInspectionDetails'
            },
            'newpremiseinspectionpanel button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },
            'renewpremiseinspectionpanel button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },
            'newpremiseevaluationpanel button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },
            'renewpremiseevaluationpanel button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },
            'newgmpinspectionpanel button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },
            'renewgmpinspectionpanel button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            }, 'gmpdeskreviewprocesspanel button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },
            'clinicaltrialassessmentpanel button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },'progressreportassessmentpanel button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },
            'clinicaltrialauditingpanel button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },
            'gmpevaluationpanel button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },'gmpprovisionalinspectionpanel button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },
            'clinicaltrialauditingpanel toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },
            'newpremiseevaluationpanel toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },
            'renewpremiseevaluationpanel toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },
            'newpremiseinspectionpanel button[name=docs_btn]': {
                click: 'showApplicationUploads'
            },
            'renewpremiseinspectionpanel button[name=docs_btn]': {
                click: 'showApplicationUploads'
            },
            'newpremiseevaluationpanel button[name=docs_btn]': {
                click: 'showApplicationUploads'
            },
            'renewpremiseevaluationpanel button[name=docs_btn]': {
                click: 'showApplicationUploads'
            },
            'newgmpinspectionpanel button[name=docs_btn]': {
                click: 'showApplicationUploads'
            },
            'gmpdeskreviewprocesspanel button[name=docs_btn]': {
                click: 'showApplicationUploads'
            },
            'newgmpdeskreviewprocesspanel button[name=docs_btn]': {
                click: 'showApplicationUploads'
            },
            'renewgmpinspectionpanel button[name=docs_btn]': {
                click: 'showApplicationUploads'
            },
            'approvalrecommendationfrm button[name=save_recommendation]': {
                click: 'saveApplicationApprovalDetails'
            },
            'gmpapprovalrecommendationfrm button[name=save_recommendation]': {
                click: 'saveApplicationApprovalDetails'
            },'gmpconditionalapprovalrecommendationfrm button[name=save_recommendation]': {
                click: 'saveApplicationApprovalDetails'
            },

            'documentssubmissionrecommendationfrm button[name=btn_remarks]': {
                click: 'funcdocumentssubmissionrecommendationfrm'
            },
            

            'clinicaltrialapprovalrecommfrm button[name=save_recommendation]': {
                click: 'saveApplicationApprovalDetails'
            },'promoapprovalrecommendationfrm button[name=save_recommendation]': {
                click: 'saveApplicationApprovalDetails'
            },'clinicaltrialregapprovalrecommfrm button[name=save_recommendation]': {
                click: 'saveApplicationApprovalDetails'
            },

            'paymentsreceptionfrm button[name=save_details]': {
                click: 'saveApplicationPaymentDetails'
            },
            'onlinepremregistrationgrid': {
                refresh: 'refreshOnlinePremiseRegsMainGrids',
                submitApplication: 'submitRejectedOnlineApplication'
            },
            'onlinegmpapplicationsgrid': {
                refresh: 'refreshOnlinePremiseRegsMainGrids',
                submitApplication: 'submitRejectedOnlineApplication'
            },

            'onlineclinicaltrialgrid': {
                refresh: 'refreshOnlinePremiseRegsMainGrids',
                submitApplication: 'submitRejectedOnlineApplication'
            },

            'rejectedonlinepremregistrationgrid': {
                refresh: 'refreshOnlinePremiseRegsMainGrids'
            },

            'newpremiseonlinepreviewwizard button[name=reject_btn]': {
                submitApplication: 'submitRejectedOnlineApplication'
            },
            'altpremiseonlinepreviewwizard button[name=reject_btn]': {
                click: 'submitRejectedOnlineApplication'
            },
            'newgmponlinepreviewwizard button[name=reject_btn]': {
                submitApplication: 'submitRejectedOnlineApplication'
            },
            'clinicaltrialonlinepreviewwizard button[name=reject_btn]': {
                submitApplication: 'submitRejectedOnlineApplication'
            },

            'newpremiseonlinepreviewwizard menu menuitem[name=action_dismiss2]': {
                onlineManagerRejectionApplicationSubmit: 'onlineApplicationManagerRejectionAction'
            },

            'newpremiseonlinepreviewwizard menu menuitem[name=action_approve]': {
                onlineManagerRejectionApplicationSubmit: 'onlineApplicationManagerRejectionAction'
            },

            'onlinesubmissionsfrm button[name=app_submission_btn]': {
                click: 'receiveOnlineApplicationDetails'
            },

            'onlinemanagersubmissionsfrm button[name=app_submission_btn]': {
                click: 'receiveMultipleOnlineApplicationDetails'
            },
            'foodpremdocuploadsgrid': {
                refresh: 'addApplicationBaseParamsWithOpts'
            },
            //
            'foodpremreggrid': {
                refresh: 'refreshApplicationsMainGrids'
            },
            'drugspremreggrid': {
                refresh: 'refreshApplicationsMainGrids'
            },
            'cosmeticspremreggrid': {
                refresh: 'refreshApplicationsMainGrids'
            },
            'meddevicespremreggrid': {
                refresh: 'refreshApplicationsMainGrids'
            },
            'clinicaltrialgrid': {
                refresh: 'refreshApplicationsMainGrids'
            }, 'pharmacovigilancereportingdashgrid': {
                refresh: 'refreshApplicationsMainGrids'
            },

            
            'drugssurveillancegrid': {
                refresh: 'refreshApplicationsMainGrids'
            },
            'foodsurveillancegrid': {
                refresh: 'refreshApplicationsMainGrids'
            },
            'cosmeticssurveillancegrid': {
                refresh: 'refreshApplicationsMainGrids'
            },
            'meddevicessurveillancegrid': {
                refresh: 'refreshApplicationsMainGrids'
            },
            'button[name=upload_file_btn]': {
                click: 'uploadApplicationFile',
                afterrender: 'initializeResumableUpload'
            },
            'disposalverificationuploadsgrid button[name=add_upload]': {
                click: 'showApplicationDocUploadWin'
            },
            
            'importexportdocuploadsgrid button[name=add_upload]': {
                click: 'showApplicationDocUploadWin'
            },
            'premregappdocuploadsgenericgrid button[name=add_upload]': {
                click: 'showApplicationDocUploadWin'
            },
            'gmpappdocuploadsgenericgrid button[name=add_upload]': {
                click: 'showApplicationDocUploadWin'
            },
            'clinicaltrialdocuploadsgenericgrid button[name=add_upload]': {
                click: 'showApplicationDocUploadWin'
            },
            'surveillancedocuploadsgenericgrid button[name=add_upload]': {
                click: 'showApplicationDocUploadWin'
            },
            //the upload functions
            'productEvaluationUploadsGrid button[name=add_upload]': {
                click: 'showApplicationDocUploadWin'
            },
            'productAuditingUploadsGrid button[name=add_upload]': {
                click: 'showApplicationDocUploadWin'
            },
            'productDocUploadsGrid button[name=add_upload]': {
                click: 'showApplicationDocUploadWin'
            },

            'unstructureddocumentuploadsgrid button[name=add_upload]': {
                click: 'showUnstructuredDocUploadWin'
            },

            'productappealapprovalgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'productApprovalTCMeetingGrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'productmanagerauditingpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'clinicaltrialregreviewapplicationgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },

            'productApprovalRecommFrm button[name=save_recommendation]': {
                click: 'saveApplicationApprovalDetails'
            },  'productappealapprovalrecommfrm button[name=save_recommendation]': {
                click: 'saveApplicationApprovalDetails'
            },

            'applicationcommentspnl form button[name=save_comment]': {
                click: 'saveApplicationComment'
            },
            'newProductApprovalPnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
           // gmpmeetingschedulinggrid
           'gmpmeetingschedulinggrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationMeetingSubmissionWinGeneric'
            },
            'gmptcmeetingrecommendationgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationMeetingSubmissionWinGeneric'
            },
            'gmptcmeetingrecommendationpanel button[name=process_submission_btn]': {
                click: 'showManagerApplicationMeetingSubmissionWinGeneric'
            },
            'newProductTcMeetingpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationMeetingSubmissionWinGeneric'
            },
            'newProductTcMeetingpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationMeetingSubmissionWinGeneric'
            },
            'newPremiseTcReviewMeetingpnl button[action=process_submission_btn]': {
                click: 'showPremiseTCReviewSubmissionWinGeneric'
            },
            
            'newPremiseTcMeetingpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
                
            'premisetcreviewreportinspectionreview button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            
            'newPremiseTcapprovalReviewMeetingpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },



            'clinicaltrialmanagermeetinggrid button[action=process_returnsubmission_btn]': {
                click: 'showGridApplicationReturnSubmissionWinGeneric'
            },
            'clinicaltrialmanagermeetinggrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationMeetingSubmissionWinGeneric'
            },'clinicaltrialrecommreviewgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationMeetingSubmissionWinGeneric'
            },
            'clinicaltrialapprovalsgrid button[action=process_returnsubmission_btn]': {
                click: 'showGridApplicationReturnSubmissionWinGeneric'
            },

            'premisetcreviewreportinspectionreview button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },

            'newPremiseTcapprovalReviewMeetingpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'productManagerMeetingGrid button[action=process_returnsubmission_btn]': {
                click: 'showGridApplicationReturnSubmissionWinGeneric'
            },'productApprovalTCMeetingGrid button[action=process_returnsubmission_btn]': {
                click: 'showGridApplicationReturnSubmissionWinGeneric'
            },
            'productApprovalTCMeetingGrid button[action=process_returnsubmission_btn]': {
                click: 'showGridApplicationReturnSubmissionWinGeneric'
            },
            'alterationproductapprovalgrid button[action=process_returnsubmission_btn]': {
                click: 'showGridApplicationReturnSubmissionWinGenericNoMeeting'
            },'tmeetingsampledetailsgrid button[action=process_returnsubmission_btn]': {
                click: 'showGridApplicationReturnSubmissionWinGeneric'
            },
            'newProductTcReviewMeetingpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },

            'onlinequeriesgrid button[action=submit_app]': {
                click: 'submitQueriedOnlineApplication'
            },

            'alterationproductapprovalpnl button[action=process_submission_btn]': {
                click: 'showApprovalApplicationSubmissionWinGeneric'
            },

            'renewalproductapprovalpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },

            'productmanagerauditinggrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },

            'unstructureddocumentuploadsgrid': {
                refresh: 'refreshunstructureddocumentuploadsgrid'
            },

            'unstructureddocumentuploadsfrm button[name=upload_file]': {
                click: 'uploadunstructureddocumentuploads'
            },
            'sampleanalysistestrequestsgrid': {
                refresh: 'refreshsampleanalysistestrequestsgrid'
            },

            'testparameterssgrid': {
                refresh: 'refreshtestparameterssgrid'
            },
            'sampleanalysistestparameterssgrid': {
                refresh: 'refreshsampleanalysistestparameterssgrid'
            },
            'sampleanalysistestresultsgrid': {
                refresh: 'refreshsampleanalysistestresultsgrid'
            },

            'sampleanalysistestrequestsprocessesgrid': {
                refresh: 'refreshsampleanalysistestrequestsprocessesgrid'
            },

            'drugssampleanalysistestrequestswizard button[action=btn_savesampledetails]': {
                click: 'funcSaveSampleDetails'
            },

            'sampleanalysistestrequestswizard button[action=btn_savesampledetails]': {
                click: 'funcSaveSampleDetails'
            },

            'testparameterssgrid button[action=addsampletestparameters]': {
                click: 'funcAddSampleTestParameters'
            },

            'onlineimportexportappsgrid': {
                submitApplication: 'submitRejectedOnlineApplication'
            },
            'disposalpermitsqueryverificationgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'importexportqueryverificationgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'impexppermitsmanagerevaluationgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },

            'impexppermitsmanagerevaluationgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'importexportqueryverificationgrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },
            'disposalpermitsqueryverificationgrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },


            'onlineapplicationrejectionfrm button[name=submit_rejectedapp]': {
                click: 'commitRejectedOnlineApplication'
            },
            'onlinestructuredapplicationqueryfrm button[name=submit_queriedapp]': {
                click: 'commitStructuredQueriedOnlineApplication'
            },

            //promotion materials
            'promotionmaterialmedauditingcheckgrid': {
                refresh: 'refreshScreeningChecklistItemsGrid'
            },

            'promotionmaterialsdocuploadsgenericgrid button[name=add_upload]': {
                click: 'showApplicationDocUploadWin'
            },
            'promotionandadvertqueryverificationgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'promotionmaterialsmanagerevaluationgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'promotionmaterialsmanagerreviewgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            
            'promotionandadvertqueryverificationgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'promotionmaterialsmanagerevaluationgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'promotionandadvertscommunicationsgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'promotionmaterialevaluationcontentpanel button[name=save_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'promotionmaterialevaluationcontentpanel toolbar menu menuitem[name=inspection_details]': {
                click: 'showInspectionDetails'
            },
            'promotionmaterialevaluationcontentpanel toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },
            'promotionmaterialevaluationcontentpanel button[name=docs_btn]': {
                click: 'showApplicationUploads'
            },
            'promotionmaterialevaluationcontentpanel button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },
            'promotionmaterialsmanagerreviewgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            }, 'promotionandadvertqueryverificationgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },

            'promotionandadvertapprovalsgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            }, 'promotionandadvertscommunicationsgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },

            'promotionandadvertapprovalsgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'promotionandadvertscommunicationsgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            
            'newpromotionmaterialwizard button[name=save_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'promotionmaterialapplicationgrid': {
                refresh: 'refreshApplicationsMainGrids'
            },
            'promotionadvertsfoodapplicationgrid': {
                refresh: 'refreshApplicationsMainGrids'
            },
            'promotionadvertcosmeticshomegrid': {
                refresh: 'refreshApplicationsMainGrids'
            },
            'promotionadvertsmedicaldevicesapplicationgrid': {
                refresh: 'refreshApplicationsMainGrids'
            },
            'gmpmeetinggrid': {
                refresh: 'productstcmeetinggridWinRefreshGrid'
            },
            'premisesmeetinggrid': {
                refresh: 'productstcmeetinggridWinRefreshGrid'
            },
            'productstcmeetinggrid': {
                refresh: 'productstcmeetinggridWinRefreshGrid'
            },'surveillancemeetingdetailsgrid': {
                refresh: 'productstcmeetinggridWinRefreshGrid'
            },
            'clinicaltrialrecommreviewgrid': {
                refresh: 'tCMMeetingSchedulingRefreshGrid'
            },
            'clinicaltrialmanagermeetinggrid': {
                refresh: 'tCMMeetingSchedulingRefreshGrid'
            },

            'gmptcmeetingrecommendationgrid': {
                refresh: 'tCMMeetingSchedulingRefreshGrid',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'gmpmeetingschedulinggrid': {
                refresh: 'tCMMeetingSchedulingRefreshGrid',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },'gmptcmeetingrecommendationgrid': {
                refresh: 'tCMMeetingSchedulingRefreshGrid',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'variationrequestsabstractgrid button[name=add_variation]': {
                click: 'showAddApplicationVariationRequest'
            },'appdataammendmentrequestsabstractgrid button[name=add_request]': {
                click: 'showAddAppdataammendmentrequest'
            },'appdataappealrequestsabstractgrid button[name=add_request]': {
                click: 'showAddApplicationVariationRequest'
            },  'newfoodproductreceivingwizard button[name=save_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            }, 'newdrugproductreceivingwizard button[name=save_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            }, 'foodsamplereceivingwizard button[name=save_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'importexportreceivingpermitswizard button[name=save_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'drugnewevaluationpnl button[name=save_evaluationchecklist]': {
                click: 'saveApplicationChecklistDetails'
            },'medicaldevicenewevaluationpnl button[name=save_evaluationchecklist]': {
                click: 'saveApplicationChecklistDetails'
            }, 'drugnewauditingpnl button[name=save_evaluationchecklist]': {
                click: 'saveApplicationChecklistDetails'
            },'medicaldevnewauditingpnl button[name=save_evaluationchecklist]': {
                click: 'saveApplicationChecklistDetails'
            },'disposalpermitverificationwizard button[name=save_evaluationchecklist]': {
                click: 'saveApplicationChecklistDetails'
            },
            'onlinealtmedicalproductreceivingwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },
            'declaredimportexportonlinereceivingwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },
          

            
            'onlinecosmeticsreceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            }, 
            'onlineantisepticproductreceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            }, 'onlinewithdrawaldrugproductreceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            'onlinealtmedicalproductreceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            'promoadvertonlinepreviewwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },
			'onlinedisposalapplicationswizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },
            'promoadvertonlinepreviewwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },'controlleddrugslicensesreceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            'controldrugsimponlinereceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            'onlineordersupplydangerousgoodsreceiving button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            'controldrugsliconlinereceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },'controldrugsimponlinereceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },'alterationcosmeticsproductreceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },

            
             'controldrugsimponlinereceivingwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },'onlineordersupplydangerousgoodsreceiving button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },
            
            'controldrugsliconlinereceivingwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },
            'controldrugsimppermitapprovalpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            
            'controlleddrugsreceivingpermitswizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            }, 'controldrugsimpevaluationpnl button[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },
            'onlinealtdrugproductreceivingwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },
            'onlinealtdrugproductreceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            'newpremiseonlinepreviewwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },
            'newpremiseonlinepreviewwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            'newgmponlinepreviewwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },
            'newgmponlinepreviewwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            'clinicaltrialonlinepreviewwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            }, 'clinicaltrialonlinepreviewwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },
            'clinicaltrialonlineregistrypreviewwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            'clinicaltrialprogressrptonlinepreviewwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },
            'clinicaltrialprogressrptonlinepreviewwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            'renewalpremiseonlinepreviewwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },
            'renewalpremiseonlinepreviewwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            //import permit invoicing details
            'importpermitinvoicingpanel button[name=save_btn]': {
                click: 'impsaveApplicationInvoicingDetails'
            },
            'importpermitinvoicingpanel button[name=commit_btn]': {
                click: 'impsaveApplicationInvoicingDetails'
            },
            'importpermitinvoicingpanel button[name=remove_selected]': {
                click: 'removeimpInvoiceCostElement'
            },
            'importinvoicingcostelementsgrid combo[name=fee_type_id]': {
                change: 'imponInvoiceFeeTypeChange'
            },
            'importinvoicingcostelementsgrid': {
                select: 'impaddInvoiceCostElement',
                beforeselect: 'impbeforeCostElementSelect'
            },
            'importinvoicingcostdetailsgrid': {
                refresh: 'imprefreshInvoiceCostDetailsGrid',
                select: 'imponInvoiceItemSelect',
                deselect: 'imponInvoiceItemDeselect',
                beforeselect: 'impbeforeCostElementSelect',
                beforeedit: 'impbeforeCostElementEdit'
            }, 'importpermitinvoicingpnl button[name=process_submission_btn]': {
                click: 'showImpInvoicingApplicationSubmissionWin'
            }, 'importpermitdeclarationinvoicingpnl button[name=process_submission_btn]': {
                click: 'showImpInvoicingApplicationSubmissionWin'
            },



            'productnotificationmanagerassessmentgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            }, 'productnotificationmanagerassessmentgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            }, 'productnotificationapprovalgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'newpremisereceivingwizard button[name=queries_responses]': {
                click: 'showQueryResponses'
            },
            'newpremiseonlinepreviewwizard button[name=preview_queries_btn]': {
                click: 'previewQueriesFromOnlineApp'
            },
            'newgmponlinepreviewwizard button[name=preview_queries_btn]': {
                click: 'previewQueriesFromOnlineApp'
            },
            'clinicaltrialonlinepreviewwizard button[name=preview_queries_btn]': {
                click: 'previewQueriesFromOnlineApp'
            },
            'applicationunstructuredqueriesgrid': {
                refresh: 'refreshapplicationunstructuredqueriesgrid'
            },
            'productqueryapprovalgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'productqueryapprovalgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'newpremiseonlinepreviewwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },
            'renewalpremiseonlinepreviewwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },
            'altpremiseonlinepreviewwizard button[name=receive_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },
            'promoadvertonlinepreviewwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },


            'newpremiseonlinepreviewwizard menu menuitem[name=action_dismiss1]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },
            'newgmponlinepreviewwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },
            'altgmponlinepreviewwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsNonInvoiceFrmBtn'
            },'cancelgmponlinepreviewwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsNonInvoiceFrmBtn'
            },
            'clinicaltrialonlinepreviewwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },
            'clinicaltrialonlineregistrypreviewwizard button[name=submit_btn]': {
                click: 'submitClinicalRegistryDetailsFrmBtn'
            },
            'clinicaltrialprogressrptonlinepreviewwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },'onlineantisepticproductreceivingwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },'importexportonlinereceivingwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },
            'importexportonlinereceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            'impexplicenseonlinereceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            
            'declaredimportexportonlinereceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            'onlinedrugproductreceivingwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },
            'onlinedrugproductreceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            'onlinemedicaldevicesnotificationrecwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
            'productmanagerevalauditreviewgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            }, 'productsmanagerevalauditreviewpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            }, 'importexportonlinereceivingwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            }, 
            'impexplicenseonlinereceivingwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            }, 
            
            'declaredimportexportonlinereceivingwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },


             'importexportpermitmanagerreviewpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'narcoticsdrugspermitapprovalpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'hospitalcontroldrugspermitapprovalpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'controlleddrugspermitsreceivingwizard button[name=generate_invoice]': {
                click: 'funcGenerateNewApplicationInvoice'
            }, 
            'importexportpermitapprovalpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },'permitdeclarationapprovalreleasepnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },

            'importexportpermitapprovalgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'exportpermitinvoicingpnl button[name=process_submission_btn]': {
                click: 'showImpInvoicingApplicationSubmissionWin'
            },
            'newpremiseevaluationpanel button[name=manager_query]': {
                click: 'showManagerQueries'
            },
            'newpremiseevaluationpanel button[name=manager_queryresp]': {
                click: 'showManagerQueries'
            },
            'newpremisereceivingwizard button[name=manager_query]': {
                click: 'showManagerQueries'
            },'productCertificateReleasePnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },'onlinefoodproductreceivingwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },
            'onlinemedicaldevicesreceivingwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },'onlinedrugproductreceivingwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },'onlinecosmeticsreceivingwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },
            
            
            'productonlinescreeninggrid': {
                refresh: 'refreshOnlineScreeningChecklistItemsGrid'
            },'onlinemedicaldevicesnotificationrecwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            }, 'onlinemedicaldevicesnotificationrecwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },


            'productnotificationscertificatereleasepnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },'onlinewithdrawaldrugproductreceivingwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },'onlinealtdrugproductreceivingwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },'onlinealtmedicalproductreceivingwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },

            'appdataammendmentrequestsabstractgrid': {
                refresh: 'refreshApplicationAmmendementrequestsgrid'
            },
            'appdataappealrequestsabstractgrid': {
                refresh: 'refreshProductsvariationrequestsgrid'
            },

            'productsvariationrequestsgrid': {
                refresh: 'refreshProductsvariationrequestsgrid'
            },'productswithdrawalreasonsgrid': {
                refresh: 'refreshProductsvariationrequestsgrid'
            },
            'productvariationrequestsgrid': {
                refresh: 'refreshProductsvariationrequestsgrid'
            },
            'productvariationrequestsgrid': {
                refresh: 'refreshProductsvariationrequestsgrid'
            },'productwithdrawalreasonsgrid': {
                refresh: 'refreshProductsvariationrequestsgrid'
            },'managerprecheckingqueryprocessgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            }, 'onlinedisposalapplicationswizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            }, 'disposalpermitmangereviewgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },'disposalchecklistgrid': {
                refresh: 'refreshScreeningChecklistItemsGrid'
            },'disposalpermitapprovalgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },'disposalapprovalrecommFrm button[name=save_recommendation]': {
                click: 'saveApplicationApprovalDetails'
            },'disposalpermitapprovalpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'disposalpermitreleasegrd': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },'disposalpermitreleasepnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'disposalpermitsinvoicingpnl button[name=process_submission_btn]': {
                click: 'showImpInvoicingApplicationSubmissionWin'
            }, 'importexportonlinescreeninggrid': {
                refresh: 'refreshOnlineScreeningChecklistItemsGrid'
            },'importexportapprovalrecommfrm button[name=save_recommendation]': {
                click: 'saveSpecialpermitApprovalRecommendation'
            },'permitReleaseRecommFrm button[name=save_recommendation]': {
                click: 'savepermitReleaseRecommendation'
            },

            'foodevaluationpnl  toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },
            'foodproductauditingpnl  toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },
            
            'importexportpermitevaluationpnl button[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },

            'specialcaseapplicationapprovalgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },'drugsamplereceivingwizard button[name=save_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            },'medicaldevicessamplereceivingwizard button[name=save_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            } ,'evaluationcommentsgrid': {
                refresh: 'refreshevaluationcommentsgrid'
            },'drugnewauditingpnl toolbar menu menuitem[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            }, 'drugnewevaluationpnl  toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            }, 'cosmeticsevaluationpnl  toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },
            'cosmeticsproductauditingpnl  toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },
            'safetyalertreportsassessmentpanel button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },
            
            'importexportpermitmanagerreviewwizard button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },
            'importexportpermitmanagerreviewwizard toolbar menu menuitem[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },
            'medicaldevicenewevaluationpnl  toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },'drugnewauditingpnl  toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },'drugnewauditingpnl toolbar menu menuitem[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            },'medicaldevnewauditingpnl  toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },'drugnewauditingpnl  toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },'medicaldevnewauditingpnl toolbar menu menuitem[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            }, 'medicaldevnewauditingpnl  toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            }, 'promotionadvertsevaluationdocpanel  toolbar menu menuitem[name=prev_comments]': {
                click: 'showApplicationCommentsWin'
            },'clinicaltrialauditingpanel toolbar menu menuitem[name=prev_uploads]': {
           //     click: 'showPreviousUploadedDocs'
            },'productCertificateReleasePnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },'alterationproductcertificatereleasepnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },'drugswithdrawalproductcommunicationpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },'drugswithdrawalproductcommunicationpnl button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },'inspectionatownerpremreceivingpnl button[name=process_submission_btn]': {
                click: 'showInvoicingApplicationSubmissionWin'
            },'onlinemedicaldevicesreceivingwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },
            'onlinemedicaldevicesreceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },'onlinefoodproductreceivingwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },'onlinedisposalapplicationswizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },'controlleddrugspermitsreceivingwizard button[name=prechecking_recommendation]': {
                click: 'addReceivingPrecheckingRecommendation'
            },
            'ordersupplydangerousgoodsreceivingwizard button[name=prechecking_recommendation]': {
                click: 'addReceivingPrecheckingRecommendation'
            },
            'managerqueryprocesspnl': {
                afterrender: 'prepareManagerQueryInterfaceGeneric'
            },
            'documentssubmissionrecommendationfrm': {
                afterrender: 'setdocumentssubmissionrecommendationDetails'
            },
            
            
            
            'mednotificationmanagerqueryprocesspnl': {
                afterrender: 'prepareManagerQueryInterfaceGeneric'
            },'productnotprecheckingqueryprocessgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },'drugswithdrawalproductcommunication': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'

            },'onlineantisepticproductreceivingwizard button[name=submit_btn]': {

                click: 'receiveOnlineApplicationDetailsFrmBtn'
            }, 'productevaluationchecklistsGrid': {
                refresh: 'refreshScreeningChecklistItemsGrid'
            },'premisesinspapprovalrecommendationfrm button[name=save_recommendation]': {
                click: 'saveApplicationApprovalDetails'
            },
            //the invoicng functionality
            'onlinemedicaldevicesreceivingwizard button[name=receive_invoicebtn]': {
                click: 'receiveAndInvoiceOnlineApplicationDetailsFrmBtn'
            }, 'onlineapplicationreceiceinvoicefrm button[name=savegenerate_invoice]': {
                click: 'receiveandInvoiceOnlineApplicationDetails'
            },'onlinedrugproductreceivingwizard button[name=receive_invoicebtn]': {
                click: 'receiveAndInvoiceOnlineApplicationDetailsFrmBtn'
            },
            'onlineantisepticproductreceivingwizard button[name=receive_invoicebtn]': {
                click: 'receiveAndInvoiceOnlineApplicationDetailsFrmBtn'
            },//batch approval recommendation
            'clinicaltrialonlinepreviewwizard button[name=receive_invoicebtn]': {
                click: 'receiveAndInvoiceOnlineApplicationDetailsFrmBtn'
            },
            'newpremiseonlinepreviewwizard button[name=receive_invoicebtn]': {
                click: 'receiveAndInvoiceOnlineApplicationDetailsFrmBtn'
            },
            'promoadvertonlinepreviewwizard button[name=receive_invoicebtn]': {
                click: 'receiveAndInvoiceOnlineApplicationDetailsFrmBtn'
            },
            'batchproductapprovalrecommfrm button[name=save_recommendation]': {
                click: 'saveApplicationApprovalDetails'
            },'newgmponlinepreviewwizard button[name=receive_invoicebtn]': {
                click: 'receiveAndInvoiceOnlineApplicationDetailsFrmBtn'
            },'onlinealtdrugproductreceivingwizard button[name=receive_invoicebtn]': {
                click: 'receiveAndInvoiceOnlineApplicationDetailsFrmBtn'
            },'onlinealtmedicalproductreceivingwizard button[name=receive_invoicebtn]': {
                click: 'receiveAndInvoiceOnlineApplicationDetailsFrmBtn'
            }, 'premisesinspectionprocessgrid button[action=process_submission_btn]': {
                click: 'showInspectionApplicationSubmissionWin'
            },
            'ctrgcpinspectionsapplicationsgrid button[action=process_submission_btn]': {
                click: 'showInspectionApplicationSubmissionWin'
            },
            'ctrgcpmanagernpsectionreview button[action=process_submission_btn]': {
                click: 'showApprovalInspectionApplicationSubmissionWin'
            },'ctrgcpapprovalinspectionsapplicationsgrid button[action=process_submission_btn]': {
                click: 'showApprovalInspectionApplicationSubmissionWin'
            },'ctrgcpletterofcomplianceissuancegrid button[action=process_submission_btn]': {
                click: 'showApprovalInspectionApplicationSubmissionWin'
            },'limspaymentinvoicingcostdetailsgrid': {
                refresh: 'refreshInvoiceCostDetailsGrid'
            }, 'labservicessamplepaymentpanel': {
                afterrender: 'prepareLabServicesSamplePaymentPanel'
            },'structuredpmslabscreeningwizard button[name=groupsampleanalysis]': {
                click: 'funcgroupsampleanalysis'
            }, 'previousgmpdocuploadsgrid': {
                refresh: 'refreshpreviousgmpdocuploadsgrid'
            },'productscreeninggrid button[name=savegrid_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'productscreeninggrid button[name=show_screeninghistory_btn]': {
                click: 'showApplicationChecklistRevisions'
            },
            'gmpscreeninggrid button[name=savegrid_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'gmpscreeninggrid button[name=show_screeninghistory_btn]': {
                click: 'showApplicationChecklistRevisions'
            },


          
            'permitevaluationchecklistsgrid button[name=savegrid_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'permitevaluationchecklistsgrid button[name=show_screeninghistory_btn]': {
                click: 'showApplicationChecklistRevisions'
            },
            //clinical trial
            'clinicaltrialscreeninggrid button[name=savegrid_screening_btn]': {
                click: 'saveApplicationChecklistDetails'
            },
            'clinicaltrialscreeninggrid button[name=show_screeninghistory_btn]': {
                click: 'showApplicationChecklistRevisions'
            }, 'checklistresponsescmngrid': {
                beforerender: 'setWorkflowModuleGridsStore',
                showAppQueries: 'showApplicationQueriesWin'
            },  'conductedproductclinicaltrialGrid': {
                refresh: 'findAndAttachAppCodetoStr',
            },
            'productreginothercountriesGrid': {
                refresh: 'findAndAttachAppCodetoStr',
            },
            'inspectioninothercountriesGrid': {
                refresh: 'findAndAttachAppCodetoStr',
            },'controlleddrugsimpmanagerreviewwizrd button[name=submission_remark]': {
                    click: 'viewSubmissionRemark'
                },'controlleddrugsimpmanagerreviewwizrd button[name=comments_btn]': {
                click: 'showApplicationCommentsWin'
            }, 'appinvoicepaymentspanel toolbar menu menuitem[name=generate_invoice]': {
                click: 'funcGenerateNewApplicationInvoice'
            }, 
            'onlineappinvoicepaymentspanel toolbar menu menuitem[name=generate_invoice]': {
                click: 'funcGenerateNewApplicationInvoice'
            }, 
            'uploadedapplicationpaymentsgrid button[name=addmanualpaymentdetails]': {
                click: 'showUploadedApplicationPayments'
            },'uploadedapplicationpaymentsfrm button[name=savepaymentsdetails]': {
                click: 'saveUploadedApplicationPayments'
            },  'paymentinvoicingcostdetailsgrid': {
                refresh: 'refreshInvoiceCostDetailsGrid'
            },
            'onlinepaymentinvoicingcostdetailsgrid': {
                refresh: 'refreshOnlineInvoiceCostDetailsGrid'
            },'applicationqueriesgrid': {
                afterRenderAppqueriesgrid: 'afterRenderAppqueriesgrid'
            },'premisemanagercapasubmissiongrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'premisemanagerreinspectionsubmissiongrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'premisemanagerrejectionsubmissiongrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },'premisemanagercapasubmissiongrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
             'premisemanagerreinspectionsubmissiongrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },'premisemanagerrejectionsubmissiongrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },


            //drugshop
            'drugshopmanagerevaluationgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },
            'drugshopmanagerevaluationgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            }, 
            'drugshopapprovalsgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },

            'drugshopapprovalsgrid button[action=process_submission_btn]': {
                click: 'showManagerApplicationSubmissionWinGeneric'
            },
            'drugshopcommunicationsgrid': {
                refresh: 'addApplicationWorkflowParams',
                moveRowTop: 'moveSelectedRecordRowToTop'
            },

             'newdrugshoponlinepreviewwizard button[name=submit_btn]': {
                click: 'receiveOnlineApplicationDetailsFrmBtn'
            },
             'newdrugshoponlinepreviewwizard button[name=reject_btn]': {
                submitApplication: 'submitRejectedOnlineApplication'
            },
             'newdrugshoponlinepreviewwizard menu menuitem[name=action_dismiss2]': {
                onlineManagerRejectionApplicationSubmit: 'onlineApplicationManagerRejectionAction'
            },

            'newdrugshoponlinepreviewwizard menu menuitem[name=action_approve]': {
                onlineManagerRejectionApplicationSubmit: 'onlineApplicationManagerRejectionAction'
            },
            'newdrugshoponlinepreviewwizard button[name=save_screening_btn]': {
                click: 'saveOnlineApplicationChecklistDetails'
            },
            'newdrugshoponlinepreviewwizard button[name=prechecking_recommendation]': {
                click: 'addPrecheckingRecommendation'
            },
             'newdrugshoponlinepreviewwizard button[name=preview_queries_btn]': {
                click: 'previewQueriesFromOnlineApp'
            },
            'newdrugshoponlinepreviewwizard button[name=receive_invoicebtn]': {
                click: 'receiveAndInvoiceOnlineApplicationDetailsFrmBtn'
            },

            
            

        }
    },
    /**
     * Called when the view is created
     */
    init: function () {

    },


    listen: {
        controller: {
            '*': {// This selector matches any originating Controller, you can specify controller name instead of *
                deleteRecord: 'deleteRecordFromID',
                //unlinkRecord: 'unlinkRecordByColumns',
                setGridTreeStore: 'setGridTreeStore',
                refreshStores: 'refreshGivenStores',
                refreshStoresWithFilters: 'refreshGivenStoresWithFilters',
                checkFullAccess: 'hasFullAccess',
                checkWriteUpdate: 'hasWriteAndUpdate',
                viewApplicationDetails: 'onViewApplicationDetails',
                onViewPersonalPermitApplication:'onViewPersonalPermitApplication',
                viewReceivedApplicationDetails: 'onViewReceivedApplicationDetails',
                viewApplicationMoreDetails: 'viewPredefinedInterfaceApplicationDetails',
                formAuth: 'formAuthentication',
                otherPartsAuth: 'otherPartsAuthentication',
                altFormAuth: 'alterationFormAuthentication',
                showAmendedFormFields: 'showAmendedFormFields',
                showApplicationQueries: 'showApplicationQueries',
                showApplicationQueriesGeneric: 'showApplicationQueriesGeneric',
                showApplicationChecklists: 'showApplicationChecklists',
                gmpOtherPartsAuth: 'gmpOtherPartsAuthentication',
                showApplicationWorkflow: 'showApplicationWorkflow',
                showDocUploadWin: 'showApplicationDocUploadWinGeneric',
                showPrevUploadedDocsWin: 'showPreviousUploadedDocsGeneric',
                showApplicationCommentsWin: 'showApplicationCommentsGeneric',
                setCommonGridsStore: 'setCommonGridsStore',
                showPaymentReceptionForm: 'showPaymentReceptionForm',
                funConfirmUploadedPaymentsDetails:'funConfirmUploadedPaymentsDetails',
                showInvoiceReceipts: 'showInvoiceReceipts',
                funcGenerateNewApplicationInvoice: 'funcGenerateNewApplicationInvoice',
                funcActiveSamplesOtherInformationTab: 'funcActiveSamplesOtherInformationTab',
                funcPrevGridApplicationDocuments: 'funcPrevGridApplicationDocuments',
                saveTCMeetingDetails: 'saveTCMeetingDetails',
                showApplicationDismissalFormGeneric: 'showApplicationDismissalFormGeneric',
                showAddTcMeetingParticipants:'showAddTcMeetingParticipants',
                funcUploadTCMeetingtechnicalDocuments:'funcUploadTCMeetingtechnicalDocuments',
                funcUploadInspectionConceptDocuments:'funcUploadInspectionConceptDocuments',
                funcDOwnloadApplicationVariationDoc:'funcDOwnloadApplicationVariationDoc',
                showGeneralAppAppQueries: 'showGeneralApplicationQueriesWin',
                saveSampleSubmissionRemarks:'saveSampleSubmissionRemarks',
                showTcRecommendationUploads:'showTcRecommendationUploads',
                showApplicationEvaluationUploads:'showApplicationEvaluationUploads' ,showInspectionCAPApplicationQueries:'showInspectionCAPApplicationQueries',
                showPremisesInspectionCAPApplicationQueries:'showPremisesInspectionCAPApplicationQueries',
                showReinspectionRequestswin:'showReinspectionRequestswin',
                showRejectionDetailsRequestswin:'showRejectionDetailsRequestswin',
                doSaveappdatamigrationrequest:'doSaveappdatamigrationrequest',
                doUploadappdatamigrationrequest:'doUploadappdatamigrationrequest'

            }
        }
    },showRejectionDetailsRequestswin: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            childItemXtype = 'applicationrejectiondetailsgrid',
            childItem;
            
            childItem = Ext.widget(childItemXtype);
            childItem.down('hiddenfield[name=application_code]').setValue(application_code);
            childItem.setHeight(450);
            funcShowCustomizableWindow(' Rejection Details Request', '85%', childItem, 'customizablewindow');
    },
    doSaveappdatamigrationrequest: function (btn) {
        var me = this,
            url = btn.action_url,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            grid = activeTab.down('grid'),
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            store= grid.getStore(),
            frm = form.getForm();

        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {model: table},
                waitMsg: 'Please wait...',
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        store.removeAll();
                        store.load();
                        //me.workflowBackToDashboard(btn);
                        toastr.success(message, "Success Response");
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },
    doUploadappdatamigrationrequest: function (btn) {
        var me = this,
            url = btn.action_url,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            grid = activeTab.down('grid'),
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            store= grid.getStore(),
            frm = form.getForm();

        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {model: table},
                waitMsg: 'Please wait...',
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        store.removeAll();
                        store.load();
                        //me.workflowBackToDashboard(btn);
                        toastr.success(message, "Success Response");
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
        
    },
    showReinspectionRequestswin: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            ref_no = record.get('reference_no'),
            workflow_stage_id = record.get('workflow_stage_id'),
            application_code = record.get('application_code'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            assessment_procedure_id = record.get('assessment_procedure_id'),
            classification_id = record.get('classification_id'),
            prodclass_category_id = record.get('prodclass_category_id'),
            product_subcategory_id = record.get('product_subcategory_id'),
            product_origin_id = record.get('product_origin_id'),
            application_status_id = record.get('application_status_id'),
            section_id = record.get('section_id'),
            childXtype = item.childXtype,
            childItemXtype = 'reinspectionsrequestsgrid',//allqueriesgrid
            childItem;
            
            childItem = Ext.widget(childItemXtype);
            childItem.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            childItem.down('hiddenfield[name=application_code]').setValue(application_code);
            childItem.down('hiddenfield[name=module_id]').setValue(module_id);
            childItem.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            childItem.down('hiddenfield[name=section_id]').setValue(section_id);
           // childItem.down('hiddenfield[name=is_manager_query]').setValue(is_manager_query);
            childItem.down('hiddenfield[name=assessment_procedure_id]').setValue(assessment_procedure_id);
            childItem.down('hiddenfield[name=classification_id]').setValue(classification_id);
            childItem.down('hiddenfield[name=prodclass_category_id]').setValue(prodclass_category_id);
            childItem.down('hiddenfield[name=product_subcategory_id]').setValue(product_subcategory_id);
            childItem.down('hiddenfield[name=product_origin_id]').setValue(product_origin_id);
            childItem.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
            funcShowCustomizableWindow(ref_no + ' Re-Inspection Request', '85%', childItem, 'customizablewindow');
    },
    showInspectionCAPApplicationQueries: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            is_manager_query = grid.is_manager_query,
            is_manager_query_response = grid.is_manager_query_response,
            record = btn.getWidgetRecord(),
            ref_no = record.get('reference_no'),
            workflow_stage_id = record.get('workflow_stage_id'),
            application_code = record.get('application_code'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            assessment_procedure_id = record.get('assessment_procedure_id'),
            classification_id = record.get('classification_id'),
            prodclass_category_id = record.get('prodclass_category_id'),
            product_subcategory_id = record.get('product_subcategory_id'),
            product_origin_id = record.get('product_origin_id'),
            application_status_id = record.get('application_status_id'),
            section_id = record.get('section_id'),
            childXtype = item.childXtype,
            childItemXtype = 'inspectionscaparequestsgrid',//allqueriesgrid
            childItem;
            
            childItem = Ext.widget(childItemXtype);
            childItem.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            childItem.down('hiddenfield[name=application_code]').setValue(application_code);
            childItem.down('hiddenfield[name=module_id]').setValue(module_id);
            childItem.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            childItem.down('hiddenfield[name=section_id]').setValue(section_id);
           // childItem.down('hiddenfield[name=is_manager_query]').setValue(is_manager_query);
            childItem.down('hiddenfield[name=assessment_procedure_id]').setValue(assessment_procedure_id);
            childItem.down('hiddenfield[name=classification_id]').setValue(classification_id);
            childItem.down('hiddenfield[name=prodclass_category_id]').setValue(prodclass_category_id);
            childItem.down('hiddenfield[name=product_subcategory_id]').setValue(product_subcategory_id);
            childItem.down('hiddenfield[name=product_origin_id]').setValue(product_origin_id);
            childItem.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
         //   childItem.down('hiddenfield[name=is_manager_query_response]').setValue(is_manager_query_response);
            funcShowCustomizableWindow(ref_no + ' CAPA Request(Corrective and Preventive Actions (CAPA) )', '85%', childItem, 'customizablewindow');
    },
    showPremisesInspectionCAPApplicationQueries: function (btn) {
         var mainTabPnl = btn.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            ref_no = activeTab.down(' displayfield[name=reference_no]').getValue();
           
            childItemXtype = 'inspectionscaparequestsgrid';//allqueriesgrid
            
            childItem = Ext.widget(childItemXtype);
            childItem.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            childItem.down('hiddenfield[name=application_code]').setValue(application_code);
            childItem.down('hiddenfield[name=module_id]').setValue(module_id);
            childItem.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            childItem.down('hiddenfield[name=section_id]').setValue(section_id);

            funcShowCustomizableWindow(ref_no + ' CAPA Request(Corrective and Preventive Actions (CAPA) )', '85%', childItem, 'customizablewindow');
    },
    
showApplicationEvaluationUploads:function(btn){

 
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            isWin = btn.isWin,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
            
        child.setHeight(450);
        child.down('button[name=add_upload]').isWin = isWin;

        var  mainTabPnl = btn.up('#contentPanel'),
        activeTab = mainTabPnl.getActiveTab(),
        section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
        module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
        sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
        workflow_stage = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
        application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
        application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();


        child.down('hiddenfield[name=section_id]').setValue(section_id);
        child.down('hiddenfield[name=module_id]').setValue(module_id);
        child.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        child.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage);
        child.down('hiddenfield[name=application_code]').setValue(application_code);
      
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');

        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }

    } ,showTcRecommendationUploads: function (item) {

        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            childXtype = item.childXtype,
            isReadOnly = item.isReadOnly,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            storeArray = eval(item.stores),
            arrayLength = storeArray.length,
            childObject = Ext.widget(childXtype),
            tc_reviewform = childObject.down('form'),
            application_upload = childObject.down('productEvaluationUploadsGrid');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        tc_reviewform.down('hiddenfield[name=application_code]').setValue(application_code);
        tc_reviewform.down('hiddenfield[name=id]').setValue(record.get('recomm_id'));
        tc_reviewform.down('combo[name=decision_id]').setValue(record.get('decision_id'));
        tc_reviewform.down('textarea[name=comments]').setValue(record.get('comments'));
        if(isReadOnly){
            tc_reviewform.down('button[name=save_tcrecommendation]').setVisible(false);
            tc_reviewform.down('combo[name=decision_id]').setReadOnly(true);
            tc_reviewform.down('textarea[name=comments]').setReadOnly(true);
            
        }
        application_upload.down('hiddenfield[name=process_id]').setValue(record.get('process_id'));
        application_upload.down('hiddenfield[name=module_id]').setValue(record.get('module_id'));
        application_upload.down('hiddenfield[name=sub_module_id]').setValue(record.get('sub_module_id'));
        application_upload.down('hiddenfield[name=section_id]').setValue(record.get('section_id'));
        application_upload.down('hiddenfield[name=workflow_stage_id]').setValue(record.get('workflow_stage_id'));
        application_upload.down('hiddenfield[name=application_code]').setValue(record.get('application_code'));
        application_upload.down('hiddenfield[name=prodclass_category_id]').setValue(record.get('prodclass_category_id'));
        childObject.setHeight(400);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    
    afterRenderAppqueriesgrid:function(grid){

            
            var isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
            pass_status = grid.down('hiddenfield[name=pass_status]').getValue(),
            module_id =grid.down('hiddenfield[name=module_id]').getValue(),
            add_btn = grid.down('button[name=add_query]');
        if(module_id <1){
            var mainTabPnl = this.getMainTabPanel(),
            containerPnl = mainTabPnl.getActiveTab(),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();
            sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue();
            workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue();
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue();
            process_id = containerPnl.down('hiddenfield[name=process_id]').getValue();
          
            grid.down('hiddenfield[name=module_id]').setValue(module_id);
            grid.down('hiddenfield[name=application_code]').setValue(application_code);
            grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            grid.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            grid.down('hiddenfield[name=section_id]').setValue(section_id);
            grid.down('hiddenfield[name=process_id]').setValue(process_id);
            var store = grid.getStore();
            store.removeAll();
            store.load();

        }
        if ((isReadOnly) && isReadOnly > 0) {
            add_btn.setVisible(false);
            grid.columns[grid.columns.length - 1].widget.menu.items = [
                {
                    text: 'Previous Responses',
                    iconCls: 'x-fa fa-exchange',
                    handler: 'showQueryPrevResponses',
                    stores: '[]'
                }];
        } else {
            if (pass_status == 1 || pass_status === 1) {

            } else {
                add_btn.setVisible(true);
                grid.columns[grid.columns.length - 1].widget.menu.items = [
                    {
                        text: 'Edit Query',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Record',
                        action: 'edit',
                        childXtype: 'applicationRaiseQueryPnl',
                        winTitle: 'Query',
                        winWidth: '70%',
                        handler: 'showEditApplicationQueryForm',
                        stores: '[]',
                        hidden: true
                    }, {
                        text: 'Previous Responses',
                        iconCls: 'x-fa fa-exchange',
                        disabled: true,
                        hidden: true,
                        handler: 'showQueryPrevResponses',
                        stores: '[]'
                    }, {
                        text: 'Approve/Close Query',
                        iconCls: 'x-fa fa-check',
                        table_name: 'checklistitems_queries',
                        storeID: 'applicationqueriesstr',
                        action: 'close_query',
                        action_url: 'api/closeApplicationQuery',
                        handler: 'closeApplicationQuery',
                        hidden: true
                    },{
                        text: 'Print Query Letter',
                        iconCls: 'x-fa fa-print',
                        tooltip: 'Preview query Letter',
                        action: 'preview_query',
                        handler: 'showPreviewQueryLetter',
                        stores: '[]',
                        // hidden: true
                    }, {
                        text: 'Re-Query',
                        iconCls: 'x-fa fa-reply',
                        action: 're_query',
                        handler: 'showEditApplicationQueryForm',
                        stores: '[]',
                        hidden: true
                    },{
                        text: 'Delete Query',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'checklistitems_queries',
                        storeID: 'applicationqueriesstr',
                        action_url: 'api/deleteChecklistRaisedQuery',
                        action: 'actual_delete',
                        handler: 'deleteChecklistRaisedQuery',
                        hidden: true
                    }];
            }
        }


    },
    setdocumentssubmissionrecommendationDetails:function(frm){
        var  application_id = frm.down('hiddenfield[name=application_id]').getValue(),
             application_code = frm.down('hiddenfield[name=application_code]').getValue();


             Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/getdocumentssubmissionrecommendation',
                params: {
                    application_id: application_id,
                    application_code: application_code
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        success = resp.success,
                        message = resp.message,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            frm.loadRecord(model);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
    },
    funcdocumentssubmissionrecommendationfrm: function (btn) {
        var me = this,
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm();

        frm.submit({
            //clientValidation: false,
            url: 'productregistration/savedocumentssubmissionrecommendation',
            waitMsg: 'Saving the Details ...',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (fm, action) {

                var response = Ext.decode(action.response.responseText),
                    message = response.message,
                    success = response.success;
                if (success == true || success === true) {
                    toastr.success(message, 'Success Response');
                    win.close();
                } else {
                    toastr.error(message, 'Failure Response');
                }

            },
            failure: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    message = response.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },
        saveSampleSubmissionRemarks:function(btn){

        var mainTabPnl = btn.up('#contentPanel'),
        containerPnl = mainTabPnl.getActiveTab(),
        application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
        application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();
        module_id = containerPnl.down('hiddenfield[name=module_id]').getValue();
  
        var childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childXtype = Ext.widget(childXtype);
           
        funcShowCustomizableWindow(winTitle, winWidth, childXtype, 'customizablewindow');

        childXtype.down('hiddenfield[name=application_id]').setValue(application_id);
        childXtype.down('hiddenfield[name=application_code]').setValue(application_code);
        childXtype.down('hiddenfield[name=module_id]').setValue(module_id);


    },
    // saveSampleSubmissionRemarks:function(btn){

    //     var mainTabPnl = btn.up('#contentPanel'),
    //     containerPnl = mainTabPnl.getActiveTab(),
    //     application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
    //     application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();
    //     module_id = containerPnl.down('hiddenfield[name=module_id]').getValue();
  
    //     var childXtype = btn.childXtype,
    //         winTitle = btn.winTitle,
    //         winWidth = btn.winWidth,
    //         isReadOnly = btn.isReadOnly,
    //         childXtype = Ext.widget(childXtype)
    //         //form = childXtype.down('form');
    //         //get the recommendations 
    //         Ext.Ajax.request({
    //             method: 'GET',
    //             url: 'getSampleSubmissionRemarks',
    //             params: {
    //                 application_id: application_id,
    //                 application_code: application_code
    //             },
    //             headers: {
    //                 'Authorization': 'Bearer ' + access_token
    //             },
    //             success: function (response) {
    //                 Ext.getBody().unmask();
    //                 var resp = Ext.JSON.decode(response.responseText),
    //                     success = resp.success,
    //                     message = resp.message,
    //                     results = resp.results,
    //                     model = Ext.create('Ext.data.Model', results);
    //                 if (success == true || success === true) {
    //                     if(results){
    //                         childXtype.loadRecord(model);
    //                     }
    //                 }

    //                 funcShowCustomizableWindow(winTitle, '65%', childXtype, 'customizablewindow');
                    
    //                 if(isReadOnly){
    //                     childXtype.down('textarea[name=remarks]').setReadOnly(true);
    //                     childXtype.down('combo[name=document_status_id]').setReadOnly(true);
    //                     childXtype.down('button[name=btn_remarks]').setVisible(false);

    //                 }
    //                 childXtype.down('hiddenfield[name=application_id]').setValue(application_id);
    //                 childXtype.down('hiddenfield[name=application_code]').setValue(application_code);
    //                 childXtype.down('hiddenfield[name=module_id]').setValue(module_id);

    //             },
    //             failure: function (response) {
    //                 Ext.getBody().unmask();
    //                 var resp = Ext.JSON.decode(response.responseText),
    //                     message = resp.message;
    //                 toastr.error(message, 'Failure Response');
    //             },
    //             error: function (jqXHR, textStatus, errorThrown) {
    //                 Ext.getBody().unmask();
    //                 toastr.error('Error: ' + errorThrown, 'Error Response');
    //             }
    //         });
       

    // } ,
    
    
    
    
    showGeneralApplicationQueriesWin: function (btn) {
        var mainTabPanel =this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            grid = Ext.widget('applicationqueriesgrid'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        //check for unsaved store
        var check = false;
        
        grid.down('hiddenfield[name=module_id]').setValue(module_id);
        grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        grid.down('hiddenfield[name=section_id]').setValue(section_id);
        grid.down('hiddenfield[name=application_code]').setValue(application_code);
        grid.down('hiddenfield[name=process_id]').setValue(process_id);
        grid.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        funcShowCustomizableWindow('Request for Additional Information Wizard', '70%', grid, 'customizablewindow');
    },showInvoiceReceipts: function(invoice_no){
        var grid = Ext.widget('applicationpaymentsreceiptsGrid');
        console.log(grid);
        grid.down('hiddenfield[name=invoice_no]').setValue(invoice_no);
        funcShowCustomizableWindow(invoice_no+' - Payment Receipts', '70%', grid, 'customizablewindow');
    },



    refreshOnlineInvoiceCostDetailsGrid:function(me){
        var found = 0,
             grid = me.up('grid'),
            application_feetype_id = grid.application_feetype_id,
            win = me.up('window');
            if(win.down('hiddenfield[name=active_application_code]')){
                var store = me.getStore(),
                    application_code = win.down('hiddenfield[name=active_application_code]').getValue();
                if(application_code){
                    found = 1;
                }
            }
        if(store){
            store.getProxy().extraParams = {
               // invoice_id: invoice_id,
                application_code: application_code,
                application_feetype_id:application_feetype_id
            };
        }
        
    },
    refreshInvoiceCostDetailsGrid: function (me) {
        var found = 0,
            grid = me.up('grid'),
        application_feetype_id = grid.application_feetype_id;
        if(me.up('paymentspanel')){
            if(me.up('paymentspanel').up('panel').down('hiddenfield[name=active_application_code]')){
                var store = me.getStore(),
                    popview = me.up('paymentspanel').up('panel'),
                    application_id = popview.down('hiddenfield[name=active_application_id]').getValue(),
                    //invoice_id = popview.down('hiddenfield[name=invoice_id]').getValue(),
                    application_code = popview.down('hiddenfield[name=active_application_code]').getValue();
                if(application_code){
                    found = 1;
                }
            }
            else if(me.up('paymentspanel').up('panel').up('panel').down('hiddenfield[name=active_application_code]')){
                var store = me.getStore(),
                    popview = me.up('paymentspanel').up('panel').up('panel'),
                    application_id = popview.down('hiddenfield[name=active_application_id]').getValue(),
                    //invoice_id = popview.down('hiddenfield[name=invoice_id]').getValue(),
                    application_code = popview.down('hiddenfield[name=active_application_code]').getValue();
                if(application_code){
                    found = 1;
                }
            }
        }

        if(found == 0 ){
            var store = me.store,
                mainTabPanel = this.getMainTabPanel(),
                activeTab = mainTabPanel.getActiveTab();
            if(activeTab.down('hiddenfield[name=active_application_code]').getValue()){
                application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            }else{
                
                return false;
               // invoice_id = activeTab.down('hiddenfield[name=invoice_id]').getValue();
            }
                
        }
        this.fireEvent('func_check_balance', application_code);
        if(store){
            store.getProxy().extraParams = {
               // invoice_id: invoice_id,
                application_code: application_code,
                application_feetype_id:application_feetype_id
            };
        }
        
    }, saveUploadedApplicationPayments: function (btn) {
        var me = this,
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm(),
            storeID = btn.storeID,
            uploads_store = Ext.getStore(storeID);
        frm.submit({
            //clientValidation: false,
            url: 'documentmanagement/saveUploadedApplicationPayments',
            waitMsg: 'Uploading...',
            success: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    message = response.message,
                    success = response.success;
                if (success == true || success === true) {
                    toastr.success(message, 'Success Response');
                    console.log(uploads_store)
					uploads_store.removeAll();
                    uploads_store.load();
                    win.close();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    message = response.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    }, showUploadedApplicationPayments:function(btn){
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            frm = Ext.widget('uploadedapplicationpaymentsfrm');
            frm.down('hiddenfield[name=application_code]').setValue(application_code);
            funcShowCustomizableWindow("Upload Proof of Payments Details", "50%", frm, 'customizablewindow');

    },showInspectionEvalautionHistory: function(btn, application_code){
        var child = Ext.widget(btn.childXtype);
        child.down('hiddenfield[name=application_code]').setValue(application_code);
        funcShowCustomizableWindow(btn.winTitle, btn.winWidth, child, 'customizablewindow');
    }, showManagerApplicationSubmissionWinGeneric: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            valid = true,
            is_dataammendment_request =0,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
            if(activeTab.down('hiddenfield[name=is_dataammendment_request]')){
                is_dataammendment_request =activeTab.down('hiddenfield[name=is_dataammendment_request]').getValue();
            }
            
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, storeID,'','','',workflow_stage_id,is_dataammendment_request);
         
        } else {
            Ext.getBody().unmask();
        }
    },showOnlineManagerApplicationSubmissionWinGeneric: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
           
            storeID = btn.storeID,
            winWidth = btn.winWidth,
            win = btn.up('window'),
            gridXtype = btn.up('grid'),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            status_type_id = win.down('hiddenfield[name=status_type_id]').getValue(),
            application_status_id = win.down('hiddenfield[name=application_status_id]').getValue(),
          
            table_name = getApplicationTable(module_id);
            action_type =0;
            is_multi_submission = 2;
            if(gridXtype.down('combo[name=has_registered_outlets]')){
                var has_registered_outlets = gridXtype.down('combo[name=has_registered_outlets]').getValue();
                if(has_registered_outlets < 1){
                    toastr.warning('Select the Has Registered premises/outlet option before submission!!', 'Warning Response');
                            Ext.getBody().unmask();
                            return false;
                }
                if(has_registered_outlets ==2){
                    is_multi_submission = 1;
                }
                
            }
            extraParams = [
                {
                    field_type: 'hiddenfield',
                    field_name: 'table_name',
                    value: table_name
                }, {
                    field_type: 'hiddenfield',
                    field_name: 'application_status_id',
                    value: application_status_id
                }, {
                    field_type: 'hiddenfield',
                    field_name: 'status_type_id',
                    value: status_type_id
                }, {
                    field_type:'hiddenfield',
                    field_name:'action_type',
                    value:action_type
                }, {
                    field_type:'hiddenfield',
                    field_name:'action_type',
                    value:action_type
                }, {
                    field_type:'hiddenfield',
                    field_name:'is_multi_submission',
                    value:is_multi_submission
                }
            ];

            showOnlineSubmissionWin('', '', module_id, sub_module_id, section_id, 'onlinemanagersubmissionsfrm', winWidth, storeID, '', status_type_id, extraParams,'','importexportpermitmanagersubgrid',is_multi_submission);
           
            Ext.getBody().unmask();
    },
    receiveOnlineApplicationDetailsFrmBtn: function (btn) {

        Ext.getBody().mask('Please wait...');
        var storeID = btn.storeID,
            winWidth = btn.winWidth,
            win = btn.up('window'),
            is_invoicecheck = btn.is_invoicecheck,
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            status_type_id = win.down('hiddenfield[name=status_type_id]').getValue(),
            application_status_id = win.down('hiddenfield[name=application_status_id]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            table_name = getApplicationTable(module_id);
            action_type =0;
          
            extraParams = [
                {
                    field_type: 'hiddenfield',
                    field_name: 'table_name',
                    value: table_name
                }, {
                    field_type: 'hiddenfield',
                    field_name: 'application_code',
                    value: application_code
                }, {
                    field_type: 'hiddenfield',
                    field_name: 'application_status_id',
                    value: application_status_id
                }, {
                    field_type: 'hiddenfield',
                    field_name: 'status_type_id',
                    value: status_type_id
                }, {
                    field_type: 'hiddenfield',
                    field_name: 'has_queries',
                    value: hasQueries
                },{
                    field_type:'hiddenfield',
                    field_name:'action_type',
                    value:action_type
                }
            ];
            if(!hasQueries){
                //skip some modules
                if(is_invoicecheck){
                    invoiceIsGenerated = checkGeneratedInvoiceDetails(application_code, module_id,sub_module_id,section_id);
                    // if(!invoiceIsGenerated){
                    //         toastr.warning('Receive and Generate Invoice, to proceed!!', 'Warning Response');
                    //         Ext.getBody().unmask();
                    //         return false;

                    // }
                }


            }
            if(win.down('combo[name=applicable_checklist]')){
                checklist_category_id = win.down('combo[name=applicable_checklist]').getValue();
                hasValidatedChecklist = checkOnlineApplicationChecklistDetails(application_code, module_id,sub_module_id,section_id,checklist_category_id);
                // if(!hasValidatedChecklist){

                //     toastr.warning('Fill in all the checklist details to proceed!!', 'Warning Response');
                //     Ext.getBody().unmask();
                //     return false;

                // }

            }//needs_re
            if(win.down('button[name=prechecking_recommendation]')){
                hasPrecheckingrecommendation = checkPrecheckingrecommendation(application_code, module_id);
                // if(!hasPrecheckingrecommendation){
                //     toastr.warning('Add Prechecking Recommendation to proceed.', 'Warning Response');
                //     Ext.getBody().unmask();
                //     return false;
                // }

            }
        showOnlineSubmissionWin(application_id, application_code, module_id, sub_module_id, section_id, 'onlinesubmissionsfrm', winWidth, storeID, tracking_no, status_type_id, extraParams, hasQueries,action_type);
        Ext.getBody().unmask();
    },
    
    
    showManagerApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            valid = true,
            is_dataammendment_request =0,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
            if(activeTab.down('hiddenfield[name=is_dataammendment_request]')){
                is_dataammendment_request =activeTab.down('hiddenfield[name=is_dataammendment_request]').getValue();
            }
            
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, storeID,'','','',workflow_stage_id,is_dataammendment_request);
         
        } else {
            Ext.getBody().unmask();
        }
    },
    viewSubmissionRemark: function(btn){
        var mainTabPanel = this.getMainTabPanel(),
            panel = mainTabPanel.getActiveTab(),
            application_code = panel.down('hiddenfield[name=active_application_code]').getValue(),
            child = Ext.widget('submissionRemarksViewFrm'); 

         Ext.Ajax.request({
            url: 'workflow/getApplicationSubmissionRemarks',
            params: {
                application_code: application_code,
                _token: token
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                    results = resp.results;
                if (success || success == true || success === true) {
                   var model = Ext.create('Ext.data.Model', results);
                    child.loadRecord(model);
                    funcShowCustomizableWindow("Submission Remark", '40%', child, 'customizablewindow');
                } else {
                    toastr.error(message, 'Failure Response!!');
                }
            },
            failure: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.warning(message, 'Failure Response!!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });

    },  showManagerQueryApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagerqueryfrm', winWidth, storeID,'','','',workflow_stage_id);
           
        } else {
            Ext.getBody().unmask();
        }
    },
    showManagerApplicationSubmissionWinGeneric: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            valid = true,
            is_dataammendment_request =0,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
            if(activeTab.down('hiddenfield[name=is_dataammendment_request]')){
                is_dataammendment_request =activeTab.down('hiddenfield[name=is_dataammendment_request]').getValue();
            }
            
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, storeID,'','','',workflow_stage_id,is_dataammendment_request);
         
        } else {
            Ext.getBody().unmask();
        }
    }, showResearchOrgListGrid: function(item){
        var me = this,
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            grid = Ext.widget(childXtype);
        grid.down('hiddenfield[name=callerRef]').setValue(item.callerRef);
        funcShowCustomizableWindow(winTitle, winWidth, grid, 'customizablewindow');
    },findAndAttachAppCodetoStr: function(caller, table_name){
        var grid = caller.up('grid'),
                store = caller.getStore(),
                panel = grid.up('panel'),
                cpanel = panel.up('panel'),
                wrapper = cpanel.up('panel'),
                application_code;
        if(wrapper.down('hiddenfield[name=active_application_code]')){
            var application_code = wrapper.down('hiddenfield[name=active_application_code]').getValue();
                filters = JSON.stringify({application_code: application_code});
        }else{
            var mainTabPanel = this.getMainTabPanel(),
                panel = mainTabPanel.getActiveTab(),
                store = grid.getStore(),
                application_code = panel.down('hiddenfield[name=active_application_code]').getValue(),
                filters = JSON.stringify({application_code: application_code});
        }
        store.getProxy().extraParams = {
            filters: filters,
            table_name: table_name,
            application_code: application_code
        }
    },  addReceivingPrecheckingRecommendation:function(btn){
        var me = this,
          mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
          application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

          var me = this,
          childXtype = 'precheckingrecommendationfrm',
          winTitle = 'Prechecking Recommendation',
          winWidth = '40%',
          child = Ext.widget(childXtype);
          child.down('hiddenfield[name=application_code]').setValue(application_code);

      funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
  },funcGenerateNewApplicationInvoice: function(btn){
        var payment_pnl = btn.viewType,
         payment_pnl=  Ext.widget(payment_pnl);
        //cost parameters 
        var mainTabPanel = this.getMainTabPanel(),
            panel = mainTabPanel.getActiveTab();

            if(!panel.down('hiddenfield[name=active_application_id]')){
                var panel = btn.up('window')


            }
            application_id = panel.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = panel.down('hiddenfield[name=active_application_code]').getValue(),
            section_id = panel.down('hiddenfield[name=section_id]').getValue(),
            module_id = panel.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue(),
            fasttrack_option_id= btn.fasttrack_option_id,
            application_feetype_id = btn.application_feetype_id;
        //pass variables
         if(panel.down('combo[name=fasttrack_option_id]')){
            fasttrack_option_id = panel.down('combo[name=fasttrack_option_id]').getValue();
        }
        payment_pnl.down('hiddenfield[name=application_id]').setValue(application_id);
        payment_pnl.down('hiddenfield[name=application_code]').setValue(application_code);
      
        payment_pnl.down('hiddenfield[name=module_id]').setValue(module_id);
        payment_pnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
         payment_pnl.down('hiddenfield[name=section_id]').setValue(section_id);
        payment_pnl.down('hiddenfield[name=application_feetype_id]').setValue(application_feetype_id);
        payment_pnl.down('hiddenfield[name=fasttrack_option_id]').setValue(fasttrack_option_id);
        payment_pnl.setHeight(650);
        funcShowCustomizableWindow('Invoice Quotation', '75%', payment_pnl, 'customizablewindow');
    }, showApplicationChecklistRevisions: function(btn){
        var mainTabPanel = this.getMainTabPanel(),
            panel = mainTabPanel.getActiveTab(),
            grid = btn.up('grid'),
            workflow_stage_id = panel.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_code = panel.down('hiddenfield[name=active_application_code]').getValue(),
            child = Ext.widget('checklistRevisionsGrid');
        child.is_auditor_checklist = grid.is_auditor_checklist;
        child.down('hiddenfield[name=application_code]').setValue(application_code);
        child.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);

        funcShowCustomizableWindow('Checklist Revisions', '70%', child, 'customizablewindow');
    },refreshpreviousgmpdocuploadsgrid: function (me) {

        var grid = me.up('grid'),
            store = grid.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();

        //check if has been set or use window
        if (me.up('window')) {

                var panel = me.up('window'),
                    application_code = panel.down('hiddenfield[name=active_application_code]').getValue();
                    module_id = panel.down('hiddenfield[name=module_id]').getValue(),
                    section_id = panel.down('hiddenfield[name=section_id]').getValue(),
                    sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue();

        }
        else {

            var application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue();


        }

        store.getProxy().extraParams = {
            application_code: application_code
        };

    }, 
    funcgroupsampleanalysis:function(btn){
        var mainTabPanel = btn.up('#contentPanel'),
            childObject = btn.childObject,
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            analysis_type_id = activeTab.down('hiddenfield[name=analysis_type_id]').getValue(),
            viewtype = 'groupsampleanalysispnl',
            title = 'Group Sample Submissions';
            var tab = mainTabPanel.getComponent('viewtype');

            if (!tab) {//
                var newTab = Ext.widget(viewtype, {
                    title: title,
                    id: viewtype,
                    closable: true
                });
                mainTabPanel.add(newTab);
            }
            else{

                mainTabPanel.setActiveTab(tab);

            }

            var lastTab = mainTabPanel.items.length - 1;
            mainTabPanel.setActiveTab(lastTab);
            panel = mainTabPanel.getActiveTab();

            panel.down('hiddenfield[name=section_id]').setValue(section_id);
            panel.down('hiddenfield[name=analysis_type_id]').setValue(analysis_type_id);
    },
    prepareLabServicesSamplePaymentPanel:function(table_name){
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoice_id = activeTab.down('hiddenfield[name=invoice_id]'),
            invoice_no = activeTab.down('displayfield[name=invoice_no]'),
            running_balance = activeTab.down('displayfield[name=running_balance]'),
            invoiceSummaryGrid = activeTab.down('limspaymentinvoicingcostdetailsgrid'),
            invoiceSummaryStore = invoiceSummaryGrid.getStore(),
            paymentsGrid = activeTab.down('limsapplicationpaymentsgrid'),
            paymentsStore = paymentsGrid.getStore(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        if (application_code) {
            paymentsStore.removeAll();
            paymentsStore.load({
                params: {
                    application_id: application_id,
                    application_code: application_code
                }
            });
            Ext.Ajax.request({
                method: 'GET',
                url: 'sampleanalysis/prepareLabServicesSamplePaymentPanel',
                params: {
                    application_id: application_id,
                    application_code: application_code
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        balance = resp.balance,
                        invoice_amount = resp.invoice_amount,
                        results = resp.results,
                        txt;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        if (Math.abs(parseFloat(balance)) == parseFloat(invoice_amount) || Math.abs(parseFloat(balance)) === parseFloat(invoice_amount)) {
                            txt = ' (Not Paid)';
                        } else if (parseFloat(balance) > 0) {
                            txt = ' (Over-Paid)';
                        } else if (parseFloat(balance) < 0) {
                            txt = ' (Under-Paid)';
                        } else {
                            txt = ' (Cleared)';
                        }
                        invoice_id.setValue(results.invoice_id);
                        invoice_no.setValue(results.invoice_no);
                        applicant_details.setValue(results.applicant_details);

                        running_balance.setValue(balance + txt);
                        invoiceSummaryStore.removeAll();
                        invoiceSummaryStore.load({
                            params: {
                                invoice_id: results.invoice_id
                            }
                        });

                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }


    },
    showApprovalInspectionApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
             storeID = getApplicationStore(module_id, section_id,sub_module_id),
            table_name = getApplicationTable(module_id);

            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsinspectionsfrm', winWidth, storeID, '', '', 'selected');

    },

    showInspectionApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            inspectorsGrid = activeTab.down('inspectioninspectorsgrid'),
            inspectorsStore = inspectorsGrid.getStore(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            storeID = getApplicationStore(module_id, section_id,sub_module_id),
            table_name = getApplicationTable(module_id),
            inspection_id = activeTab.down('form').down('hiddenfield[name=id]').getValue(),
            leadInspectorDetails = inspectorsStore.findRecord('role_id', 2);
          //  alert(application_id)

            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'inspection_id',
                value: inspection_id,
            }];
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsinspectionsfrm', winWidth, storeID, extraParams, '', 'selected');
    },

    funcDOwnloadApplicationVariationDoc:function(grid,rowIndex){
        //variation_id
        var me = this,
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            rec = grid.getStore().getAt(rowIndex);
            variation_id = rec.get('id');
            isOnline = rec.get('isOnline');
            if(grid.up('window')){
                var win =grid.up('window'),
                section_id = win.down('hiddenfield[name=section_id]').getValue(),
                application_code = win.down('hiddenfield[name=application_code]').getValue();
                module_id = win.down('hiddenfield[name=module_id]').getValue();
                sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue();

            }
            else{
                section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
                application_code = containerPnl.down('hiddenfield[name=application_code]').getValue();
                module_id = containerPnl.down('hiddenfield[name=module_id]').getValue();
                sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue();

            }
            onlinePanel = Ext.widget('applicationprevdocuploadsgrid');
            docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
            docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
            docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
            docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

            docsGrid.down('hiddenfield[name=variation_id]').setValue(variation_id);
            docsGrid.down('hiddenfield[name=isOnline]').setValue(isOnline);

        funcShowCustomizableWindow(tracking_no, '90%', onlinePanel, 'customizablewindow');

    },
    funcUploadTCMeetingtechnicalDocuments:function(btn){
        var me = this,
        mainTabPnl = btn.up('#contentPanel'),
        containerPnl = mainTabPnl.getActiveTab(),

        grid = btn.up('grid'),
        childXtype = btn.childXtype,
        childXtype= Ext.widget(childXtype),
        winTitle = btn.winTitle,
        winWidth = btn.winWidth,
        document_type_id = btn.document_type_id,
        reference_table_name = btn.reference_table_name,
        table_name = btn.table_name,
        meeting_id = containerPnl.down('premisesinspectiondetailsfrm').down('hiddenfield[name=id]').getValue();

        if(meeting_id != ''){
            childXtype.down('hiddenfield[name=document_type_id]').setValue(document_type_id);
            childXtype.down('hiddenfield[name=reference_record_id]').setValue(meeting_id);
            childXtype.down('hiddenfield[name=table_name]').setValue(table_name);
            childXtype.down('hiddenfield[name=reference_table_name]').setValue(reference_table_name);
            funcShowCustomizableWindow(winTitle, winWidth, childXtype, 'customizablewindow');
        }
        else{
            toastr.warning('Please save meeting details first!!', 'Warning Response');
            return false;
        }


    },
    
    funcUploadInspectionConceptDocuments:function(btn){
        var me = this,
        mainTabPnl = btn.up('#contentPanel'),
        containerPnl = mainTabPnl.getActiveTab(),

        grid = btn.up('grid'),
        childXtype = btn.childXtype,
        childXtype= Ext.widget(childXtype),
        winTitle = btn.winTitle,
        winWidth = btn.winWidth,
        document_type_id = btn.document_type_id,
        reference_table_name = btn.reference_table_name,
        table_name = btn.table_name,
        inspection_id = containerPnl.down('hiddenfield[name=id]').getValue();

        if(inspection_id != ''){
            childXtype.down('hiddenfield[name=document_type_id]').setValue(document_type_id);
            childXtype.down('hiddenfield[name=reference_record_id]').setValue(inspection_id);
            childXtype.down('hiddenfield[name=table_name]').setValue(table_name);
            childXtype.down('hiddenfield[name=reference_table_name]').setValue(reference_table_name);
            funcShowCustomizableWindow(winTitle, winWidth, childXtype, 'customizablewindow');
        }
        else{
            toastr.warning('Please save Inspection details, before upload!!', 'Warning Response');
            return false;
        }

    },
    showAddTcMeetingParticipants:function(btn){
        var me = this,
        mainTabPnl = btn.up('#contentPanel'),
        containerPnl = mainTabPnl.getActiveTab(),
        grid = btn.up('grid'),
        pnl = grid.up('panel'),//('newclinicaltrialmanagermeetingpanel'),
        meeting_id = containerPnl.down('form').down('hiddenfield[name=id]').getValue(),
        childXtype = btn.childXtype,
        winTitle = btn.winTitle,
        winWidth = btn.winWidth,
        storeArray = eval(btn.stores),
        arrayLength = storeArray.length,
        childObject;
    if (!meeting_id) {
        toastr.warning('Please save meeting details first!!', 'Warning Response');
        return false;
    }
    childObject = Ext.widget(childXtype);
    childObject.down('hiddenfield[name=meeting_id]').setValue(meeting_id);
    if (arrayLength > 0) {
        me.fireEvent('refreshStores', storeArray);
    }
    funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');

    },
    //the import permit invoicng details
    imponInvoiceFeeTypeChange: function (cmbo, newVal) {
        var mainTabPanel = this.getMainTabPanel(),
            grid = cmbo.up('grid'),
            costCategoriesStore = grid.down('combo[name=cost_category_id]').getStore(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            filter = {
                section_id: section_id,
                fee_type_id: newVal
            };
        filter = JSON.stringify(filter);
        costCategoriesStore.removeAll();
        costCategoriesStore.load({params: {filter: filter}});
        //costCategoriesStore.load({params: {section_id: section_id, fee_type_id: newVal}});
    },

    imprefreshInvoiceCostDetailsGrid: function (me) {
       /* var store = me.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoice_id = activeTab.down('hiddenfield[name=invoice_id]').getValue();
        store.getProxy().extraParams = {
            invoice_id: invoice_id
        };
        */
    },
    impaddInvoiceCostElement: function (sel, record) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            summary_grid = activeTab.down('importinvoicingcostdetailsgrid'),
            isFastTrack = activeTab.down('checkbox[name=is_fast_track]'),
            permit_fob_value = activeTab.down('numberfield[name=permit_fob_value]').getValue(),
            permit_currency_id = activeTab.down('combo[name=permit_currency_id]').getValue(),
            summary_store = summary_grid.getStore(),
            formula = record.get('formula'),
            cost_percentage = record.get('cost'),
            index = summary_store.indexOf(record),
            quantity = 1;
        //costs
        if (formula == 1) {
            var element_costs = (cost_percentage / 100) * permit_fob_value;
            var inv_record = record;
            inv_record['data']['cost'] = element_costs;
            inv_record['data']['quantity'] = 1;
            inv_record['data']['currency_id'] = permit_currency_id;
            console.log(inv_record)
            summary_store.add(inv_record);

        } else {

            toastr.warning('The Selected Cost Element has not been configured for Formula Calculation!!', 'Warning Response');

        }
    },

    impbeforeCostElementSelect: function (sel, record) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            isLocked = activeTab.down('hiddenfield[name=isLocked]').getValue();
        if ((isLocked) && isLocked == 1) {
            return false;
        }
    },

    impbeforeCostElementEdit: function (editor) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            isLocked = activeTab.down('hiddenfield[name=isLocked]').getValue();
        if ((isLocked) && isLocked == 1) {
            return false;
        }
    },

    imponInvoiceItemSelect: function (sel, record, index, eOpts) {
        var grid = sel.view.grid,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            selCount = grid.getSelectionModel().getCount();
        if (selCount > 0) {
            activeTab.down('button[name=remove_selected]').setDisabled(false);
        }
    },

    imponInvoiceItemDeselect: function (sel, record, index, eOpts) {
        var grid = sel.view.grid,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            selCount = grid.getSelectionModel().getCount();
        if (selCount < 1) {
            activeTab.down('button[name=remove_selected]').setDisabled(true);
        }
    },
    //invoicing
    funcPrevGridApplicationDocuments: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            isReadOnly = btn.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            document_previewpnl = 'applicationprevdocuploadsgrid',
            grid = Ext.widget(document_previewpnl),
            store = grid.store,
            application_code = record.get('application_code'),
            section_id = record.get('section_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            ref_no = record.get('reference_no');
        grid.height = 450;
        funcShowCustomizableWindow(ref_no, '85%', grid, 'customizablewindow');

        grid.down('hiddenfield[name=application_code]').setValue(application_code);
        grid.down('hiddenfield[name=section_id]').setValue(section_id);
        grid.down('hiddenfield[name=module_id]').setValue(module_id);
        grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

        grid.getViewModel().set('isReadOnly', true);

    },

    funcActiveSamplesOtherInformationTab: function (tab) {
        var mainTabPnl = this.getSampleanalysistestrequestspnl(),
            limssample_id = mainTabPnl.down('hiddenfield[name=limssample_id]').getValue();
        if (limssample_id == '') {
            tab.setActiveTab(0);
            toastr.error('Save Sample Test Request details to proceed', 'Failure Response');
            return false;
        }
    },

    setCommonGridsStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.common.CommonGridAbstractStore', config);
        me.setStore(store);
        toolbar.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },
    setGridTreeStore: function (me, options) {
        // console.log(me);
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.abstract.AbstractTreeStr', config);
        me.setStore(store);
        toolbar.setStore(store);
        console.log(me);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },
    refreshApplicationDocUploadsGrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            document_type_id = grid.down('combo[name=applicable_documents]').getValue(),
            application_code = grid.down('hiddenfield[name=application_code]').getValue(),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),   
            premise_type_id,prodclass_category_id;

            if(application_code >0){
                
                application_code = grid.down('hiddenfield[name=application_code]').getValue(),
                process_id = grid.down('hiddenfield[name=process_id]').getValue(),
                section_id = grid.down('hiddenfield[name=section_id]').getValue(),
                query_ref_id = grid.down('hiddenfield[name=query_ref_id]').getValue(),
                module_id = grid.down('hiddenfield[name=module_id]').getValue(),
                document_type = grid.down('hiddenfield[name=document_type_id]').getValue(),
                sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
                workflow_stage = grid.down('hiddenfield[name=workflow_stage_id]').getValue();
                
            }
            else{

                application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
                process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
                section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
                query_ref_id = '',
                module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
                document_type = activeTab.down('hiddenfield[name=document_type_id]').getValue(),
                sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
                workflow_stage = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
                if(module_id == 1){
                    if(!prodclass_category_id){
                        if(activeTab.down('hiddenfield[name=prodclass_category_id]')){
                            prodclass_category_id = activeTab.down('hiddenfield[name=prodclass_category_id]').getValue();
                        }
                    }
                }
                if(module_id == 2){
                        if(activeTab.down('hiddenfield[name=premise_type_id]')){
                            premise_type_id = activeTab.down('hiddenfield[name=premise_type_id]').getValue();
                        }
                }
            }
           
            
           
            
            if(document_type_id < 1){
                document_type_id =document_type;
            }
            store.getProxy().extraParams = {
                application_code: application_code,
                // table_name: table_name,
                document_type_id: document_type_id,
                query_ref_id: query_ref_id,
                process_id: process_id,
                section_id: section_id,
                module_id: module_id,
                sub_module_id: sub_module_id,
                workflow_stage: workflow_stage,
                prodclass_category_id: prodclass_category_id,
                premise_type_id: premise_type_id
            };
    },
    refreshsampleanalysistestrequestsgrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            panel = me.up('panel[name=sampleanalysistestrequestspnl]'),
            module_id = panel.down('hiddenfield[name=module_id]').getValue(),
            application_code = panel.down('hiddenfield[name=application_code]').getValue(),
            sample_application_code = panel.down('hiddenfield[name=sample_application_code]').getValue(),
            misproduct_id = panel.down('hiddenfield[name=misproduct_id]').getValue(),
            missample_id = panel.down('hiddenfield[name=sample_id]').getValue(),
            section_id = panel.down('hiddenfield[name=section_id]').getValue();

        store.getProxy().extraParams = {
            module_id: module_id,
            application_code: application_code,
            sample_application_code: sample_application_code,
            misproduct_id: misproduct_id,
            missample_id: missample_id,
            section_id: section_id
        };
    },

    refreshtestparameterssgrid: function (btn) {
        // 'sub_cat_id','',
        var grid = btn.up('grid'),
            store = grid.store,
            sub_cat_id = grid.down('combo[name=sub_cat_id]').getValue(),
            cost_category_id = grid.down('combo[name=cost_category_id]').getValue(),
            section_id = grid.down('combo[name=section_id]').getValue();

        store.getProxy().extraParams = {
            sub_cat_id: sub_cat_id,
            cost_category_id: cost_category_id,
            section_id: section_id
        };

    },
    refreshsampleanalysistestparameterssgrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            panel = me.up('window'),
            limssample_id = panel.down('hiddenfield[name=limssample_id]').getValue();

        store.getProxy().extraParams = {
            limssample_id: limssample_id
        };

    },
    refreshsampleanalysistestresultsgrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            panel = me.up('window'),
            limssample_id = panel.down('hiddenfield[name=limssample_id]').getValue();

        store.getProxy().extraParams = {
            limssample_id: limssample_id
        };

    },

    refreshsampleanalysistestrequestsprocessesgrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            labreference_no = grid.down('hiddenfield[name=labreference_no]').getValue();

        store.getProxy().extraParams = {
            reference_no: labreference_no
        };
    },
    refreshunstructureddocumentuploadsgrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            table_name = grid.down('hiddenfield[name=table_name]').getValue(),
            reference_record_id = grid.down('hiddenfield[name=reference_record_id]').getValue(),
            document_type_id = grid.down('hiddenfield[name=document_type_id]').getValue();

        store.getProxy().extraParams = {
            document_type_id: document_type_id,
            table_name: table_name,
            reference_record_id: reference_record_id
        };
    },
    productstcmeetinggridWinRefreshGrid:function(me){
        var store = me.store,
            table_name = me.table_name,
            window = me.up('window'),
            meeting_id = window.down('form').down('hiddenfield[name=id]').getValue();
            store.getProxy().extraParams = {
                table_name: table_name,
                meeting_id: meeting_id
            };
    },
    tCMMeetingSchedulingRefreshGrid: function (me) {
        var store = me.store,
            table_name = me.table_name,
            strict_mode = me.strict_mode,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            meeting_id = activeTab.down('form').down('hiddenfield[name=id]').getValue();
        store.getProxy().extraParams = {
            table_name: table_name,
            workflow_stage_id: workflow_stage_id,
            meeting_id: meeting_id,
            strict_mode: strict_mode
        };
    },

    setPremiseRegModuleGridsStore: function (grid) {
        var storeConfig = grid.storeConfig;
        this.fireEvent('setPremiseRegGridsStore', grid, storeConfig);
    },

    setWorkflowModuleGridsStore: function (grid) {
        var storeConfig = grid.storeConfig,
            isOnline = grid.isOnline;
        if ((isOnline) && isOnline == 1) {
            storeConfig.config.proxy.url = 'workflow/getOnlineProcessApplicableChecklistItems';
        } else {
            storeConfig.config.proxy.url = 'workflow/getProcessApplicableChecklistItems';
        }
        this.fireEvent('setWorkflowGridsStore', grid, storeConfig);
    },

    addApplicationIdCodeParams: function (me) {
       
        if(me.up('window')){
            var payment_pnl = me.up('window');
            var popupview = payment_pnl
                    store = me.getStore();

                if(popupview.down('hiddenfield[name=active_application_id]')){
                    application_id = popupview.down('hiddenfield[name=active_application_id]').getValue(),
                    application_code = popupview.down('hiddenfield[name=active_application_code]').getValue();
                }
                else if(popupview.down('hiddenfield[name=application_id]')){

                    application_id = popupview.down('hiddenfield[name=application_id]').getValue(),
                    application_code = popupview.down('hiddenfield[name=application_code]').getValue();
                }else{
                    application_id = 0;
                    application_code =0

                }
             

        }
        else{
            var  mainTabPanel = this.getMainTabPanel(),
                activeTab = mainTabPanel.getActiveTab(),
                    store = me.getStore(),
                application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
                application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        }
            
           
        store.getProxy().extraParams = {
            application_id: application_id,
            application_code: application_code
        };

        if(me.store.storeId == 'invoicepaymentverificationdetailsGridStr'){
            this.func_check_balance(application_code);
        }

    },func_check_balance: function(application_code){
        var me = this;
        Ext.Ajax.request({
            url: 'revenuemanagement/checkApplicationInvoiceBalance',
            params: {
                application_code: application_code,
                _token: token
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success || success == true || success === true) {
                    var mainTabPanel = me.getMainTabPanel(),
                        panel = mainTabPanel.getActiveTab(),
                        running_balance;
                    if(panel.down('displayfield[name=running_balance]')){
                        running_balance = panel.down('displayfield[name=running_balance]');
                    }else{
                        var payment_pnl = Ext.ComponentQuery.query("#paymentspanelRefId")[0];
                        if(Ext.ComponentQuery.query("#paymentspanelRefId")[0]){
                            running_balance = payment_pnl.down('displayfield[name=running_balance]');
                        }
                      
                    }
                    running_balance.setValue(resp.balance);
                } else {
                    toastr.error(message, 'Failure Response!!');
                }
            },
            failure: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.warning(message, 'Failure Response!!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    refreshProductsvariationrequestsgrid: function (me) {

        var store = me.store,
            grid = me;
            if(me.up('grid')){
                grid =me.up('grid');
            }
            if(grid.up('window')){
                application_id = grid.down('hiddenfield[name=application_id]').getValue(),
                application_code = grid.down('hiddenfield[name=application_code]').getValue();
            }
            else{

                mainTabPanel = this.getMainTabPanel(),
                activeTab = mainTabPanel.getActiveTab(),
                application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
                application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            }

            store.getProxy().extraParams = {
                application_id: application_id,
                application_code: application_code
            };

    }, refreshApplicationAmmendementrequestsgrid: function (me) {

        var store = me.store,
            grid = me.up('grid'),
            application_code = grid.down('hiddenfield[name=application_code]').getValue(),
            appdata_ammendementrequest_id = grid.down('hiddenfield[name=appdata_ammendementrequest_id]').getValue(),
            application_id = grid.down('hiddenfield[name=application_id]').getValue();

            store.getProxy().extraParams = {
                application_id: application_id,
                application_code: application_code,
                appdata_ammendementrequest_id:appdata_ammendementrequest_id
            };

    },

    refreshScreeningChecklistItemsGrid: function (me) {
        var store = me.getStore(),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
           
            if(me.up('window')){
                var win = me.up('window');
                application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
                application_code = win.down('hiddenfield[name=active_application_code]').getValue();
                process_id = win.down('hiddenfield[name=process_id]').getValue();
                module_id = win.down('hiddenfield[name=module_id]').getValue();
                workflow_stage = win.down('hiddenfield[name=workflow_stage_id]').getValue();
            }
            else{
                    application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
                    application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
                    process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
                    module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
                    workflow_stage = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

            }
            
           
            checklist_type = 0;
            if(me.down('combo[name=applicable_checklist]')){
                checklist_type = me.down('combo[name=applicable_checklist]').getValue();
            }
            store.getProxy().extraParams = {
                application_id: application_id,
                application_code: application_code,
                checklist_type: checklist_type, module_id: module_id,
                process_id: process_id,
                workflow_stage: workflow_stage
            };
    },

    refreshOnlineScreeningChecklistItemsGrid: function (me) {
        var store = me.getStore(),
            win = me.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            checklist_type = me.down('combo[name=applicable_checklist]').getValue();

        store.getProxy().extraParams = {
            application_id: application_id,
            application_code: application_code,
            checklist_type: checklist_type,
            module_id: module_id,
            sub_module_id: sub_module_id,
            section_id: section_id
        };
    },

    refreshPIRChecklistItemsGrid: function (me) {//Product Information Review
        var store = me.getStore(),
            win = me.up('window'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = win.down('hiddenfield[name=application_id]').getValue(),
            application_code = win.down('hiddenfield[name=sample_appcode]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            checklist_type = me.down('combo[name=applicable_checklist]').getValue();
        store.getProxy().extraParams = {
            application_id: application_id,
            application_code: application_code,
            checklist_type: checklist_type,
            process_id: process_id,
            workflow_stage: workflow_stage
        };
    },

    refreshOnlinePremiseRegsMainGrids: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            application_status = me.application_status,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
            module_id = (activeTab.down('hiddenfield[name=module_id]')) ? activeTab.down('hiddenfield[name=module_id]').getValue() : null,
            section_id = (activeTab.down('hiddenfield[name=section_id]')) ? activeTab.down('hiddenfield[name=section_id]').getValue() : null;
        store.getProxy().extraParams = {
            module_id: module_id,
            section_id: section_id,
            sub_module_id: sub_module_id,
            application_status: application_status
        };
    },

    addApplicationBaseParamsWithOpts: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            static_stage = grid.down('hiddenfield[name=static_stage]').getValue(),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        if ((static_stage) && static_stage > 0) {
            workflow_stage_id = static_stage;
        }
        store.getProxy().extraParams = {
            application_id: application_id,
            application_code: application_code,
            workflow_stage_id: workflow_stage_id
        };
    },

    refreshApplicationsMainGrids: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = (activeTab.down('hiddenfield[name=module_id]')) ? activeTab.down('hiddenfield[name=module_id]').getValue() : null,
            section_id = (activeTab.down('hiddenfield[name=section_id]')) ? activeTab.down('hiddenfield[name=section_id]').getValue() : null,
            sub_module_id = (grid.down('combo[name=sub_module_id]')) ? grid.down('combo[name=sub_module_id]').getValue() : null,
            workflow_stage_id = (grid.down('combo[name=workflow_stage_id]')) ? grid.down('combo[name=workflow_stage_id]').getValue() : null;
        store.getProxy().extraParams = {
            module_id: module_id,
            section_id: section_id,
            sub_module_id: sub_module_id,
            workflow_stage_id: workflow_stage_id
        };
    },

    generateReport: function (btn) {
        var grid = btn.up('grid'),
            exportrpt_title = 'system_report_' + grid.export_title,
            type = btn.type;
        var file_name = exportrpt_title + btn.file_name;
        this.doExport({
            type: type,
            title: exportrpt_title,
            fileName: file_name
        }, grid);
    },

    generateReportFromExternalGrid: function (btn) {

        var owner = btn.up('externalExportBtn'),
            panel=owner.up(owner.containerName),
            grid=panel.down(owner.gridName),
            exportrpt_title = 'system_report_' + grid.export_title,
            type = btn.type;
        var file_name = exportrpt_title + btn.file_name;

        this.doExport({
            type: type,
            title: exportrpt_title,
            fileName: file_name
        }, grid);

    },

    generatePDFReport: function (btn) {
        var grid_reference = btn.grid_reference,
            title = btn.title,
            type = btn.type,
            file_name = btn.file_name,
            grid = btn.up('grid');
        grid.saveDocumentAs({
            fileName: file_name
        });
    },

    doExport: function (config, grid) {
        grid.saveDocumentAs(config);
    },

    showApplicationWorkflow: function (sub_module_id, wrapper_xtype) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down(wrapper_xtype),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_details = getBasicWorkflowDetails(module_id, section_id, sub_module_id);
        if (!workflow_details || workflow_details.length < 1) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget('workflowcontainerpnlgeneric');
        workflowContainer.down('displayfield[name=workflow_name]').setValue(workflow_details.name);
        workflowContainer.down('hiddenfield[name=active_workflow_id]').setValue(workflow_details.workflow_id);
        dashboardWrapper.add(workflowContainer);
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);
    },

    deleteRecordFromID: function (id, table_name, storeID, url, method) {
        var me = this,
            store = Ext.getStore(storeID);
        Ext.MessageBox.confirm('Delete', 'Are you sure to perform this action ?', function (btn) {
            if (btn === 'yes') {
                Ext.getBody().mask('Deleting record...');
                if (!method) {
                    method = "POST";
                }

                Ext.Ajax.request({
                    url: url,
                    method: method,
                    params: {
                        table_name: table_name,
                        id: id
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message,
                            success = resp.success;
                        if (success == true || success === true) {
                            toastr.success(message, 'Success Response');
                            store.removeAll();
                            store.load();
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error deleting data: ' + errorThrown, 'Error Response');
                    }
                });
            } else {
                //
            }
        });
    },

    // unlinkRecordByColumns: function (id, table_name, storeID, url, column_array, method) {
    //     var me = this,
    //         store = Ext.getStore(storeID);
    //     Ext.MessageBox.confirm('Delete', 'Are you sure to perform this action ?', function (btn) {
    //         if (btn === 'yes') {
    //             Ext.getBody().mask('Deleting record...');
    //             if (!method) {
    //                 method = "POST";
    //             }

    //             Ext.Ajax.request({
    //                 url: url,
    //                 method: method,
    //                 params: {
    //                     table_name: table_name,
    //                     column_array: column_array,
    //                     id: id
    //                 },
    //                 headers: {
    //                     'Authorization': 'Bearer ' + access_token,
    //                     'X-CSRF-Token': token
    //                 },
    //                 success: function (response) {
    //                     Ext.getBody().unmask();
    //                     var resp = Ext.JSON.decode(response.responseText),
    //                         message = resp.message,
    //                         success = resp.success;
    //                     if (success == true || success === true) {
    //                         toastr.success(message, 'Success Response');
    //                         store.removeAll();
    //                         store.load();
    //                     } else {
    //                         toastr.error(message, 'Failure Response');
    //                     }
    //                 },
    //                 failure: function (response) {
    //                     Ext.getBody().unmask();
    //                     var resp = Ext.JSON.decode(response.responseText),
    //                         message = resp.message;
    //                     toastr.error(message, 'Failure Response');
    //                 },
    //                 error: function (jqXHR, textStatus, errorThrown) {
    //                     Ext.getBody().unmask();
    //                     toastr.error('Error deleting data: ' + errorThrown, 'Error Response');
    //                 }
    //             });
    //         } else {
    //             //
    //         }
    //     });
    // },

    refreshGivenStores: function (storeArray) {
        var arrayLength = storeArray.length,
            i;
        for (i = 0; i < arrayLength; i++) {
            var store = Ext.getStore(storeArray[i]);
            store.removeAll();
            store.load();
        }
    },
    refreshGivenStoresWithFilters: function (storeArray, filters) {
        var arrayLength = storeArray.length,
            i;
        if (arrayLength > 0) {

        }
        filters = JSON.stringify(filters);
        for (i = 0; i < arrayLength; i++) {
            var store = Ext.getStore(storeArray[i]);
            store.removeAll();
            store.load({params: {filters: filters}});
        }
    },
    hasFullAccess: function () {
        var me = this,
            mainPanel = me.getMainPanel(),
            activeTab = mainPanel.down('#contentPanel').getActiveTab(),
            access_level = activeTab.access_level;
        return access_level == 4 || access_level == '4' || access_level === 4 || access_level === '4';

    },

    hasWriteAndUpdate: function () {
        var me = this,
            mainPanel = me.getMainPanel(),
            activeTab = mainPanel.down('#contentPanel').getActiveTab(),
            access_level = activeTab.access_level;
        if (access_level == 3 || access_level == '3' || access_level === 3 || access_level === '3') {
            return true;
        }
        return false;
    },
    onViewPersonalPermitApplication:function(record){
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            workflow_stage = record.get('workflow_stage'),
            ref_no = record.get('reference_no'),
            tracking_no = record.get('tracking_no'),
            isGeneral = record.get('is_general'),
            view_id = record.get('view_id'),
            html_id = record.get('destination_html_id'),
            title_suffix = ref_no;

    var tab = mainTabPanel.getComponent(view_id),
        title = workflow_stage + '-' + title_suffix;
        title = workflow_stage,
        applicationtype_id = record.get('applicationtype_id');
        viewtype = 'personaluserpermitsreceiving';

        if (!tab) {//
            var newTab = Ext.widget(viewtype, {
                title: title,
                id: view_id,
                closable: true
            });
            me.prepareApplicationBaseDetails(newTab, record);
            mainTabPanel.add(newTab);
            var lastTab = mainTabPanel.items.length - 1;
            mainTabPanel.setActiveTab(lastTab);
        } else {
            mainTabPanel.setActiveTab(tab);
        }


        Ext.Function.defer(function () {
            Ext.getBody().unmask();
           // me.updateSubmissionsTable(record, 'isRead');
        }, 300);

    },
    onViewApplicationDetails: function (record) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            workflow_stage = record.get('workflow_stage'),
            ref_no = record.get('reference_no'),
            tracking_no = record.get('tracking_no'),
            isGeneral = record.get('is_general'),
            view_id = record.get('view_id'),
            html_id = record.get('destination_html_id'),
            title_suffix = ref_no;


       // handling for the LIMS system
if(html_id == 'laboratoryaccounts_receivable' || html_id == 'presample_accounts'){

    var tab = mainTabPanel.getComponent(view_id),
        title = workflow_stage + '-' + title_suffix;
        title = workflow_stage,
        applicationtype_id = record.get('applicationtype_id');
        viewtype = 'labservicessamplepayment';

        if (!tab) {//
            var newTab = Ext.widget(viewtype, {
                title: title,
                id: view_id,
                closable: true
            });
            me.prepareApplicationBaseDetails(newTab, record);
            mainTabPanel.add(newTab);
            var lastTab = mainTabPanel.items.length - 1;
            mainTabPanel.setActiveTab(lastTab);
        } else {
            mainTabPanel.setActiveTab(tab);
        }

}
else{
    workflow_details = getAllWorkflowDetails(process_id, workflow_stage_id);
    if (!workflow_details || workflow_details.length < 1) {
        Ext.getBody().unmask();
        toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
        return false;
    }
    if (!ref_no || ref_no == '' || ref_no == null) {
        title_suffix = tracking_no;
    }

    var tab = mainTabPanel.getComponent(view_id),
        title = workflow_stage + '-' + title_suffix;
        title = workflow_stage; //+ '-' + title_suffix;
    if ((isGeneral) && (isGeneral == 1 || isGeneral === 1)) {
        title = workflow_stage;
        view_id = view_id + Math.floor(Math.random() * 100015);
    }
    if (!tab) {//
        var newTab = Ext.widget(workflow_details.viewtype, {
            title: title,
            id: view_id,
            closable: true
        });
        me.prepareApplicationBaseDetails(newTab, record);
        mainTabPanel.add(newTab);
        var lastTab = mainTabPanel.items.length - 1;
        mainTabPanel.setActiveTab(lastTab);
    } else {
        mainTabPanel.setActiveTab(tab);
    }

}


        Ext.Function.defer(function () {
            Ext.getBody().unmask();
            me.updateSubmissionsTable(record, 'isRead');
        }, 300);

    },

    onViewReceivedApplicationDetails: function (record) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            process_id = record.process_id,
            workflow_stage_id = record.workflow_stage_id,
            workflow_stage = record.workflow_stage,
            ref_no = record.reference_no,
            workflow_details = getAllWorkflowDetails(process_id, workflow_stage_id);
        if (!workflow_details || workflow_details.length < 1) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        var tab = mainTabPanel.items.find(function (i) {
            if (i.title.indexOf(ref_no) !== -1) {
                return i;
            } else {
                return false;
            }
        });
        if (!tab) {
            var newTab = Ext.widget(workflow_details.viewtype, {
                title: workflow_stage + '-' + ref_no,
                closable: true
            });
            me.prepareReceivedApplicationBaseDetails(newTab, record);
            mainTabPanel.add(newTab);
            var lastTab = mainTabPanel.items.length - 1;
            mainTabPanel.setActiveTab(lastTab);
        } else {
            mainTabPanel.setActiveTab(tab);
        }
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
            me.updateReceivedSubmissionsTable(record, 'isRead');
        }, 300);
    },

    viewPredefinedInterfaceApplicationDetails: function (record, interfaceXtype) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            workflow_stage = record.get('workflow_stage'),
            ref_no = record.get('tracking_no'),
            view_id = record.get('view_id'),
            workflow_details = getAllWorkflowDetails(process_id, workflow_stage_id);
        if (!workflow_details || workflow_details.length < 1) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        var tab = mainTabPanel.getComponent(view_id);
        /*var tab = mainTabPanel.items.find(function (i) {
            if (i.title.indexOf(ref_no) !== -1) {
                return i;
            } else {
                return false;
            }
        });*/
        if (!tab) {
            var newTab = Ext.widget(interfaceXtype, {
                title:'Personal Use Permits' + '-' + ref_no,
                closable: true
            });
            /*   if (workflow_stage_id == 14 || workflow_stage_id === 14) {
              newTab.down('premisedetailsfrm').down('hiddenfield[name=isReadOnly]').setValue(1);
               }*/
            me.prepareApplicationBaseDetails(newTab, record);
            mainTabPanel.add(newTab);
            var lastTab = mainTabPanel.items.length - 1;
            mainTabPanel.setActiveTab(lastTab);
        } else {
            mainTabPanel.setActiveTab(tab);
        }
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
            me.updateSubmissionsTable(record, 'isRead');
        }, 300);
    },

    prepareApplicationBaseDetails: function (tab, record) {
        var me = this,
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            process_name = record.get('process_name'),
            workflow_stage = record.get('workflow_stage'),
            application_status = record.get('application_status'),
            tracking_no = record.get('tracking_no'),
            reference_no = record.get('reference_no'),
            process_id = record.get('process_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            application_status_id = record.get('application_status_id');

        tab.down('hiddenfield[name=active_application_id]').setValue(application_id);
        tab.down('hiddenfield[name=active_application_code]').setValue(application_code);
        tab.down('hiddenfield[name=process_id]').setValue(process_id);
        tab.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        tab.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
        tab.down('hiddenfield[name=module_id]').setValue(module_id);
        tab.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        tab.down('hiddenfield[name=section_id]').setValue(section_id);
        tab.down('displayfield[name=process_name]').setValue(process_name);
        tab.down('displayfield[name=workflow_stage]').setValue(workflow_stage);
        tab.down('displayfield[name=application_status]').setValue(application_status);
        tab.down('displayfield[name=tracking_no]').setValue(tracking_no);
        tab.down('displayfield[name=reference_no]').setValue(reference_no);
    },

    prepareReceivedApplicationBaseDetails: function (tab, record) {
        var me = this,
            application_id = record.application_id,
            application_code = record.application_code,
            process_name = record.process_name,
            workflow_stage = record.workflow_stage,
            application_status = record.application_status,
            reference_no = record.reference_no,
            process_id = record.process_id,
            module_id = record.module_id,
            sub_module_id = record.sub_module_id,
            section_id = record.section_id,
            workflow_stage_id = record.workflow_stage_id,
            application_status_id = record.application_status_id;
        tab.down('hiddenfield[name=active_application_id]').setValue(application_id);
        tab.down('hiddenfield[name=active_application_code]').setValue(application_code);
        tab.down('hiddenfield[name=process_id]').setValue(process_id);
        tab.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        tab.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
        tab.down('hiddenfield[name=module_id]').setValue(module_id);
        tab.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        tab.down('hiddenfield[name=section_id]').setValue(section_id);
        tab.down('displayfield[name=process_name]').setValue(process_name);
        tab.down('displayfield[name=workflow_stage]').setValue(workflow_stage);
        tab.down('displayfield[name=application_status]').setValue(application_status);
        tab.down('displayfield[name=reference_no]').setValue(reference_no);
    },

    updateSubmissionsTable: function (record, update_type) {
        var application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            current_stage = record.get('workflow_stage_id');
        Ext.Ajax.request({
            url: 'workflow/updateInTrayReading',
            params: {
                application_id: application_id,
                application_code: application_code,
                current_stage: current_stage,
                update_type: update_type
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                if (success == true || success === true) {

                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    updateReceivedSubmissionsTable: function (record, update_type) {
        var application_id = record.application_id,
            application_code = record.application_code,
            current_stage = record.workflow_stage_id;
        Ext.Ajax.request({
            url: 'workflow/updateInTrayReading',
            params: {
                application_id: application_id,
                application_code: application_code,
                current_stage: current_stage,
                update_type: update_type
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                if (success == true || success === true) {

                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    showApplicationTransitioning: function () {
        var childObject = Ext.widget('transitionsgrid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue();
        funcShowCustomizableWindow(ref_no + ' Transitions', '70%', childObject, 'customizablewindow');
    },

    showApplicationDismissalForm: function () {
        var childObject = Ext.widget('applicationdismissalfrm'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            tracking_no = activeTab.down('displayfield[name=tracking_no]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        this.showApplicationDismissalFormGeneric(tracking_no, application_id, application_code, module_id, sub_module_id, section_id, workflow_stage_id);
    },

    showApplicationDismissalFormGeneric: function (ref_no, application_id, application_code, module_id, sub_module_id, section_id, workflow_stage_id) {
        var childObject = Ext.widget('applicationdismissalfrm');
        childObject.down('hiddenfield[name=application_id]').setValue(application_id);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=module_id]').setValue(module_id);
        childObject.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        funcShowCustomizableWindow(ref_no + ' Dismissal', '50%', childObject, 'customizablewindow');
    },

    saveApplicationDismissalDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        Ext.MessageBox.confirm('Confirm', 'Are you sure to perform this action?', function (button) {
            if (button === 'yes') {
                if (frm.isValid()) {
                    frm.submit({
                        url: url,
                        params: {model: table},
                        waitMsg: 'Please wait...',
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        },
                        success: function (form, action) {
                            var response = Ext.decode(action.response.responseText),
                                success = response.success,
                                message = response.message;
                            if (success == true || success === true) {
                                toastr.success(message, "Success Response");
                                store.removeAll();
                                store.load();
                                win.close();
                                mainTabPanel.remove(activeTab);
                            } else {
                                toastr.error(message, 'Failure Response');
                            }
                        },
                        failure: function (form, action) {
                            var resp = action.result;
                            toastr.error(resp.message, 'Failure Response');
                        }
                    });
                }
            }
        });
    },

    formAuthentication: function (process_id, form_id, form) {
        var mask = new Ext.LoadMask(
            {
                target: form,
                msg: 'Please wait...'
            }
        );
        mask.show();
        Ext.Ajax.request({
            method: 'GET',
            url: 'workflow/getFormFieldsAuth',
            params: {
                process_id: process_id,
                form_id: form_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success,
                    results = resp.results,
                    field;
                if (success == true || success === true) {
                    Ext.each(results, function (item) {
                        field = form.down(item.field_type + '[name=' + item.field_name + ']');
                        field.setReadOnly(false);
                        form.down(item.field_type + '[name=' + item.field_name + ']').addCls('blue-label');
                    });
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mask.hide();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    otherPartsAuthentication: function (process_id, parent_comp) {
        var me = this,
            premise_otherdetails = parent_comp.down('premiseotherdetailsgrid'),
            premise_personneldetails = parent_comp.down('premisepersonneldetailsgrid');
        //mask.show();
        Ext.Ajax.request({
            method: 'GET',
            url: 'workflow/getProcessOtherPartsAuth',
            params: {
                process_id: process_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success,
                    results = resp.results;
                if (success == true || success === true) {
                    Ext.each(results, function (item) {
                        if (item.part_id == 2 || item.part_id === 2) {
                            premise_personneldetails.down('hiddenfield[name=isReadOnly]').setValue(0);
                            me.fireEvent('redoPremisePersonnelDetailsGrid', premise_personneldetails);
                        } else if (item.part_id == 3 || item.part_id === 3) {
                            premise_otherdetails.down('hiddenfield[name=isReadOnly]').setValue(0);
                            me.fireEvent('redoPremiseOtherDetailsGrid', premise_otherdetails);
                        } else {
                            premise_otherdetails.down('hiddenfield[name=isReadOnly]').setValue(1);
                            premise_personneldetails.down('hiddenfield[name=isReadOnly]').setValue(1);
                        }
                    });
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    gmpOtherPartsAuthentication: function (process_id, parent_comp) {
        var me = this,
            site_otherdetails = parent_comp.down('mansiteotherdetailsgrid'),
            site_personneldetails = parent_comp.down('mansitepersonneldetailsgrid');
        Ext.Ajax.request({
            method: 'GET',
            url: 'workflow/getProcessOtherPartsAuth',
            params: {
                process_id: process_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success,
                    results = resp.results;
                if (success == true || success === true) {
                    Ext.each(results, function (item) {
                        if (item.part_id == 5 || item.part_id === 5) {
                            site_personneldetails.down('hiddenfield[name=isReadOnly]').setValue(0);
                            me.fireEvent('redoManSitePersonnelDetailsGrid', site_personneldetails);
                        } else if (item.part_id == 6 || item.part_id === 6) {
                            site_otherdetails.down('hiddenfield[name=isReadOnly]').setValue(0);
                            me.fireEvent('redoManSiteOtherDetailsGrid', site_otherdetails);
                        } else {
                            site_otherdetails.down('hiddenfield[name=isReadOnly]').setValue(1);
                            site_personneldetails.down('hiddenfield[name=isReadOnly]').setValue(1);
                        }
                    });
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    alterationFormAuthentication: function (application_id, application_code, form) {
        var mask = new Ext.LoadMask(
            {
                target: form,
                msg: 'Please wait...'
            }
        );
        mask.show();
        form.getForm().getFields().each(function (field) {
            field.setReadOnly(true);
            field.removeCls('blue-label');
        });
        Ext.Ajax.request({
            method: 'GET',
            url: 'workflow/getAlterationFormFieldsAuth',
            params: {
                application_id: application_id,
                application_code: application_code
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success,
                    results = resp.results,
                    field;
                if (success == true || success === true) {
                    Ext.each(results, function (item) {
                        field = form.down(item.field_type + '[name=' + item.field_name + ']');
                        field.setReadOnly(false);
                        form.down(item.field_type + '[name=' + item.field_name + ']').addCls('blue-label');
                    });
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mask.hide();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    showAmendedFormFields: function (application_id, application_code, form) {
        var mask = new Ext.LoadMask(
            {
                target: form,
                msg: 'Please wait...'
            }
        );
        mask.show();
        Ext.Ajax.request({
            method: 'GET',
            url: 'workflow/getAlterationFormFieldsAuth',
            params: {
                application_id: application_id,
                application_code: application_code
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success,
                    results = resp.results,
                    field;
                if (success == true || success === true) {
                    Ext.each(results, function (item) {
                        form.down(item.field_type + '[name=' + item.field_name + ']').addCls('blue-label');
                    });
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mask.hide();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    saveApplicationChecklistDetails: function (btn) {
        btn.setLoading(true);
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            screeningGrid = activeTab.down('checklistresponsescmngrid');
        this.commitApplicationChecklistDetails(btn, application_id, application_code, screeningGrid);
    },

    savePIRChecklistDetails: function (btn) {
        btn.setLoading(true);
        var grid = btn.up('grid'),
            win = grid.up('window'),
            application_id = win.down('hiddenfield[name=sample_id]').getValue(),
            application_code = win.down('hiddenfield[name=sample_appcode]').getValue(),
            screeningGrid = btn.up('grid');
        this.commitApplicationChecklistDetails(btn, application_id, application_code, screeningGrid);
    },
   
    saveOnlineApplicationChecklistDetails: function (btn) {
        btn.setLoading(true);
        var win = btn.up('window'),
            screeningGrid = win.down('checklistresponsescmngrid'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue();
        this.commitApplicationChecklistDetails(btn, application_id, application_code, screeningGrid);
    },
    addPrecheckingRecommendation:function(btn){
        var win = btn.up('window'),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue();

            var me = this,
            childXtype = 'precheckingrecommendationfrm',
            winTitle = 'Prechecking Recommendation',
            winWidth = '40%',
            child = Ext.widget(childXtype);
            child.down('hiddenfield[name=application_code]').setValue(application_code);

        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');

    },
    commitApplicationChecklistDetails: function (btn, application_id, application_code, screeningGrid) {
        var checklist_type = screeningGrid.down('combo[name=applicable_checklist]').getValue(),
            store = screeningGrid.getStore(),
            params = [];
            for (var i = 0; i < store.data.items.length; i++) {
                var record = store.data.items [i],
                    checklist_item_id = record.get('checklist_item_id'),
                    pass_status = record.get('pass_status'),
                    comment = record.get('comment'),
                    observation = record.get('observation'),
                    auditor_comment = record.get('auditor_comment'),
                    auditorpass_status = record.get('auditorpass_status'),
                    item_resp_id = record.get('item_resp_id');
                var obj = {
                    application_id: application_id,
                    application_code: application_code,
                    item_resp_id: item_resp_id,
                    created_by: user_id,
                    checklist_item_id: checklist_item_id,
                    pass_status: pass_status,
                    comment: comment,
                    auditor_comment:auditor_comment,
                    auditorpass_status:auditorpass_status,
                    observation: observation
                };
                if (record.dirty) {
                    params.push(obj);
                }
            }
        if (params.length < 1) {
            btn.setLoading(false);
            toastr.warning('No records to save!!', 'Warning Response');
            return false;
        }
        params = JSON.stringify(params);
        Ext.Ajax.request({
            url: 'api/saveApplicationChecklistDetails',
            params: {
                application_id: application_id,
                application_code: application_code,
                checklist_type: checklist_type,
                screening_details: params
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                btn.setLoading(false);
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success == true || success === true) {
                    toastr.success(message, 'Success Response');
                    store.load();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                btn.setLoading(false);
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                btn.setLoading(false);
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },
    
    showApplicationQueriesWin: function (sourceGrid) {
          var mainTabPanel =this.getMainTabPanel(),
              activeTab = mainTabPanel.getActiveTab(),
              store = sourceGrid.getStore(),
              grid = Ext.widget('applicationqueriesgrid'),
              module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
              application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
              sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
              process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
              workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
              section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
          //check for unsaved store
          var check = false;
          for (var i = 0; i < store.data.items.length; i++) {
                  var record = store.data.items [i];
                  if (record.dirty) {
                      check = true;
                  }
              }
          if (check) {
              toastr.warning('There is unsaved information, make sure you save the changes by clicking on \'Save Screening Details\' before performing this action!!', 'Warning Response');
              return false;
          }
          grid.down('hiddenfield[name=module_id]').setValue(module_id);
          grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
          grid.down('hiddenfield[name=section_id]').setValue(section_id);
          grid.down('hiddenfield[name=application_code]').setValue(application_code);
          grid.down('hiddenfield[name=process_id]').setValue(process_id);
          grid.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
          funcShowCustomizableWindow('Query Wizard', '70%', grid, 'customizablewindow');
      },
    impsaveApplicationInvoicingDetails: function (btn) {
        var me = this,
            isLocked = btn.isLocked,
            isSubmission = btn.isSubmission,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoicingDetailsGrid = activeTab.down('importinvoicingcostdetailsgrid'),
            invoicingDetailsStore = invoicingDetailsGrid.getStore(),
            save_btn = activeTab.down('button[name=save_btn]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            isLocked_field = activeTab.down('hiddenfield[name=isLocked]'),
            isFastTrack_field = activeTab.down('checkbox[name=is_fast_track]'),
            payingCurrency_field = activeTab.down('combo[name=paying_currency_id]'),
            paying_currency_id = activeTab.down('combo[name=paying_currency_id]').getValue();

        if (!application_id) {
            toastr.warning('Problem encountered, application id not set!!', 'Warning Response');
            return false;
        }
        if (invoicingDetailsStore.data.length < 1) {
            toastr.warning('No Cost Elements Selected For Invoicing!!', 'Warning Response');
            return false;
        }
        if (!paying_currency_id) {
            toastr.warning('Please select paying currency!!', 'Warning Response');
            return false;
        }
        if ((isLocked) && isLocked == 1 && isSubmission < 1) {
            Ext.MessageBox.confirm('Confirm', 'Are you sure to commit invoice details?', function (button) {
                if (button === 'yes') {
                    save_btn.setVisible(false);
                    payingCurrency_field.setReadOnly(true);
                    isFastTrack_field.setReadOnly(true);
                    me.impcommitApplicationInvoicingDetails(btn);
                }
            });
        } else {
            me.impcommitApplicationInvoicingDetails(btn);
        }
    },
    impcommitApplicationInvoicingDetails: function (btn) {

        var me = this,
            toaster = btn.toaster,
            isLocked = btn.isLocked,
            isSubmission = btn.isSubmission,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoicingDetailsGrid = activeTab.down('importinvoicingcostdetailsgrid'),
            invoicingDetailsStore = invoicingDetailsGrid.getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            invoice_id_field = activeTab.down('hiddenfield[name=invoice_id]'),
            invoice_no_field = activeTab.down('displayfield[name=invoice_no]'),
            paying_currency_id = activeTab.down('combo[name=paying_currency_id]').getValue(),
            permit_fob_value = activeTab.down('numberfield[name=permit_fob_value]').getValue(),
            is_fast_track_fld = activeTab.down('checkbox[name=is_fast_track]'),
            reference_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            invoice_id = invoice_id_field.getValue(),
            isLocked_field = activeTab.down('hiddenfield[name=isLocked]'),
            storeData = invoicingDetailsStore.getData().items,
            details = [],
            is_fast_track = 0;


        isLocked_field.setValue(isLocked);
        if (is_fast_track_fld.checked) {
            is_fast_track = 1;
        }
        Ext.each(storeData, function (item) {
            var element_costs_id = item.data.element_costs_id,
                cost = item.data.cost,
                currency_id = item.data.currency_id,
                exchange_rate = item.data.exchange_rate,
                quantity = item.data.quantity,
                obj = {
                    element_costs_id: element_costs_id,
                    cost: cost,
                    currency_id: currency_id,
                    exchange_rate: exchange_rate,
                    quantity: quantity
                };
            details.push(obj);
        });
        Ext.getBody().mask('Commiting Application Invoice Details...');
        Ext.Ajax.request({
            url: 'saveApplicationInvoicingDetails',
            jsonData: details,
            params: {
                application_id: application_id,
                application_code: application_code,
                invoice_id: invoice_id,
                applicant_id: applicant_id,
                paying_currency_id: paying_currency_id,
                fob: permit_fob_value,
                isLocked: isLocked,
                isSubmission: isSubmission,
                is_fast_track: is_fast_track,
                module_id: module_id,
                reference_no: reference_no
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success == true || success === true) {
                    if ((isLocked == 1 || isLocked === 1) && isSubmission < 1) {
                        btn.setDisabled(true);
                        me.fireEvent('printInvoice');
                    }
                    if (toaster == 0 || toaster === 0) {
                        //do nothing
                    } else {
                        invoicingDetailsStore.load();
                        toastr.success(message, 'Success Response');
                        invoice_id_field.setValue(resp.invoice_id);
                        invoice_no_field.setValue(resp.invoice_no);
                    }
                } else {
                    toastr.error(message, 'Failure Response');
                }
                Ext.getBody().unmask();
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },
    saveApplicationInvoicingDetails: function (btn) {
        var me = this,
            isLocked = btn.isLocked,
            isSubmission = btn.isSubmission,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoicingDetailsGrid = activeTab.down('invoicingcostdetailsgrid'),
            invoicingDetailsStore = invoicingDetailsGrid.getStore(),
            save_btn = activeTab.down('button[name=save_btn]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            isLocked_field = activeTab.down('hiddenfield[name=isLocked]'),
            isFastTrack_field = activeTab.down('checkbox[name=is_fast_track]'),
            payingCurrency_field = activeTab.down('combo[name=paying_currency_id]'),
            paying_currency_id = activeTab.down('combo[name=paying_currency_id]').getValue();
        isLocked_field.setValue(isLocked);
        if (!application_id) {
            toastr.warning('Problem encountered, application id not set!!', 'Warning Response');
            return false;
        }
        if (invoicingDetailsStore.data.length < 1) {
            toastr.warning('No Cost Elements Selected For Invoicing!!', 'Warning Response');
            return false;
        }
        if (!paying_currency_id) {
            toastr.warning('Please select paying currency!!', 'Warning Response');
            return false;
        }
        if ((isLocked) && isLocked == 1 && isSubmission < 1) {
            Ext.MessageBox.confirm('Confirm', 'Are you sure to commit invoice details?', function (button) {
                if (button === 'yes') {
                    save_btn.setVisible(false);
                    payingCurrency_field.setReadOnly(true);
                    isFastTrack_field.setReadOnly(true);
                    me.commitApplicationInvoicingDetails(btn);
                }
            });
        } else {
            me.commitApplicationInvoicingDetails(btn);
        }
    },

    commitApplicationInvoicingDetails: function (btn) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            toaster = btn.toaster,
            isLocked = btn.isLocked,
            isSubmission = btn.isSubmission,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoicingDetailsGrid = activeTab.down('invoicingcostdetailsgrid'),
            invoicingDetailsStore = invoicingDetailsGrid.getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            invoice_id_field = activeTab.down('hiddenfield[name=invoice_id]'),
            invoice_no_field = activeTab.down('displayfield[name=invoice_no]'),
            paying_currency_id = activeTab.down('combo[name=paying_currency_id]').getValue(),
            is_fast_track_fld = activeTab.down('checkbox[name=is_fast_track]'),
            reference_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            invoice_id = invoice_id_field.getValue(),
            storeData = invoicingDetailsStore.getData().items,
            details = [],
            is_fast_track = 0;
        if (is_fast_track_fld.checked) {
            is_fast_track = 1;
        }
        Ext.each(storeData, function (item) {
            var element_costs_id = item.data.element_costs_id,
                cost = item.data.cost,
                currency_id = item.data.currency_id,
                exchange_rate = item.data.exchange_rate,
                quantity = item.data.quantity,
                obj = {
                    element_costs_id: element_costs_id,
                    cost: cost,
                    currency_id: currency_id,
                    exchange_rate: exchange_rate,
                    quantity: quantity
                };
            details.push(obj);
        });
        Ext.getBody().mask('Commiting Application Invoice Details...');
        Ext.Ajax.request({
            url: 'saveApplicationInvoicingDetails',
            jsonData: details,
            params: {
                application_id: application_id,
                application_code: application_code,
                invoice_id: invoice_id,
                applicant_id: applicant_id,
                paying_currency_id: paying_currency_id,
                isLocked: isLocked,
                isSubmission: isSubmission,
                is_fast_track: is_fast_track,
                module_id: module_id,
                reference_no: reference_no
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success == true || success === true) {
                    if ((isLocked == 1 || isLocked === 1) && isSubmission < 1) {
                        btn.setDisabled(true);
                        me.fireEvent('printInvoice');
                    }
                    if (toaster == 0 || toaster === 0) {
                        //do nothing
                    } else {
                        invoicingDetailsStore.load();
                        toastr.success(message, 'Success Response');
                        invoice_id_field.setValue(resp.invoice_id);
                        invoice_no_field.setValue(resp.invoice_no);
                    }
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },
    removeimpInvoiceCostElement: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            summary_grid = activeTab.down('importinvoicingcostdetailsgrid'),
            sm = summary_grid.getSelectionModel(),
            records = sm.getSelection(),
            summary_store = summary_grid.getStore(),
            selected = [];
        Ext.each(records, function (record) {
            var id = record.get('invoice_detail_id');
            if (id) {
                selected.push(id);
            }
        });
        Ext.MessageBox.confirm('Confirm', 'Are you sure to remove selected invoice items?', function (button) {
            if (button === 'yes') {
                Ext.getBody().mask('Please wait...');
                Ext.Ajax.request({
                    url: 'removeInvoiceCostElement',
                    jsonData: selected,
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success == true || success === true) {
                            summary_store.remove(records);
                            toastr.success(message, 'Success Response');
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },
    removeInvoiceCostElement: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            summary_grid = activeTab.down('invoicingcostdetailsgrid'),
            sm = summary_grid.getSelectionModel(),
            records = sm.getSelection(),
            summary_store = summary_grid.getStore(),
            selected = [];
        Ext.each(records, function (record) {
            var id = record.get('invoice_detail_id');
            if (id) {
                selected.push(id);
            }
        });
        Ext.MessageBox.confirm('Confirm', 'Are you sure to remove selected invoice items?', function (button) {
            if (button === 'yes') {
                Ext.getBody().mask('Please wait...');
                Ext.Ajax.request({
                    url: 'removeInvoiceCostElement',
                    jsonData: selected,
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success == true || success === true) {
                            summary_store.remove(records);
                            toastr.success(message, 'Success Response');
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },
    showImpInvoicingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validateImportInvoicingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    validateImportInvoicingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoiceDetailsGrid = activeTab.down('importinvoicingcostdetailsgrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            invoice_id = activeTab.down('hiddenfield[name=invoice_id]').getValue(),
            is_locked = activeTab.down('hiddenfield[name=isLocked]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!invoice_id) {
            toastr.warning('Please Save Invoice Details!!', 'Warning Response');
            return false;
        }
        if (is_locked < 1) {
            toastr.warning('Please Confirm Invoice Details!!', 'Warning Response');
            return false;
        }
        if (invoiceDetailsGrid.getStore().data.length < 1) {
            toastr.warning('No Cost Elements Selected For Invoicing!!', 'Warning Response');
            return false;
        } else {
            this.impsaveApplicationInvoicingDetails(btn);
        }
        return true;
    },

    showInvoicingApplicationSubmissionWin: function (btn) {

        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validateInvoicingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    validateInvoicingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoiceDetailsGrid = activeTab.down('paymentinvoicingcostdetailsgrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
            if (!application_id) {
                toastr.warning('Please Save Application Details!!', 'Warning Response');
                return false;
            }
            
            if (invoiceDetailsGrid.getStore().data.length < 1) {
                toastr.warning('No Invoice Generated, generate Invoice and proceed!!', 'Warning Response');
                return false;
            } 
            return true;
    },
    funConfirmUploadedPaymentsDetails: function (btn) {
        var me = this,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            title = btn.winTitle,
            width = btn.winWidth,
            childXtype = btn.childXtype,
            //table_name = btn.table_name,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            record = btn.getWidgetRecord(),
            arrayLength = storeArray.length,
            table_name = getApplicationTable(module_id, section_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        Ext.MessageBox.confirm('Confirm', 'This option is only acceptable for Non Electronic payments as per the set guidelines. Do you want to continue?', function (button) {
            if (button === 'yes') {
                Ext.getBody().mask('Please wait...');
                Ext.Ajax.request({
                    method: 'GET',
                    url: 'getApplicationApplicantDetails',
                    params: {
                        application_code: application_code,
                        table_name: table_name
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message,
                            results = resp.results;
                        if (success == true || success === true) {
                            if (!results) {
                                toastr.warning('Problem getting applicant details!!', 'Warning Response');
                                return false;
                            }
                            var model = Ext.create('Ext.data.Model', results);
                            child.loadRecord(model);

                            child.down('textfield[name=drawer]').setValue(results.applicant_name);

                            child.down('hiddenfield[name=invoice_no]').setValue(record.get('invoice_no'));
                            child.down('hiddenfield[name=invoice_id]').setValue(record.get('invoice_id'));

                            child.down('combo[name=currency_id]').setValue(record.get('currency_id'));
                            child.down('numberfield[name=amount_paid]').setValue(record.get('amount_paid'));
                            child.down('textfield[name=trans_ref]').setValue(record.get('payment_reference'));
                            funcShowCustomizableWindow(title, width, child, 'customizablewindow');

                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },

    showPaymentReceptionForm: function (btn) {
        var me = this,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            title = btn.winTitle,
            width = btn.winWidth,
            childXtype = btn.childXtype,
            //table_name = btn.table_name,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            item_rec = btn.up('button'),
            record = item_rec.getWidgetRecord(),
            arrayLength = storeArray.length,
            table_name = getApplicationTable(module_id, section_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        Ext.MessageBox.confirm('Confirm', 'This option is only acceptable for Non Electronic payments as per the set guidelines. Do you want to continue?', function (button) {
            if (button === 'yes') {
                Ext.getBody().mask('Please wait...');
                Ext.Ajax.request({
                    method: 'GET',
                    url: 'getApplicationApplicantDetails',
                    params: {
                        application_code: application_code,
                        table_name: table_name
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message,
                            results = resp.results;
                        if (success == true || success === true) {
                            if (!results) {
                                toastr.warning('Problem getting applicant details!!', 'Warning Response');
                                return false;
                            }
                            var model = Ext.create('Ext.data.Model', results);
                            child.loadRecord(model);

                            child.down('textfield[name=drawer]').setValue(results.applicant_name);
                            child.down('hiddenfield[name=invoice_no]').setValue(record.get('invoice_no'));
                            child.down('hiddenfield[name=invoice_id]').setValue(record.get('invoice_id'));
                            child.down('combo[name=currency_id]').setValue(record.get('paying_currency_id'));
                            funcShowCustomizableWindow(title, width, child, 'customizablewindow');
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },
    showLaboratoryPaymentApplicationSubmissionWin:function(btn){

        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            paymentDetailsGrid = activeTab.down('limsapplicationpaymentsgrid'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),

            intrayStore = Ext.getStore('intraystr'),
            outtrayStore = Ext.getStore('outtraystr'),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            reference_no = activeTab.down('displayfield[name=reference_no]').getValue(),

            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            valid = this.validateLaboratoryPaymentSubmission();

                if (valid == true || valid === true) {

            Ext.MessageBox.confirm('Confirm', 'Submit Laboratory Sample Application for processing?', function (bbttn) {
                if (bbttn === 'yes') {
                    Ext.getBody().mask('Please wait...');
                    Ext.Ajax.request({
                        method: 'GET',
                        url: 'sampleanalysis/submitRegistrationToNextStage',
                        params: {
                            ref: reference_no,
                            hostProcess: workflow_stage_id
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        },
                        success: function (response) {
                            Ext.getBody().unmask();
                            var resp = Ext.JSON.decode(response.responseText),
                                message = resp.message,
                                success = resp.success;
                            if(success){
                                intrayStore.load();
                                outtrayStore.load();

                                   mainTabPanel.remove(activeTab);
                                 toastr.success(message, 'Failure Response');
                            }
                            else{

                            toastr.error(message, 'Failure Response');
                            }

                        },
                        failure: function (response) {
                            Ext.getBody().unmask();
                            var resp = Ext.JSON.decode(response.responseText),
                                message = resp.message;
                            toastr.error(message, 'Failure Response');
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            mask.hide();
                            toastr.error('Error: ' + errorThrown, 'Error Response');
                        }
                    });
                }
            });


                } else {
                    Ext.getBody().unmask();
                }

    },

    validateLaboratoryPaymentSubmission: function () {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            paymentDetailsGrid = activeTab.down('limsapplicationpaymentsgrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            balance_str = activeTab.down('displayfield[name=running_balance]').getValue(),
            balance = 0;
            if(balance_str){
                balance = balance_str.split("(")[0];
                var bal_txt = balance.replace('-', ''),
                bal = balance.replace(',', '');
                if (parseFloat(bal) < 0) {
                    toastr.warning('The Application cannot be submitted until the applicant clears a balance of ' + bal_txt + '(Tsh)!!', 'Warning Response');
                    return false;
                }
            }


        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }


        return true;
    },

    showPaymentApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            //paymentDetailsGrid = activeTab.down('applicationpaymentsgrid'),
            invoicepaymentverificationdetailsGrid = activeTab.down('invoicepaymentverificationdetailsGrid'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validatePaymentSubmission(),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
            
            if(invoicepaymentverificationdetailsGrid.getStore().getTotalCount() < 1){
                toastr.warning('The application doesnt have an invoice, kindly contact the system Admin!!', 'Warning Response');
            }
            else{
               
                    if (valid == true || valid === true) {
                        showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
                    } else {
                        Ext.getBody().unmask();
                    }
              

            }
             Ext.getBody().unmask();
            
       
    },
    validatePaymentSubmission: function () {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            // paymentDetailsGrid = activeTab.down('applicationpaymentsgrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            balance_str = activeTab.down('displayfield[name=running_balance]').getValue(),
            balance = 0;
            if(balance_str){
                balance = balance_str.split("(")[0];
                var bal_txt = balance.replace('-', ''),
                bal = balance.replace(',', '');
                if (parseFloat(bal) > 0) {
                    toastr.warning('The Application cannot be submitted until the applicant clears a balance of ' + balance_str, 'Warning Response');
                    return false;
                }
            }
           
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
       
       
        return true;
    },

    addApplicationWorkflowParams: function (me) {
        var store = me.store,
            table_name = me.table_name,
            managerInspection = me.managerInspection,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            gmp_type_id = (activeTab.down('combo[name=gmp_type_id]')) ? activeTab.down('combo[name=gmp_type_id]').getValue() : null,
            inspection_type_id = me.inspection_type_id,
            inspection_id = null;
        if ((managerInspection) && managerInspection == 1) {
            inspection_id = activeTab.down('form').down('hiddenfield[name=id]').getValue();
        }
    
        store.getProxy().extraParams = {
            table_name: table_name,
            workflow_stage_id: workflow_stage_id,
            section_id: section_id,
            gmp_type_id: gmp_type_id,
            inspection_type_id: inspection_type_id,
            inspection_id: inspection_id
        };
    },

    moveSelectedRecordRowToTop: function (gridView) {
        var store = gridView.getStore(),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            selectedRecordIndex = store.find('id', application_id);
        if (selectedRecordIndex > 0) {
            var selectedRecord = store.getAt(selectedRecordIndex);
            store.removeAt(selectedRecordIndex);
            store.insert(0, [selectedRecord]);
            gridView.refresh();
        }
        
    },

    prepareManagersInterfaceGeneric: function () {//for all
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mainGrid = activeTab.down('grid'),
            mainStore = mainGrid.getStore(),
            sm = mainGrid.getSelectionModel(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (application_id) {
            mainStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    prepareManagerQueryInterfaceGeneric: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            mainGrid = activeTab.down('grid'),
            mainStore = mainGrid.getStore(),
            sm = mainGrid.getSelectionModel(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (module_id == 2 || module_id === 2) {
            mainGrid.getColumnManager().getHeaderByDataIndex('premise_name').setHidden(false);
        }
        if (module_id == 3 || module_id === 3) {
            mainGrid.getColumnManager().getHeaderByDataIndex('site_name').setHidden(false);
        }
        if (application_id) {
            mainStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    showManagerQueryApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagerqueryfrm', winWidth, storeID,'','','',workflow_stage_id);

        } else {
            Ext.getBody().unmask();
        }
    },
    showManagerApplicationSubmissionWinGeneric: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            valid = true,
            is_dataammendment_request =0,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
            if(activeTab.down('hiddenfield[name=is_dataammendment_request]')){
                is_dataammendment_request =activeTab.down('hiddenfield[name=is_dataammendment_request]').getValue();
            }

        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, storeID,'','','',workflow_stage_id,is_dataammendment_request);

        } else {
            Ext.getBody().unmask();
        }
    },
    showApprovalApplicationSubmissionWinGeneric: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            approval_grid = activeTab.down('grid'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            valid = true,
            is_dataammendment_request =0,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
            if(activeTab.down('hiddenfield[name=is_dataammendment_request]')){
                is_dataammendment_request =activeTab.down('hiddenfield[name=is_dataammendment_request]').getValue();
            }
            var sm = approval_grid.getSelectionModel();
                records = sm.getSelection();

        Ext.each(records, function (record) {
            var id = record.get('id'),
                recommendation_id = record.get('recommendation_id');
            if (recommendation_id < 1) {
                var row = record.index;
                    sm.deselect(record, true, false);
                    toastr.error('Enter approval recommendation to the selected Products before submission.  !!', 'Failure Response');
                    Ext.getBody().unmask();
                    closeActiveWindow() ;
                    return;
            }

        });
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, storeID,'','','',workflow_stage_id,is_dataammendment_request);

        } else {
            Ext.getBody().unmask();
        }
    },

    showManagerApplicationMeetingSubmissionWinGeneric: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            gridXtype = btn.gridXtype,
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validateApplicationTcMeetingDetails(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, storeID,'',gridXtype);
        } else {

            toastr.error('Enter meeting Details to proceed!!', 'Failure Response');
            Ext.getBody().unmask();
        }
    },
    showGridApplicationReturnSubmissionWinGenericNoMeeting:function (item) {
        Ext.getBody().mask('Please wait...');

        var mainTabPanel = this.getMainTabPanel(), btn = item.up('button'),
            winWidth = item.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            application_id = record.get('id');
            extraParams = [{
                    field_type: 'hiddenfield',
                    field_name: 'workflowaction_type_id',
                    value: 9
                },{
                    field_type: 'hiddenfield',
                    field_name: 'non_mainpanel_close',
                    value: 1

                }];

            var section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
                storeID = item.storeID,
                table_name = getApplicationTable(module_id);


            //
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,extraParams);

    },
    showGridApplicationReturnSubmissionWinGeneric:function (item) {
        Ext.getBody().mask('Please wait...');

        var mainTabPanel = this.getMainTabPanel(), btn = item.up('button'),
            winWidth = item.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            application_id = record.get('id');
            extraParams = [{
                    field_type: 'hiddenfield',
                    field_name: 'workflowaction_type_id',
                    value: 9
                },{
                    field_type: 'hiddenfield',
                    field_name: 'non_mainpanel_close',
                    value: 1

                }];

            var section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
                valid = this.validateApplicationTcMeetingDetails(btn),
                storeID = item.storeID,
                table_name = getApplicationTable(module_id);


            //
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,extraParams);

    },

    validateApplicationTcMeetingDetails: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            frm = activeTab.down('form'),
            form = frm.getForm(),
            valid = true;

        if (!form.isValid()) {
            valid = false;
        }
        var meeting_id = frm.down('hiddenfield[name=id]').getValue();
        if (meeting_id == '') {
            valid = false;
        }
        return valid;
    },

    showApplicationSubmissionWithoutValidationWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID, 1);
        } else {
            Ext.getBody().unmask();
        }
    },
    submitClinicalRegistryDetailsFrmBtn: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            win = btn.up('window'),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            var extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'non_mainpanel_close',
                value: 0
            }]
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowportalinitialsubmissionsfrm', winWidth, storeID,  extraParams, '', '','','',1);

        } else {
            Ext.getBody().unmask();
        }
    },
   
    showInspectionDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            isReadOnly = btn.isReadOnly,
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childItem = Ext.widget(btn.childXtype),
            form = childItem.down('form'),
            grid = childItem.down('grid');
        grid.setIsWin(1);
        grid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        form.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        form.setHeight(100);
        grid.setHeight(250);
        Ext.getBody().mask('Please wait...');
        Ext.Ajax.request({
            method: 'GET',
            url: 'premiseregistration/getInspectionDetails',
            params: {
                application_id: application_id,
                application_code: application_code
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    results = resp.results;
                if (success == true || success === true) {
                    if (results) {
                        var model = Ext.create('Ext.data.Model', results);
                        form.loadRecord(model);
                    }
                    funcShowCustomizableWindow(winTitle, winWidth, childItem, 'customizablewindow');
                    grid.getStore().load();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    showPrevStructuredChecklistDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showWinFrm: function (btn) {
        // if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

    showApplicationUploads: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        child.setHeight(450);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        var docTypesStr = child.down('combo[name=applicable_documents]').getStore();
        docTypesStr.removeAll();
        docTypesStr.load({
            params: {
                section_id: section_id,
                module_id: module_id,
                sub_module_id: sub_module_id,
                workflow_stage: workflow_stage
            }
        });
    },

    saveApplicationApprovalDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mainStore = activeTab.down('grid').getStore(),
            form = btn.up('form'),
            frm = form.getForm(),
            win = form.up('window'),
            action_url = 'saveApplicationApprovalDetails';
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        mainStore.load();
                        toastr.success(message, "Success Response");
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },
    savepermitReleaseRecommendation:function(btn){

        var me = this,
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),

        mainStore = activeTab.down('grid').getStore(),
        form = btn.up('form'),
        frm = form.getForm(),

        win = form.up('window'),
        action_url = 'importexportpermits/savepermitReleaseRecommendation';
    if (frm.isValid()) {
        frm.submit({
            url: action_url,
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            waitMsg: 'Please wait...',
            success: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    success = response.success,
                    message = response.message;
                if (success == true || success === true) {

                    toastr.success(message, "Success Response");
                    mainStore.removeAll();
                    mainStore.load();

                    win.close();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (fm, action) {
                var resp = action.result;
                toastr.error(resp.message, 'Failure Response');
            }
        });
    }

    },
    saveSpecialpermitApprovalRecommendation: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mainStore = activeTab.down('grid').getStore(),
            form = btn.up('form'),
            recommendation_id = form.down('combo[name=decision_id]').getValue(),
            frm = form.getForm(),

            win = form.up('window'),
            action_url = 'importexportpermits/saveSpecialpermitApprovalRecommendation';
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        activeTab.down('combo[name=approval_recommendation_id]').setValue(recommendation_id);
                        toastr.success(message, "Success Response");
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },
    prepareApplicationCommunicationsGeneric: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mainGrid = activeTab.down('grid'),
            mainStore = mainGrid.getStore(),
            sm = mainGrid.getSelectionModel(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (application_id) {
            mainStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    saveApplicationPaymentDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            running_balance = activeTab.down('displayfield[name=running_balance]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            url = btn.action_url,
            table_name = btn.table_name,
            form = btn.up('form'),
            applicant_name = form.down('displayfield[name=applicant_name]').getValue(),
            amount_paid = form.down('numberfield[name=amount_paid]').getValue(),
            currency_id = form.down('combo[name=currency_id]').getValue(),
            invoice_id = form.down('hiddenfield[name=invoice_id]').getValue(),
            win = form.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm(),
            mask = new Ext.LoadMask({
                msg: 'Validating Payments...',
                target: win
            });


        if (frm.isValid()) {
            Ext.MessageBox.confirm('Confirm', 'Save Payment Transaction?', function (bbttn) {
                if (bbttn === 'yes') {
                    mask.show();
                    Ext.Ajax.request({
                        method: 'GET',
                        url: 'checkInvoicePaymentsLimit',
                        params: {
                            section_id: section_id,
                            module_id: module_id,
                            currency_id: currency_id,
                            amount: amount_paid,
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        },
                        success: function (response) {
                            mask.hide();
                            var resp = Ext.JSON.decode(response.responseText),
                                status_code = resp.status_code,
                                limit_amount = resp.limit_amount,
                                message = resp.message;
                            if (status_code == 2 || status_code === 2) {
                                Ext.MessageBox.confirm('Payment Invoice Limit(Warning)', 'Payments Limit = ' + limit_amount + ', Generated Payment Amount = ' + amount_paid + ', Do you want to Continue?', function (button) {
                                    if (button === 'yes') {
                                        me.commitApplicationPayment(frm, url, table_name, application_id, application_code, invoice_id, section_id, module_id, sub_module_id, applicant_name, running_balance, store, win);
                                    }
                                });
                            } else if (status_code == 4 || status_code === 4) {
                                toastr.error(message, 'Failure Response');
                            } else {
                                me.commitApplicationPayment(frm, url, table_name, application_id, application_code, invoice_id, section_id, module_id, sub_module_id, applicant_name, running_balance, store, win);
                            }
                        },
                        failure: function (response) {
                            mask.hide();
                            var resp = Ext.JSON.decode(response.responseText),
                                message = resp.message;
                            toastr.error(message, 'Failure Response');
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            mask.hide();
                            toastr.error('Error: ' + errorThrown, 'Error Response');
                        }
                    });
                }
            });
        }
    },

    commitApplicationPayment: function (frm, url, table_name, application_id, application_code, invoice_id, section_id, module_id, sub_module_id, applicant_name, running_balance, store, win) {
        var me = this;
        frm.submit({
            url: url,
            params: {
                table_name: table_name,
                application_id: application_id,
                application_code: application_code,
                section_id: section_id,
                module_id: module_id,
                sub_module_id: sub_module_id,
                applicant_name: applicant_name
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            waitMsg: 'Please wait...',
            success: function (form, action) {
                var response = Ext.decode(action.response.responseText),
                    success = response.success,
                    message = response.message,
                    balance = response.balance,
                    invoice_amount = response.invoice_amount,
                    payment_id = response.record_id,
                    txt;
                if (success == true || success === true) {
                    if (Math.abs(parseFloat(balance)) == parseFloat(invoice_amount) || Math.abs(parseFloat(balance)) === parseFloat(invoice_amount)) {
                        txt = ' (Not Paid)';
                    } else if (parseFloat(balance) > 0) {
                        txt = ' (Over-Paid)';
                    } else if (parseFloat(balance) < 0) {
                        txt = ' (Under-Paid)';
                    } else {
                        txt = ' (Cleared)';
                    }
                    running_balance.setValue(balance + txt);
                    toastr.success(message, "Success Response");
                    if(store){
                        store.removeAll();
                        store.load();
                    }
                    win.close();
                    me.fireEvent('printReceipt', payment_id);
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (form, action) {
                var resp = action.result;
                toastr.error(resp.message, 'Failure Response');
            }
        });
    },

    showApplicationQueries: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            is_manager_query = grid.is_manager_query,
            is_manager_query_response = grid.is_manager_query_response,
            record = btn.getWidgetRecord(),
            ref_no = record.get('reference_no'),
            workflow_stage_id = record.get('workflow_stage_id'),
            application_code = record.get('application_code'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            childXtype = item.childXtype,
            childItemXtype = 'applicationqueriesgrid',
            childItem;
        if (childXtype) {
            childItemXtype = childXtype;
        }
        childItem = Ext.widget(childItemXtype);
        childItem.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        childItem.down('hiddenfield[name=application_code]').setValue(application_code);
        childItem.down('hiddenfield[name=module_id]').setValue(module_id);
        childItem.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        childItem.down('hiddenfield[name=section_id]').setValue(section_id);
        childItem.down('hiddenfield[name=is_manager_query]').setValue(is_manager_query);
        
        childItem.down('hiddenfield[name=is_manager_query_response]').setValue(is_manager_query_response);
        funcShowCustomizableWindow(ref_no + ' QUERIES(Request for Additional Information)', '85%', childItem, 'customizablewindow');
    },

    showManagerQueries: function (btn) {//kip here
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            tracking_no = activeTab.down('displayfield[name=tracking_no]').getValue(),
            childItem = Ext.widget(btn.childXtype);
        childItem.down('hiddenfield[name=application_code]').setValue(application_code);
        childItem.down('hiddenfield[name=module_id]').setValue(module_id);
        childItem.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        childItem.down('hiddenfield[name=section_id]').setValue(section_id);
        funcShowCustomizableWindow(tracking_no + ' QUERIES', '85%', childItem, 'customizablewindow');
    },

    showApplicationQueriesGeneric: function (ref_no, application_code, module_id, sub_module_id, section_id, show_response_col) {
        var childItem = Ext.widget('allqueriesgrid'),
            col = childItem.getColumnManager().getHeaderByDataIndex('last_response');
        if ((show_response_col) && show_response_col == 1) {
            if (col) {
                col.setHidden(false);
            }
        }
        childItem.down('hiddenfield[name=application_code]').setValue(application_code);
        childItem.down('hiddenfield[name=module_id]').setValue(module_id);
        childItem.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        childItem.down('hiddenfield[name=section_id]').setValue(section_id);
        funcShowCustomizableWindow(ref_no + ' QUERIES', '85%', childItem, 'customizablewindow');
    },

    showApplicationChecklists: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            ref_no = record.get('reference_no'),
            process_id = record.get('process_id'),
            application_id = record.get('id'),
            application_code = record.get('application_code'),
            childItem = 'allchecklistsgrid',
            documents_subpnl = 'documentssubmissionrecommendationfrm';

            wizardPnl = Ext.create('Ext.tab.Panel', {layout: 'fit',items:[{xtype: documents_subpnl, title: 'Documents Submission Recommendation'},{xtype: childItem, title: 'Screening Checklists'}]});


            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=application_code]').setValue(application_code);

            wizardPnl.down('textarea[name=remarks]').setReadOnly(true);
            wizardPnl.down('combo[name=document_status_id]').setReadOnly(true);
            wizardPnl.down('button[name=btn_remarks]').setHidden(true);

            funcShowCustomizableWindow(ref_no + 'Screening Recommendation & Checklist', '85%', wizardPnl, 'customizablewindow');

    },

    submitRejectedOnlineApplication: function (application_id, application_code, action_url, table_name) {
        Ext.MessageBox.confirm('Confirm', 'Are you sure to reject this application?', function (button) {
            if (button === 'yes') {
                var childObject = Ext.widget('onlineapplicationrejectionfrm');
                childObject.down('hiddenfield[name=application_id]').setValue(application_id);
                childObject.down('hiddenfield[name=application_code]').setValue(application_code);
                childObject.down('hiddenfield[name=table_name]').setValue(table_name);
                childObject.down('button[name=submit_rejectedapp]').action_url = action_url;
                funcShowCustomizableWindow('Online Application Rejection', '35%', childObject, 'customizablewindow');
            }
        });
    },

    submitStructuredQueriedOnlineApplication: function (application_id, application_code, action_url, table_name) {
        Ext.MessageBox.alert('Info', 'The application will be forwarded back to the trader because you have raise queries', function (button) {
            var childObject = Ext.widget('onlineapplicationqueryfrm');
            childObject.down('hiddenfield[name=application_id]').setValue(application_id);
            childObject.down('hiddenfield[name=application_code]').setValue(application_code);
            childObject.down('hiddenfield[name=table_name]').setValue(table_name);
            childObject.down('button[name=submit_rejectedapp]').action_url = action_url;
            funcShowCustomizableWindow('Online Application Rejection', '35%', childObject, 'customizablewindow');
        });
    },

    onlineApplicationManagerRejectionAction: function (application_id, action_url, table_name, application_status) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            store = activeTab.down('grid').getStore();
        Ext.MessageBox.confirm('Confirm', 'Are you sure to perform this action?', function (button) {
            if (button === 'yes') {
                Ext.MessageBox.show({
                    title: 'Remarks',
                    msg: 'Remarks/Comments:',
                    width: 320,
                    buttons: Ext.MessageBox.OKCANCEL,
                    multiline: true,
                    scope: this,
                    fn: function (btn, text) {
                        var comment = text;
                        if (btn === 'ok') {
                            Ext.getBody().mask('Please wait...');
                            if (comment == '' || comment === '') {
                                Ext.getBody().unmask();
                                toastr.warning('Please Enter Remark!!', 'Warning Response');
                                return;
                            }
                            Ext.Ajax.request({
                                url: action_url,
                                params: {
                                    application_id: application_id,
                                    comment: comment,
                                    table_name: table_name,
                                    application_status: application_status
                                },
                                headers: {
                                    'Authorization': 'Bearer ' + access_token,
                                    'X-CSRF-Token': token
                                },
                                success: function (response) {
                                    Ext.getBody().unmask();
                                    var resp = Ext.JSON.decode(response.responseText),
                                        success = resp.success,
                                        message = resp.message;
                                    if (success == true || success === true) {
                                        toastr.success(message, 'Success Response');
                                        store.load();
                                        closeActiveWindow();
                                    } else {
                                        toastr.error(message, 'Failure Response');
                                    }
                                },
                                failure: function (response) {
                                    Ext.getBody().unmask();
                                    var resp = Ext.JSON.decode(response.responseText),
                                        message = resp.message;
                                    toastr.error(message, 'Failure Response');
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    Ext.getBody().unmask();
                                    toastr.error('Error: ' + errorThrown, 'Error Response');
                                }
                            });
                        }
                    }
                });
            }
        });
    },

    commitRejectedOnlineApplication: function (btn) {
        var me = this,
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm(),
            action_url = btn.action_url,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            grid_store = activeTab.down('grid').getStore();
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        win.close();
                        closeActiveWindow();
                        grid_store.load();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },

    commitStructuredQueriedOnlineApplication: function (btn) {
        var me = this,
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm(),
            action_url = btn.action_url,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            grid_store = activeTab.down('grid').getStore();
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        win.close();
                        closeActiveWindow();
                        grid_store.load();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },
    receiveMultipleOnlineApplicationDetails:function(btn){
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            gridXtype = btn.gridXtype,
            grid =  this.getOnlineapplicationpermitmanagersubgrid(),
            action_url = btn.action_url,           
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            inTrayStore = Ext.getStore('intraystr'),
            outTrayStore = Ext.getStore('outtraystr'),
            onlineapplicationdashboardgridstr = Ext.getStore('onlineapplicationdashboardgridstr'),
            onlineappssubmissioncounterstr = Ext.getStore('onlineappssubmissioncounterstr'),
            form = btn.up('form'),
            curr_stage_id = form.down('hiddenfield[name=curr_stage_id]').getValue(),
            win = form.up('window'),
            frm = form.getForm();

            selected = this.buildApplicationsToSubmit(grid, '',activeTab);
            if (frm.isValid()) {
                frm.submit({
                    url: action_url,
                    waitMsg: 'Please wait...',
                    params: {
                        selected: JSON.stringify(selected[0]),
                        selected_appCodes: JSON.stringify(selected[1])
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (fm, action) {
                        var response = Ext.decode(action.response.responseText),
                            success = response.success,
                            message = response.message;
                        if (success == true || success === true) {
                            toastr.success(message, "Success Response");
                            win.close();
                            closeActiveWindow();
                            inTrayStore.load();
                            outTrayStore.load();
                            onlineapplicationdashboardgridstr.load();
                            onlineappssubmissioncounterstr.load();
                            
                           
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (fm, action) {
                        var response = Ext.decode(action.response.responseText);
                        toastr.error(response.message, 'Failure Response');
                    }
                });
            }
    },
    
    buildApplicationsToSubmit: function (grid, mode,activeTab='') {
        var records,
            selected_appIds = [],
            selected_appCodes = [];
            var sm = grid.getSelectionModel();
            records = sm.getSelection()
        
        Ext.each(records, function (record) {
            var id = record.get('id'),
                application_code = record.get('application_code');
            if (id) {
                selected_appIds.push(id);
            }
            if (application_code) {
                selected_appCodes.push(application_code);
            }
        });
        return [
            selected_appIds,
            selected_appCodes
        ];
        //return selected_appIds;
    },
    receiveOnlineApplicationDetails: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            storeID = btn.storeID,
            action_url = btn.action_url,
            store = activeTab.down('grid').getStore(),//Ext.getStore(storeID),
            intrayStore = Ext.getStore('intraystr'),
            onlineapplicationdashboardgridstr = Ext.getStore('onlineapplicationdashboardgridstr'),
            onlineappssubmissioncounterstr = Ext.getStore('onlineappssubmissioncounterstr'),
            outtrayStore = Ext.getStore('outtraystr'),
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.load();
                        intrayStore.load();
                        outtrayStore.load();
                        onlineapplicationdashboardgridstr.load();
                        onlineappssubmissioncounterstr.load();
                        win.close();
                        closeActiveWindow();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },


    receiveandInvoiceOnlineApplicationDetails: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            action_url = btn.action_url,
            me = this,
            form = btn.up('form'),
            application_code = form.down('hiddenfield[name=application_code]').getValue(),
            application_id = form.down('hiddenfield[name=application_id]').getValue(),
            module_id = form.down('hiddenfield[name=module_id]').getValue(),
            win = form.up('window'),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                params:{
                    application_code:application_code
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                       // this.generateApplicationInvoice();
                        me.fireEvent('funcgenerateApplicationInvoice', application_id, module_id, response.invoice_id,application_code);
                         win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },

    showApplicationDocUploadWin: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            if(application_code != ''){
                this.showApplicationDocUploadWinGeneric(btn, section_id, module_id, sub_module_id, workflow_stage, application_code);
            }
            else{
                toastr.error('Application details not found, save application to upload!!', 'Failure Response');
            }

    },
    showUnstructuredDocUploadWin: function (btn) {

        var childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            grid = btn.up('grid'),
            document_type_id = grid.down('hidden[name=document_type_id]').getValue(),
            table_name = grid.down('hidden[name=table_name]').getValue(),
            reference_record_id = grid.down('hidden[name=reference_record_id]').getValue(),
            reference_table_name = grid.down('hidden[name=reference_table_name]').getValue(),
            storeID = grid.storeID,
            form = Ext.widget(childXtype);


        form.down('hiddenfield[name=document_type_id]').setValue(document_type_id);
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        form.down('hiddenfield[name=reference_record_id]').setValue(reference_record_id);
        form.down('hiddenfield[name=reference_table_name]').setValue(reference_table_name);

        form.down('button[name=upload_file]').storeID = storeID;

        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
    },
    updateProgress: function(value,progressBar) {
        progressBar.setValue(value*0.01);
        progressBar.updateText(value+' %');          
    },
    showApplicationDocUploadWinGeneric: function (btn, section_id, module_id, sub_module_id, workflow_stage, application_code) {
      
        var childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            
            grid = btn.up('grid'),
            storeID = grid.storeID,
            form = Ext.widget(childXtype);
        form.down('hiddenfield[name=application_code]').setValue(application_code);
        form.down('hiddenfield[name=section_id]').setValue(section_id);
        form.down('hiddenfield[name=module_id]').setValue(module_id);
        form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        form.down('button[name=upload_file_btn]').storeID = storeID;
        if(!btn.show_assessor){
            form.down('combo[name=assessment_by]').setVisible(false);
        }
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        var docTypesStr = form.down('combo[name=doctype_id]').getStore();
            docTypesStr.removeAll();
            docTypesStr.load({
                params: {
                    section_id: section_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    workflow_stage: workflow_stage
                }
            });
    },

    showPreviousUploadedDocsGeneric: function (btn, section_id, module_id, sub_module_id, workflow_stage, application_code) {
        var childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype);
        childObject.setHeight(450);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=module_id]').setValue(module_id);
        childObject.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        childObject.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    previewGMPUploadedDocuments: function (item) {
        var record = item.getWidgetRecord(),
            application_code = record.get('application_code'),
            section_id = record.get('section_id');
            module_id = record.get('module_id');
            sub_module_id = record.get('sub_module_id');
            var childXtype = '',
                winTitle = btn.winTitle,
                winWidth = btn.winWidth,
                childObject = Ext.widget(childXtype);
            childObject.setHeight(450);
            childObject.down('hiddenfield[name=section_id]').setValue(section_id);
            childObject.down('hiddenfield[name=module_id]').setValue(module_id);
            childObject.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            childObject.down('hiddenfield[name=application_code]').setValue(application_code);
            funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    uploadApplicationFile: function (btn) {
        var me = this,
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm(),
            formValues = form.getValues(),
            storeID = btn.storeID,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            uploads_store = Ext.getStore(storeID),
            resumable = btn.resumable,
            progressBar = btn.progressBar;
        if(resumable != ''){
            //add parameters
            resumable.opts.query.id=formValues.id;
            resumable.opts.query.application_id=formValues.application_id;
            resumable.opts.query.application_code=formValues.application_code;
            resumable.opts.query.process_id=formValues.process_id;
            resumable.opts.query.section_id=formValues.section_id;
            resumable.opts.query.module_id=formValues.module_id;
            resumable.opts.query.sub_module_id=formValues.sub_module_id;
            resumable.opts.query.workflow_stage_id=formValues.workflow_stage_id;
            resumable.opts.query.document_type_id=formValues.document_type_id;
            resumable.opts.query.prodclass_category_id=formValues.prodclass_category_id;
            resumable.opts.query.importexport_permittype_id=formValues.importexport_permittype_id;
            resumable.opts.query.premise_type_id=formValues.premise_type_id;
            resumable.opts.query.query_ref_id=formValues.query_ref_id;
            resumable.opts.query.node_ref=formValues.node_ref;
            resumable.opts.query.doctype_id=formValues.doctype_id;
            resumable.opts.query.document_requirement_id=formValues.document_requirement_id;
            resumable.opts.query.assessment_by=formValues.assessment_by;
            resumable.opts.query.assessment_start_date=formValues.assessment_start_date;
            resumable.opts.query.assessment_end_date=formValues.assessment_end_date;
            resumable.opts.query.description=formValues.description;
           
            funcShowCustomizableWindow("Upload Progress", '20%', progressBar, 'customizablewindow', btn);
            resumable.upload();
        }else{
             toastr.error('Please select a file/document to upload!', 'Missing File');
        }
    },initializeResumableUpload: function(btn){
        var me = this,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = btn.up('form'),
            win = form.up('window'),
            rec = form.getValues(),
            id = rec.application_id,
            application_id = rec.application_id,
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            uploads_store = Ext.getStore('applicationDocumentsUploadsStr'),
            progressBar = Ext.widget('progress');
        // let browseFile = $('#browseFile');
        let resumable = new Resumable({
            target: 'documentmanagement/resumableuploadApplicationDocumentFile',
            query:{
                _token:token,
                view_module_id: module_id,
                id: id,
                application_id: application_id,
                application_code: '',
                process_id: '',
                section_id: '',
                module_id: '',
                sub_module_id: '',
                workflow_stage_id: '',
                document_type_id: '',
                prodclass_category_id: '',
                importexport_permittype_id: '',
                premise_type_id: '',
                query_ref_id: '',
                node_ref: '',
                doctype_id: '',
                document_requirement_id: '',
                assessment_by: '',
                assessment_start_date: '',
                assessment_end_date: '',
                description: ''
            } ,
            fileType: [],
            chunkSize: 10*1024*1024, // 10mbs
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Accept' : 'application/json'
            },
            testChunks: false,
            throttleProgressCallbacks: 1,
        });
        // console.log(browseFile);
        resumable.assignBrowse(document.getElementById('browseButton'));

        resumable.on('fileAdded', function (file) { // trigger when file picked
            document.getElementById('fileName').value = file.relativePath;
            btn.resumable = resumable;
            btn.progressBar = progressBar;
            //resumable.upload() // to actually start uploading.
        });

        resumable.on('fileProgress', function (file) { // trigger when file progress update
            me.updateProgress(Math.floor(file.progress() * 100), progressBar);
        });

        resumable.on('fileSuccess', function (file, response) { // trigger when file upload complete
            response = JSON.parse(response);
            console.log(uploads_store);
            uploads_store.load();
            success = response.success;
            if(success == true){
                toastr.success("Uploaded Successfully", 'Success Response');
                uploads_store.load();
            }else{
                toastr.error(response.message+ " If problem persist contact system admin", 'Failure Response!!');
            }
            progressBar.up('window').close();
            win.close();
            delete resumable;
        });

        resumable.on('fileError', function (file, response) { // trigger when there is any error
            progressBar.up('window').close();
            res = JSON.parse(response);
            uploads_store.load();
            win.close();
            toastr.error(res.message+ " If problem persist contact system admin", 'Failure Response!!');
        });
    },
    uploadApplicationFilearchive: function (btn) {
        var me = this,
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm(),
            storeID = btn.storeID,
            uploads_store = Ext.getStore(storeID);
        frm.submit({
            //clientValidation: false,
            url: 'documentmanagement/uploadApplicationDocumentFile',
            waitMsg: 'Uploading...',
            success: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    message = response.message,
                    success = response.success;
                if (success == true || success === true) {
                    toastr.success(message, 'Success Response');
                    uploads_store.load();
                    win.close();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    message = response.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    uploadunstructureddocumentuploads: function (btn) {
        var me = this,
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm(),
            storeID = btn.storeID,
            uploads_store = Ext.getStore(storeID);
        frm.submit({
            //clientValidation: false,
            url: 'documentmanagement/uploadunstructureddocumentuploads',
            waitMsg: 'Uploading...',
            success: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    message = response.message,
                    success = response.success;
                if (success == true || success === true) {
                    toastr.success(message, 'Success Response');
                    uploads_store.load();
                    win.close();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    message = response.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    saveApplicationComment: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        this.saveApplicationCommentsGeneric(btn, workflow_stage_id);
    },

    saveApplicationCommentsGeneric: function (btn, workflow_stage_id) {
        var formPnl = btn.up('form'),
            frm = formPnl.getForm(),
            panel = formPnl.up('panel'),
            comment_type_id = panel.down('hiddenfield[name=comment_type_id]').getValue(),
            application_id = panel.down('hiddenfield[name=application_id]').getValue(),
            application_code = panel.down('hiddenfield[name=application_code]').getValue(),
            grid = panel.down('grid'),
            store = grid.getStore(),
            add_btn = grid.down('button[name=add_btn]');
        if (frm.isValid()) {
            frm.submit({
                url: 'api/saveCommonData',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    workflow_stage_id: workflow_stage_id,
                    comment_type_id: comment_type_id,
                    table_name: 'tra_applications_comments'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                waitMsg: 'Please wait...',
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.removeAll();
                        store.load();
                        formPnl.setVisible(false);
                        add_btn.setDisabled(false);
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },

    refreshevaluationcommentsgrid: function (me) {

        var store = me.store,
            grid = me.up('grid'),
            document_type_id = grid.document_type_id,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        store.getProxy().extraParams = {
            application_code: application_code
        };
    },
    showApplicationCommentsWin: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        this.showApplicationCommentsGeneric(btn, application_id, application_code);
    },

    showApplicationCommentsGeneric: function (item, application_id, application_code) {
        var me = this,
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            comment_type_id = item.comment_type_id,
            child = Ext.widget(childXtype);
        if (!comment_type_id) {
            toastr.warning('Comment Type not specified!!', 'Warning Response');
            return;
        }
        child.down('hiddenfield[name=application_id]').setValue(application_id);
        child.down('hiddenfield[name=application_code]').setValue(application_code);
        child.down('hiddenfield[name=comment_type_id]').setValue(comment_type_id);
        child.setHeight(450);
        funcShowCustomizableWindow('Overrall Comments & Recommendation', '50%', child, 'customizablewindow');
    },

    submitQueriedOnlineApplication: function (btn) {
        var grid = btn.up('grid'),
            win = grid.up('window'),
            store = Ext.getStore('onlinequeriesstr'),
            application_id = grid.down('hiddenfield[name=application_id]').getValue(),
            module_id = grid.down('hiddenfield[name=module_id]').getValue(),
            action_url = 'submitQueriedOnlineApplication',
            queryCount = grid.getStore().getTotalCount(),
            table_name,
            mask = new Ext.LoadMask(
                {
                    target: win,
                    msg: 'Please wait...'
                }
            );
        if (module_id == 1 || module_id === 1) {
            table_name = 'wb_product_applications';
        } else if (module_id == 2 || module_id === 2) {
            table_name = 'wb_premises_applications';
        } else if (module_id == 3 || module_id === 3) {
            table_name = 'wb_gmp_applications';
        } else if (module_id == 7 || module_id === 7) {
            table_name = 'wb_clinical_trial_applications';
        } else if (module_id == 4 || module_id === 4) {
            table_name = 'wb_importexport_applications';
        }
        if (queryCount < 1) {
            toastr.warning('You have not raised any query yet!!', 'Warning Response');
            return false;
        }
        mask.show();
        Ext.Ajax.request({
            url: action_url,
            params: {
                application_id: application_id,
                table_name: table_name
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success == true || success === true) {
                    toastr.success(message, 'Success Response');
                    store.load();
                    win.close();
                    closeActiveWindow();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mask.hide();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    addInvoiceFastTrackChange: function (checkbox) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            summary_grid = activeTab.down('invoicingcostdetailsgrid'),
            summary_store = summary_grid.getStore(),
            quantity = 1;
        if (checkbox.checked) {
            quantity = 2;
        }
        for (var i = 0; i < summary_store.data.items.length; i++) {
            var record = summary_store.data.items [i];
            record.set('quantity', quantity);
        }
    },

    funcSaveSampleDetails: function (btn) {
        var containerPnl = this.getSampleanalysistestrequestspnl(),
            action_url = btn.action_url,
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            mis_sample_id = containerPnl.down('hiddenfield[name=sample_id]').getValue(),
            analysis_type_id = containerPnl.down('hiddenfield[name=analysis_type_id]').getValue(),
            application_code = containerPnl.down('hiddenfield[name=application_code]').getValue(),
            sample_application_code = containerPnl.down('hiddenfield[name=sample_application_code]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            zone_id = containerPnl.down('hiddenfield[name=zone_id]').getValue(),
            code_ref_no = containerPnl.down('hiddenfield[name=code_ref_no]').getValue(),
            workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            productDetailsForm = containerPnl.down('#sampledetailsfrm'),

            productDetailsFrm = productDetailsForm.getForm();
        if (productDetailsFrm.isValid()) {
            productDetailsFrm.submit({
                url: 'sampleanalysis/' + action_url,
                waitMsg: 'Please wait...',
                params: {
                    application_code: application_code,
                    sample_application_code: sample_application_code,
                    workflow_stage_id: workflow_stage_id,
                    module_id: module_id,
                    section_id: section_id,
                    zone_id: zone_id,
                    code_ref_no: code_ref_no,
                    mis_sample_id: mis_sample_id,
                    analysis_type_id: analysis_type_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        laboratory_reference_no = resp.laboratory_reference_no,
                        limssample_id = resp.sample_id;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        containerPnl.down('displayfield[name=laboratoryreference_no]').setValue(laboratory_reference_no);
                        containerPnl.down('hiddenfield[name=limssample_id]').setValue(limssample_id);
                        if(section_id == 2){
                            sampletabpanel = containerPnl.down('#sampletabpanel'),
                            sampletabpanel.setActiveTab(1);
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
        }
    },

    funcAddSampleTestParameters: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainPnl = this.getSampleanalysistestrequestspnl(),
            grid = btn.up('grid'),
            win = grid.up('window'),
            limssample_id = mainPnl.down('hiddenfield[name=limssample_id]').getValue(),
            storeId = btn.storeId,
            store = Ext.getStore(storeId),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected = [];
        Ext.each(selected_records, function (item) {
            selected.push(item.data.parameter_costs_id);
        });
        Ext.Ajax.request({
            url: 'sampleanalysis/funcAddSampleTestParameters',
            params: {
                selected: JSON.stringify(selected),
                limssample_id: limssample_id,
                _token: token
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success || success == true || success === true) {
                    toastr.success(message, 'Success Response!!');
                    store.load();
                    win.close();
                } else {
                    toastr.error(message, 'Failure Response!!');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.warning(message, 'Failure Response!!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    saveTCMeetingDetails: function (btn,) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form'),
            toaster = btn.toaster,
            frm = form.getForm(),
            applicationsGrid = btn.up('grid'),//activeTab.down(applicationsGridXtype),
            sm = applicationsGrid.getSelectionModel(),
            selected_records = sm.getSelection(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            selected = [];

        Ext.each(selected_records, function (item) {
            selected.push(item.data.application_code);
        });

        if (frm.isValid()) {
            if (!sm.hasSelection()) {
                toastr.warning('Please select at least one application!!', 'Warning Response');
                return false;
            }
            frm.submit({
                url: 'clinicaltrial/saveTCMeetingDetails',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                params: {
                    application_code: application_code,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    selected: JSON.stringify(selected),
                },
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message,
                        record_id = response.record_id;
                    if (success == true || success === true) {
                        form.down('hiddenfield[name=id]').setValue(record_id);
                        applicationsStore.load();
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                        }
                    } else {
                        closeActiveWindow();
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    closeActiveWindow();
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        } else {
            toastr.warning('Fill all required fields!!', 'Warning Response');
            closeActiveWindow();
            return false;
        }
    },

    showAddApplicationVariationRequest: function (btn) {
        var me = this,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            title = btn.winTitle,
            childObject = Ext.widget(btn.childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=module_id]').setValue(module_id);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);

        if(activeTab.down('hiddenfield[name=appeal_type_id]')){
            var appeal_type_id = activeTab.down('hiddenfield[name=appeal_type_id]').getValue();
            childObject.down('hiddenfield[name=appeal_type_id]').setValue(appeal_type_id);

        }
        if (!application_id) {
            toastr.warning('Please save application first!!', 'Warning Response');
            return false;
        }
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },

    showAddAppdataammendmentrequest: function (btn) {
        var me = this,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            appdata_ammendementrequest_id = activeTab.down('hiddenfield[name=appdata_ammendementrequest_id]').getValue(),


            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            title = btn.winTitle,
            childObject = Ext.widget(btn.childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=module_id]').setValue(module_id);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=appdata_ammendementrequest_id]').setValue(appdata_ammendementrequest_id);
        if (!application_id) {
            toastr.warning('Please save application first!!', 'Warning Response');
            return false;
        }
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },
    showQueryResponses: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            ref_no = activeTab.down('displayfield[name=tracking_no]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        this.fireEvent('showApplicationQueriesGeneric', ref_no, application_code, module_id, sub_module_id, section_id);
    },

    previewQueriesFromOnlineApp: function (btn) {
        var win = btn.up('window'),
            ref_no = win.down('displayfield[name=tracking_no]').getValue(),
            application_code = win.down('hiddenfield[name=application_code]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue();
        this.fireEvent('showApplicationQueriesGeneric', ref_no, application_code, module_id, sub_module_id, section_id, 1);
    },

    refreshapplicationunstructuredqueriesgrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            application_code = grid.down('hiddenfield[name=application_code]').getValue();
        store.getProxy().extraParams = {
            application_code: application_code,
        };
    },

    receiveOnlineApplicationDetailsFrmBtn1: function (btn) {
        Ext.getBody().mask('Please wait...');
        var win = btn.up('window'),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),

            hasQueries = checkApplicationRaisedQueries(application_code, module_id);
        if(win.down('button[name=prechecking_recommendation]')){
            hasPrecheckingrecommendation = checkPrecheckingrecommendation(application_code, module_id);
        }
        if ((hasQueries) && hasQueries == 1) {
            this.showQueriedApplicationSubmissionWin(btn);
        } else {
            this.submitOnlineApplicationDetailsToOfficer(btn);
        }
    },
    receiveAndInvoiceOnlineApplicationDetailsFrmBtn: function (btn) {
            Ext.getBody().mask('Please wait...');
            var storeID = btn.storeID,
                winWidth = btn.winWidth,
                win = btn.up('window'),
                application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
                application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
                tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
                module_id = win.down('hiddenfield[name=module_id]').getValue(),
                sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
                section_id = win.down('hiddenfield[name=section_id]').getValue(),
                status_type_id = win.down('hiddenfield[name=status_type_id]').getValue(),
                application_status_id = win.down('hiddenfield[name=application_status_id]').getValue(),
                hasQueries = checkApplicationRaisedQueries(application_code, module_id),

                table_name = getApplicationTable(module_id),

                extraParams = [
                    {
                        field_type: 'hiddenfield',
                        field_name: 'table_name',
                        value: table_name
                    }, {
                        field_type: 'hiddenfield',
                        field_name: 'application_code',
                        value: application_code
                    }, {
                        field_type: 'hiddenfield',
                        field_name: 'application_status_id',
                        value: application_status_id
                    }
                ];
                invoiceIsGenerated = checkGeneratedInvoiceDetails(application_code, module_id,sub_module_id,section_id);
                if(invoiceIsGenerated){
                        toastr.warning('Invoice has already been generated, print and submit!!', 'Warning Response');
                        Ext.getBody().unmask();
                        return false;

                }

                if(!hasQueries){
                    if(win.down('combo[name=applicable_checklist]')){
                        checklist_category_id = win.down('combo[name=applicable_checklist]').getValue();
                        hasValidatedChecklist = checkOnlineApplicationChecklistDetails(application_code, module_id,sub_module_id,section_id,checklist_category_id);
                        if(!hasValidatedChecklist){
                            toastr.warning('Fill in all the checklist details to proceed!!', 'Warning Response');
                            Ext.getBody().unmask();
                            return false;

                        }

                    }
                    showreceiveAndInvoiceOnlineApplicationDetails(application_id, application_code, module_id, sub_module_id, section_id, 'onlineapplicationreceiceinvoicefrm', winWidth, storeID, tracking_no, status_type_id, extraParams, hasQueries);
                }
                else{
                    toastr.warning('The Application has a pending query, close the query or submit to the Manager(Query Process) !!', 'Warning Response');
                    Ext.getBody().unmask();
                    return false;

                }

    },

    
    receiveOnlineApplicationDetailsNonInvoiceFrmBtn: function (btn) {

        Ext.getBody().mask('Please wait...');
        var storeID = btn.storeID,
            winWidth = btn.winWidth,
            win = btn.up('window'),
            is_invoicecheck = btn.is_invoicecheck,
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            status_type_id = win.down('hiddenfield[name=status_type_id]').getValue(),
            application_status_id = win.down('hiddenfield[name=application_status_id]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            table_name = getApplicationTable(module_id),
            extraParams = [
                {
                    field_type: 'hiddenfield',
                    field_name: 'table_name',
                    value: table_name
                }, {
                    field_type: 'hiddenfield',
                    field_name: 'application_code',
                    value: application_code
                }, {
                    field_type: 'hiddenfield',
                    field_name: 'application_status_id',
                    value: application_status_id
                }, {
                    field_type: 'hiddenfield',
                    field_name: 'status_type_id',
                    value: status_type_id
                }, {
                    field_type: 'hiddenfield',
                    field_name: 'has_queries',
                    value: hasQueries
                }
            ];

        showOnlineSubmissionWin(application_id, application_code, module_id, sub_module_id, section_id, 'onlinesubmissionsfrm', winWidth, storeID, tracking_no, status_type_id, extraParams, hasQueries);
        Ext.getBody().unmask();
    },


    showQueriedApplicationSubmissionWin: function (btn) {
        Ext.getBody().unmask();
        var action_url = 'submitStructuredQueriedOnlineApplication',
            win = btn.up('window'),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            table_name = 'wb_premises_applications';
        //btn.fireEvent('submitApplication', application_id, application_code, action_url, table_name);
        Ext.MessageBox.alert('Info', 'The application will be forwarded back to the trader because you have raised queries', function (button) {
            var childObject = Ext.widget('onlinestructuredapplicationqueryfrm');
            childObject.down('hiddenfield[name=application_id]').setValue(application_id);
            childObject.down('hiddenfield[name=application_code]').setValue(application_code);
            childObject.down('hiddenfield[name=table_name]').setValue(table_name);
            childObject.down('hiddenfield[name=module_id]').setValue(module_id);
            childObject.down('button[name=submit_queriedapp]').action_url = action_url;
            funcShowCustomizableWindow('Online Application Submission - Queried', '35%', childObject, 'customizablewindow');
        });
    },refreshpreviousgmpdocuploadsgrid: function (me) {

        var grid = me.up('grid'),
            store = grid.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();

        //check if has been set or use window
        if (me.up('window')) {

                var panel = me.up('window'),
                    application_code = panel.down('hiddenfield[name=active_application_code]').getValue();
                    module_id = panel.down('hiddenfield[name=module_id]').getValue(),
                    section_id = panel.down('hiddenfield[name=section_id]').getValue(),
                    sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue();

        }
        else {

            var application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue();


        }

        store.getProxy().extraParams = {
            application_code: application_code
        };

    },
    renderParameterMenu: function(parameter_id){
       var def_id = parameter_id;
        
                Ext.Ajax.request({
                        url: 'configurations/getParameterGridColumnsConfig',
                        method: 'GET',
                        params: {
                            def_id: def_id
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'X-CSRF-Token': token
                        },
                        success: function (response) {

                            var resp = Ext.JSON.decode(response.responseText),
                                success = resp.success,
                                message = resp.message,
                                result = resp.results,
                                title = resp.title;
                                table_name = resp.table_name;
                            if (success == true || success === true) {
                                
                                var panel = Ext.create('Ext.panel.Panel',{
                                    viewModel: 'configurationsvm',
                                    controller: 'configurationsvctr',
                                    title: title,
                                    closable: true,
                                    userCls: 'big-100 small-100',
                                    height: Ext.Element.getViewportHeight() - 118,
                                    layout:{
                                        type: 'fit'
                                    },
                                    items: []
                                });
                                var grid =  Ext.create('Ext.grid.Panel',{
                                                cls: 'dashboard-todo-list',
                                                autoScroll: true,
                                                autoHeight: true,
                                                width: '100%',
                                                //height: Ext.Element.getViewportHeight() - 118,
                                                viewConfig: {
                                                    deferEmptyText: false,
                                                    emptyText: 'Nothing to display',
                                                    getRowClass: function (record, rowIndex, rowParams, store) {
                                                        var is_enabled = record.get('is_enabled');
                                                        if (is_enabled == 0 || is_enabled === 0) {
                                                            return 'invalid-row';
                                                        }
                                                    }
                                                },
                                                tbar: [{
                                                    xtype: 'button',
                                                    text: 'Add',
                                                    iconCls: 'x-fa fa-plus',
                                                    action: 'add',
                                                    ui: 'soft-green',
                                                    //childXtype: 'actingreasonFrm',
                                                    winTitle: title+'',
                                                    winWidth: '40%',
                                                    handler: 'renderParameterForm',
                                                    stores: '[]'
                                                },{
                                                    xtype: 'hiddenfield',
                                                    name: 'def_id',
                                                    fieldLabel: 'def_id',
                                                    allowBlank: true
                                                },{
                                                    xtype: 'hiddenfield',
                                                    name: 'db_con',
                                                    fieldLabel: 'db_con',
                                                    allowBlank: true
                                                }, {
                                                    xtype: 'exportbtn'
                                                }],
                                                plugins: [
                                                    {
                                                        ptype: 'gridexporter'
                                                    }
                                                ],
                                                export_title: title+'',
                                                bbar: [{
                                                    xtype: 'pagingtoolbar',
                                                    width: '100%',
                                                    displayInfo: true,
                                                    displayMsg: 'Showing {0} - {1} of {2} total records',
                                                    emptyMsg: 'No Records',
                                                    beforeLoad: function() {
                                                        var grid=this.up('grid'),
                                                            store = grid.getStore(),
                                                            def_id=grid.down('hiddenfield[name=def_id]').getValue();

                                                         var store=this.getStore();
                                                         store.getProxy().extraParams = {
                                                                def_id:def_id
                                                            }
                                                        }
                                                }],
                                                features: [{
                                                    ftype: 'searching',
                                                    minChars: 2,
                                                    mode: 'local'
                                                }],
                                                listeners: {
                                                    beforerender: {
                                                        fn: 'setConfigGridsStore',
                                                        config: {
                                                            pageSize: 1000,
                                                            storeId: table_name+'Str',
                                                            proxy: {
                                                                url: 'configurations/getParameterGridConfig',
                                                            }
                                                        },
                                                        isLoad: true
                                                    }
                                                },
                                            
                                            columns:[{
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'id',
                                                    text: 'Ref ID'
                                                },{
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'is_enabled',
                                                    text: 'Enable',
                                                    flex: 1,
                                                    renderer: function (value, metaData) {
                                                        if (value) {
                                                            metaData.tdStyle = 'color:white;background-color:green';
                                                            return "True";
                                                        }

                                                        metaData.tdStyle = 'color:white;background-color:red';
                                                        return "False";
                                                    }
                                                },{
                                                text: 'Options',
                                                xtype: 'widgetcolumn',
                                                width: 90,
                                                widget: {
                                                    width: 75,
                                                    textAlign: 'left',
                                                    xtype: 'splitbutton',
                                                    iconCls: 'x-fa fa-th-list',
                                                    ui: 'gray',
                                                    menu: {
                                                        xtype: 'menu',
                                                        items: [{
                                                            text: 'Edit',
                                                            iconCls: 'x-fa fa-edit',
                                                            tooltip: 'Edit Record',
                                                            action: 'edit',
                                                            //childXtype: 'actingreasonFrm',
                                                            winTitle: title+'',
                                                            winWidth: '40%',
                                                            handler: 'renderParameterForm',
                                                            stores: '[]'
                                                        }, {
                                                            text: 'Disable',
                                                            iconCls: 'x-fa fa-repeat',
                                                            table_name: table_name,
                                                            storeID: table_name+'Str',
                                                            db_con: resp.db_con_name,
                                                            action_url: 'configurations/softDeleteConfigRecord',
                                                            action: 'soft_delete',
                                                            handler: 'deleteRecordFromIDByConnection'
                                                        }, {
                                                            text: 'Delete',
                                                            iconCls: 'x-fa fa-trash',
                                                            tooltip: 'Delete Record',
                                                            db_con: resp.db_con_name,
                                                            table_name: table_name,
                                                            storeID: table_name+'Str',
                                                            action_url: 'configurations/deleteConfigRecord',  
                                                            action: 'actual_delete',
                                                            handler: 'deleteRecordFromIDByConnection',
                                                            hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                                                        }, {
                                                            text: 'Enable',
                                                            iconCls: 'x-fa fa-undo',
                                                            tooltip: 'Enable Record',
                                                            db_con: resp.db_con_name,
                                                            table_name: table_name,
                                                            storeID: table_name+'Str',
                                                            action_url: 'configurations/undoConfigSoftDeletes',
                                                            action: 'enable',
                                                            disabled: true,
                                                            handler: 'deleteRecordFromIDByConnection'
                                                        }
                                                        ]
                                                    }
                                                }, onWidgetAttach: function (col, widget, rec) {
                                                    var is_enabled = rec.get('is_enabled');
                                                    if (is_enabled === 0 || is_enabled == 0) {
                                                        widget.down('menu menuitem[action=enable]').setDisabled(false);
                                                        widget.down('menu menuitem[action=soft_delete]').setDisabled(true);
                                                    } else {
                                                        widget.down('menu menuitem[action=enable]').setDisabled(true);
                                                        widget.down('menu menuitem[action=soft_delete]').setDisabled(false);
                                                    }
                                                }
                                            }]
                                            });
                                //add columns
                                for (var i = result.length - 1; i >= 0; i--) {
                                    var column = Ext.create('Ext.grid.column.Column', {
                                            text: result[i]+'',
                                            dataIndex: result[i]+'',
                                            width: 150,
                                            tbCls: 'wrap'
                                        });
                                     grid.headerCt.insert(
                                          grid.columns.length-2, 
                                          column);
                                  }
                                grid.down('hiddenfield[name=def_id]').setValue(def_id);
                                grid.down('hiddenfield[name=db_con]').setValue(resp.db_con_name);
                                panel.add(grid);

                                var main_panel =  Ext.ComponentQuery.query("#contentPanel")[0];
                                main_panel.add(panel);
                                main_panel.setActiveTab(main_panel.items.length-1);

                            } else {
                                toastr.error(message, 'Failure Response');
                            }
                        },
                        failure: function (response) {
                            var resp = Ext.JSON.decode(response.responseText),
                                message = resp.message;
                            toastr.error(message, 'Failure Response');
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            toastr.error('Error: ' + errorThrown, 'Error Response');
                        }
            });
    },
    showPremiseTCReviewSubmissionWinGeneric:function(btn){
        
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            valid = true,
            is_dataammendment_request =0,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
            extraParams = '';
            if(activeTab.down('combo[name=decision_id]')){
                    var decision_id = activeTab.down('combo[name=decision_id]').getValue();

                    if(decision_id <1){
                        toastr.error('Select the Recommendation before submission to the next stage!!', 'Failure Response');
                  
                   Ext.getBody().unmask();
                        return;
                    }
                    var record = activeTab.down('combo[name=decision_id]').findRecordByValue(decision_id);
                    if (record) {
                        workflowaction_type_id = record.get('workflowaction_type_id')
                        extraParams = [{
                            field_type: 'hiddenfield',
                            field_name: 'workflowaction_type_id',
                            value: workflowaction_type_id
                        }];
                    }
                    

            }
           
            
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, storeID,extraParams,'','',workflow_stage_id,is_dataammendment_request);
         
        } else {
            Ext.getBody().unmask();
        }



    }
});
