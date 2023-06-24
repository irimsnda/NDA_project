/**
 * Created by softclans
 * user robinson odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.controller.ImportExportpermitsCtr', {
    extend: 'Ext.app.Controller',
    stores: [
        'Admin.store.importexport.FoodImportExportPermitsStr',
        'Admin.store.importexport.DrugsImportExportPermitsStr',
        'Admin.store.importexport.CosmeticsImportExportPermitsStr',
        'Admin.store.importexport.MedicalDevImportExportPermitsStr',
        'Admin.store.importexport.DeclaredImportExportPermitsStr',
        'Admin.store.disposal.DisposalApplicationsDashGridStr',
        'Admin.store.importexport.NarcoticImportPermitsDashStr',
        'Admin.store.importexport.HospitalPermitsNarcoticsDashStr',
        'Admin.store.PermitProd_recommendationStr'
    ],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        },{
            ref: 'senderreceiverdetailsfrm',
            selector: 'senderreceiverdetailsfrm'
        },{
            ref: 'importexportpremisesfrm',
            selector: 'importexportpremisesfrm'
        },{
            ref: 'Importexportdetailsfrm',
            selector: 'Importexportdetailsfrm'
        }],
        control: {
            'onlineimportexportappsgrid': {
                refresh: 'refreshonlineimportexportappsgrid'
            },
            'importvisaproductsvalidationgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },
            
             'licensepermitsproductsgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },
            'personalusepermitsproductsgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },
            'narcoticsdrugspermitsproductsgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },
            'importexportpermitsproductsgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },
            'onlineimportexportpermitsproductsgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },
            
            'declaredonlineimportexportpermitsproductsgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },
            'disposaldestsupervisorsgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },
            'disposalpermitsproductsgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },
            'registerednonregisteredprodgrid': {
                refresh: 'refreshregisterednonregisteredprodgrid'
            },
            'onlineimportexportdocuploadsgrid': {
                refresh: 'refreshonlineimportexportdocuploadsgrid'
            },
            'onlinedeclaredimportexportdocuploadsgrid': {
                refresh: 'refreshonlineimportexportdocuploadsgrid'
            },
            
            'previousimportexportdocuploadsgrid': {
                refresh: 'refreshpreviousimportexportdocuploadsgrid'
            },
            
            
            'previousimportexportscreeninggrid': {
                refresh: 'refreshpreviousimportexportdocuploadsgrid'
            },
            
            
            'foodimportexportpermitsdashgrid': {
                refresh: 'refreshimportexportpermitsdashgrid'
            },
            'drugsimportexportpermitsdashgrid':{
                refresh: 'refreshimportexportpermitsdashgrid'
            },
            'cosmeticsimportexportpermitsdashgrid':{
                refresh: 'refreshimportexportpermitsdashgrid'
            },'medicaldevimportexportpermitsdashgrid':{
                refresh: 'refreshimportexportpermitsdashgrid'
            },'declaredimportexportpermitsdashgrid':{
                refresh: 'refreshdeclaredimportexportpermitsdashgrid'
            },
            
            
            'senderreceiverinformationgrid': {
                refresh: 'refreshsenderreceiverinformationgrid'
            },
            'personaluserpermitsreceivingwizard':{
                afterrender: 'prepaprePersonalPermitsReceiving'
            },
            'importexportonlinereceivingwizard': {
                afterrender: 'prepapreImportExportOnlineReceiving'
            },
            'impexplicenseonlinereceivingwizard': {
                afterrender: 'prepapreImportExportOnlineReceiving'
            },
            
            
            'declaredimportexportonlinereceivingwizard': {
                afterrender: 'prepapreDeclaredImportExportOnlineReceiving'
            },
            'permitdeclarationpreviewwizard': {
                afterrender: 'prepapreDeclaredImportExportOnlineReceiving'
            },
            
            'importexportreceivingpermitswizard': {
                    afterrender: 'prepapreImportExportReceiving'
            },
            'licenceapplicationreceivingpermitswizard': {
                afterrender: 'prepapreImportExportReceiving'
             },
            
            'importexportpermitmanagerreviewwizard': {
                    afterrender: 'prepapreImportExportManagerReview'
            },
            
            'importexportdeclaredpermitmanagerreviewwizard': {
                    afterrender: 'prepapreImportExportManagerReview'
            },
            'specialimportexportpermitapprovalwizard': {
                    afterrender: 'prepapreImportExportManagerReview'
            },
            
            //
            
            'specialimportexportpermitapprovalwizard button[name=process_submission_btn]': {
                click: 'showApplicationApprovalApplicationSubmissionWin'
            },
           
            'importexportpermitmanagerreviewwizard button[name=process_submission_btn]': {
                click: 'showImpManagerReviewApplicationSubmissionWin'
            },

            
            'importexportpermitmanagerreviewwizard button[name=process_tradersubmission_btn]': {
                click: 'showManagerReviewApplicationTraderSubmissionWin'
            },
            
            'importexportpermitmanagerreviewwizard button[name=returnback_submission_btn]': {
                click: 'showReturnBackApplicationSubmissionWin'
            },
            
            'importexportpermitmanagerreviewwizard button[name=review_recommendation]': {
                click: 'showManagerReviewRecommendationWin'
            },
            'importexportdeclaredpermitmanagerreviewwizard button[name=review_recommendation]': {
                click: 'showManagerReviewRecommendationWin'
            },
            'importexportdeclaredpermitmanagerreviewwizard button[name=process_submission_btn]': {
                click: 'showManagerReviewApplicationSubmissionWin'
            },
            'importexportdeclaredpermitmanagerreviewwizard button[name=process_tradersubmission_btn]': {
                click: 'showManagerReviewApplicationTraderSubmissionWin'
            },
            
            'importexportdeclaredpermitmanagerreviewwizard button[name=returnback_submission_btn]': {
                click: 'showReturnBackApplicationSubmissionWin'
            },
            /*
            'importexportdeclaredpermitmanagerreviewwizard button[name=review_recommendation]': {
                click: 'showManagerReviewRecommendationWin'
            },
*/
            
            'specialimportexportpermitapprovalwizard button[name=review_recommendation]': {
                click: 'showSpecialImpExpApprovalWin'
            },'controlleddrugslicensesreceiving': {
                afterrender: 'prepapreControlledDrugsPermitsReceiving'
             }, 
            
            'onlinedisposalapplicationswizard':{
                afterrender: 'prepapreDisposalOnlineReceiving'
            },
            'importexportpermitstb button[name=permithome_btn]': {
                click: 'importexportPermitHome'
            },'importexportapplicantdetailsfrm button[action=link_applicant]': {
                click: 'showApplicantSelectionList'
            },'importexppermitapplicantselectiongrid': {
                itemdblclick: 'onPermitApplicantSelectionListDblClick' 
            },'importexportpremisesfrm button[action=search_premise]': {
                click: 'showImpPremiseSelectionList'
            },'importexportpermitsproductsfrm button[action=btn_savepermitproducts]': {
                click: 'onSavePermitProductsDetails'
            },
            'licensepermitsproductsfrm button[action=btn_savepermitproducts]': {
                click: 'onSavePermitProductsDetails'
            },
        
            'narcoticsdrugspermitsproductsfrm button[action=btn_savepermitproducts]': {
                click: 'onSavePermitProductsDetails'
            },'personalusepermitsproductsfrm button[action=btn_savepermitproducts]': {
                click: 'onSavePermitProductsDetails'
            },
            
            
            'registeredpremisesdetailsgrid': {
                itemdblclick: 'onPremiseImpSelectionListDblClick'
            },'senderreceiverdetailsfrm button[action=link_applicant]': {
                click: 'showImpSenderReceiverlectionList'
            },'senderreceiverinformationgrid': {
                itemdblclick: 'onSenderreceiverinformationDLBClick'
            },'importexportpermitevaluationpnl': {
                afterrender: 'prepareImportExportPermitEvaluationPnl'
            },'importexportpermitevaluationpnl button[name=more_app_details]': {
                click: 'showPermitApplicationMoreDetails'
            },
            'importpermitinvoicingpanel form toolbar button[name=more_app_details]': {
                click: 'showPermitApplicationMoreDetails'
            },
           
            'importpermitinvoicingpanel form toolbar button[name=more_app_details]': {
                click: 'showPermitApplicationMoreDetails'
            },
            'importexportpermitreceiptingpnl form toolbar button[name=more_app_details]': {
                click: 'showPermitApplicationMoreDetails'
            },
            'controldrugsimpevaluationpnl button[name=process_submission_btn]': {
                click: 'showPermitEvaluationApplicationSubmissionWin'
            },
            'importexportpermitevaluationpnl button[name=process_submission_btn]': {
                click: 'showPermitEvaluationApplicationSubmissionWin'
            },
            'importpermitinvoicingpnl': {
                afterrender: 'prepareNewImportsInvoicing'
            },
            'importpermitinvoicingpnl toolbar[name=invoicing_details]': {
                afterrender: 'prepareImportsInvoicingOtherDetails'
            },

            'importpermitdeclarationinvoicingpnl': {
                afterrender: 'prepareNewImportsInvoicing'
            },
            'importpermitdeclarationinvoicingpnl toolbar[name=invoicing_details]': {
                afterrender: 'prepareImportsInvoicingOtherDetails'
            },
            
            'importexportpermitreceiptingpnl': {
                afterrender: 'prepareNewImportExportPayments'
            },
            'importexportpermitapprovalwizard': {
                    afterrender: 'prepapreImportExportManagerReview'
            },   'importexportpermitreleasepnl': {
                afterrender: 'prepapareImportpermitUniformStage'
            }, 'importexportmanagersubmissionpnl': {
                afterrender: 'prepapareImportpermitUniformStage'
            },
            'importexportpremisesvalidationpnl': {
                afterrender: 'prepapareImportpermitUniformStage'
            },'importexportproductsvalidationpnl': {
                afterrender: 'prepapareImportpermitUniformStage'
            },
            
            'importexportpermitreleasegrid': {
                refresh: 'importpermitApplicationsGridRefresh'
            },'importexportpermitreleaseapprovalgrid': {
                refresh: 'importpermitApplicationsGridRefresh'
            },
            'importexportpermitmanagersubgrid': {
                refresh: 'importpermitApplicationsSubmissionGridRefresh'
            },
            'importexportproductsvalidationgrid': {
                refresh: 'importpermitApplicationsSubmissionGridRefresh'
            },
            'importexportpremisesvalidationgrid': {
                refresh: 'importpermitApplicationsSubmissionGridRefresh'
            },

            
            'narcoticdrugspermitreleasegrid': {
                refresh: 'importpermitApplicationsGridRefresh'
            },
            'hospitalcontroldrugspermitreleasegrid': {
                refresh: 'importpermitApplicationsGridRefresh'
            },'narcoticsdrugspermitapprovalgrid': {
                refresh: 'importpermitApplicationsGridRefresh'
            },
            'hospitalcontroldrugspermitapprovalgrid': {
                refresh: 'importpermitApplicationsGridRefresh'
            },
            'importexportreviewrecommfrm button[name=save_recommendation]': {
                click: 'saveImportAppReviewRecommendationDetails'
            },
            
            'importexportpermitmanagerreviewgrid': {
                refresh: 'importpermitApplicationsGridRefresh'
            },'narcoticsdrugspermitapproval': {
                refresh: 'importpermitApplicationsGridRefresh'
            },'importexportqueryverificationgrid': {
                refresh: 'importpermitApplicationsGridRefresh'
            },'disposalpermitsqueryverificationgrid': {
                refresh: 'importpermitApplicationsGridRefresh'
            },   'importexportpermitmanagerreviewpnl': {
                afterrender: 'prepapareImportpermitUniformStage'
            },
            'permitdeclarationmanagerreviewpnl': {
                afterrender: 'prepapreImportExportManagerReview'
            },
            'exportpermitinvoicingpnl': {
                afterrender: 'prepareNewImportsInvoicing'
            },'impexppermitsmanagerevaluationgrid': { 
                refresh: 'importpermitApplicationsGridRefresh'
            },'specialcaseapplicationapprovalgrid': { 
                refresh: 'importpermitApplicationsGridRefresh'
            } , 'specialcaseapplicationapprovalpnl': {
                afterrender: 'prepapareImportpermitUniformStage'
            },'disposalpermitmangereviewgrid': { 
                refresh: 'importpermitApplicationsGridRefresh'
            },
            'disposalapplicationsdashgrid':{
                refresh: 'refreshimportexportpermitsdashgrid'
            },'disposalpermitverificationpnl': {
                afterrender: 'prepapareDisposalVerificationUniformStage'
            },'disposaldestsupervisorsgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },'pardisposalinternalsupervisorsfrm button[name=savesupervisors]': {
                click: 'onSaveDisposalinternalsupervisorsfrm'
            },'pardisposalexternalsupervisorsfrm button[name=savesupervisors]': {
                click: 'onSaveDisposalinternalsupervisorsfrm'
            },'disposalpermitverification button[action=process_submission_btn]': {
                click: 'showDisposalPermitDisposalSubmissionWin'
            },'disposalapplicantselectiongrid': {
                itemdblclick: 'onDisposalPermitApplicantSelectionListDblClick' 
            },
            
            
            'disposalpermitstb button[name=disposalpermitstbRegHomeBtn]': {
                click: 'permitsRegHome'
            },
            'poeinspectionprocesstb button[name=poepermitstbRegHomeBtn]': {
                click: 'poepermitsRegHome'
            },
            'importexportpersonaluserpermitstb button[name=permitstbRegHomeBtn]': {
                click: 'personalUsepermitsRegHome'
            },
            'hospitalpermitsdruncontrreceivingpermitswizard': {
                afterrender: 'prepapreNarcoticsPermitsReceiving'
             }, 
            'controlleddrugsreceivingpermitswizard': {
                afterrender: 'prepapreControlledDrugsPermitsReceiving'
             }, 
            'disposalapplicationswizard': {
                afterrender: 'prepapreDisposalReceiving'
             },      'disposalpermitsproductsfrm button[action=btn_savepermitproducts]': {
                    click: 'onSavePermitProductsDetails'
                },   
                'disposalpermitsinvoicingpnl': {
                    afterrender: 'prepareNewDisposalPaermitssInvoicing'
                },  'disposalpermitreceiptingpnl': {
                      afterrender: 'prepareNewDisposalPayments'
                },'disposalpermitsinvoicingpnl toolbar[name=invoicing_details]': {
                    afterrender: 'prepareDisposalInvoicingOtherDetails'
                },'specialcaseimpexpapprovalpnlgrid': {
                    refresh: 'importpermitApplicationsGridRefresh'
                },
                'inspectionimportexportspermitgrid': {
                    refresh: 'refreshinspectionimportexportspermitgrid'
                },'previousinspectionsgrid': {
                    refresh: 'refreshpreviousinspectionsgrid'
                },
                'poeinspectionpermitsproductsgrid': {
                    refresh: 'refreshpoeinspectionpermitsproductsgrid'
                },
                'declaredpoeinspectionpermitsproductsgrid': {
                    refresh: 'refreshpoeinspectionpermitsproductsgrid'
                },
			
                'importexportpermitstb button[name=permithome_btn]': {
                    click: 'importexportPermitHome'
                },'inspectionimportexportspermitgrid': {
                    itemdblclick: 'inspectionimportexportspermitgridDblClick' 
                },
                'poeinspectionprocessdashgrid': {
                    refresh: 'refreshpoeinspectionprocessdashgrid'
                },'receivingpoeinspectionswizard': {
                        afterrender: 'prepareReceivingpoeinspectionswizard'
                },'poeinspectionpermitsproductsgrid button[name=update_products]': {
                    click: 'funcSavePOEPermitProductDetails'
                },'poeinspectionpermitsproductsgrid button[name=update_allproducts]': {
                    click: 'funcSaveAllPOEPermitProductDetails'
                },'declaredpoeinspectionpermitsproductsgrid button[name=update_products]': {
                    click: 'funcSavePOEPermitProductDetails'
                },'declaredpoeinspectionpermitsproductsgrid button[name=update_allproducts]': {
                    click: 'funcSaveAllPOEPermitProductDetails'
                },
                
                
                'poeinspectionrecommendationfrm button[name=save_recommendation]': {
                    click: 'funcsavePOEPermitRecommendations'
                },'poeinspectionverificationfrm button[name=save_recommendation]': {
                    click: 'funcsavePOEPermitVerificationRecommendations'
                },
                
                
                'inspectedpoepermitsdashgrid': {
                    refresh: 'refreshinspectedpoepermitsdashgrid'
                } , 
                'inspectedpoepermitsproductsdashgrid': {
                    refresh: 'refreshinspectedpoepermitsdashgrid'
                } ,
                
                'impexppermitsmanagerevaluationgrid button[action=process_submission_btn]': {
                    click: 'showManagerQueryApplicationSubmissionWin'
                },'controldrugsimpmanagerevaluationgrid button[action=process_submission_btn]': {
                    click: 'showManagerApplicationSubmissionWin'
                },
                'drugsimportexportpermitstb button[name=disposalpermitstbRegHomeBtn]': {
                click: 'importpermitsRegHome'
            },'controlleddrugsimpmanagerreviewwizrd': {
					afterrender: 'prepapreImportExportManagerReview'
			}, 'controlleddrugsimpmanagerreviewwizrd button[name=process_submission_btn]': {
                click: 'showManagerReviewApplicationSubmissionWin'
            },'controlleddrugsimpmanagerreviewwizrd button[name=review_recommendation]': {
                click: 'showManagerReviewRecommendationWin'
            },'controlleddrugsimpmanagerreviewwizrd button[name=process_tradersubmission_btn]': {
                click: 'showManagerReviewApplicationTraderSubmissionWin'
            },
            
            'controlleddrugsimpmanagerreviewwizrd button[name=returnback_submission_btn]': {
                click: 'showReturnBackApplicationSubmissionWin'
            },'controldrugsimppermitsproductsgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },'controldrugslicensesproductsgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },
            'onlineordersupplydangerousgoodproductsgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },'ordersupplydangerousgoodproductsgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },'onlinecontrolledpermitsproductsgrid': {
                refresh: 'refreshimportexportpermitsproductsgrid'
            },'controldrugsimponlinereceivingwizard': {
                afterrender: 'prepapreImportExportOnlineReceiving'
            },'controldrugsliconlinereceivingwizard': {
                afterrender: 'prepapreImportExportOnlineReceiving'
            },'onlineordersupplydangerousgoodsreceiving': {
                afterrender: 'prepapreImportExportOnlineReceiving'
            },
            'controldrugslicensessproductsfrm button[action=btn_savepermitproducts]': {
                click: 'onSavePermitProductsDetails'
            },  'controldrugsimppermitsproductsfrm button[action=btn_savepermitproducts]': {
                click: 'onSavePermitProductsDetails'
            },
            'ordersupplydangerousgoodproductsfrm button[action=btn_savepermitproducts]': {
                click: 'onSavePermitProductsDetails'
            },'ordersupplydangerousgoodproductsfrm button[action=btn_savepermitproducts]': {
                click: 'onSavePermitProductsDetails'
            },'controldrugsimpevaluationpnl': {
                afterrender: 'prepareImportExportPermitEvaluationPnl'
            },'controldrugsimpevaluationpnl button[name=more_app_details]': {
                click: 'showPermitApplicationMoreDetails'
            },
            
            
             'controlleddrugspaymentverificationpnl form toolbar button[name=more_app_details]': {
                click: 'showPermitApplicationMoreDetails'
            },  'controlleddrugspaymentverificationpnl': {
                afterrender: 'prepareNewImportExportPayments'
            },
             'controlleddrugsimppermitreleasepnl': {
                afterrender: 'prepapareImportpermitUniformStage'
            },'ordersupplydangerousgoodsprintingpnl': {
                afterrender: 'prepapareImportpermitUniformStage'
            },'ordersupplydangerousgoodsprintinggrid': {
                refresh: 'importpermitApplicationsGridRefresh'
            },'controldrugsimpmanagerevaluationgrid': { 
                refresh: 'importpermitApplicationsGridRefresh'
            },'consigneedetailsgrid': {
                itemdblclick: 'onconsigneedetailsgridnDLBClick'
            },'allapprovedvisaapplicationsgrid': {
                itemdblclick: 'onIntiateLicenseApplication' 
            },'#importexportdetailsfrm combo[name=sub_module_id]': {
                select: 'onSelectPermitSubModuleDetails',
                change: 'onChangePermitSubModuleDetails'
            },
            'importexportpermitsproductsgrid button[name=btn_updatesprodrecommendtion]': {
                click: 'updatesPermitsProductsrodrecommendtion'
            },'importvisaproductsvalidationgrid button[name=btn_updatesprodrecommendtion]': {
                click: 'updatesPermitsProductsrodrecommendtion'
            },'controldrugsimppermitsproductsgrid button[name=btn_updatesprodrecommendtion]': {
                click: 'updatesPermitsProductsrodrecommendtion'
            },
            
            
            'permitsproductsrecommendationfrm button[name=btnsaverecommendation]': {
                click: 'batchPermitsProductsrodrecommendtion'
            },  'inspectionproductsrecommendationfrm button[name=btnsaverecommendation]': {
                click: 'batchInspectionProductsrodrecommendtion'
            },

            

            'importexportpermitmanagerreviewwizard  toolbar menu menuitem[name=reject_recommendation]': {
                click: 'saveApprovalReviewRecommendationDetails'
            }, 'importexportpermitmanagerreviewwizard  toolbar menu menuitem[name=approve_recommendation]': {
                click: 'saveApprovalReviewRecommendationDetails'
            },

            'importexportpermitmanagerreviewwizard  toolbar menu menuitem[name=print_importexportpermit]': {
                click: 'funcPrintImportExportPermit'
            }, 'importexportpermitmanagerreviewwizard  toolbar menu menuitem[name=preview_importexportpermit]': {
                click: 'funcPrintImportExportPermit'
            },

            'controlleddrugsimpmanagerreviewwizrd  toolbar menu menuitem[name=reject_recommendation]': {
                click: 'saveApprovalReviewRecommendationDetails'
            }, 'controlleddrugsimpmanagerreviewwizrd  toolbar menu menuitem[name=approve_recommendation]': {
                click: 'saveApprovalReviewRecommendationDetails'
            },

            'controlleddrugsimpmanagerreviewwizrd  toolbar menu menuitem[name=print_importexportpermit]': {
                click: 'funcPrintImportExportPermit'
            }, 'controlleddrugsimpmanagerreviewwizrd  toolbar menu menuitem[name=preview_importexportpermit]': {
                click: 'funcPrintImportExportPermit'
            },



        }
    },
    init: function () {

        
    },
    listen: {
        controller: {
            '*': {
               showImportExportPermitRegWorkflow:'showImportExportPermitRegWorkflow',
               showImportPermitApplication:'showImportPermitApplication',
               getImportpermitApplicationApprovalDetails:'getImportpermitApplicationApprovalDetails',
               getPermitReleaseRecommendationDetails:'getPermitReleaseRecommendationDetails',
			   onInitializeControlledDrugsImpPermits:'onInitializeControlledDrugsImpPermits',
               previewControlDrugsOnlineApplication:'previewControlDrugsOnlineApplication',
                 //getPermitReleaseRecommendationDetails:'getPermitReleaseRecommendationDetails',
                 showImpExpReceivingApplicationSubmissionWin: 'showImpExpReceivingApplicationSubmissionWin',
                 showLicenseImpExpReceivingApplicationSubmissionWin:'showLicenseImpExpReceivingApplicationSubmissionWin',
                 showDisposalReceivingApplicationSubmissionWin:'showDisposalReceivingApplicationSubmissionWin',
                 savePermitInformation: 'savePermitInformation',
                 editpreviewNarcoticsPermitinformation:'editpreviewNarcoticsPermitinformation',
                 editpreviewPermitinformation: 'editpreviewPermitinformation',
                 editpreviewPermitQueryinformation:'editpreviewPermitQueryinformation',
                 editpreviewDisposalQueryinformation:'editpreviewDisposalQueryinformation',
                 editDisposalpreviewPermitinformation:'editDisposalpreviewPermitinformation',
                 editpreviewPermitVerificationinformation:'editpreviewPermitVerificationinformation',
                 productPreviewEditDisposalDetails:'productPreviewEditDisposalDetails',
                 showNewDisposalApplications:'showNewDisposalApplications',
                 showAddPermitsOtherdetailsWinFrm: 'showAddPermitsOtherdetailsWinFrm',
                 onshowNewImportExportPOEInspection:'onshowNewImportExportPOEInspection',
                 onshowNewNarcoticsPermits:'onshowNewNarcoticsPermits',
                 onshowPersonalUsePermitsDeclaration:'onshowPersonalUsePermitsDeclaration',
                 onViewDeclaredPermitApplication:'onViewDeclaredPermitApplication',
                 previewImpExpOnlineApplication:'previewImpExpOnlineApplication',
                 
                 previewImpSingleExpOnlineApplication:'previewImpSingleExpOnlineApplication',
                 previewDeclarationImpExpOnlineApplication:'previewDeclarationImpExpOnlineApplication',
                 previewOnlineDisposalApplication:'previewOnlineDisposalApplication',
                 onNewImportExportApplication: 'onNewImportExportApplication',   
                 onInitiateImportExportApplication: 'onInitiateImportExportApplication',  
                 funcActiveImportOtherInformationTab:'funcActiveImportOtherInformationTab',
                 previewPreviousDeclaredImpExpApplication:'previewPreviousDeclaredImpExpApplication',
                 funcOnChangePermitCategory:'funcOnChangePermitCategory'  ,
                 doSaveImportValidationecommendationDetails:'doSaveImportValidationecommendationDetails',  
            }
        }
    },funcPrintImportExportPermit:function(btn){
       var me = this,
        is_preview = btn.is_preview,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue();
            review_recommendation_id = activeTab.down('combo[name=review_recommendation_id]').getValue();
            if(is_preview){
                this.funcPrintPermit(application_code,module_id,is_preview);

            }
            else{
                if(review_recommendation_id < 1){
                    toastr.warning('Submit the Review and Approval recommendation!!', 'Warning Response');
                    return false;
                }
                this.funcPrintPermit(application_code,module_id,is_preview);

            }
            
    },
    funcPrintPermit:function(application_code,module_id,is_preview=0){

        var action_url = 'reports/genenerateImportExportPermit?application_code=' + application_code + '&module_id=' + module_id+ '&is_preview=' + is_preview;
        print_report(action_url);

    },
    saveApprovalReviewRecommendationDetails:function(btn){
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mainStore = activeTab.down('grid').getStore(),
            form = btn.up('form'),
            decision_id = btn.decision_id,
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            reference_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue();
            
            action_url = 'saveApplicationApprovalDetails';
            if(decision_id ==1){

                title = "Do you want to Approve the reviewed Permit Application>";
            }
            else{
                title = "Do you want to Reject the reviewed Permit Application?";

            }
            Ext.MessageBox.confirm('Permit Approval', title, function (button) {
                if (button === 'yes') {
                    Ext.getBody().mask('Saving Recommendation Application...');
                    Ext.Ajax.request({
                            url: action_url,
                            method: 'POST',
                            params: {
                                decision_id: decision_id,
                                application_code:application_code,
                                application_id:application_id,
                                workflow_stage_id:workflow_stage_id,
                                table_name : 'tra_importexport_applications',
                                module_id:module_id,
                                approval_date: new Date(),
                                sub_module_id:sub_module_id
                            },
                            headers: {
                                'Authorization': 'Bearer ' + access_token,
                                'X-CSRF-Token': token
                            },
                            success: function (response) {
                               
                                var resp = Ext.JSON.decode(response.responseText),
                                    message = resp.message,
                                    success = resp.success;
                                    if (success == true || success === true) {
                                        if(activeTab.down('combo[name=review_recommendation_id]')){
                                            activeTab.down('combo[name=review_recommendation_id]').setValue(decision_id);
                                        }
                                        else{
                                            mainStore.load();
                                        }
                                        toastr.success(message, "Success Response");
                                       
                                        me.funcPrintPermit(application_code,module_id);
                
                                    } else {
                                        toastr.error(message, 'Failure Response');
                                    }
                                Ext.getBody().unmask();
                            },
                            failure: function (response) {
                                
                                var resp = Ext.JSON.decode(response.responseText),
                                    message = resp.message;
                                toastr.error(message, 'Failure Response');
                                Ext.getBody().unmask();
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                Ext.getBody().unmask();
                                toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                                
                            }
                        });

                }
            })
    },
    saveImportAppReviewRecommendationDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mainStore = activeTab.down('grid').getStore(),
            form = btn.up('form'),
            decision_id = form.down('combo[name=decision_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue();
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
                        if(activeTab.down('combo[name=review_recommendation_id]')){
                            activeTab.down('combo[name=review_recommendation_id]').setValue(decision_id);
                        }
                        else{
                            mainStore.load();
                        }
                        toastr.success(message, "Success Response");
                        win.close();
                        
                        me.funcPrintPermit(application_code,module_id);

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
    
    batchInspectionProductsrodrecommendtion:function(btn){
        var mainTabPanel = this.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        form = btn.up('form'),
        win = form.up('window'),
        prodinspection_recommendation_id = form.down('combo[name=prodinspection_recommendation_id]').getValue();
        remarks = form.down('textarea[name=remarks]').getValue();
        application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
        application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
        permitsproductsgrid = activeTab.down('#importexportpermitsproductsgrid');
        store = permitsproductsgrid.getStore(),
        params = [];
        //get selected
        sm = permitsproductsgrid.getSelectionModel(),
        records = sm.getSelection(),
        permitsproductsgridstr = permitsproductsgrid.getStore(),
        selected = [];

        Ext.each(records, function (record) {
           
            prodregistrationvalidation_recommendation_id = record.get('prodregistrationvalidation_recommendation_id'),
            prodregistrationvalidation_recommendation_remarks = record.get('prodregistrationvalidation_recommendation_remarks'),
            product_batch_no = record.get('product_batch_no');
            permits_product_id = record.get('permits_product_id');
            var obj = {
                application_id: application_id,
                application_code: application_code,
                prodinspection_recommendation_id: prodinspection_recommendation_id,
                product_batch_no: product_batch_no,
                remarks: remarks,
                permits_product_id: permits_product_id
            };
            params.push(obj);
            
        });

    if (params.length < 1) {
        btn.setLoading(false);
        toastr.warning('No records to save!!', 'Warning Response');
        return false;
    }
    Ext.getBody().mask('Saving Application Inspection Products recommendation...');
    params = JSON.stringify(params);
    Ext.Ajax.request({
        url: 'importexportpermits/updateInspectionProductsrodrecommendtion',
        params: {
            application_id: application_id,
            application_code: application_code,
            prod_details: params
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
                win.close();
            } else {
                toastr.error(message, 'Failure Response');
            }
            Ext.getBody().unmask();
        },
        failure: function (response) {
            btn.setLoading(false);
            var resp = Ext.JSON.decode(response.responseText),
                message = resp.message;
            toastr.error(message, 'Failure Response');
            Ext.getBody().unmask();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            btn.setLoading(false);
            toastr.error('Error: ' + errorThrown, 'Error Response');
            Ext.getBody().unmask();
        }
    });



    },
    batchPermitsProductsrodrecommendtion:function(btn){
        var mainTabPanel = this.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        form = btn.up('form'),
        win = form.up('window'),
        permitprod_recommendation_id = form.down('combo[name=permitprod_recommendation_id]').getValue();
        permitprod_recommendation_remarks = form.down('textarea[name=permitprod_recommendation_remarks]').getValue();
        application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
        application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
        permitsproductsgrid = activeTab.down('#importexportpermitsproductsgrid');
        store = permitsproductsgrid.getStore(),
        params = [];
        //get selected
        sm = permitsproductsgrid.getSelectionModel(),
        records = sm.getSelection(),
        permitsproductsgridstr = permitsproductsgrid.getStore(),
        selected = [];

        Ext.each(records, function (record) {
           
            prodregistrationvalidation_recommendation_id = record.get('prodregistrationvalidation_recommendation_id'),
            prodregistrationvalidation_recommendation_remarks = record.get('prodregistrationvalidation_recommendation_remarks'),
            permit_prod_id = record.get('permit_prod_id');
            var obj = {
                application_id: application_id,
                application_code: application_code,
                permitprod_recommendation_id: permitprod_recommendation_id,
                permitprod_recommendation_remarks: permitprod_recommendation_remarks,

                prodregistrationvalidation_recommendation_id: prodregistrationvalidation_recommendation_id,
                prodregistrationvalidation_recommendation_remarks: prodregistrationvalidation_recommendation_remarks,
                permit_prod_id: permit_prod_id
            };
            params.push(obj);
            
        });

    if (params.length < 1) {
        btn.setLoading(false);
        toastr.warning('No records to save!!', 'Warning Response');
        return false;
    }
    Ext.getBody().mask('Saving Application Permits Products recommendation...');
    params = JSON.stringify(params);
    Ext.Ajax.request({
        url: 'importexportpermits/updatesPermitsProductsrodrecommendtion',
        params: {
            application_id: application_id,
            application_code: application_code,
            prod_details: params
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
                win.close();
            } else {
                toastr.error(message, 'Failure Response');
            }
            Ext.getBody().unmask();
        },
        failure: function (response) {
            btn.setLoading(false);
            var resp = Ext.JSON.decode(response.responseText),
                message = resp.message;
            toastr.error(message, 'Failure Response');
            Ext.getBody().unmask();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            btn.setLoading(false);
            toastr.error('Error: ' + errorThrown, 'Error Response');
            Ext.getBody().unmask();
        }
    });



    },
    updatesPermitsProductsrodrecommendtion:function(btn){
        
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            permitsproductsgrid = btn.up('grid');
            store = permitsproductsgrid.getStore(),
            params = [];
            for (var i = 0; i < store.data.items.length; i++) {
                var record = store.data.items [i],
                permitprod_recommendation_remarks = record.get('permitprod_recommendation_remarks'),
                permitprod_recommendation_id = record.get('permitprod_recommendation_id'),
                prodregistrationvalidation_recommendation_id = record.get('prodregistrationvalidation_recommendation_id'),
                prodregistrationvalidation_recommendation_remarks = record.get('prodregistrationvalidation_recommendation_remarks'),
                permit_prod_id = record.get('permit_prod_id');
                var obj = {
                    application_id: application_id,
                    application_code: application_code,
                    permitprod_recommendation_id: permitprod_recommendation_id,
                    permitprod_recommendation_remarks: permitprod_recommendation_remarks,

                    prodregistrationvalidation_recommendation_id: prodregistrationvalidation_recommendation_id,
                    prodregistrationvalidation_recommendation_remarks: prodregistrationvalidation_recommendation_remarks,

                    permit_prod_id: permit_prod_id
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
        Ext.getBody().mask('Commiting Application Permits Products recommendation...');
        params = JSON.stringify(params);
        Ext.Ajax.request({
            url: 'importexportpermits/updatesPermitsProductsrodrecommendtion',
            params: {
                application_id: application_id,
                application_code: application_code,
                prod_details: params
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
                Ext.getBody().unmask();
            },
            failure: function (response) {
                btn.setLoading(false);
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
                Ext.getBody().unmask();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                btn.setLoading(false);
                toastr.error('Error: ' + errorThrown, 'Error Response');
                Ext.getBody().unmask();
            }
        });

    },
    onSelectPermitSubModuleDetails:function(cbo, record){
        var frm = cbo.up('#importexportdetailsfrm'),
             me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            permit_type_id = record.get('permit_type_id');

        this.funcChangePermitSubModuleDetails(permit_type_id,section_id,frm);

    }, onChangePermitSubModuleDetails:function(cbo, value){
        var record = cbo.store.findRecord('id', value);
             frm = cbo.up('#importexportdetailsfrm'),
             me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            permit_type_id = record.get('permit_type_id');

        this.funcChangePermitSubModuleDetails(permit_type_id,section_id,frm);

    },
    funcChangePermitSubModuleDetails:function(permit_type_id,section_id,frm){
        sub_module_id = frm.down('combo[name=sub_module_id]').getValue();
        if(sub_module_id != 49 && sub_module_id != 84){
            if(permit_type_id == 1){
                frm.down('combo[name=port_id]').setVisible(false)
                frm.down('combo[name=mode_oftransport_id]').setVisible(false)
                frm.down('combo[name=paying_currency_id]').setVisible(false)
            }
            else{
                frm.down('combo[name=port_id]').setVisible(true)
                frm.down('combo[name=mode_oftransport_id]').setVisible(true)
                frm.down('combo[name=paying_currency_id]').setVisible(true)
            }
        }
       

    },
    doSaveImportValidationecommendationDetails: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            mainTabPnl = this.getMainTabPanel(),
            wrapper = mainTabPnl.getActiveTab(),
            grid = wrapper.down('grid'),
            store = grid.getStore(),
            frm = form.getForm();
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
                        win.close();
                        store.load();
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
    
    funcOnChangePermitCategory:function(cbo,value){
        var frm = cbo.up('form'),
        mainTabPnl = this.getMainTabPanel(),
            wrapper = mainTabPnl.getActiveTab(),
            section_id = wrapper.down('hiddenfield[name=section_id]').getValue(),
        permit_productscategory = frm.down('combo[name=permit_productscategory_id]'),
        permit_productscategorystr = permit_productscategory.getStore();
        
        filter = {
               permit_category_id: value,
               section_id:section_id
       };
       filter = JSON.stringify(filter);
       permit_productscategorystr.removeAll();
       permit_productscategorystr.load({params:{filters:filter}});
    },
    onIntiateLicenseApplication:function(view, record) {
        var mainTabPnl = this.getMainTabPanel(),
            win = view.up('window'),
            wrapper = mainTabPnl.getActiveTab(),
            sub_module_id = wrapper.down('hiddenfield[name=sub_module_id]').getValue(),
            process_id = wrapper.down('hiddenfield[name=process_id]').getValue(),
            $reference_no = record.get('application_code')
            workflow_stage_id = wrapper.down('hiddenfield[name=workflow_stage_id]').getValue(),
            
            app_pnl = wrapper.down('importexportdetailspnl'),
            importexportapplicantdetailsfrm  = wrapper.down('importexportapplicantdetailsfrm'),
            app_form = app_pnl.down('importexportdetailsfrm'),
            sender_receiver_frm = wrapper.down('senderreceiverdetailsfrm'),
            premise_frm = app_pnl.down('importexportpremisesfrm'),
            licensepermitsproductsgrid = wrapper.down('licensepermitsproductsgrid').getStore(),
            importexportdocuploadsgrid = wrapper.down('importexportdocuploadsgrid').getStore(),
            grid = view.up('grid');
            Ext.MessageBox.confirm('Initiate License Application', 'Do you want to initiate license application for the selected Visa Application '+$reference_no+'?', function (button) {
                if (button === 'yes') {
                    Ext.getBody().mask('Initiating License Application...');
                    Ext.Ajax.request({
                            url: "importexportpermits/onIntiateLicenseApplication",
                            method: 'POST',
                            params: {
                                application_code: record.get('application_code'),
                                process_id:process_id,
                                workflow_stage_id:workflow_stage_id,
                                sub_module_id:sub_module_id
                            },
                            headers: {
                                'Authorization': 'Bearer ' + access_token,
                                'X-CSRF-Token': token
                            },
                            success: function (response) {
                               
                                var resp = Ext.JSON.decode(response.responseText),
                                    message = resp.message,
                                    success = resp.success;
                                    
                                if (success == true || success === true) {
                                    var permit_details = resp.permit_details,
                                    senderReceiverDetails = resp.senderReceiverDetails,
                                    senderReceiverDetails = resp.senderReceiverDetails,
                                    premisesDetails = resp.premisesDetails,
                                    active_application_id = permit_details.active_application_id,
                                    application_code = permit_details.application_code,
                                    tracking_no = permit_details.tracking_no,
                                    reference_no = permit_details.reference_no
                                    toastr.success(message, 'Failure Response');
                                    if (permit_details) {
                                        var model2 = Ext.create('Ext.data.Model', permit_details);
                                         
                                       var senderReceiverDetails = Ext.create('Ext.data.Model', senderReceiverDetails),
                                            premisesDetails = Ext.create('Ext.data.Model', premisesDetails);
                                            if(permit_details.module_id != 20){
                                              
                                                premise_frm.loadRecord(premisesDetails);
                                            }
                                            
                                            sender_receiver_frm.loadRecord(senderReceiverDetails);
                                             
                                            importexportapplicantdetailsfrm.loadRecord(model2);
                                            app_form.loadRecord(model2);
                                            wrapper.down('combo[name=zone_id]').setValue(permit_details.zone_id);

                                            wrapper.down('hiddenfield[name=active_application_id]').setValue(active_application_id);
                                            wrapper.down('hiddenfield[name=active_application_code]').setValue(application_code);
                                            wrapper.down('displayfield[name=tracking_no]').setValue(tracking_no);
                                            wrapper.down('displayfield[name=reference_no]').setValue(reference_no);
                                            licensepermitsproductsgrid.load();
                                            importexportdocuploadsgrid.load();
                                    }
                                    win.close();
                                } else {
                                    toastr.error(message, 'Failure Response');
                                  
                                }
                                
                                Ext.getBody().unmask();
                            },
                            failure: function (response) {
                                
                                var resp = Ext.JSON.decode(response.responseText),
                                    message = resp.message;
                                toastr.error(message, 'Failure Response');
                                Ext.getBody().unmask();
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                Ext.getBody().unmask();
                                toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                                
                            }
                        });

                }
            })

            
    },
    funcActiveImportOtherInformationTab: function (tab) {

        var mainTabPnl = this.getMainTabPanel(),
            activeTab = mainTabPnl.getActiveTab();

        if (activeTab.down('hiddenfield[name=active_application_id]')) {
            active_application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        } else {
            var panel = tab.up('window'),
            active_application_id = panel.down('hiddenfield[name=active_application_id]').getValue();

        }
        if (active_application_id == '') {

            tab.setActiveTab(0);
            toastr.error('Save Permit details to proceed', 'Failure Response');
            return;
        }
    },showManagerApplicationSubmissionWin: function (btn) {
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
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, storeID,'','','',workflow_stage_id);
           
        } else {
            Ext.getBody().unmask();
        }
    },
     prepapreControlledDrugsPermitsReceiving:function(pnl){

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('importexportapplicantdetailsfrm'),
            importexportdetailsfrm = activeTab.down('#importexportdetailsfrm'),
            senderreceiverdetailsfrm = activeTab.down('senderreceiverdetailsfrm'),
            
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            
            zone_cbo = activeTab.down('combo[name=zone_id]');
          
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue();
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepareNarcoticsPermitReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        senderReceiverDetails = resp.senderReceiverDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                        senderreceiverdetailsmdl = Ext.create('Ext.data.Model', senderReceiverDetails);

                    if (success == true || success === true) {
                        
                        applicantFrm.loadRecord(model);
                        importexportdetailsfrm.loadRecord(model);
                        senderreceiverdetailsfrm.loadRecord(senderreceiverdetailsmdl);
                        
                        zone_cbo.setValue(zone_id);

                        activeTab.down('displayfield[name=application_status]').setValue(results.application_status);

                        activeTab.down('displayfield[name=reference_no]').setValue(results.reference_no);
                        activeTab.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                        
                        var parent_pnl = pnl.up('panel');
                        console.log(parent_pnl);
                            parent_pnl.getViewModel().set('isReadOnly', false);
                        
                            //activeTab.down('button[action=link_applicant]').setDisabled(true);{} 


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
            Ext.getBody().unmask();
            //It's a new application
            activeTab.down('combo[name=sub_module_id]').setDisabled(true);
            activeTab.down('combo[name=sub_module_id]').setValue(sub_module_id);
                          

        }


    },previewControlDrugsOnlineApplication: function (view, record) {
            
        var ref_no = record.get('reference_no'),
        application_id = record.get('active_application_id'),
        module_id = record.get('module_id'),
        sub_module_id = record.get('sub_module_id'),
        section_id = record.get('section_id'),
        status_type_id = record.get('status_type_id'),
        process_id = record.get('process_id'),
        isRejection= record.get('isRejection');

        if(sub_module_id == 60){
            wizard_pnl = 'controldrugsliconlinereceivingwizard';
        }
        else if(sub_module_id == 71){
            wizard_pnl = 'onlineordersupplydangerousgoodsreceiving';
        }
        else{
            wizard_pnl = 'controldrugsimponlinereceivingwizard';
        }
       
        application_code = record.get('application_code');

        onlinePanel = Ext.widget(wizard_pnl);

        onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

        onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
        onlinePanel.down('hiddenfield[name=process_id]').setValue(process_id);
        
        onlinePanel.down('button[action=link_applicant]').setDisabled(true);
        onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
      
        docsGrid = onlinePanel.down('onlineimportexportdocuploadsgrid');
        docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
        docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
        docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

    
        funcShowCustomizableWindow(ref_no, '80%', onlinePanel, 'customizablewindow');

        onlinePanel.getViewModel().set('isReadOnly', true);

}, onInitializeControlledDrugsImpPermits: function (sub_module_id) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#permitsdashwrapper'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            filter = {section_id: section_id};
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id);

            if (!workflow_details) {
                Ext.getBody().unmask();
                toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
                return false;
            }
            dashboardWrapper.removeAll();
            var workflowContainer = Ext.widget(workflow_details.viewtype);
            workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
            workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
            workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.applicationStatus);
            workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
            workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
            workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
            workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);

            dashboardWrapper.add(workflowContainer);
            workflowContainer.getViewModel().set('isReadOnly', false);
                        
            Ext.Function.defer(function () {
                Ext.getBody().unmask();
            }, 300);
    }, previewOnlineDisposalApplication: function (view, record) {
        var ref_no = record.get('reference_no'),
            application_id = record.get('active_application_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            status_type_id = record.get('status_type_id'),
            isRejection= record.get('status_type_id'),
            grid = view.up('grid'),
            
            application_code = record.get('application_code'),
            onlinePanel = Ext.widget('onlinedisposalapplicationswizard');

            onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
            onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
            onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
            onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

            onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
            onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
            onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);

            onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
              
            
            docsGrid = onlinePanel.down('onlineimportexportdocuploadsgrid');
            docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
            docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
            docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
            docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

         
            funcShowCustomizableWindow(ref_no, '80%', onlinePanel, 'customizablewindow');

            onlinePanel.getViewModel().set('isReadOnly', true);

    },
    onNewImportExportApplication: function (sub_module_id,btn) {
        Ext.getBody().mask('Please wait...');
        var me = this,
        is_dataammendment_request = btn.is_dataammendment_request,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#drugsimportexportpermitsappsWrapper'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            filter = {section_id: section_id};
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id,is_dataammendment_request);

        if (!workflow_details) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(workflow_details.viewtype);
        workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
        workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
        workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.applicationStatus);
        workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
        workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
        workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
        workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);
        dashboardWrapper.add(workflowContainer);
       dashboardWrapper.down('premisedetailscmnfrm').down('button[action=search_premise]').enable();
        //reload Stores 
        var app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore();
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: workflow_details.processId,
                workflow_stage: workflow_details.initialStageId
            }
        });
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);

        //load the stores

    },
    onInitiateImportExportApplication: function (sub_module_id,btn) {
        Ext.getBody().mask('Loading Please wait...');
        var me = this,
        is_dataammendment_request = btn.is_dataammendment_request,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#importexportpermitsappswrapper'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id,is_dataammendment_request,'');

          
        if (!workflow_details) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(workflow_details.viewtype);
        workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
        workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
        workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.applicationStatus);
        workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
        workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
        workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
        workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        dashboardWrapper.add(workflowContainer);
       dashboardWrapper.down('premisedetailscmnfrm').down('button[action=search_premise]').enable();
        //reload Stores prepareImportExporPermitReceivingStage 
        var app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore();
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: workflow_details.processId,
                workflow_stage: workflow_details.initialStageId
            }
        });
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);

        //load the stores

    },
    previewDeclarationImpExpOnlineApplication:function(view,record){

        var ref_no = record.get('reference_no'),
        application_id = record.get('active_application_id'),
        module_id = record.get('module_id'),
        sub_module_id = record.get('sub_module_id'),
        section_id = record.get('section_id'),
        status_type_id = record.get('status_type_id'),
        isRejection= record.get('isRejection'),
        wizard_pnl = 'declaredimportexportonlinereceivingwizard', 
        
        application_code = record.get('application_code'),
        onlinePanel = Ext.widget(wizard_pnl);

        onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

        onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
        
        onlinePanel.down('button[action=link_applicant]').setDisabled(true);
        onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
        if (status_type_id != 1) {
            onlinePanel.down('button[name=preview_queries_btn]').setVisible(false);
        }
        
        if (isRejection == 1) {
            onlinePanel.down('button[name=prev_rejections]').setVisible(true);
            onlinePanel.down('button[name=actions]').setVisible(true);
            onlinePanel.down('button[name=receive_btn]').setVisible(false);
            onlinePanel.down('button[name=query_btn]').setVisible(false);
            onlinePanel.down('button[name=reject_btn]').setVisible(false);
        }   
        
        docsGrid = onlinePanel.down('declaredimportexportdocuploadsgrid');
        docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
        docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
        docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

        docsGrid.portal_uploads =3;
        funcShowCustomizableWindow(ref_no, '80%', onlinePanel, 'customizablewindow');

        onlinePanel.getViewModel().set('isReadOnly', true);
    },
   
    previewImpSingleExpOnlineApplication:function(view, record){
        var ref_no = record.get('reference_no'),
            me = this,
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id');
           

        if(module_id == 4){
            wizard_pnl = 'importexportonlinereceivingwizard';
        }
        else{
                if(sub_module_id == 60){
                    wizard_pnl = 'controldrugsliconlinereceivingwizard';
                }
                else{
                    wizard_pnl = 'controldrugsimponlinereceivingwizard';
                }
        }
        me.funcREceiveSingleApplication(wizard_pnl,view,record);
        
    },
    previewImpExpOnlineApplication: function (view, record) {
        
            var ref_no = record.get('reference_no'),
                me = this,
            application_id = record.get('active_application_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            status_type_id = record.get('status_type_id'),
            isRejection= record.get('isRejection');


            if(sub_module_id == 78 || sub_module_id == 81  || sub_module_id == 82){

                if(module_id == 4){
                    wizard_pnl = 'impexplicenseonlinereceivingwizard';
                }
                else{
                        if(sub_module_id == 60){
                            wizard_pnl = 'controldrugsliconlinereceivingwizard';
                        }
                        else{
                            wizard_pnl = 'controldrugsimponlinereceivingwizard';
                        }
                }
                me.funcREceiveSingleApplication(wizard_pnl,view,record);
                

            }
            else{

                Ext.MessageBox.show({
                    title: 'Application Reception',
                    message: 'Do you want to receive the Visa Application as Single Application or Multi Applications(Batch Submission)?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.window.MessageBox.INFO,
                    buttonText: {
                        yes: 'Single Application',
                        no: 'Multi Apps(Batch Submission)'
                    },
                    fn: function(btn, text){
                        if (btn == 'yes'){
                            if(module_id == 4){
                                wizard_pnl = 'importexportonlinereceivingwizard';
                            }
                            else{
                                    if(sub_module_id == 60){
                                        wizard_pnl = 'controldrugsliconlinereceivingwizard';
                                    }
                                    else{
                                        wizard_pnl = 'controldrugsimponlinereceivingwizard';
                                    }
                            }
                            me.funcREceiveSingleApplication(wizard_pnl,view,record);
                            
                        }else{
                            wizard_pnl = 'onlineimpexportmanagersubmissionpnl';
                            me.funcReceiveMultiApplications(wizard_pnl,view,record);
                            
                        }
                    },
                });
                return;


            }

    },
    funcReceiveMultiApplications:function(wizard_pnl,view,record){
            var ref_no = record.get('reference_no'),
                module_id = record.get('module_id'),
                sub_module_id = record.get('sub_module_id'),
                section_id = record.get('section_id'),
                status_type_id = record.get('status_type_id'),
                application_status_id = record.get('application_status_id'),

                process_id = record.get('process_id'),
                process_name = record.get('process_name');
                workflow_stage = record.get('workflow_stage');
                application_status = record.get('application_status');
                status_type_id = record.get('status_type_id');
        
              onlinePanel = Ext.widget(wizard_pnl);

              onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
              onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
              onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

              onlinePanel.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
              onlinePanel.down('hiddenfield[name=process_id]').setValue(process_id);
              onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
              
              onlinePanel.down('displayfield[name=process_name]').setValue(process_name);
              onlinePanel.down('displayfield[name=workflow_stage]').setValue(workflow_stage);
              onlinePanel.down('displayfield[name=application_status]').setValue(application_status);

              onlinePanel.setHeight(490);
            funcShowCustomizableWindow(process_name+' Applications', '80%', onlinePanel, 'customizablewindow');

    },
    funcREceiveSingleApplication:function(wizard_pnl,view,record){
            var ref_no = record.get('reference_no'),
                application_id = record.get('active_application_id'),
                module_id = record.get('module_id'),
                sub_module_id = record.get('sub_module_id'),
                section_id = record.get('section_id'),
                status_type_id = record.get('status_type_id'),
                isRejection= record.get('isRejection');
            application_code = record.get('application_code'),
            onlinePanel = Ext.widget(wizard_pnl);

            onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
            onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
            onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
            onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

            onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
            onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
            onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
            
            onlinePanel.down('button[action=link_applicant]').setDisabled(true);
            onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
            if (status_type_id != 1) {
                onlinePanel.down('button[name=preview_queries_btn]').setVisible(false);
            }
            
            if (isRejection == 1) {
                onlinePanel.down('button[name=prev_rejections]').setVisible(true);
                onlinePanel.down('button[name=actions]').setVisible(true);
                onlinePanel.down('button[name=receive_btn]').setVisible(false);
                onlinePanel.down('button[name=query_btn]').setVisible(false);
                onlinePanel.down('button[name=reject_btn]').setVisible(false);
            }   
            
            docsGrid = onlinePanel.down('onlineimportexportdocuploadsgrid');
            docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
            docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
            docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
            docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

        
            funcShowCustomizableWindow(ref_no, '80%', onlinePanel, 'customizablewindow');

            onlinePanel.getViewModel().set('isReadOnly', true);



    },
    onViewDeclaredPermitApplication: function ( record) {
        
        var ref_no = record.get('reference_no'),
        application_id = record.get('active_application_id'),
        module_id = record.get('module_id'),
        sub_module_id = record.get('sub_module_id'),
        section_id = record.get('section_id'),
        status_type_id = record.get('status_type_id'),
        isRejection= record.get('isRejection'),
        
        wizard_pnl = 'permitdeclarationpreviewwizard', //
        
        application_code = record.get('application_code'),
        onlinePanel = Ext.widget(wizard_pnl);
        if(application_code < 1){
            Ext.getBody().unmask();
            toastr.warning("The selected Permit declaration application, hasn't been processes, contact the system admin for enquiry.", 'Warning Response');
            return;
        }

        onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

        onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
        
        onlinePanel.down('button[action=link_applicant]').setDisabled(true);
        onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
        if (status_type_id != 1) {
          //  onlinePanel.down('button[name=preview_queries_btn]').setVisible(false);
        }
        
        if (isRejection == 1) {
            onlinePanel.down('button[name=prev_rejections]').setVisible(true);
            onlinePanel.down('button[name=actions]').setVisible(true);
            onlinePanel.down('button[name=receive_btn]').setVisible(false);
            onlinePanel.down('button[name=query_btn]').setVisible(false);
            onlinePanel.down('button[name=reject_btn]').setVisible(false);
        }   
        
        docsGrid = onlinePanel.down('onlineimportexportdocuploadsgrid');
        docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
        docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
        docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

     
        funcShowCustomizableWindow(ref_no, '80%', onlinePanel, 'customizablewindow');

        onlinePanel.getViewModel().set('isReadOnly', true);

},
previewPreviousDeclaredImpExpApplication: function (view, record) {
        
    var ref_no = record.reference_no,
    application_id = record.active_application_id,
    module_id = record.module_id,
    sub_module_id = record.sub_module_id,
    section_id = record.get('section_id'),
    status_type_id = record.status_type_id,
    wizard_pnl = 'importexportonlinereceivingwizard', 
    
    application_code = record.application_code,
    onlinePanel = Ext.widget(wizard_pnl);

    onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
    onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
    onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
    onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

    onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
    onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
    onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
    onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
    
    onlinePanel.down('button[action=link_applicant]').setDisabled(true);

    docsGrid = onlinePanel.down('onlineimportexportdocuploadsgrid');
    docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
    docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
    docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
    docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

 
    funcShowCustomizableWindow(ref_no, '80%', onlinePanel, 'customizablewindow');

    onlinePanel.getViewModel().set('isReadOnly', true);

},
    onshowPersonalUsePermitsDeclaration:function(sub_module_id){
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#permitsdashwrapper'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            
        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget('personaluserpermitsreceiving');
        workflowContainer.down('displayfield[name=process_name]').setValue('Personal Use Permits Declaration');
        workflowContainer.down('displayfield[name=workflow_stage]').setValue('Permit Declaration');
      
        workflowContainer.down('hiddenfield[name=module_id]').setValue(4);
        
        dashboardWrapper.add(workflowContainer);
        workflowContainer.getViewModel().set('isReadOnly', false);
                       
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);

    },
    onshowNewNarcoticsPermits: function (sub_module_id) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#permitsdashwrapper'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            filter = {section_id: section_id};
        workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id);

        if (!workflow_details) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(workflow_details.viewtype);
        workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
        workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
        workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.applicationStatus);
        workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
        workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
        workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
        workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);

        dashboardWrapper.add(workflowContainer);
        workflowContainer.getViewModel().set('isReadOnly', false);
                       
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);
    },
    onshowNewImportExportPOEInspection: function (sub_module_id) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#poeinspectionprocessdashwrapper'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            filter = {section_id: section_id};
        workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id);

        if (!workflow_details) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(workflow_details.viewtype);
        workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
        workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
        workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.applicationStatus);
        workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
        workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
        workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
        workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);
          
        dashboardWrapper.add(workflowContainer);
        workflowContainer.getViewModel().set('isReadOnly', true);
                       
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);
    },
    permitsRegHome: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            sec_dashboard = btn.sec_dashboard,
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#disposalapplicationsdashwrapper');
        if (!dashboardWrapper.down(sec_dashboard)) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: sec_dashboard});
        }
    },
    importpermitsRegHome: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            sec_dashboard = btn.sec_dashboard,
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#drugsimportexportpermitsappsWrapper');
        if (!dashboardWrapper.down(sec_dashboard)) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: sec_dashboard});
        }
    },
     poepermitsRegHome: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            sec_dashboard = btn.sec_dashboard,
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#poeinspectionprocessdashwrapper');
        if (!dashboardWrapper.down(sec_dashboard)) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: sec_dashboard});
        }
    }, personalUsepermitsRegHome: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            sec_dashboard = btn.sec_dashboard,
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#importexportpersonaluserpermitsdashwrapper');
        if (!dashboardWrapper.down(sec_dashboard)) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: sec_dashboard});
        }
    },
    
    showAddPermitsOtherdetailsWinFrm: function (btn) {

        var me = this,
            mainTabPnl = this.getMainTabPanel(),
            activeTab = mainTabPnl.getActiveTab();
        childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
            child.setHeight(450);
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
    },
    importpermitApplicationsGridRefresh: function (me) {
        var store = me.store,
            table_name = me.table_name,
            strict_mode = me.strict_mode,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            zone_id = 0;

            if(activeTab.down('combo[name=zone_id]')){
                zone_id = activeTab.down('combo[name=zone_id]').getValue();
            }
            store.getProxy().extraParams = {
                table_name: table_name,
                workflow_stage_id: workflow_stage_id,
                section_id: section_id,
                zone_id:zone_id,
                strict_mode: strict_mode
            };

    },
    importpermitApplicationsSubmissionGridRefresh: function (me) {
        var store = me.store,
            table_name = me.table_name,
            strict_mode = me.strict_mode,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            zone_id = 0;
            if(activeTab.down('combo[name=zone_id]')){
                zone_id = activeTab.down('combo[name=zone_id]').getValue();
            }
        store.getProxy().extraParams = {
            table_name: table_name,
            zone_id:zone_id,
            workflow_stage_id: workflow_stage_id,
            section_id:section_id,
            strict_mode: strict_mode
        };
    },

    
    refreshpreviousinspectionsgrid: function (me) {
        var store = me.store,
            table_name = me.table_name,
            strict_mode = me.strict_mode,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            active_application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            store.getProxy().extraParams = {
                application_code: active_application_code
            };
    },
    refreshpoeinspectionpermitsproductsgrid: function (me) {
        var store = me.store,
            table_name = me.table_name,
            strict_mode = me.strict_mode,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            poe_application_id = activeTab.down('hiddenfield[name=poe_application_id]').getValue();
            
            active_application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            store.getProxy().extraParams = {
                poe_application_id: poe_application_id,
                application_code:active_application_code
            };
    },refreshpoeinspectionprocessdashgrid: function (me) {
        
        var store = me.store,
            inspection_status_id = me.inspection_status_id,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            store.getProxy().extraParams = {
                section_id: section_id,
                inspection_status_id:inspection_status_id
            };
    },
    refreshinspectedpoepermitsdashgrid: function (me) {
        
        var store = me.store,
            inspection_status_id = me.inspection_status_id,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form'),
            formValues = activeTab.down('form').getValues();
            //get the 
            Ext.apply(store.getProxy().extraParams, formValues);
    },
    funcsavePOEPermitVerificationRecommendations:function(btn){
        var mainTabPnl = this.getMainTabPanel(),
                storeId = btn.storeId,
                action_url = btn.action_url,
                store = Ext.getStore(storeId),
                form = btn.up('form'),
                win = form.up('window'),
                containerPnl = mainTabPnl.getActiveTab();
    
        if(form.isValid()){
            form.submit({
                url: 'importexportpermits/savePOEPermitVerificationRecommendations',
                waitMsg: 'Saving POE Permit Verification wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success;
                    if (success == true || success === true) {
                        toastr.success(message, 'Success Response');
                        containerPnl.down('displayfield[name=verification_status]').setValue(resp.verification_status);
                        //inspectionimportexportspermitgrid
                            win.close();
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

        } 
           
    },
    
    funcsavePOEPermitRecommendations:function(btn){
        var mainTabPnl = this.getMainTabPanel(),
                storeId = btn.storeId,
                action_url = btn.action_url,
                store = Ext.getStore(storeId),
                form = btn.up('form'),
                win = form.up('window'),
                containerPnl = mainTabPnl.getActiveTab();
    
        if(form.isValid()){
            form.submit({
                url: 'importexportpermits/savePOEPermitRecommendations',
                waitMsg: 'Saving POE Permit Recommendation wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success;
                    if (success == true || success === true) {
                        toastr.success(message, 'Success Response');
                            
                            mainTabPnl.remove(containerPnl);
                            store.removeAll();
                            store.load();
                            win.close();
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

        } 
           
    },
    // 
    showSpecialImpExpApprovalWin:function(btn){
        Ext.getBody().mask('Please wait...');
        var me = this,
             mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue();
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            
            table_name = btn.table_name,
            approval_frm = btn.approval_frm,
            form = Ext.widget(approval_frm),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        form.setController('importexportpermitsvctr');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        Ext.Ajax.request({
            method: 'GET',
            url: 'getApplicationApprovalDetails',
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
                    results = resp.results,
                    model = Ext.create('Ext.data.Model', results);
                if (success == true || success === true) {
                    form.loadRecord(model);
                    form.down('hiddenfield[name=application_id]').setValue(application_id);
                    form.down('hiddenfield[name=application_code]').setValue(application_code);
                    form.down('hiddenfield[name=process_id]').setValue(process_id);
                    form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    funcShowCustomizableWindow('Special Import/Export Approval Recommendation', '40%', form, 'customizablewindow');
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
    showManagerReviewRecommendationWin:function(btn){
        Ext.getBody().mask('Please wait...');
        var me = this,
             mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue();
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            
            table_name = btn.table_name,
            approval_frm = btn.approval_frm,
            form = Ext.widget(approval_frm),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        form.setController('importexportpermitsvctr');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        Ext.Ajax.request({
            method: 'GET',
            url: 'getImporPermitApplicationApprovalDetails',
            params: {
                application_id: application_id,
                approval_table:'tra_managerpermits_review',
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
                    results = resp.results,
                    model = Ext.create('Ext.data.Model', results);
                if (success == true || success === true) {
                    form.loadRecord(model);
                    form.down('hiddenfield[name=application_id]').setValue(application_id);
                    form.down('hiddenfield[name=application_code]').setValue(application_code);
                    form.down('hiddenfield[name=process_id]').setValue(process_id);
                    form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    funcShowCustomizableWindow('Review Recommendation', '40%', form, 'customizablewindow');
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
    getPermitReleaseRecommendationDetails:function(record,btn){
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = record.get('application_id');
            
            application_code = record.get('application_code');
            reference_no =  record.get('reference_no');
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue();
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            
            table_name = btn.table_name,
            approval_frm = btn.approval_frm,
            form = Ext.widget(approval_frm),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        Ext.Ajax.request({
            method: 'GET',
            url: 'getPermitReleaseRecommendationDetails',
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
                    results = resp.results,
                    model = Ext.create('Ext.data.Model', results);
                if (success == true || success === true) {
                    form.loadRecord(model);
                    form.down('hiddenfield[name=application_id]').setValue(application_id);
                    form.down('hiddenfield[name=application_code]').setValue(application_code);
                    form.down('hiddenfield[name=reference_no]').setValue(reference_no);

                    form.down('hiddenfield[name=process_id]').setValue(process_id);

                    form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    funcShowCustomizableWindow('Permit release Recommendation', '40%', form, 'customizablewindow');
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
   
    getImportpermitApplicationApprovalDetails: function (btn) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue();
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            
            table_name = btn.table_name,
            approval_frm = btn.approval_frm,
            form = Ext.widget(approval_frm),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        form.setController('productregistrationvctr');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        Ext.Ajax.request({
            method: 'GET',
            url: 'getImporPermitApplicationApprovalDetails',
            params: {
                application_id: application_id,
                application_code: application_code,
                approval_table:'tra_approval_recommendations',
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    results = resp.results,
                    model = Ext.create('Ext.data.Model', results);
                if (success == true || success === true) {
                    form.loadRecord(model);
                    form.down('hiddenfield[name=application_id]').setValue(application_id);
                    form.down('hiddenfield[name=application_code]').setValue(application_code);
                    form.down('hiddenfield[name=process_id]').setValue(process_id);
                    form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    funcShowCustomizableWindow('Recommendation', '40%', form, 'customizablewindow');
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
    editpreviewPermitVerificationinformation:function(item){
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            isReadOnly = item.isReadOnly,
            is_temporal = btn.is_temporal,
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id'), 
            section_id = record.get('section_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            workflow_stage_id = record.get('workflow_stage_id');
            
            var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
            detailed_pnl = activeTab.down('#main_processpanel'),
            permitsverification_panel =detailed_pnl.permitsverification_panel,
            permitsverification_panel = Ext.widget(permitsverification_panel),
            documents_grid = permitsverification_panel.down('disposalverificationuploadsgrid'),
            disposaldestruction_frm = permitsverification_panel.down('disposaldestructionfrm').getForm();

           
            
            permitsverification_panel.down('hiddenfield[name=process_id]').setValue(process_id);
            permitsverification_panel.down('hiddenfield[name=section_id]').setValue(section_id);
            permitsverification_panel.down('hiddenfield[name=module_id]').setValue(module_id);
            permitsverification_panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            permitsverification_panel.down('hiddenfield[name=application_code]').setValue(application_code);
            var applicable_checkliststore = permitsverification_panel.down('combo[name=applicable_checklist]').getStore();
            
            applicable_checkliststore.removeAll();
            applicable_checkliststore.load({
                params: {
                    process_id: process_id,
                    workflow_stage: workflow_stage_id
                }
            });
            this.showdisposalVerificationsUniformStage(application_id,application_code,disposaldestruction_frm,'', permitsverification_panel);
            
    },
    
    prepapareDisposalVerificationUniformStage: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();

        var me = this,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            wizardactive_application = activeTab.down('disposalpermitverificationwizard').down('hiddenfield[name=active_application_id]'),
            disposaldestruction_frm = activeTab.down('disposaldestructionfrm').getForm(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

            var applicable_checkliststore = activeTab.down('combo[name=applicable_checklist]').getStore();
            
            applicable_checkliststore.removeAll();
            applicable_checkliststore.load({
                params: {
                    process_id: process_id,
                    workflow_stage: workflow_stage_id
                }
            });
            
            this.showdisposalVerificationsUniformStage(application_id,application_code,disposaldestruction_frm,wizardactive_application,'');

    },
   showdisposalVerificationsUniformStage:function(application_id,application_code,disposaldestruction_frm,wizardactive_application,permitsdetails_panel){
    var me = this,
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab();
        Ext.getBody().mask('Please wait...');
        if (application_id) {

            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepapareImportpermitUniformStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_disposal_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        permit_details = resp.results;
                    if(permitsdetails_panel != ''){
                        funcShowCustomizableWindow('Disposal Permit Verification Details', '85%', permitsdetails_panel, 'customizablewindow');
                        permitsdetails_panel.down('button[name=save_btn]').setVisible(false);
                        permitsdetails_panel.down('button[name=save_btn]').setDisabled(true);
                        permitsdetails_panel.down('button[name=previewpermitsdetailsbtn]').setVisible(false);
                        permitsdetails_panel.down('button[action=process_submission_btn]').setVisible(false);
                        permitsdetails_panel.getViewModel().set('isReadOnly', true);
                    }
                    else{
                        wizardactive_application.setValue(application_id);
                    }
                    if (success == true || success === true) {
                        var model2 = Ext.create('Ext.data.Model', permit_details);
                        
                        disposaldestruction_frm.loadRecord(model2);
                        
                        if(activeTab.down('disposalapplicantdetailsfrm')){
                            
                            applicantFrm = activeTab.down('disposalapplicantdetailsfrm'),
                            disposalpermitsdetailsfrm = activeTab.down('#disposalpermitsdetailsfrm');
                            
                            applicantFrm.loadRecord(model2);
                            disposalpermitsdetailsfrm.loadRecord(model2);
                        //    applicantFrm.down('button[name=link_applicant]').setDisable(true);
                        }
                      
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
    prepapareImportpermitUniformStage: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('grid');
      
        Ext.getBody().mask('Please wait...');
        var me = this,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sm = applicationsGrid.getSelectionModel();
         

        if (application_id) {

            applicationsStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });

            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepapareImportpermitUniformStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_importexport_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        
                        applicationsStore.load();

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
    funcPreparePaymentsStage:function(table_name){
        
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            
           // invoiceSummaryGrid = activeTab.down('paymentinvoicingcostdetailsgrid'),
            //invoiceSummaryStore = invoiceSummaryGrid.getStore(),
            // paymentsGrid = activeTab.down('applicationpaymentsgrid'),
            // paymentsStore = paymentsGrid.getStore(),
           otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        if (application_code) {
           
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepareNewImportExportPaymentStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: table_name
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
                        applicant_details.setValue(results.applicant_details);
                      

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
    prepareNewImportExportPayments: function () {

        this.funcPreparePaymentsStage('tra_importexport_applications');
        
    },
    prepareNewDisposalPayments: function () {

        this.funcPreparePaymentsStage('tra_disposal_applications');

    },
    prepareNewImportsInvoicing: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoice_id = activeTab.down('hiddenfield[name=invoice_id]'),
            invoice_no = activeTab.down('displayfield[name=invoice_no]'),
            paying_currency = activeTab.down('combo[name=paying_currency_id]'),
            isFastTrack = activeTab.down('checkbox[name=is_fast_track]'),
            save_btn = activeTab.down('button[name=save_btn]'),
            commit_btn = activeTab.down('button[name=commit_btn]'),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            if(sub_module_id == 16 || sub_module_id == 13){
                var invoiceSummaryGrid = activeTab.down('invoicingcostdetailsgrid'),
                invoiceSummaryStore = invoiceSummaryGrid.getStore();
            }
            else{

               var invoiceSummaryGrid = activeTab.down('importinvoicingcostdetailsgrid'),
              invoiceSummaryStore = invoiceSummaryGrid.getStore();
            }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepareImportInvoicingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_importexport_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                        
                        isLocked = results.isLocked,
                        is_fast_track = results.is_fast_track;
                    if (success == true || success === true) {
                        
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                        activeTab.down('hiddenfield[name=isLocked]').setValue(isLocked);
                        activeTab.down('checkbox[name=is_fast_track]').setValue(is_fast_track);

                        
                        paying_currency.setValue(results.paying_currency_id);

                        invoice_id.setValue(results.invoice_id);
                        invoice_no.setValue(results.invoice_no);

                        applicant_details.setValue(results.applicant_details);
                        
                        invoiceSummaryStore.removeAll();
                        invoiceSummaryStore.load({
                            params: {
                                invoice_id: results.invoice_id
                            }
                        });

                        if (isLocked == 1 || isLocked === 1) {
                            paying_currency.setReadOnly(true);
                            isFastTrack.setReadOnly(true);
                            save_btn.setVisible(false);
                            commit_btn.setDisabled(true);
                        }
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
    prepareNewDisposalPaermitssInvoicing: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoice_id = activeTab.down('hiddenfield[name=invoice_id]'),
            invoice_no = activeTab.down('displayfield[name=invoice_no]'),
            
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            paying_currency = activeTab.down('combo[name=paying_currency_id]'),
            isFastTrack = activeTab.down('checkbox[name=is_fast_track]'),
            save_btn = activeTab.down('button[name=save_btn]'),
            commit_btn = activeTab.down('button[name=commit_btn]');
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            if(sub_module_id == 16 || sub_module_id == 13){
                var invoiceSummaryGrid = activeTab.down('invoicingcostdetailsgrid'),
                invoiceSummaryStore = invoiceSummaryGrid.getStore();
            }
            else{

               var invoiceSummaryGrid = activeTab.down('importinvoicingcostdetailsgrid'),
              invoiceSummaryStore = invoiceSummaryGrid.getStore();
            }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepareDisposalPermitsInvoicingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_disposal_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                        
                        isLocked = results.isLocked,
                        is_fast_track = results.is_fast_track;
                    if (success == true || success === true) {
                        
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                        activeTab.down('hiddenfield[name=isLocked]').setValue(isLocked);
                        activeTab.down('checkbox[name=is_fast_track]').setValue(is_fast_track);

                        paying_currency.setValue(results.paying_currency_id);

                        invoice_id.setValue(results.invoice_id);
                        invoice_no.setValue(results.invoice_no);

                        applicant_details.setValue(results.applicant_details);
                        
                        invoiceSummaryStore.removeAll();
                        invoiceSummaryStore.load({
                            params: {
                                invoice_id: results.invoice_id
                            }
                        });

                        if (isLocked == 1 || isLocked === 1) {
                            paying_currency.setReadOnly(true);
                            isFastTrack.setReadOnly(true);
                            save_btn.setVisible(false);
                            commit_btn.setDisabled(true);
                        }
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
    
    prepareImportsInvoicingOtherDetails:function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

            permit_currency = activeTab.down('combo[name=permit_currency_id]');
            permit_fob_value = activeTab.down('numberfield[name=permit_fob_value]');

        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/getImportsInvoicingOtherDetails',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_importexport_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        
                        permit_currency.setValue(results.permit_currency_id);
                        permit_fob_value.setValue(results.permit_fob_value);

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
    
    prepareDisposalInvoicingOtherDetails:function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

            permit_currency = activeTab.down('combo[name=permit_currency_id]');
            permit_fob_value = activeTab.down('numberfield[name=permit_fob_value]');

        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/getDisposalInvoicingOtherDetails',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_disposal_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        
                        permit_currency.setValue(results.permit_currency_id);
                        permit_fob_value.setValue(results.permit_fob_value);

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
    showDisposalPermitDisposalSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
           
            storeID = getApplicationStore(module_id, section_id);
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
            
            if(hasQueries){
                showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,extraParams);

            }
            else{
                   
                    valid = this.validateDisposalInspectionDetails(activeTab);
                    if (valid == true || valid === true) {
                        showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
                    } else {
                        toastr.error('Error: Fill in the Disposal Inspection Details and/or Inspectors Information to submit', 'Error Response');
                        Ext.getBody().unmask();
                    }
            }
        //
       
    },
    validateDisposalInspectionDetails:function(activeTab){
        var disposaldestructionfrm = activeTab.down('disposaldestructionfrm').getForm(),
            disposaldestsupervisorsgrid = activeTab.down('disposaldestsupervisorsgrid'),
            count_record = disposaldestsupervisorsgrid.getStore().getTotalCount();

        if(disposaldestructionfrm.isValid()){
            if (count_record < 1) {
                toastr.warning('No Supervisor record found!!', 'Warning Response');
                return false;
            }else{

                valid = true;
            }
        }
        else{
            valid = false;

        }

        return valid;


},
    showPermitEvaluationApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            storeID = getApplicationStore(module_id, section_id);
        valid = true;
        //this.validateFoodPremisePaymentSubmission();
        hasEvalUploadChecklist = checkApplicationChecklistDetails(application_code, module_id,sub_module_id,section_id,'',workflow_stage_id,process_id);
        if(!hasEvalUploadChecklist && !hasQueries){
            toastr.warning('Fill in the Screening checklist details(for checklist based checklist)!!', 'Warning Response');
            Ext.getBody().unmask();
            return false;
           
        }
        extraParams = [{
            field_type: 'hiddenfield',
            field_name: 'has_queries',
            value: hasQueries
        }];
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,extraParams);
        } else {
            Ext.getBody().unmask();
        }
    },
    showApplicationDocUploadWin: function (btn) {
        var childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            isWin = btn.isWin,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            form = Ext.widget(childXtype);
        form.down('hiddenfield[name=application_id]').setValue(application_id);
        form.down('hiddenfield[name=application_code]').setValue(application_code);
        form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        form.down('button[name=upload_file_btn]').isWin = isWin;
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
    },
    prepareImportExportPermitEvaluationPnl: function (pnl) {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            checklist_grid = activeTab.down('grid'),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premises_details = otherDetailsFrm.down('displayfield[name=premises_details]'),
            permit_form = activeTab.down('form'),
            doc_grid = activeTab.down('previewpermitdocuploadsgrid'),
            permitsdetails_panel = activeTab.down('#permitsdetails_panel'),
            
            importexportapplicantdetailsfrm = activeTab.down('importexportapplicantdetailsfrm');
            importexportdetailsfrm = activeTab.down('#importexportdetailsfrm');
            senderreceiverdetailsfrm = activeTab.down('#senderreceiverdetailsfrm');
            importexportpremisesfrm = activeTab.down('#importexportpremisesfrm'),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

            activeTab.down('button[name=save_btn]').setVisible(false);
        var applicable_checkliststore = activeTab.down('combo[name=applicable_checklist]').getStore();
        applicable_checkliststore.removeAll();
        applicable_checkliststore.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        doc_grid.down('hiddenfield[name=process_id]').setValue(process_id);
                                doc_grid.down('hiddenfield[name=section_id]').setValue(section_id);
                                doc_grid.down('hiddenfield[name=module_id]').setValue(module_id);
                                doc_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                                doc_grid.down('hiddenfield[name=application_code]').setValue(application_code);
                                
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepapareImportpermitUniformStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_importexport_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        permit_details = resp.permit_details,
                        senderReceiverDetails = resp.senderReceiverDetails,
                        senderReceiverDetails = resp.senderReceiverDetails,
                        premisesDetails = resp.premisesDetails;

                    if (success == true || success === true) {
                      
                     //   applicant_details.setValue(results.applicant_details);
                       // premises_details.setValue(results.premises_details);
                      
                        if (permit_details) {
                            var model2 = Ext.create('Ext.data.Model', permit_details);
                            
                           var senderReceiverDetails = Ext.create('Ext.data.Model', senderReceiverDetails),
                                premisesDetails = Ext.create('Ext.data.Model', premisesDetails);
                                if(permit_details.module_id != 20){
                                    importexportpremisesfrm.loadRecord(premisesDetails);
                                }
                                senderreceiverdetailsfrm.loadRecord(senderReceiverDetails);
                                importexportapplicantdetailsfrm.loadRecord(model2);
                                importexportdetailsfrm.loadRecord(model2);
                                permitsdetails_panel.getViewModel().set('isReadOnly', true);
                                permitsdetails_panel.getViewModel().set('readOnly', true);
                                
                        }
                        me.funcsetApplicatonTitle(pnl,sub_module_id);
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
  
    savePermitInformation: function (btn) {
        var me = this,
            panel = btn.up('importexportdetailspanel'),
            form = panel.down('importexportdetailsfrm'),
            mainTabPnl = this.getMainTabPanel(),
            url = btn.action_url;

        frm = form.getForm();
        if (frm.isValid()) {
            if (frm.isValid()) {
                frm.submit({
                    url: url,
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
                            // win.close();
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
    },
    
    productPreviewEditDisposalDetails: function (btn) {
        var isReadOnly = btn.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            permitsdetails_panel = activeTab.down('#main_processpanel').permitsdetails_panel,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue();
            
        this.showDisposalPermitApplicationMoreDetailsGeneric(permitsdetails_panel, application_id,  applicant_id, ref_no, process_id,  isReadOnly,workflow_stage_id,module_id,sub_module_id,section_id,application_code);


    },
    editDisposalpreviewPermitinformation: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            isReadOnly = item.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            permitsdetails_panel = activeTab.down('#main_processpanel').permitsdetails_panel,
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            section_id = record.get('section_id'),
            applicant_id = record.get('applicant_id'),
            ref_no = record.get('reference_no'),
            process_id = record.get('process_id'),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        
        this.showDisposalPermitApplicationMoreDetailsGeneric(permitsdetails_panel, application_id,  applicant_id, ref_no, process_id,  isReadOnly,workflow_stage_id,module_id,sub_module_id,section_id,application_code);


    },
    showDisposalPermitApplicationMoreDetailsGeneric: function (permitsdetails_panel, application_id,  applicant_id, ref_no, process_id, isReadOnly,workflow_stage_id,module_id,sub_module_id,section_id,application_code) {
        Ext.getBody().mask('Please wait...');

        var me = this,
            permitsdetails_panel = Ext.widget(permitsdetails_panel),
         
            applicantFrm = permitsdetails_panel.down('disposalapplicantdetailsfrm'),
          //  importexportpremisesfrm = permitsdetails_panel.down('#importexportpremisesfrm'),
            disposalpermitsdetailsfrm = permitsdetails_panel.down('#disposalpermitsdetailsfrm');
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            permitsdetails_panel.down('button[name=save_btn]').setVisible(false);
            //   prepareNewProductReceivingStage
        }
        permitsdetails_panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id)
        permitsdetails_panel.down('hiddenfield[name=module_id]').setValue(module_id)
        permitsdetails_panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id) 
        permitsdetails_panel.down('hiddenfield[name=section_id]').setValue(section_id)   

        Ext.Ajax.request({
            method: 'GET',
            url: 'importexportpermits/getDisposalPermitsApplicationMoreDetails',
            params: {
                application_id: application_id,application_code: application_code,
                applicant_id: applicant_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    permit_details = resp.permit_details,
                    premisesDetails = resp.premisesDetails;
                if (success == true || success === true) {
                    
                    if (permit_details) {
                        var model2 = Ext.create('Ext.data.Model', permit_details);
                       applicantFrm.loadRecord(model2);
                        disposalpermitsdetailsfrm.loadRecord(model2);
                       var premisesDetails = Ext.create('Ext.data.Model', premisesDetails);
                       
                    }
                    permitsdetails_panel.height = 550;
                    funcShowCustomizableWindow(ref_no, '85%', permitsdetails_panel, 'customizablewindow');

                    if (isReadOnly == 1) {

                        permitsdetails_panel.getViewModel().set('isReadOnly', true);
                       
                        permitsdetails_panel.down('button[name=save_btn]').setVisible(false);
                      //  permitsdetails_panel.down('button[name=link_applicant]').setDisable(true);
                        me.fireEvent('formAuth', process_id, 1, permitsdetails_panel);
                        
                    }else{
                        permitsdetails_panel.down('button[name=save_btn]').setVisible(true);
                     //   permitsdetails_panel.down('button[name=link_applicant]').setDisable(true);
                    }
                    permitsdetails_panel.down('hiddenfield[name=active_application_id]').setValue(application_id)
                   
                    permitsdetails_panel.down('button[name=save_btn]').handler = 'updateDisposaltReceivingBaseDetails'
                    permitsdetails_panel.down('button[name=save_btn]').action_url = 'updateDisposalApplicationDetails'
                    //details 
                    permitsdetails_panel.down('hiddenfield[name=active_application_code]').setValue(permit_details.application_code);
                    permitsdetails_panel.down('hiddenfield[name=section_id]').setValue(permit_details.section_id);
                    permitsdetails_panel.down('hiddenfield[name=module_id]').setValue(permit_details.module_id);
                    permitsdetails_panel.down('hiddenfield[name=sub_module_id]').setValue(permit_details.sub_module_id);

                   
                    docsGrid = permitsdetails_panel.down('importexportdocuploadsgrid');
                     
                    docsGrid.down('hiddenfield[name=application_code]').setValue(permit_details.application_code);
                    docsGrid.down('hiddenfield[name=section_id]').setValue(permit_details.section_id);
                    docsGrid.down('hiddenfield[name=module_id]').setValue(permit_details.module_id);
                    docsGrid.down('hiddenfield[name=sub_module_id]').setValue(permit_details.sub_module_id);
                        
                    permitsdetails_panel.getViewModel().set('isReadOnly', true);

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
	editpreviewDisposalQueryinformation:function(grid,record){
        var isReadOnly = grid.isReadOnly,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            permitsdetails_panel = activeTab.down('#main_processpanel').permitsdetails_panel,
            application_id = record.get('active_application_id'),
            applicant_id = record.get('applicant_id'),
            ref_no = record.get('reference_no'),
            workflow_stage_id = record.get('workflow_stage_id'),
            module_id = record.get('module_id'),
            section_id = record.get('section_id'),
            sub_module_id = record.get('sub_module_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id');
            this.showDisposalPermitApplicationMoreDetailsGeneric(permitsdetails_panel, application_id,  applicant_id, ref_no, process_id,  isReadOnly,workflow_stage_id,module_id,sub_module_id,section_id,application_code);
    },
    editpreviewPermitQueryinformation:function(grid,record){
        var isReadOnly = grid.isReadOnly,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            permitsdetails_panel = activeTab.down('#main_processpanel').permitsdetails_panel,
            application_id = record.get('active_application_id'),
            applicant_id = record.get('applicant_id'),
            ref_no = record.get('reference_no'),
            process_id = record.get('process_id');
            this.showPermitApplicationMoreDetailsGeneric(permitsdetails_panel, application_id,  applicant_id, ref_no, process_id,  isReadOnly);
    },
    editpreviewNarcoticsPermitinformation:function(item){
        var btn = item.up('button'),
        record = btn.getWidgetRecord();
        isReadOnly = item.isReadOnly,
        is_temporal = btn.is_temporal,
        mainTabPanel = this.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        permitsdetails_panel = activeTab.down('#main_processpanel').permitsdetails_panel,
        application_id = record.get('active_application_id'),
        product_id = record.get('product_id'),
        section_id = record.get('section_id'),
        applicant_id = record.get('applicant_id'),
        ref_no = record.get('reference_no'),
        process_id = record.get('process_id'),
        workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
        module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
        sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
        section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

    //if for the products forms 

    this.showNarcoticsPermitApplicationMoreDetailsGeneric(permitsdetails_panel, application_id,  applicant_id, ref_no, process_id,  isReadOnly);

},
showNarcoticsPermitApplicationMoreDetailsGeneric: function (permitsdetails_panel, application_id,  applicant_id, ref_no, process_id, isReadOnly) {
    Ext.getBody().mask('Please wait...');

    var me = this,
        permitsdetails_panel = Ext.widget(permitsdetails_panel),
        tab = permitsdetails_panel.down('panel'),
        permit_form = permitsdetails_panel.down('form'),
        importexportapplicantdetailsfrm = permitsdetails_panel.down('importexportapplicantdetailsfrm');
        importexportdetailsfrm = permitsdetails_panel.down('#permitsdetailsfrm');
        
        senderreceiverdetailsfrm = permitsdetails_panel.down('#senderreceiverdetailsfrm');
        
    if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
        permitsdetails_panel.down('button[name=save_btn]').setVisible(false);
        //   prepareNewProductReceivingStage
    }

    Ext.Ajax.request({
        method: 'POST',
        url: 'importexportpermits/getPermitsApplicationMoreDetails',
        params: {
            application_id: application_id,
            applicant_id: applicant_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            Ext.getBody().unmask();
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success,
                message = resp.message,
                permit_details = resp.permit_details,
                senderReceiverDetails = resp.senderReceiverDetails;

            if (success == true || success === true) {

                if (permit_details) {
                    var model2 = Ext.create('Ext.data.Model', permit_details);
                    
                   var senderReceiverDetails = Ext.create('Ext.data.Model', senderReceiverDetails);    
                        senderreceiverdetailsfrm.loadRecord(senderReceiverDetails);
                        importexportapplicantdetailsfrm.loadRecord(model2);
                        importexportdetailsfrm.loadRecord(model2);
                        permitsdetails_panel.down('combo[name=zone_id]').setValue(permit_details.zone_id);
                        application_code = permit_details.application_code;
                }
                permitsdetails_panel.height = 550;
                funcShowCustomizableWindow(ref_no, '85%', permitsdetails_panel, 'customizablewindow');

                if (isReadOnly == 1) {
                    me.fireEvent('formAuth', process_id, 1, permitsdetails_panel);
                    
                }
               
                permitsdetails_panel.getViewModel().set('isReadOnly', true);
                permitsdetails_panel.down('hiddenfield[name=active_application_id]').setValue(application_id);
                permitsdetails_panel.down('hiddenfield[name=active_application_code]').setValue(application_code);
                

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
showPermitApplicationMoreDetails: function (btn) {
    var isReadOnly = btn.isReadOnly,
        mainTabPanel = this.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
        applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
        ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
        permitsdetails_panel = activeTab.down('#main_processpanel').permitsdetails_panel,
        process_id = activeTab.down('hiddenfield[name=process_id]').getValue();

    this.showPermitApplicationMoreDetailsGeneric(permitsdetails_panel,application_id, applicant_id, ref_no, process_id,  isReadOnly);

    },
    editpreviewPermitinformation: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord();
            isReadOnly = item.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            permitsdetails_panel = activeTab.down('#main_processpanel').permitsdetails_panel,
            application_id = record.get('active_application_id'),
            product_id = record.get('product_id'),
            section_id = record.get('section_id'),
            applicant_id = record.get('applicant_id'),
            ref_no = record.get('reference_no'),
            process_id = record.get('process_id'),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

        this.showPermitApplicationMoreDetailsGeneric(permitsdetails_panel, application_id,  applicant_id, ref_no, process_id,  isReadOnly);

    },
    showPermitApplicationMoreDetails: function (btn) {
        var isReadOnly = btn.isReadOnly,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            permitsdetails_panel = 'previewimportexportpermitdetails',
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue();

        this.showPermitApplicationMoreDetailsGeneric(permitsdetails_panel,application_id, '', ref_no, process_id,  isReadOnly);
    },
    showPermitApplicationMoreDetailsGeneric: function (permitsdetails_panel, application_id,  applicant_id, ref_no, process_id, isReadOnly) {
        Ext.getBody().mask('Please wait...');

        var me = this,
          //  permitsdetails_panel = Ext.widget(permitsdetails_panel),
            permitsdetails_panel = Ext.create('Ext.tab.Panel', { viewModel:'importexportpermitsvm', layout: 'fit',items:[{xtype: permitsdetails_panel, title: 'Application Details '}]}),
            imp_pnl = permitsdetails_panel.down('permitsdetails_panel'),
            tab = permitsdetails_panel.down('panel'),
            permit_form = permitsdetails_panel.down('form'),
            importexportapplicantdetailsfrm = permitsdetails_panel.down('importexportapplicantdetailsfrm');
            if(permitsdetails_panel.down('#importexportdetailsfrm')){
                importexportdetailsfrm = permitsdetails_panel.down('#importexportdetailsfrm');
            
            }
            else{
                importexportdetailsfrm = permitsdetails_panel.down('#declaredimportexportdetailsfrm');
            
                
            }
           
            senderreceiverdetailsfrm = permitsdetails_panel.down('#senderreceiverdetailsfrm');
            
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            permitsdetails_panel.down('button[name=save_btn]').setVisible(false);
            //   prepareNewProductReceivingStage
        }

        Ext.Ajax.request({
            method: 'POST',
            url: 'importexportpermits/getPermitsApplicationMoreDetails',
            params: {
                application_id: application_id,
                applicant_id: applicant_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    permit_details = resp.permit_details,
                    senderReceiverDetails = resp.senderReceiverDetails,
                    senderReceiverDetails = resp.senderReceiverDetails,
                    application_code = permit_details.application_code,
                    premisesDetails = resp.premisesDetails;

                if (success == true || success === true) {

                    if (permit_details) {
                        var model2 = Ext.create('Ext.data.Model', permit_details);
                        
                       var senderReceiverDetails = Ext.create('Ext.data.Model', senderReceiverDetails),
                            premisesDetails = Ext.create('Ext.data.Model', premisesDetails);
                            if(permit_details.module_id != 20){
                                importexportpremisesfrm = permitsdetails_panel.down('#importexportpremisesfrm'),
                                importexportpremisesfrm.loadRecord(premisesDetails);
                            }
                            
                            senderreceiverdetailsfrm.loadRecord(senderReceiverDetails);
                        
                            importexportapplicantdetailsfrm.loadRecord(model2);
                            importexportdetailsfrm.loadRecord(model2);
                            permitsdetails_panel.down('combo[name=zone_id]').setValue(permit_details.zone_id);
                    }
                    permitsdetails_panel.height = 550;
                    funcShowCustomizableWindow(ref_no, '85%', permitsdetails_panel, 'customizablewindow');

                    if (isReadOnly == 1) {


                        me.fireEvent('formAuth', process_id, 1, permitsdetails_panel);
                        
                    }
                   
                   
                    permitsdetails_panel.down('hiddenfield[name=active_application_code]').setValue(permit_details.application_code);
                    permitsdetails_panel.down('hiddenfield[name=section_id]').setValue(permit_details.section_id);
                    permitsdetails_panel.down('hiddenfield[name=module_id]').setValue(permit_details.module_id);
                    permitsdetails_panel.down('hiddenfield[name=sub_module_id]').setValue(permit_details.sub_module_id);

                    permitsdetails_panel.getViewModel().set('isReadOnly', true);
                    permitsdetails_panel.down('hiddenfield[name=active_application_id]').setValue(application_id);

                    
                   // documents_grid = Ext.widget('previewproductDocUploadsGrid');
                   permitsdetails_panel.add({xtype:'previewproductDocUploadsGrid',title: 'Application Uploaded Documents (All)'});

                    documents_grid = permitsdetails_panel.down('previewproductDocUploadsGrid');
                    documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
                    documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
                    documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
                    documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    documents_grid.down('hiddenfield[name=application_code]').setValue(permit_details.application_code);

                    permitsdetails_panel.add({
                                                xtype: 'tabpanel', 
                                                layout: 'fit', 
                                                title: 'Screening/Assessment Checklist',
                                                items: [{
                                                    title: 'Screening Recommendation',
                                                    xtype: 'applicationcommentspnl'
                                                },{
                                                    xtype: 'allchecklistsgrid',
                                                    title: 'Screening Checklist'

                                                }]
                                            });
                        //prepapreImportExportManagerReview
                    allchecklistsgrid = permitsdetails_panel.down('allchecklistsgrid');
                    allchecklistsgrid.down('hiddenfield[name=process_id]').setValue(process_id);
                    allchecklistsgrid.down('hiddenfield[name=application_id]').setValue(application_id);
                    allchecklistsgrid.down('hiddenfield[name=application_code]').setValue(application_code);

                    applicationcommentspnl = permitsdetails_panel.down('applicationcommentspnl');
                    applicationcommentspnl.down('hiddenfield[name=application_id]').setValue(application_id);
                    applicationcommentspnl.down('hiddenfield[name=application_code]').setValue(application_code);
                    applicationcommentspnl.down('button[name=add_btn]').setHidden(true);

                    

                    permitsdetails_panel.add({xtype:'applicationqueriesgrid',title: 'Request for Additional Information(Queries)'});
                    queries_panel = permitsdetails_panel.down('applicationqueriesgrid');
                    queries_panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    queries_panel.down('hiddenfield[name=application_code]').setValue(permit_details.application_code);
                    queries_panel.down('hiddenfield[name=module_id]').setValue(permit_details.module_id);
                    queries_panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    queries_panel.down('hiddenfield[name=section_id]').setValue(section_id);
                    
                    //the screening checklists 

                    

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
    showLicenseImpExpReceivingApplicationSubmissionWin:function(btn){
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
             application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(), 
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            storeID = getApplicationStore(module_id, section_id);
            validatePermitsProducts = validateHasImportExportProductDetils(application_code);
            validateHasInvoice = validateHasInvoiceGeneration(application_code);
            valid = this.validateNewIMPReceivingSubmission();
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            validateHasDocuments = validateHasUploadedDocumentsDetils(application_code, module_id,sub_module_id,section_id,0,workflow_stage_id,process_id);
            if(!validatePermitsProducts){
                toastr.error('Response: Please add the Permits products details to proceed.'); 
                Ext.getBody().unmask();
                return;
            }
            if(!hasQueries){
                if(!validateHasInvoice){
                    toastr.error('Response: Please generate Porforma Invoice Before submission of the License Application for payment Verification'); 
                    Ext.getBody().unmask();
                    return;
                }
                if(!validateHasDocuments){
                    toastr.error('Response: Please Upload the required documents to proceed.'); 
                    Ext.getBody().unmask();
                    return;
                }
            }
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            storeID = getApplicationStore(module_id, section_id);
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
            
        if (valid) {
            
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID,extraParams,'','',workflow_stage_id);
        }
        else {
            Ext.getBody().unmask();
            toastr.warning('Please Enter All the required Product Details!!', 'Warning Response');
            return;
        }


    },
    showImpExpReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
             application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(), 
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            storeID = getApplicationStore(module_id, section_id);
            validatePermitsProducts = validateHasImportExportProductDetils(application_code);
            valid = this.validateNewIMPReceivingSubmission();
            validateHasDocuments = validateHasUploadedDocumentsDetils(application_code, module_id,sub_module_id,section_id,0,workflow_stage_id,process_id);
            if(!validatePermitsProducts){
                toastr.error('Response: Please add the Permits products details to proceed.'); 
                Ext.getBody().unmask();
                return;
            }
            if(!validateHasDocuments){
                toastr.error('Response: Please Upload the required documents to proceed.'); 
                Ext.getBody().unmask();
                return;
            }
        if (valid) {
            
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID,'','','',workflow_stage_id);
        }
        else {
            Ext.getBody().unmask();
            toastr.warning('Please Enter All the required Product Details!!', 'Warning Response');
            return;
        }
    },showLicReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
             application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(), 
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            storeID = getApplicationStore(module_id, section_id);
            valid = this.validateNewIMPReceivingSubmission();
            validateInvoicing = validateHasInvoiceGeneration(application_code,sub_module_id);
            validatePermitsProducts = validateHasImportExportProductDetils(application_code);
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            validateHasDocuments = validateHasUploadedDocumentsDetils(application_code, module_id,sub_module_id,section_id,0,workflow_stage_id,process_id);
            
            if(!validateHasDocuments){
                toastr.error('Response: Please Upload the required documents to proceed.'); 
                Ext.getBody().unmask();
                return;
            }
            if(!validatePermitsProducts){
                toastr.error('Response: Please add the Permits products details to proceed.'); 
                Ext.getBody().unmask();
                return;
            }
            if(!validateInvoicing){
                toastr.warning('Please Generate Proforma Invoice Or Upload Proof of Payment to proceed!!', 'Warning Response');
           
                Ext.getBody().unmask();
                return;
            }
        if (valid) {
            
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID,'','','',workflow_stage_id);
        }
        else {
            Ext.getBody().unmask();
            toastr.warning('Please Enter All the required Permits Details!!', 'Warning Response');
            return;
        }
    },

    showDisposalReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            storeID = getApplicationStore(module_id, section_id);
            valid = this.validateNewDisposalReceivingSubmission();
            
        if (valid) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID);
        }
        else {
            Ext.getBody().unmask();
            toastr.warning('Please Enter All the required Product Details!!', 'Warning Response');
            return;
        }
    },
    validateNewDisposalReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('disposalapplicantdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),

            disposalpermitsdetailsfrm = activeTab.down('#disposalpermitsdetailsfrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!disposalpermitsdetailsfrm.isValid()) {
            toastr.warning('Please Enter All the required Permits Details!!', 'Warning Response');
            return false;
        }
        return true;
    },
    validateNewIMPReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('importexportapplicantdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),

            importexportdetailsfrm = activeTab.down('#importexportdetailsfrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!importexportdetailsfrm.isValid()) {
           // toastr.warning('Please Enter All the required Permits Details!!', 'Warning Response');
           // return false;
        }
        
        return true;
    },
    onSenderreceiverinformationDLBClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            sender_receiver_id = record.get('trader_id'),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
            var  senderreceiverdetailsfrm = me.getSenderreceiverdetailsfrm();
            senderreceiverdetailsfrm.loadRecord(record);

            win.close();
/*
        mask.show();
        
        Ext.Ajax.request({
            method: 'POST',
            url: 'importexportpermits/onSaveImportPermitSenderReceiverData',
            params: {
                application_code: application_code,
                sender_receiver_id:sender_receiver_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
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
        */
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },
    onPremiseImpSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            premise_id = record.get('premise_id'),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        
        Ext.Ajax.request({
            method: 'POST',
            url: 'importexportpermits/onSaveImportPermitPremisesData',
            params: {
                application_code: application_code,
                premise_id:premise_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                   
                if (success == true || success === true) {
                    var  importexportpremisesfrm = me.getImportexportpremisesfrm();
           
                         importexportpremisesfrm.loadRecord(record);
   
                         win.close();
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
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },
    onSavePermitProductsDetails:function(btn){
        var me = this,
        mainTabPnl = this.getMainTabPanel(),
        url = btn.action_url,
        form = btn.up('form'),
        win = form.up('window'),
        store = btn.store,
        action_url = btn.action_url,
        prodpermitStr = Ext.getStore(store)
        activeTab = mainTabPnl.getActiveTab();
        section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
        application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        frm = form.getForm();
      
            if (frm.isValid()) {
                frm.submit({
                    url: action_url ,
                    waitMsg: 'Please wait...',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    params: {
                        application_code: application_code,
                        section_id: section_id
                    },
                    success: function (form, action) {
                        var response = Ext.decode(action.response.responseText),
                            success = response.success,
                            message = response.message;
                        if (success == true || success === true) {
                            toastr.success(message, "Success Response");
                            win.close();
                            prodpermitStr.removeAll();
                            prodpermitStr.load();

                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (form, action) {
                        var resp = action.result;
                        toastr.error(resp.message, 'Failure Response');
                    }
                });
            }else{

                toastr.error('Fill In all Mandatory Fields', 'Failure Response');

            }
     

    },
    onSaveDisposalinternalsupervisorsfrm:function(btn){
        var me = this,
        mainTabPnl = this.getMainTabPanel(),
        url = btn.action_url,
        form = btn.up('form'),
        win = form.up('window'),
        prodpermitStr = Ext.getStore('disposaldestsupervisorsstr')
        activeTab = mainTabPnl.getActiveTab();
        section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
        application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        frm = form.getForm();
        if (frm.isValid()) {
            if (frm.isValid()) {
                frm.submit({
                    url: 'importexportpermits/onSaveDisposalinternalsupervisors',
                    waitMsg: 'Please wait...',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    params: {
                        application_code: application_code,
                        section_id: section_id
                    },
                    success: function (form, action) {
                        var response = Ext.decode(action.response.responseText),
                            success = response.success,
                            message = response.message;
                        if (success == true || success === true) {
                            toastr.success(message, "Success Response");
                            win.close();
                            prodpermitStr.removeAll();
                            prodpermitStr.load();

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

    },
    
    showImpPremiseSelectionList:function(btn){
        var me = this,
            childXtype = 'registeredpremisesdetailsgrid',
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            activeTab = mainTabPanel.getActiveTab();
            gmp_type_id = 0;
        var childObject = Ext.widget(childXtype);
        childObject.setHeight(450);
            childObject.down('hiddenfield[name=section_id]').setValue(section_id);
            childObject.down('hiddenfield[name=application_code]').setValue(application_code);
            funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');

    },
    showImpSenderReceiverlectionList:function(btn){
        var me = this,
            childXtype = 'senderreceiverinformationgrid',
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            gmp_type_id = 0;
       
        var childObject = Ext.widget(childXtype);
            funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');

    },
    showApplicantSelectionList: function (btn) {
        var childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    onPermitApplicantSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();

            if(activeTab.down('importexportapplicantdetailsfrm')){

                applicantForm = activeTab.down('importexportapplicantdetailsfrm');
            }
            else{
                applicantForm = activeTab.down('revenueapplicantdetailsfrm');
            }
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        applicantForm.loadRecord(record);
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },inspectionimportexportspermitgridDblClick: function (view, record, item, index, e, eOpts) {
       
         
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
             grid = view.grid,
            win = grid.up('window'),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            importexportdetailsfrm = activeTab.down('#importexportdetailsfrm'),
            importexportpremisesfrm = activeTab.down('#importexportpremisesfrm'),
            senderreceiverdetailsfrm = activeTab.down('#senderreceiverdetailsfrm'),
            poeinspectionpermitsproductsgrid = activeTab.down('#poeinspectionpermitsproductsgrid'),
            active_application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            verification_status =record.get('verification_status'),
            
            permit_verificationstatus_id =record.get('permit_verificationstatus_id'),
           
            is_permitexpired =record.get('is_permitexpired'),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
            
        if(is_permitexpired == 1){
            toastr.error('The selected permit has already Expired, kindly reject or request for permit Extension.', 'Alert');
            Ext.getBody().unmask();
            return;
        }
        
        if(permit_verificationstatus_id > 0){
            toastr.error('The selected permit has already been verified, kindly confirm on the inspection detail and released consignment details permit Extension.', 'Alert');
         //   return;
        }
        if (active_application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepareImportExporPermitReceivingStage',
                params: {
                    application_id: active_application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        senderReceiverDetails = resp.senderReceiverDetails,
                        premisesDetails = resp.premisesDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                        senderReceiverDetails = Ext.create('Ext.data.Model', senderReceiverDetails);
                        premisesDetails = Ext.create('Ext.data.Model', premisesDetails);

                    if (success == true || success === true) {
                        activeTab.down('displayfield[name=verification_status]').setValue(verification_status);
                        importexportdetailsfrm.loadRecord(model);

                        importexportpremisesfrm.loadRecord(premisesDetails);
                        senderreceiverdetailsfrm.loadRecord(senderReceiverDetails);

                        zone_cbo.setValue(zone_id);

                        activeTab.down('displayfield[name=application_status]').setValue(results.application_status);

                        activeTab.down('displayfield[name=reference_no]').setValue(results.reference_no);
                        activeTab.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                        activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                        poeinspectionpermitsproductsgrid.store.load();
                        win.close();
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
            activeTab.down('combo[name=sub_module_id]').setDisabled(true);
            activeTab.down('combo[name=sub_module_id]').setValue(sub_module_id);
                          
        }
    }, onconsigneedetailsgridnDLBClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            consignee_id = record.get('trader_id'),
            name = record.get('applicant_name'),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });

            var  importexportdetailsfrm = me.getImportexportdetailsfrm();
            importexportdetailsfrm.down('textfield[name=consignee_name]').setValue(name);
            importexportdetailsfrm.down('hiddenfield[name=consignee_id]').setValue(consignee_id);

            win.close();
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },
    prepareReceivingpoeinspectionswizard: function (pnl) {

        Ext.getBody().mask('Please wait...');
        var me = this,
            activeTab = pnl;
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            importexportdetailsfrm = activeTab.down('#importexportdetailsfrm'),
            importexportpremisesfrm = activeTab.down('importexportpremisesfrm'),
           
            senderreceiverdetailsfrm = activeTab.down('#senderreceiverdetailsfrm'),
            poeinspectionpnlfrm = activeTab.down('#poeinspectionpnlfrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            poeinspectionpermitsproductsgrid = activeTab.down('#poeinspectionpermitsproductsgrid'),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
            filter = { section_id: section_id },permitsdetails_panel = activeTab.down('#permitsdetails_panel'),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
         
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepareReceivingpoeinspectionswizard',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        senderReceiverDetails = resp.senderReceiverDetails,
                        premisesDetails = resp.premisesDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                        senderReceiverDetails = Ext.create('Ext.data.Model', senderReceiverDetails);
                        premisesDetails = Ext.create('Ext.data.Model', premisesDetails);

                    if (success == true || success === true) {
                        
                        importexportdetailsfrm.loadRecord(model);
                        poeinspectionpnlfrm.loadRecord(model);
                        importexportpremisesfrm.loadRecord(premisesDetails);
                        senderreceiverdetailsfrm.loadRecord(senderReceiverDetails);

                        zone_cbo.setValue(zone_id);

                        activeTab.down('hiddenfield[name=poe_application_id]').setValue(results.poe_application_id);
                        
                        poeinspectionpermitsproductsgrid.store.load();
                        pnl.getViewModel().set('isReadOnly', true);
                        pnl.getViewModel().set('readOnly', true);
                        permitsdetails_panel.getViewModel().set('isReadOnly', true);
                        permitsdetails_panel.getViewModel().set('readOnly', true);
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
            activeTab.down('combo[name=sub_module_id]').setDisabled(true);
            activeTab.down('combo[name=sub_module_id]').setValue(sub_module_id);
                          
        }
    },
    
    onDisposalPermitApplicantSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantForm = activeTab.down('disposalapplicantdetailsfrm'),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        applicantForm.loadRecord(record);
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },
    importexportPermitHome: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            sec_dashboard = btn.sec_dashboard,
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#importexportpermitsdashwrapper');
        if (!dashboardWrapper.down(sec_dashboard)) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({ xtype: sec_dashboard });
        }
    },
   
    showImportPermitApplication: function (sub_module_id) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            filter = { section_id: section_id };
    },
    refreshScreeningChecklistItemsGrid: function (me) {
        var store = me.getStore(),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            checklist_type ='';
            if(activeTab.down('combo[name=applicable_checklist]')){
                checklist_type = activeTab.down('combo[name=applicable_checklist]').getValue();
                store.getProxy().extraParams = {
                    application_code: application_code,
                    checklist_type: checklist_type
                };
            }
    },
    refreshdeclaredimportexportpermitsdashgrid:function(me){
        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = (grid.down('combo[name=sub_module_id]')) ? grid.down('combo[name=sub_module_id]').getValue() : null,
            workflow_stage_id = (grid.down('combo[name=workflow_stage_id]')) ? grid.down('combo[name=workflow_stage_id]').getValue() : null;

        store.getProxy().extraParams = {
            module_id: module_id,
            sub_module_id: sub_module_id,
            workflow_stage_id: workflow_stage_id
        };
    },
    refreshimportexportpermitsdashgrid: function (me) {
        
        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            sub_module_id = (grid.down('combo[name=sub_module_id]')) ? grid.down('combo[name=sub_module_id]').getValue() : null,
            workflow_stage_id = (grid.down('combo[name=workflow_stage_id]')) ? grid.down('combo[name=workflow_stage_id]').getValue() : null;

        store.getProxy().extraParams = {
            module_id: module_id,
            sub_module_id: sub_module_id,
            section_id: section_id,
            workflow_stage_id: workflow_stage_id
        };
    },
    
    refreshsenderreceiverinformationgrid: function (me) {

        var store = me.store;

        store.getProxy().extraParams = {
            'sender_details':''
        };
    },
    showImportExportPermitRegWorkflow: function (sub_module_id) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#dashboardWrapper'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_details = getBasicWorkflowDetails(module_id, section_id, sub_module_id);
        if (!workflow_details) {
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
    
    prepaprePersonalPermitsReceiving: function (pnl) {

        Ext.getBody().mask('Please wait...');
        var me = this,
            activeTab = pnl;
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            importexportdetailsfrm = activeTab.down('#importexportdetailsfrm'),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
            filter = { section_id: section_id },
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
       
        if (application_code) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepaprePersonalPermitsReceiving',
                params: {
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
                        results = resp.results,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);

                    if (success == true || success === true) {
                        
                        importexportdetailsfrm.loadRecord(model);

                        zone_cbo.setValue(zone_id);

                        activeTab.down('displayfield[name=application_status]').setValue(results.application_status);

                        activeTab.down('displayfield[name=reference_no]').setValue(results.reference_no);
                        activeTab.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                        
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
          //  activeTab.down('combo[name=sub_module_id]').setDisabled(true);
         //   activeTab.down('combo[name=sub_module_id]').setValue(sub_module_id);
                          
        }
    },
    prepapreImportExportReceiving: function (pnl) {

        Ext.getBody().mask('Please wait...');
        var me = this,
            activeTab = pnl;
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            applicantFrm = activeTab.down('importexportapplicantdetailsfrm'),
            importexportdetailsfrm = activeTab.down('#importexportdetailsfrm'),
            importexportpremisesfrm = activeTab.down('#importexportpremisesfrm'),
            senderreceiverdetailsfrm = activeTab.down('#senderreceiverdetailsfrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
            filter = { section_id: section_id },
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            
        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepareImportExporPermitReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        senderReceiverDetails = resp.senderReceiverDetails,
                        premisesDetails = resp.premisesDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                        senderReceiverDetails = Ext.create('Ext.data.Model', senderReceiverDetails);
                        premisesDetails = Ext.create('Ext.data.Model', premisesDetails);

                    if (success == true || success === true) {
                        
                        applicantFrm.loadRecord(model);
                        importexportdetailsfrm.loadRecord(model);

                        importexportpremisesfrm.loadRecord(premisesDetails);
                        senderreceiverdetailsfrm.loadRecord(senderReceiverDetails);

                        zone_cbo.setValue(zone_id);

                        activeTab.down('displayfield[name=application_status]').setValue(results.application_status);

                        activeTab.down('displayfield[name=reference_no]').setValue(results.reference_no);
                        activeTab.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                        
                        var parent_pnl = pnl.up('panel');
                            parent_pnl.getViewModel().set('isReadOnly', false);
                            activeTab.down('button[action=search_premise]').setDisabled(true);
                            activeTab.down('button[action=link_applicant]').setDisabled(true);
                            
                            activeTab.down('combo[name=sub_module_id]').setDisabled(true);
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
            activeTab.down('combo[name=sub_module_id]').setDisabled(true);
            activeTab.down('combo[name=sub_module_id]').setValue(sub_module_id);
                          
        }
    },
    prepapreNarcoticsPermitsReceiving:function(pnl){

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('importexportapplicantdetailsfrm'),
            importexportdetailsfrm = activeTab.down('#permitsdetailsfrm'),
            senderreceiverdetailsfrm = activeTab.down('senderreceiverdetailsfrm'),
            
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            
            zone_cbo = activeTab.down('combo[name=zone_id]');
          
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepareNarcoticsPermitReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        senderReceiverDetails = resp.senderReceiverDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                        senderreceiverdetailsmdl = Ext.create('Ext.data.Model', senderReceiverDetails);

                    if (success == true || success === true) {
                        
                        applicantFrm.loadRecord(model);
                        importexportdetailsfrm.loadRecord(model);
                        senderreceiverdetailsfrm.loadRecord(senderreceiverdetailsmdl);
                        
                        zone_cbo.setValue(zone_id);

                        activeTab.down('displayfield[name=application_status]').setValue(results.application_status);

                        activeTab.down('displayfield[name=reference_no]').setValue(results.reference_no);
                        activeTab.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                        
                        var parent_pnl = pnl.up('panel');
                            parent_pnl.getViewModel().set('isReadOnly', false);
                        
                            //activeTab.down('button[action=link_applicant]').setDisabled(true);{} 


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
            
            activeTab.down('button[name=process_submission_btn]').setDisabled(false);

            activeTab.down('button[name=process_submission_btn]').setVisible(true);

        }


    },
    prepapreDisposalReceiving: function (pnl) {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('disposalapplicantdetailsfrm'),
            importexportdetailsfrm = activeTab.down('#disposalpermitsdetailsfrm'),
            importexportpremisesfrm = activeTab.down('#importexportpremisesfrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
          
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepareDisposalPermitReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        premisesDetails = resp.premisesDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                        premisesDetails = Ext.create('Ext.data.Model', premisesDetails);

                    if (success == true || success === true) {
                        
                        applicantFrm.loadRecord(model);
                        importexportdetailsfrm.loadRecord(model);

                        importexportpremisesfrm.loadRecord(premisesDetails);
                        
                        zone_cbo.setValue(zone_id);

                        activeTab.down('displayfield[name=application_status]').setValue(results.application_status);

                        activeTab.down('displayfield[name=reference_no]').setValue(results.reference_no);
                        activeTab.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                        
                        var parent_pnl = pnl.up('panel');
                            parent_pnl.getViewModel().set('isReadOnly', false);
                            activeTab.down('button[action=search_premise]').setDisabled(true);
                            activeTab.down('button[action=link_applicant]').setDisabled(true);


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
            
            activeTab.down('button[name=process_submission_btn]').setDisabled(false);

            activeTab.down('button[name=process_submission_btn]').setVisible(true);

        }
    },
    funcsetApplicatonTitle:function(pnl,sub_module_id){
        if(sub_module_id == 12){
                var application_title = 'Import Visa Application';
        }
        else if(sub_module_id == 81){
            var application_title = 'Export License Application';
        }
        else{

            var application_title = 'Import License Application';
        }
        pnl.getViewModel().set('application_title', application_title);
                        
        
    },
    prepapreImportExportManagerReview: function (pnl) {

        Ext.getBody().mask('Please wait...');
        var me = this,
            activeTab = pnl;
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            
            permitsdetails_panel = activeTab.down('#permitsdetails_panel'),
            

            applicantFrm = activeTab.down('importexportapplicantdetailsfrm'),
            importexportdetailsfrm = activeTab.down('#importexportdetailsfrm'),
            importexportpremisesfrm = activeTab.down('#importexportpremisesfrm'),
            senderreceiverdetailsfrm = activeTab.down('#senderreceiverdetailsfrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
            filter = { section_id: section_id },
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        
        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepareImportExporPermitReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        senderReceiverDetails = resp.senderReceiverDetails,
                        premisesDetails = resp.premisesDetails,
                        zone_id = results.zone_id,
                        application_code =results.application_code,
                        model = Ext.create('Ext.data.Model', results);
                        senderReceiverDetails = Ext.create('Ext.data.Model', senderReceiverDetails);
                        premisesDetails = Ext.create('Ext.data.Model', premisesDetails);

                    if (success == true || success === true) {
                        
                        applicantFrm.loadRecord(model);
                        if(results.module_id != 20){
                            importexportpremisesfrm.loadRecord(premisesDetails);
                            activeTab.down('button[action=search_premise]').setDisabled(true);
                        }
                        importexportdetailsfrm.loadRecord(model);

                        senderreceiverdetailsfrm.loadRecord(senderReceiverDetails);

                        zone_cbo.setValue(zone_id);
                        zone_cbo.setDisabled(true);
                        activeTab.down('displayfield[name=application_status]').setValue(results.application_status);

                        activeTab.down('displayfield[name=reference_no]').setValue(results.tracking_no);
                        activeTab.down('displayfield[name=tracking_no]').setValue(results.reference_no);
                        if(results.module_id != 20){
                            if(results.sub_module_id == 13 || results.sub_module_id == 15){
                                activeTab.down('combo[name=approval_recommendation_id]').setValue(results.approval_recommendation_id);
                                activeTab.down('combo[name=approval_recommendation_id]').setVisible(true);
                            }else{
                                activeTab.down('combo[name=approval_recommendation_id]').setVisible(false);
                            }
                           

                        }
                        docsGrid = activeTab.down('previewpermitdocuploadsgrid');
                        docsGrid.down('hiddenfield[name=application_code]').setValue(results.application_code);
                        docsGrid.down('hiddenfield[name=section_id]').setValue(results.section_id);
                        docsGrid.down('hiddenfield[name=module_id]').setValue(results.module_id);
                        docsGrid.down('hiddenfield[name=sub_module_id]').setValue(results.sub_module_id);
                
                        docsGrid.portal_uploads =3;
                        docsGrid.getStore().load();
                       
                        activeTab.down('combo[name=prechecking_recommendation_id]').setValue(results.prechecking_recommendation_id);
                        activeTab.down('combo[name=review_recommendation_id]').setValue(results.review_recommendation_id);
                        
                        
                        activeTab.down('combo[name=sub_module_id]').setDisabled(true);
                        allchecklistsgrid = activeTab.down('allchecklistsgrid');
                        allchecklistsgrid.down('hiddenfield[name=process_id]').setValue(process_id);
                        allchecklistsgrid.down('hiddenfield[name=application_id]').setValue(application_id);
                        allchecklistsgrid.down('hiddenfield[name=application_code]').setValue(application_code);

                        
                        applicationcommentspnl = activeTab.down('applicationcommentspnl');
                        applicationcommentspnl.down('hiddenfield[name=application_id]').setValue(application_id);
                        applicationcommentspnl.down('hiddenfield[name=application_code]').setValue(application_code);
                        applicationcommentspnl.down('button[name=add_btn]').setHidden(true);
                        
                        applicationcommentspnl.down('grid').getStore().load();

                        queries_panel = activeTab.down('applicationqueriesgrid');
                        queries_panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                        queries_panel.down('hiddenfield[name=application_code]').setValue(application_code);
                        queries_panel.down('hiddenfield[name=module_id]').setValue(results.module_id);
                        queries_panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                        queries_panel.down('hiddenfield[name=section_id]').setValue(section_id);

                        permitsdetails_panel.getViewModel().set('isReadOnly', true);
                        permitsdetails_panel.getViewModel().set('readOnly', true);

                        me.funcsetApplicatonTitle(pnl,sub_module_id);

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
            activeTab.down('combo[name=sub_module_id]').setDisabled(true);
            activeTab.down('combo[name=sub_module_id]').setValue(sub_module_id);
                          
        }
    },
    prepapreDisposalOnlineReceiving: function (pnl) {

        Ext.getBody().mask('Please wait...');
        var me = this,
            activeTab = pnl;
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            applicantFrm = activeTab.down('disposalapplicantdetailsfrm'),
            onlinedisposalpermitsdetailsfrm = activeTab.down('#onlinedisposalpermitsdetailsfrm'),
           // importexportpremisesfrm = activeTab.down('#importexportpremisesfrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
            filter = { section_id: section_id },
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
			
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
      

        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepapreDisposalOnlineReceiving',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        senderReceiverDetails = resp.senderReceiverDetails,
                        premisesDetails = resp.premisesDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                        senderReceiverDetails = Ext.create('Ext.data.Model', senderReceiverDetails);
                        premisesDetails = Ext.create('Ext.data.Model', premisesDetails);

                    if (success == true || success === true) {
                        

                        applicantFrm.loadRecord(model);
                        onlinedisposalpermitsdetailsfrm.loadRecord(model);

                       // importexportpremisesfrm.loadRecord(premisesDetails);

                        // zone_cbo.setReadOnly(true);
                        zone_cbo.setValue(zone_id);
                        zone_cbo.setDisabled(true);
                        activeTab.down('displayfield[name=application_status]').setValue(results.application_status);
                        activeTab.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                        
                        activeTab.down('displayfield[name=process_name]').setValue(results.process_name);
                        pnl.getViewModel().set('isReadOnly', true);
                        
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
    prepapreDeclaredImportExportOnlineReceiving:function(pnl){
            
        Ext.getBody().mask('Please wait...');
        var me = this,
            activeTab = pnl;
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            applicantFrm = activeTab.down('importexportapplicantdetailsfrm'),
            importexportdetailsfrm = activeTab.down('#importexportdetailsfrm'),
            senderreceiverdetailsfrm = activeTab.down('#senderreceiverdetailsfrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
            filter = { section_id: section_id },
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
     
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepapreDeclaredImportExportOnlineReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        senderReceiverDetails = resp.senderReceiverDetails,
                        premisesDetails = resp.premisesDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                        senderReceiverDetails = Ext.create('Ext.data.Model', senderReceiverDetails);

                    if (success == true || success === true) {
                        

                        applicantFrm.loadRecord(model);
                        importexportdetailsfrm.loadRecord(model);

                        senderreceiverdetailsfrm.loadRecord(senderReceiverDetails);
                        // zone_cbo.setReadOnly(true);
                        zone_cbo.setValue(zone_id);
                        zone_cbo.setDisabled(true);
                        activeTab.down('displayfield[name=application_status]').setValue(results.application_status);
                        activeTab.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                        
                        activeTab.down('displayfield[name=process_name]').setValue(results.process_name);
                        pnl.getViewModel().set('isReadOnly', true);
                        
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
    prepapreImportExportOnlineReceiving: function (pnl) {

        Ext.getBody().mask('Please wait...');
        var me = this,
            activeTab = pnl;
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            applicantFrm = activeTab.down('importexportapplicantdetailsfrm'),
            importexportdetailsfrm = activeTab.down('#importexportdetailsfrm'),
            importexportpremisesfrm = activeTab.down('#importexportpremisesfrm'),
            senderreceiverdetailsfrm = activeTab.down('#senderreceiverdetailsfrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
            filter = { section_id: section_id };
        
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        if(pnl.down('combo[name=applicable_checklist]')){
            var checklistTypesGrid = pnl.down('combo[name=applicable_checklist]'),
            checklistTypesStr = checklistTypesGrid.getStore();

            checklistTypesStr.removeAll();
            checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
    
        }
       

        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/prepareOnlineImportExporPermitReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        senderReceiverDetails = resp.senderReceiverDetails,
                        premisesDetails = resp.premisesDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                        senderReceiverDetails = Ext.create('Ext.data.Model', senderReceiverDetails);
                        premisesDetails = Ext.create('Ext.data.Model', premisesDetails);

                    if (success == true || success === true) {
                        

                        applicantFrm.loadRecord(model);
                        importexportdetailsfrm.loadRecord(model);

                        importexportpremisesfrm.loadRecord(premisesDetails);
                        senderreceiverdetailsfrm.loadRecord(senderReceiverDetails);

                        // zone_cbo.setReadOnly(true);
                        zone_cbo.setValue(zone_id);
                        zone_cbo.setDisabled(true);
                        activeTab.down('displayfield[name=application_status]').setValue(results.application_status);
                        activeTab.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                        
                        activeTab.down('displayfield[name=process_name]').setValue(results.process_name);
                        pnl.getViewModel().set('isReadOnly', true);
                        
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
    }, refreshonlineimportexportappsgrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
            module_id = (activeTab.down('hiddenfield[name=module_id]')) ? activeTab.down('hiddenfield[name=module_id]').getValue() : null,
            section_id = (activeTab.down('hiddenfield[name=section_id]')) ? activeTab.down('hiddenfield[name=section_id]').getValue() : null;
            store.getProxy().extraParams = {
                module_id: module_id,
                section_id: section_id,
                sub_module_id: sub_module_id
            };
    },
    refreshimportexportpermitsproductsgrid: function (me) {

        var grid = me.up('grid'),
            store = grid.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();

        //check if has been set or use window 
        if (me.up('window')) {
            var panel = me.up('window'),
            application_code = panel.down('hiddenfield[name=active_application_code]').getValue();
        }
        else {
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        }

        store.getProxy().extraParams = {
            application_code: application_code
        };
    },
    refreshregisterednonregisteredprodgrid: function (me) {

        var grid = me.up('grid'),
            store = grid.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();

        //check if has been set or use window 
        if (activeTab.down('hiddenfield[name=sub_module_id]')) {

            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue();
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue();

            
        }
        else {

            var panel = me.up('window'),
            sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue();
            section_id = panel.down('hiddenfield[name=section_id]').getValue();
            applicant_id = panel.down('hiddenfield[name=applicant_id]').getValue();

        }

        store.getProxy().extraParams = {
            sub_module_id: sub_module_id,
            section_id:section_id,
            applicant_id:applicant_id            
        };
    },
    searchproductsinformationgrid: function (me) {

        

    },
    
    refreshonlineimportexportdocuploadsgrid: function (me) {

        var grid = me.up('grid'),
            store = grid.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();

        //check if has been set or use window 
        if ( me.up('window')) {
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
console.log(application_code);
        store.getProxy().extraParams = {
            application_code: application_code,
            module_id: module_id,
            section_id: section_id,
            sub_module_id: sub_module_id,
            portal_uploads:1
        };

    },
    refreshpreviousimportexportdocuploadsgrid: function (me) {

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
    
    showNewDisposalApplications: function (sub_module_id) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#disposalapplicationsdashwrapper'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            filter = {section_id: section_id};
        workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id);

        if (!workflow_details) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(workflow_details.viewtype);
        workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
        workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
        workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.applicationStatus);
        workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
        workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
        workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
        workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);
        dashboardWrapper.add(workflowContainer);
        //reload Stores 
        var app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore();
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: workflow_details.processId,
                workflow_stage: workflow_details.initialStageId
            }
        });
        activeTab.down('button[action=search_premise]').setDisabled(false);
        activeTab.down('button[action=link_applicant]').setDisabled(false);
       //disposalpermitreceiving
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);

        //load the stores

    },
    //poe import products 
    funcSavePOEPermitProductDetails: function (btn) {
        var grid = btn.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            poe_application_id = activeTab.down('hiddenfield[name=poe_application_id]').getValue(),
            store = grid.getStore(),
            params = [];

        for (var i = 0; i < store.data.items.length; i++) {
            var record = store.data.items [i],
                 poe_permitsdata_id = record.get('id'),
                 permits_product_id = record.get('permits_product_id'),
                 batch_numbers = record.get('batch_numbers'),
                 poe_prod_quantity = record.get('poe_prod_quantity');
        
                 if(batch_numbers != ''){
                    var obj = {
                        poe_permitsdata_id: poe_permitsdata_id,
                        permits_product_id: permits_product_id,
                        batch_numbers:batch_numbers,
                        poe_prod_quantity: poe_prod_quantity
                    };
                    if (record.dirty) {
                        params.push(obj);
                    }
                 }else{
                    toastr.warning('Enter the products Batch Number!!', 'Warning Response');
                    return false;
                 }
           
        }
       
        this.funcUpdatePOEPermitProdctDetails(btn,params);
    },funcSaveAllPOEPermitProductDetails:function(btn){
        var grid = btn.up('grid');
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection();
            params = [];
            Ext.each(selected_records, function (item) {
                
                    var poe_permitsdata_id = item.data.id,
                    permits_product_id = item.data.permits_product_id,
                    
                    product_batch_no = item.data.product_batch_no,
                    poe_prod_quantity = item.data.balance;

                        if(batch_numbers != ''){
                            var obj = {
                                poe_permitsdata_id: poe_permitsdata_id,
                                permits_product_id: permits_product_id,
                                batch_numbers:product_batch_no,
                                poe_prod_quantity: poe_prod_quantity
                            };
                            params.push(obj);
                         }else{
                            toastr.warning('Enter the products Batch Number!!', 'Warning Response');
                            return false;
                         }
            });
            this.funcUpdatePOEPermitProdctDetails(btn,params);
    },
    funcUpdatePOEPermitProdctDetails:function(btn,params){
        var grid = btn.up('grid'),
        mainTabPanel = this.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
        poe_application_id = activeTab.down('hiddenfield[name=poe_application_id]').getValue(),
        store = grid.getStore();
        
        if (params.length < 1) {
            btn.setLoading(false);
            toastr.warning('No records to save!!', 'Warning Response');
            return false;
        }
        params = JSON.stringify(params);
        Ext.Ajax.request({
                    url: 'importexportpermits/savePOEPermitProductDetails',
                    params: {
                        poe_application_id: poe_application_id,
                        application_code: application_code,
                        poe_products: params
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
        })


    },showManagerQueryApplicationSubmissionWin: function (btn) {
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
    
    showReturnBackApplicationSubmissionWin:function(btn){

        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form').getForm(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            storeID = getApplicationStore(module_id, section_id);
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'workflowaction_type_id',
                value: 9
            }]; 
        showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth,storeID,extraParams,'','',workflow_stage_id);
        Ext.getBody().unmask();
    },
    showManagerReviewApplicationSubmissionWin: function (btn) {

        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form').getForm(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            hasReviewRecommendation  = checkReviewREcommendationDEtails(application_code),
            review_recommendation_id = activeTab.down('combo[name=review_recommendation_id]').getValue(),
            storeID = getApplicationStore(module_id, section_id);
        if(!hasReviewRecommendation){
            toastr.error('Response: Enter the Review recommendation to proceed', 'Error Response'); 
            Ext.getBody().unmask();
            return;
        }
        if(review_recommendation_id == 3){
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'workflowaction_type_id',
                value: 13
            }];
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,extraParams,'','',workflow_stage_id);
        }
        else if(review_recommendation_id == 4){
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'workflowaction_type_id',
                value: 14
            }];
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,extraParams,'','',workflow_stage_id);
        }
        else{
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,'','','',workflow_stage_id);
        }
     
        Ext.getBody().unmask();
    },

    
    showManagerReviewApplicationTraderSubmissionWin: function (btn) {

        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form').getForm(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            storeID = getApplicationStore(module_id, section_id);
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'workflowaction_type_id',
                value: 4
            }]; 
        showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,extraParams,'','',workflow_stage_id);
        Ext.getBody().unmask();
    },
    
    showImpManagerReviewApplicationSubmissionWin:function(btn){
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form').getForm(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            hasReviewRecommendation  = checkReviewREcommendationDEtails(application_code),
            storeID = getApplicationStore(module_id, section_id);
            approval_recommendation_id = activeTab.down('combo[name=review_recommendation_id]').getValue();
        if(!hasReviewRecommendation){
            toastr.error('Response: Enter the Review recommendation to proceed', 'Error Response'); 
            Ext.getBody().unmask();
            return;
        }
        var workflowaction_type_id = 1;

//  application_id application_code process_id module_id sub_module_id section_id curr_stage_id workflowaction_type_id next_stage action
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            storeID = btn.storeID,
            action_url = btn.action_url,
            store = Ext.getStore(storeID),
            intrayStore = Ext.getStore('intraystr'),
            outtrayStore = Ext.getStore('outtraystr'),
            onlineapplicationdashboardgridstr= Ext.getStore('onlineapplicationdashboardgridstr');

            
            
        Ext.Ajax.request({
            url: 'workflow/getApplicationNextStageActionDetails',
            method: 'POST',
            params: {
                application_code:application_code,
                application_id:application_id,
                workflow_stage_id:workflow_stage_id,
                workflowaction_type_id:workflowaction_type_id,
                table_name : 'tra_importexport_applications',
                module_id:module_id,
                sub_module_id:sub_module_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
               
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                    if (success == true || success === true) {
                        //curr_stage_id workflowaction_type_id next_stage action
                        var results = resp.results;
                            curr_stage_id = results.stage_id,
                            action = results.action_id, 
                            next_stage = results.nextstage_id;
                            //application_id application_code process_id module_id sub_module_id section_id curr_stage_id workflowaction_type_id next_stage action
                            
                        Ext.MessageBox.confirm('Permit Approval', 'Do you want to release the Approved Permit Application?', function (button) {
                            if (button === 'yes') {
                                Ext.getBody().mask('Submitting Application wait...');
                                Ext.Ajax.request({
                                    url: 'workflow/handleApplicationSubmission',
                                    method: 'POST',
                                    params: {
                                        application_code:application_code,
                                        application_id:application_id,
                                        process_id:process_id,
                                        workflowaction_type_id:workflowaction_type_id,
                                        table_name : 'tra_importexport_applications',
                                        module_id:module_id,
                                        sub_module_id:sub_module_id,
                                        section_id:section_id,
                                        curr_stage_id:curr_stage_id,
                                        workflowaction_type_id:workflowaction_type_id,
                                        next_stage:next_stage,
                                        action:action
                                    },
                                    headers: {
                                        'Authorization': 'Bearer ' + access_token,
                                        'X-CSRF-Token': token
                                    },
                                    success: function (response) {
                                       
                                        var resp = Ext.JSON.decode(response.responseText),
                                            message = resp.message,
                                            success = resp.success;
                                            if (success == true || success === true) {
                                                toastr.success(message, "Success Response");
                                                store.load();
                                                intrayStore.load();
                                                outtrayStore.load();
                                                externaluserintraystr = Ext.getStore('externaluserintraystr');
                                                externaluserintraystr.load();
                                                
                                                onlineapplicationdashboardgridstr.load();
                                                //win.close();
                                                closeActiveWindow() ;
                                                mainTabPanel.remove(activeTab);
                                                
                                            } Ext.getBody().unmask();
                                    },
                                    failure: function (response) {
                                                
                                                var resp = Ext.JSON.decode(response.responseText),
                                                    message = resp.message;
                                                toastr.error(message, 'Failure Response');
                                                Ext.getBody().unmask();
                                    }
                                });
                            }
                        })
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                Ext.getBody().unmask();
            },
            failure: function (response) {
                
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
                Ext.getBody().unmask();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                
            }
        });
    },
     
    showApplicationApprovalApplicationSubmissionWin: function (btn) {

        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form').getForm(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            hasReviewRecommendation  = checkApprovalREcommendationDEtails(application_code),
            storeID = getApplicationStore(module_id, section_id);

        if(!hasReviewRecommendation){
            toastr.error('Response: Enter the Review recommendation to proceed', 'Error Response'); 
            Ext.getBody().unmask();
            return;
        }
        approval_recommendation_id = activeTab.down('combo[name=review_recommendation_id]').getValue(),
        storeID = getApplicationStore(module_id, section_id);
        if(!hasReviewRecommendation){
            toastr.error('Response: Enter the Review recommendation to proceed', 'Error Response'); 
            Ext.getBody().unmask();
            return;
        }
        if(approval_recommendation_id == 3){
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'workflowaction_type_id',
                value: 13
            }];
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,extraParams,'','',workflow_stage_id);
        }
        else{

            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,'','','',workflow_stage_id);
        
        }
        Ext.getBody().unmask();
    },
});
