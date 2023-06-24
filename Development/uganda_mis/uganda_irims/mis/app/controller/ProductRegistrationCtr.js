/**
 * Created by softclans
 * user robinson odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.controller.ProductRegistrationCtr', {
    extend: 'Ext.app.Controller',
    stores: [
        //application store
        'Admin.store.productRegistration.ProductRegGridAbstractStore',
        'Admin.store.productRegistration.ProductRegComboAbstractStore',
        'Admin.store.productRegistration.DrugProductRegistrationStr',

        'Admin.store.parameters.productregistration.AssessmentProcedureStr',
        //parameters
        'Admin.store.parameters.productregistration.ClassificationStr',
        'Admin.store.parameters.productregistration.DosageFormStr',
        'Admin.store.parameters.productregistration.StorageConditionStr',

        'Admin.store.parameters.SIUnitStr',

        'Admin.store.parameters.productregistration.RouteofAdministrationStr',
        'Admin.store.parameters.productregistration.StorageConditionStr',
        'Admin.store.parameters.productregistration.DistributionCategoryStr',
        'Admin.store.parameters.productregistration.ProductApprovalDecisionsStr',

        'Admin.store.productRegistration.CosmeticsProductRegistrationStr',
        'Admin.store.productRegistration.DrugProductRegistrationStr',
        'Admin.store.productRegistration.FoodProductRegistrationStr',
        'Admin.store.productRegistration.MedicalDevicesProductRegistrationStr'
    ],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }, {
            ref: 'productManuctureringFrm',
            selector: '#productManuctureringFrm'
        }, {
            ref: 'productApiManuctureringFrm',
            selector: '#productApiManuctureringFrm'
        }],
        control: {
            'drugproductregtb button[name=drugProductRegHomeBtn]': {
                click: 'productRegHome'
            },
            'foodProductRegTb button[name=FoodProductRegHomeBtn]': {
                click: 'productRegHome'
            }, 'authorisedprodnotificationctntb button[name=productNotificationRegHomeBtn]': {
                click: 'productRegHome'
            },
            'productapplicantselectiongrid': {
                itemdblclick: 'onApplicantSelectionListDblClick'
            },
            /* 'productscreeninggrid': {
                 refresh: 'refreshScreeningChecklistItemsGrid'
             },*/
            

            //preparing functions   
            'drugproductreceiving': {
                afterrender: 'prepareNewProductReceiving'
            }, 'newdrugproductreceiving': {
                afterrender: 'prepareNewProductReceiving'
            },
            'newfoodproductreceiving': {
                afterrender: 'prepareNewProductReceiving'
            },
            'newcosmeticsproductreceiving': {
                afterrender: 'prepareNewProductReceiving'
            },
            'newmedicaldevicesproductreceiving': {
                afterrender: 'prepareNewProductReceiving'
            },
            //renewal and alteration
            'alterationdrugsproductreceiving': {
                afterrender: 'prepareRenAltProductReceiving'
            },
            'renewaldrugsproductsreceiving': {
                afterrender: 'prepareRenAltProductReceiving'
            },'renewalmedicaldevicesreceiving': {
                afterrender: 'prepareRenAltProductReceiving'
            },
            'alterationmedicaldevicesreceiving': {
                afterrender: 'prepareRenAltProductReceiving'
            },

            
            'medicineproductdataammendrequestwizard': {
                afterrender: 'prepareAmmendementProductReceiving'
            }, 'meddevproductdataammendrequestwizard': {
                afterrender: 'prepareAmmendementProductReceiving'
            }, 
            'medicineproductdataammendwizard': {
                afterrender: 'prepareAmmendementProductReceiving'
            },
            

            'meddevproductdataammendwizard': {
                afterrender: 'prepareAmmendementProductReceiving'
            },'medicinesproductappealrequestwizard': {
                afterrender: 'prepareRenAltProductReceiving'
            },'meddeviceproductappealrequestwizard': {
                afterrender: 'prepareRenAltProductReceiving'
            },'withdrawaldrugsproductsreceivingwizard': {
              //  afterrender: 'prepareRenAltProductReceiving'
            },
            //withdrawal
            'withdrawaldrugsproductsreceivingwizard': {
                afterrender: 'prepareWithdrawalProductReceiving'
            },
            
            
            'productInvoicingPnl': {
                afterrender: 'prepareNewProductsInvoicing'
            },
            'productpaymentpnl': {
                afterrender: 'prepareNewProductPayments'
            },
            'drugproductsamplereceivingpnl': {
                afterrender: 'prepareNewProductSampleReceiving'
            },
            'foodproductsamplereceivingpnl': {
                afterrender: 'prepareNewProductSampleReceiving'
            },
            'cosmeticsproductsamplereceivingpnl': {
                afterrender: 'prepareNewProductSampleReceiving'
            },
            'medicaldevicesproductsamplereceivingpnl': {
                afterrender: 'prepareNewProductSampleReceiving'
            },
            'drugnewevaluationpnl': {
                afterrender: 'prepareProductsProcessUploadEvaluation'
            },
            'foodevaluationpnl': {
                afterrender: 'prepareProductsProcessUploadEvaluation'
            }, 'cosmeticsevaluationpnl': {
                afterrender: 'prepareProductsProcessUploadEvaluation'
            },
            'drugnewauditingpnl': {
                afterrender: 'prepareProductsProcessUploadAuditingProcess'
            },
            'cosmeticsproductauditingpnl': {
                afterrender: 'prepareProductsProcessUploadAuditingProcess'
            },
            'foodproductauditingpnl': {
                afterrender: 'prepareProductsProcessUploadAuditingProcess'
            },
            'medicaldevicenewevaluationpnl': {
                afterrender: 'prepareProductsProcessUploadEvaluation'
            },'medicaldevnewauditingpnl': {
                afterrender: 'prepareProductsProcessUploadAuditingProcess'
            },
            //
            //query processing  
            'drugsmanagerqueryprocesspnl': {
                afterrender: 'prepareDrugsProductsUploadQueryPanel'
            },

            //query processing 
            'drugproductdocuploadsgrid button[name=add_upload]': {
                click: 'showApplicationDocUploadWin'
            },
            'productImagesUploadsGrid button[name=add_upload]': {
                click: 'showProductsImagesDocUploadWin'
            },
            'productDocUploadsGrid button[name=upload_file_btn]': {
                click: 'showApplicationDocUploadWin'
            },

            'medicaldeviceproductregistrationgrid': {
                refresh: 'refreshProductRegistrationsMainGrids'
            },
            'drugsproductregistrationgrid': {
                refresh: 'refreshProductRegistrationsMainGrids'
            },
            'foodproductregistrationgrid': {
                refresh: 'refreshProductRegistrationsMainGrids'
            },
            'cosmeticsproductregistrationgrid': {
                refresh: 'refreshProductRegistrationsMainGrids'
            },

            'drugsIngredientsGrid': {
                refresh: 'refreshProductsOtherDetailsGrid'
            },
            'drugsProductPackagingGrid': {
                refresh: 'refreshProductsOtherDetailsGrid'
            },
            'drugsMaximumResidueLimitsGrid': {
                refresh: 'refreshProductsOtherDetailsGrid'
            },
            'productManuctureringGrid': {
                refresh: 'refreshProductsOtherDetailsGrid'
            },
            'productApiManuctureringGrid': {
                refresh: 'refreshProductsOtherDetailsGrid'
            },
            'productnotificationnanuctureringgrid': {
                refresh: 'refreshProductsOtherDetailsGrid'
            },
            'productGmpInspectionDetailsGrid': {
                refresh: 'refreshProductsOtherDetailsGrid'
            }, 'productsSampledetailsGrid': {
                refresh: 'refreshProductsOtherDetailsGrid'
            },
            'foodproductpackaginggrid': {
                refresh: 'refreshProductsOtherDetailsGrid'
            },
            'foodproductnutrientsgrid': {
                refresh: 'refreshProductsOtherDetailsGrid'
            },
            'foodingredientsgrid': {
                refresh: 'refreshProductsOtherDetailsGrid'
            },
            'cosmeticsingredientsgrid': {
                refresh: 'refreshProductsOtherDetailsGrid'
            },
            'productevaluationcommentsgrid': {
                refresh: 'refreshproductevaluationcommentsgrid'
            },

            'drugnewinvoicingpnl button[name=saveinvoice_btn]': {
                click: 'saveDrugProductInvoicingDetails'
            },
            'drugnewreceivingwizard button[name=process_submission_btn]': {
                click: 'showReceivingApplicationSubmissionWin'
            },
           
            'productinvoicingcostelementsgrid combo[name=fee_type_id]': {
                change: 'onInvoiceFeeTypeChange'
            },
            // submissions
            'drugnewinvoicingpnl button[name=process_submission_btn]': {
                click: 'showInvoicingApplicationSubmissionWin'
            },
            'newproductspaymentspanel button[name=process_submission_btn]': {
                click: 'showPaymentsApplicationSubmissionWin'
            },

            'drugnewevaluationpnl button[name=process_submission_btn]': {
                click: 'showEvaluationApplicationSubmissionWin'
            },
            'foodevaluationpnl button[name=process_submission_btn]': {
                click: 'showEvaluationApplicationSubmissionWin'
            },
            'cosmeticsevaluationpnl button[name=process_submission_btn]': {
                click: 'showEvaluationApplicationSubmissionWin'
            },
            
            'drugnewauditingpnl button[name=process_submission_btn]': {
                click: 'showAuditingApplicationSubmissionWin'
            }, 'cosmeticsproductauditingpnl button[name=process_submission_btn]': {
                click: 'showAuditingApplicationSubmissionWin'
            },
            
            
            
            'medicaldevicenewevaluationpnl button[name=process_submission_btn]': {
                click: 'showEvaluationApplicationSubmissionWin'
            },'medicaldevnewauditingpnl button[name=process_submission_btn]': {
                click: 'showAuditingApplicationSubmissionWin'
            },
            'foodproductauditingpnl button[name=process_submission_btn]': {
                click: 'showAuditingApplicationSubmissionWin'
            },
            'drugsmanagerqueryprocesspnl button[name=process_submission_btn]': {
                click: 'showEvaluationApplicationSubmissionWin'
            },
            // 'workflowsubmissionsfrm button[name=app_submission_btn]': {
            //     click: 'funcSubmitApplication'
            // },
            'drugworkflowsubmissionsmanevafrm button[name=app_submission_btn]': {
                click: 'funcSubmitApplicationManagerEvaluation'
            },
            'drugnewinvoicingpnl button[name=save_btn]': {
                click: 'saveNewProductsInvoicingDetails'
            },
            'manufacturingDetailsFrm button[action=btn_savedetails]': {
                click: 'onSaveManufacturerDetails'
            }, 'manufacturingSiteDetailsFrm button[action=btn_savedetails]': {
                click: 'onSaveManufacturerSiteDetails'
            },
            'manufacturingDetailsAPIFrm button[action=btn_savedetails]': {
                click: 'onSaveAPIManufacturerDetails'
            },
            'newproductspaymentspanel toolbar button[name=receive_payments]': {
                click: 'showPaymentReceptionForm'
            },
            '#manufacturingDetailsGrid': {
                itemdblclick: 'funcManufacturerSelection'
            },
            '#manufacturingSiteDetailsGrid': {
                itemdblclick: 'funcManufacturerSelection'
            },
            
            '#manufacturingDetailsAPIGrid': {
                itemdblclick: 'funcAPIManufacturerSelection'
            },
            'gmpInspectionDetailsGrid': {
                itemdblclick: 'funcSelectgmpInspectionDetailsGrid'
            },
            //product more details 
            'newproductinvoicingpanel form toolbar button[name=more_app_details]': {
                click: 'showApplicationMoreDetails'
            },
            'newproductinvoicingpanel toolbar button[name=variation_requests]': {
                click: 'showApplicationVariationRequests'
            },
            'medicaldevicenewevaluationpnl toolbar button[name=variation_requests]': {
                click: 'showApplicationVariationRequests'
            }, 'drugproductevaluation toolbar button[name=variation_requests]': {
                click: 'showApplicationVariationRequests'
            },


            
            
            'productManagerMeetingGrid button[name=save_btn]': {
                click: 'saveTCMeetingDetails'
            },
            'productManagerMeetingGrid': {
                refresh: 'managerMeetingRefreshGrid',
                beforedeselect: 'beforeManagerMeetingAppsGridDeselect'
            },
            'productReviewTCMeetingGrid': {
                refresh: 'managerMeetingRefreshGrid',
                beforedeselect: 'beforeManagerMeetingAppsGridDeselect'
            },
            'productApprovalTCMeetingGrid': {
                refresh: 'managerMeetingRefreshGrid',
                beforedeselect: 'beforeManagerMeetingAppsGridDeselect'
            },
            'productcertificatereleasegrid': {
                refresh: 'managerMeetingRefreshGrid',
                beforedeselect: 'beforeManagerMeetingAppsGridDeselect'
            },
            'renewalproductapprovalgrid': {
                refresh: 'managerMeetingRefreshGrid',
                beforedeselect: 'beforeManagerMeetingAppsGridDeselect'
            },
            'alterationproductapprovalgrid': {
                refresh: 'alterationproductapprovalRefreshgrid'
            },
            'alterationproductcertificatereleasegrid': {
                refresh: 'alterationproductapprovalRefreshgrid'
            },
            'productappealapprovalgrid': {
                refresh: 'alterationproductapprovalRefreshgrid'
            },
            
            //meeting panel 
            'newProductTcMeetingpnl': {
                afterrender: 'prepareProductManagerMeeting'
            },
            'newProductTcReviewMeetingpnl': {
                afterrender: 'prepareProductRecommReview'
            },
            'newProductApprovalPnl': {
                afterrender: 'prepareProductApprovals'
            },
            'renewalproductapprovalpnl': {
                afterrender: 'prepareRenProductApprovals'
            },
            'newProductApprovalspnl': {
                afterrender: 'prepareProductApprovals'
            },
            'productCertificateReleasePnl': {
                afterrender: 'prepareProductCertificateRelease'
            },

            'newProductCommunicationPnl': {
                afterrender: 'prepareNewProductCommunication'
            },
            'productParmeetingParticipantsGrid button[name=save_selected]': {
                click: 'addTcMeetingParticipants'
            },
            //view details 
            'productInvoicingPnl button[name=more_app_details]': {
                click: 'showProductApplicationMoreDetails'
            },
            'productpaymentpnl button[name=more_app_details]': {
                click: 'showProductApplicationMoreDetails'
            },
            'drugnewevaluationpnl toolbar button[name=more_app_details]': {
                click: 'showProductApplicationMoreDetails'
            },  'productevaluationcommentspnl form button[name=save_comment]': {
                click: 'saveApplicationComment'
            }, 'drugnewauditingpnl toolbar button[name=more_app_details]': {
                click: 'showProductApplicationMoreDetails'
            }, 'foodevaluationpnl toolbar button[name=more_app_details]': {
                click: 'showProductApplicationMoreDetails'
            },
            'cosmeticsevaluationpnl toolbar button[name=more_app_details]': {
                click: 'showProductApplicationMoreDetails'
            },
            
            //
            'drugsmanagerqueryprocesspnl  toolbar button[name=more_app_details]': {
                click: 'showProductApplicationMoreDetails'
            },
            'previewproductDocUploadsGrid': {
                refresh: 'refreshAllApplicationDocUploadsGrid'
            },  'registeredproductsgrid': {
                refresh: 'refreshRegisteredProductsgrid'
            }, 
               
            'onlineproductregistrationgrid': {
                refresh: 'refreshOnlineProductsRegsMainGrids',
                submitApplication: 'submitRejectedOnlineApplication'
            }, 'registeredproductsgrid': {
                itemdblclick: 'onRegisteredProductsgridDblClick'
            }, 'productImagesUploadsGrid': {
                refresh: 'refreshProductImagesUploadsGrid'
            }, 'button[name=uploadimage_btn]': {
                click: 'uploadImageApplicationFile'
            }, 
            //online products applicaitons 
            'onlineevaluationqueryresponsereceivingwizard': {
                afterrender: 'prepareEvalResponseOnlineProductReceiving'
            },
            'onlinedrugproductreceivingwizard': {
                afterrender: 'prepareOnlineProductReceiving'
            },'onlineantisepticproductreceivingwizard': {
                afterrender: 'prepareOnlineProductReceiving'
            },
            'onlinealtmedicalproductreceivingwizard': {
                afterrender: 'prepareOnlineProductReceiving'
            },
            'onlinealtdrugproductreceivingwizard': {
                afterrender: 'prepareOnlineProductReceiving'
            },

            'onlinealtcosmeticsproductreceivingwizard': {
                afterrender: 'prepareOnlineProductReceiving'
            },
            'onlinealtfoodproductreceivingwizard': {
                afterrender: 'prepareOnlineProductReceiving'
            },

            'onlinewithdrawaldrugproductreceivingwizard': {
                afterrender: 'prepareOnlineProductReceiving'
            },
            'onlinewithdrawalcosmeticsproductreceivingwizard': {
                afterrender: 'prepareOnlineProductReceiving'
            }, 'onlinewithdrawalfoodproductreceivingwizard': {
                afterrender: 'prepareOnlineProductReceiving'
            }, 'onlinewithdrawalmedicalproductreceivingwizard': {
                afterrender: 'prepareOnlineProductReceiving'
            },

            
            'onlinefoodproductreceivingwizard': {
                afterrender: 'prepareOnlineProductReceiving'
            }, 'onlinemedicaldevicesreceivingwizard': {
                afterrender: 'prepareOnlineProductReceiving'
            }, 'onlinecosmeticsreceivingwizard': {
                afterrender: 'prepareOnlineProductReceiving'
            },'drugsproductsqueriesgrid': {
                refresh: 'refreshdrugsproductsqueriesgrid'
            },'drugsmanagerproductsqueriesgrid': {
                refresh: 'refreshdrugsproductsqueriesgrid'
            } ,'managerprecheckingqueryprocessgrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },'eacmedicinesregistrationgrid': {
                refresh: 'refreshOEACnlineProductsRegsMainGrids',
            },'productnotprecheckingqueryprocessgrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },'onlineantisepticproductreceivingwizard button[name=save_productapplications]': {
                click: 'funcSaveOnlineProductApplications'
            },'onlinemedicaldevicesreceivingwizard button[name=save_productapplications]': {
                click: 'funcSaveOnlineProductApplications'
            },'onlinedrugproductreceivingwizard button[name=save_productapplications]': {
                click: 'funcSaveOnlineProductApplications'
            },'onlinecosmeticsreceivingwizard button[name=save_productapplications]': {
                click: 'funcSaveOnlineProductApplications'
            },
            'onlinefoodproductreceivingwizard button[name=save_productapplications]': {
                click: 'funcSaveOnlineProductApplications'
            },
            'productreginothercountriesfrm': {
                afterrender: 'addApplicationCodetoForm'
            },
            'conductedproductclinicaltrialfrm': {
                afterrender: 'addApplicationCodetoForm'
            },
            'inspectioninothercountriesfrm': {
                afterrender: 'addApplicationCodetoForm'
            },'drugsProductsDetailsFrm': {
                afterrender: 'drugsProductsDetailsFrmDefination'
            },'#productsDetailsFrm combo[name=prodclass_category_id]': {
                select: 'onSelectProdClassCategoryDetails',
                change: 'onChangeProdClassCategoryDetails'
            },'#productsDetailsFrm button[name=btn_addcommonnames]': {
                click: 'funcAddProductApplicationParamter'
            },'#productsDetailsFrm button[name=btn_addproducategoriess]': {
                click: 'funcAddProductApplicationParamter'
            },'#productsDetailsFrm button[name=btn_addmethodofuser]': {
                click: 'funcAddProductApplicationParamter'
            },'#productsDetailsFrm button[name=btn_addtobaccoflavous]': {
                click: 'funcAddProductApplicationParamter'
            }
            
        }

    },
    /**
     * Called when the view is created
     */
    init: function () {

    },

    listen: {
        controller: {
            '*': {
                setProductRegGridsStore: 'setProductRegGridsStore',
                setProductRegCombosStore: 'setProductRegCombosStore',
                showProductRegWorkflow: 'showProductRegWorkflow',
                onNewProductRegApplication: 'onNewProductRegApplication',
                onEditDrugProductRegApplication: 'onEditDrugProductRegApplication',
                showReceivingApplicationSubmissionWin: 'showReceivingApplicationSubmissionWin',
                showSamplerecApplicationSubmissionWin: 'showSamplerecApplicationSubmissionWin',
                applicationProductMoreDetails: 'applicationProductMoreDetailsGeneric',
                funcActiveProductsOtherInformationTab: 'funcActiveProductsOtherInformationTab',
                showAddProductOtherdetailsWinFrm: 'showAddProductOtherdetailsWinFrm',
                doSubmitData: 'doSubmitData',
                editpreviewProductInformation: 'editpreviewProductInformation',//editpreviewPermitnformation
                editpreviewGmpProductInformation:'editpreviewGmpProductInformation',
                previewproductApplicationQueries:'previewproductApplicationQueries',
                saveProductInformation: 'saveProductInformation',
                getApplicationApprovalDetails: 'getApplicationApprovalDetails',
                getBatchApplicationApprovalDetails:'getBatchApplicationApprovalDetails',
                showProductApplicationMoreDetails: 'showProductApplicationMoreDetails',
                funcPanelEvaluationReportUpload: 'funcPanelEvaluationReportUpload',
                
                refreshProductsOtherDetailsGrid: 'refreshProductsOtherDetailsGrid',
                funcPrevEvaluationReportUpload: 'funcPrevEvaluationReportUpload',
                funcPrevAuditReportUpload: 'funcPrevAuditReportUpload',
                onRenAltProductRegistration: 'onNewProductRegApplication',
                showPreviousUploadedDocs: 'showPreviousUploadedDocs',
                showPreviousNonGridPanelUploadedDocs:'showPreviousNonGridPanelUploadedDocs',
                showUploadEvaluationDocuments:'showUploadEvaluationDocuments',
                previewProductOnlineApplication:'previewProductOnlineApplication',
                previewQueryResponseOnlineApplication:'previewQueryResponseOnlineApplication'
                //  showProductPreviousComments:'showProductPreviousComments'
            }
        }
    },
    funcAddProductApplicationParamter:function(btn){
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
        var childXtype = btn.childXtype,
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            table_name = btn.table_name,
            childXtype = Ext.widget(childXtype);
            childXtype.down('hiddenfield[name=section_id]').setValue(section_id);

        funcShowCustomizableWindow('Parameter', '55%', childXtype, 'customizablewindow');
    },
    onChangeProdClassCategoryDetails:function(cbo, value){
        var record = cbo.store.findRecord('id', value);
             frm = cbo.up('form'),
             me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            category_id = record.get('id'),
            is_medical_devices = record.get('is_medical_devices');

        this.funchelperChangeOnProdCategory(category_id,is_medical_devices,section_id,frm);

    },
    
    onSelectProdClassCategoryDetails:function(cbo, record){
        var frm = cbo.up('form'),
             me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            category_id = record.get('id'),
            is_medical_devices = record.get('is_medical_devices');

        this.funchelperChangeOnProdCategory(category_id,is_medical_devices,section_id,frm);

    },
    funchelperChangeOnProdCategory:function(category_id,is_medical_devices,section_id,frm){
        
            
        classificationStr = frm.down('combo[name=classification_id]').getStore();


        filter = {
                prodclass_category_id: category_id
        };
        filter = JSON.stringify(filter);
        classificationStr.removeAll();
        classificationStr.load({params:{filters:filter}});
        
        if(section_id == 1 || section_id == 1){
            if(is_medical_devices == 1){
                frm.down('combo[name=device_type_id]').setVisible(true);
                frm.down('textfield[name=gmdn_code]').setVisible(true);
                frm.down('textfield[name=gmdn_term]').setVisible(true);
                frm.down('combo[name=gmdn_category]').setVisible(true);
                
            }else{
                frm.down('combo[name=device_type_id]').setVisible(false);
                frm.down('textfield[name=gmdn_code]').setVisible(false);
                frm.down('textfield[name=gmdn_term]').setVisible(false);
                frm.down('combo[name=gmdn_category]').setVisible(false);
                
            }
        
                
        }else if(section_id ==3 || section_id ==15 || section_id ==17 || section_id ==20 || section_id ==21){

            if(category_id == 2 ){
                frm.down('textarea[name=contraindication]').setVisible(true);
                frm.down('textarea[name=indication]').setVisible(false);
                frm.down('textfield[name=specific_gravity]').setVisible(false);
                frm.down('textfield[name=specific_density]').setVisible(false);
                
               
                frm.down('textfield[name=product_strength]').setVisible(false);
                frm.down('combo[name=distribution_category_id]').setVisible(false);
                frm.down('combo[name=product_form_id]').setVisible(true);

                frm.down('combo[name=method_ofuse_id]').setVisible(true);

                frm.down('textfield[name=shelf_lifeafter_opening]').setVisible(false);
                frm.down('textfield[name=shelf_lifeafter_reconstitution]').setVisible(false);
                frm.down('textfield[name=shelf_life]').setVisible(true);

                frm.down('textfield[name=intended_use]').setVisible(true);
                
                frm.down('textarea[name=application_method]').setVisible(true);
                
                frm.down('textarea[name=descriptionofmethod_ofshelflife]').setVisible(true);
                frm.down('combo[name=intended_enduser_id]').setVisible(false);
                frm.down('textfield[name=storage_conditionafter_opening]').setVisible(false);
                
                
                frm.down('textfield[name=specific_gravity]').setVisible(false);
                frm.down('textfield[name=specific_density]').setVisible(false);
                frm.down('textfield[name=liquid_gravity]').setVisible(false);
                frm.down('textfield[name=solid_product_density]').setVisible(false);
               
                frm.down('combo[name=applied_product_id]').setVisible(false);
                frm.down('combo[name=formulation_id]').setVisible(false);
                frm.down('combo[name=label_signal_id]').setVisible(false);
                frm.down('textarea[name=flash_flame_form]').setVisible(false);
                frm.down('combo[name=require_child_resistant]').setVisible(false);
                
               // frm.down('textarea[name=flashpoint_flame_extension]').setVisible(false);
                //frm.down('combo[name=formulation_type_id]').setVisible(false);
               // frm.down('combo[name=who_class_id]').setVisible(false);
            }else if(category_id == 17 ){
                frm.down('textarea[name=contraindication]').setVisible(false);
                frm.down('textfield[name=product_strength]').setVisible(true);
                frm.down('combo[name=distribution_category_id]').setVisible(true);

                frm.down('textfield[name=shelf_lifeafter_opening]').setVisible(true);
                frm.down('textfield[name=shelf_lifeafter_reconstitution]').setVisible(true);
                frm.down('textfield[name=shelf_life]').setVisible(true);

                frm.down('combo[name=product_form_id]').setVisible(true);

                frm.down('textarea[name=indication]').setVisible(false);
               
                frm.down('textfield[name=specific_gravity]').setVisible(false);
                frm.down('textfield[name=specific_density]').setVisible(false);
                

                frm.down('combo[name=method_ofuse_id]').setVisible(false);

                frm.down('textfield[name=intended_use]').setVisible(true);
                frm.down('combo[name=intended_enduser_id]').setVisible(false);

                frm.down('textarea[name=application_method]').setVisible(true);
                frm.down('textarea[name=descriptionofmethod_ofshelflife]').setVisible(false);
                frm.down('textfield[name=storage_conditionafter_opening]').setVisible(true);
                
                frm.down('textfield[name=specific_gravity]').setVisible(false);
                frm.down('textfield[name=specific_density]').setVisible(false);
                frm.down('textfield[name=liquid_gravity]').setVisible(false);
                frm.down('textfield[name=solid_product_density]').setVisible(false);
              
                frm.down('combo[name=applied_product_id]').setVisible(false);
                frm.down('combo[name=formulation_id]').setVisible(false);
                frm.down('combo[name=label_signal_id]').setVisible(false);
                frm.down('textarea[name=flash_flame_form]').setVisible(false);
                frm.down('combo[name=require_child_resistant]').setVisible(false);

                
              //  frm.down('textarea[name=flashpoint_flame_extension]').setVisible(false);
              //  frm.down('combo[name=formulation_type_id]').setVisible(false);
               // frm.down('combo[name=who_class_id]').setVisible(false);
             //   frm.down('combo[name=pesticide_type_id]').setVisible(false);
            }else{
                if(category_id == 16 ){
                    frm.down('combo[name=pesticide_type_id]').setVisible(true);

                }else{
                    frm.down('combo[name=pesticide_type_id]').setVisible(false);

                }
                
                frm.down('textarea[name=contraindication]').setVisible(false);
                frm.down('textarea[name=indication]').setVisible(false);

                frm.down('combo[name=distribution_category_id]').setVisible(false);
                frm.down('textfield[name=shelf_lifeafter_opening]').setVisible(false);
                frm.down('textfield[name=shelf_lifeafter_reconstitution]').setVisible(false);
                frm.down('textfield[name=shelf_life]').setVisible(false);

                frm.down('combo[name=product_form_id]').setVisible(false);

                frm.down('textfield[name=product_strength]').setVisible(false);
                frm.down('textfield[name=specific_gravity]').setVisible(true);
                frm.down('textfield[name=specific_density]').setVisible(true);
               
                frm.down('combo[name=pesticide_type_id]').setVisible(false);

                frm.down('combo[name=method_ofuse_id]').setVisible(false);
                frm.down('textfield[name=intended_use]').setVisible(true);
                frm.down('textarea[name=descriptionofmethod_ofshelflife]').setVisible(false);
                
                frm.down('combo[name=intended_enduser_id]').setVisible(false);
                frm.down('textarea[name=application_method]').setVisible(true);
                
                frm.down('textfield[name=storage_conditionafter_opening]').setVisible(false);
                frm.down('textfield[name=specific_gravity]').setVisible(true);
                frm.down('textfield[name=specific_density]').setVisible(true);
                frm.down('textfield[name=liquid_gravity]').setVisible(true);
                frm.down('textfield[name=solid_product_density]').setVisible(true);
              
                frm.down('combo[name=applied_product_id]').setVisible(true);
                frm.down('combo[name=formulation_id]').setVisible(true);
                frm.down('combo[name=label_signal_id]').setVisible(true);
                frm.down('textarea[name=flash_flame_form]').setVisible(true);
                frm.down('combo[name=require_child_resistant]').setVisible(true);

                frm.down('textarea[name=flashpoint_flame_extension]').setVisible(true);
                frm.down('combo[name=formulation_type_id]').setVisible(true);
              //  frm.down('combo[name=who_class_id]').setVisible(true);
            }
        }
        

    },
    addApplicationCodetoForm: function(pnl){
        var me = this,
             mainTabPanel = me.getMainTabPanel(),
             activeTab = mainTabPanel.getActiveTab();
         if(activeTab){
             application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
         }else{
             console(grid.up('customizablewindow'));
         }
         if(application_code){
             pnl.down('hiddenfield[name=application_code]').setValue(application_code);
         }else{
             toastr.error('Failed to fetch application details', 'Error Response');
         }
     },
     addApplicationCodetoGridStore: function(grid){
        var me = this,
             mainTabPanel = me.getMainTabPanel(),
             activeTab = mainTabPanel.getActiveTab(),
             store = grid.getStore(),
             application_code;
         if(activeTab){
             application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
         }else{
             console(grid.up('customizablewindow'));
         }
         if(application_code){
             store.getProxy().extraParams = {application_code: application_code};
         }else{
             toastr.error('Failed to fetch application details', 'Error Response');
         }
     },
    previewQueryResponseOnlineApplication:function(view,record){
            
        var grid = view.grid,
        tracking_no = record.get('tracking_no'),
        application_id = record.get('active_application_id'),
        module_id = record.get('module_id'),
        sub_module_id = record.get('sub_module_id'),
        section_id = record.get('section_id'),
        is_manager_query  = record.get('is_manager_query'),
        last_query_ref_id =  record.get('last_query_ref_id'),
        status_type_id  = record.get('status_type_id'),
        application_status_id  = record.get('application_status_id'),
        prodclass_category_id  = record.get('prodclass_category_id'),
        isRejection = grid.isRejection,

        application_code = record.get('application_code');
        var wizard_pnl = 'onlineevaluationqueryresponsereceivingwizard';
        
        onlinePanel = Ext.widget(wizard_pnl);
        
        onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=last_query_ref_id]').setValue(last_query_ref_id);

        
        onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
      
        docsGrid = onlinePanel.down('onlineproductdocuploadsgrid');
        docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
        docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
        docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        docsGrid.down('hiddenfield[name=query_ref_id]').setValue(last_query_ref_id);
        docsGrid.down('hiddenfield[name=prodclass_category_id]').setValue(prodclass_category_id);

        onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
        funcShowCustomizableWindow(tracking_no, '90%', onlinePanel, 'customizablewindow');

    },
    previewProductOnlineApplication: function (view, record) {
        
        var grid = view.grid,
            tracking_no = record.get('tracking_no'),
            application_id = record.get('active_application_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            is_manager_query  = record.get('is_manager_query'),
            last_query_ref_id =  record.get('last_query_ref_id'),
            status_type_id  = record.get('status_type_id'),
            application_status_id  = record.get('application_status_id'),
            prodclass_category_id  = record.get('prodclass_category_id'),
            isRejection = grid.isRejection,

            application_code = record.get('application_code');
            
            if(section_id == 1 || section_id == 5){
               var wizard_pnl = 'onlinedrugproductreceivingwizard',
                    alterationwizard_pnl = 'onlinealtdrugproductreceivingwizard',
                    withdrawalwizard_pnl ='onlinewithdrawaldrugproductreceivingwizard';
            }
            else  if(section_id == 4 || section_id == 9 || section_id == 8){
                var wizard_pnl = 'onlinefoodproductreceivingwizard',
                    alterationwizard_pnl = 'onlinealtfoodproductreceivingwizard',
                    withdrawalwizard_pnl ='onlinewithdrawalfoodproductreceivingwizard';

            }
            else  if(section_id == 3){
                var wizard_pnl = 'onlinecosmeticsreceivingwizard',
                alterationwizard_pnl = 'onlinealtcosmeticsproductreceivingwizard',
                withdrawalwizard_pnl ='onlinewithdrawalcosmeticsproductreceivingwizard';


            }
            else{ 
                var wizard_pnl = 'onlinemedicaldevicesreceivingwizard',
                alterationwizard_pnl = 'onlinealtmedicalproductreceivingwizard',
                withdrawalwizard_pnl ='onlinewithdrawalmedicalproductreceivingwizard';
           
            }
           
                if(sub_module_id == 9 ){

                    wizard_pnl = alterationwizard_pnl;
    
                }
                else if(sub_module_id == 17){
    
                    wizard_pnl = withdrawalwizard_pnl;
    
                }
                else if(sub_module_id == 30){
    
                    wizard_pnl = 'onlinemedicaldevicesnotificationrecwizard';
    
                }
                else{
                    //then for the screening grid change to 
                    wizard_pnl = wizard_pnl;
                    
                }
            
            onlinePanel = Ext.widget(wizard_pnl);
            if(sub_module_id == 7 || sub_module_id == 8){
                querygrid = onlinePanel.down('productapplicationqueriesgrid');
                querygrid.down('hiddenfield[name=application_code]').setValue(application_code);
                querygrid.down('hiddenfield[name=section_id]').setValue(section_id);
                querygrid.down('hiddenfield[name=module_id]').setValue(module_id);
                querygrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
    
            }
            if (status_type_id == 3) {
              //  onlinePanel.down('button[name=preview_queries_btn]').setVisible(true);
               
            }
            if (status_type_id != 1) {
              //  onlinePanel.down('button[name=preview_queries_btn]').setVisible(true);
            }
            
            if (isRejection == 1) {
                onlinePanel.down('button[name=prev_rejections]').setVisible(false);
                onlinePanel.down('button[name=actions]').setVisible(true);
                onlinePanel.down('button[name=submit_btn]').setVisible(false);
                onlinePanel.down('button[name=query_btn]').setVisible(false);
                onlinePanel.down('button[name=reject_btn]').setVisible(false);
            }   
            
            onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
            onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
            onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
            onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            onlinePanel.down('hiddenfield[name=last_query_ref_id]').setValue(last_query_ref_id);

            
            onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
            onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
            onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
            onlinePanel.down('button[name=link_applicant]').setDisabled(true);
            onlinePanel.down('button[name=link_localagent]').setDisabled(true);
            
            docsGrid = onlinePanel.down('onlineproductdocuploadsgrid');
            docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
            docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
            docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
            docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            docsGrid.down('hiddenfield[name=query_ref_id]').setValue(last_query_ref_id);
            docsGrid.down('hiddenfield[name=prodclass_category_id]').setValue(prodclass_category_id);

            onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
            //docsGrid.store.load();
            funcShowCustomizableWindow(tracking_no, '90%', onlinePanel, 'customizablewindow');
            //alert(prodclass_category_id)
           // onlinePanel.getViewModel().set('isReadOnly', true);
                
    }, refreshOnlineProductsRegsMainGrids: function (me) {
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
            
    },refreshOEACnlineProductsRegsMainGrids:function(me){

        var store = me.store,
                grid = me.up('grid'),
                mainTabPanel = this.getMainTabPanel(),
                activeTab = mainTabPanel.getActiveTab(),
                module_id = (activeTab.down('hiddenfield[name=module_id]')) ? activeTab.down('hiddenfield[name=module_id]').getValue() : null,
                section_id = (activeTab.down('hiddenfield[name=section_id]')) ? activeTab.down('hiddenfield[name=section_id]').getValue() : null;
            store.getProxy().extraParams = {
                module_id: module_id,
                section_id: section_id
            };

    },funcSaveOnlineProductApplications:function(btn){
        var wizard_pnl = btn.wizard,
            wizardPnl = btn.up(wizard_pnl),
            zone_id = wizardPnl.down('combo[name=zone_id]').getValue(),
            application_code = wizardPnl.down('hiddenfield[name=active_application_code]').getValue(),
            section_id = wizardPnl.down('hiddenfield[name=section_id]').getValue(),
            form = wizardPnl.down('#productsDetailsFrm'),
            form = form.getForm();

        if(form.isValid()){
                form.submit({
                    params: {
                        zone_id: zone_id,
                        section_id:section_id,
                        application_code:application_code
                    },headers: {
                        'X-CSRF-Token': token
                    }, headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    waitMsg: 'Updating Product Registration Details',
                    url: 'productregistration/saveOnlineProductRegistrationReceiving',
                    success: function (fm, action) {
                        var response = Ext.decode(action.response.responseText),
                            message = response.message,
                            success = response.success;
                        if (success == true || success === true) {
                            toastr.success(message, 'Success Response');
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (fm, action) {
                        var response = Ext.decode(action.response.responseText),
                            message = response.message;
                            toastr.error(message, 'Failure Response');
                    },error: function (jqXHR, textStatus, errorThrown) {
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });


        }
        else{

            toastr.error('Fill in all the Products Details', 'Error Response');
        }
        


    }, refreshdrugsproductsqueriesgrid: function (me) {

        var store = me.store,
            grid = me.up('grid'),
            status_id = grid.querystatus_id,
            application_code = grid.down('hiddenfield[name=application_code]').getValue();

            store.getProxy().extraParams = {
                application_code: application_code,
                status: status_id
            };
    },
    uploadImageApplicationFile: function (btn) {
        var me = this,
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm(),
            storeID = btn.storeID,
            uploads_store = Ext.getStore(storeID);

        frm.submit({
            //clientValidation: false,
            url: 'documentmanagement/uploadProductImages',
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
    
    submitRejectedOnlineApplication: function (application_id, application_code, action_url, table_name) {
        Ext.MessageBox.confirm('Confirm', 'Are you sure to reject this application?', function (button) {
            if (button === 'yes') {
                Ext.MessageBox.show({
                    title: 'Remarks',
                    msg: 'Remarks/Comments:',
                    width: 320,
                    buttons: Ext.MessageBox.OKCANCEL,
                    multiline: true,
                    scope: this,
                    //animateTarget: bttn,
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
                                    application_code: application_code,
                                    comment: comment,
                                    table_name: table_name
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

    refreshAllApplicationDocUploadsGrid: function (me) {

        var store = me.store,
            grid = me.up('grid'),
            document_type_id = grid.down('combo[name=applicable_documents]').getValue(),
            table_name = grid.table_name,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

        store.getProxy().extraParams = {
            application_code: application_code,
            table_name: table_name
        };
    }, onRegisteredProductsgridDblClick: function (grid, record) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            win = grid.up('window'),
            activeTab = mainTabPanel.getActiveTab(),
            reg_product_id = record.get('reg_product_id'),
            tra_product_id = record.get('tra_product_id');
             app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            applicantFrm = activeTab.down('productapplicantdetailsfrm'),
            localagentFrm = activeTab.down('productlocalapplicantdetailsfrm'),
            products_detailsfrm = activeTab.down('#productsDetailsFrm'),
            is_populate_primaryappdata = false;
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
            if(activeTab.down('hiddenfield[name=is_populate_primaryappdata]')){

                is_populate_primaryappdata = activeTab.down('hiddenfield[name=is_populate_primaryappdata]').getValue();
            }
        filter = {section_id: section_id},
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        if(sub_module_id == 7 || sub_module_id == 8){
            app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore()
            app_check_types_store.removeAll();
            app_check_types_store.load({
                params: {
                    process_id: process_id,
                    workflow_stage: workflow_stage_id
                }
            });

        }
        
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (reg_product_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/onRegisteredProductsSearchdetails',
                params: {
                    reg_product_id: reg_product_id,
                    tra_product_id: tra_product_id
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
                        ltrResults = resp.ltrDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                    ltr_model = Ext.create('Ext.data.Model', ltrResults);

                    if (success == true || success === true) {

                        applicantFrm.loadRecord(model);
                        localagentFrm.loadRecord(ltr_model);
                        products_detailsfrm.loadRecord(model);
                        // zone_cbo.setReadOnly(true);
                        zone_cbo.setValue(zone_id);
                        if(is_populate_primaryappdata == 1){
                            
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(results.active_application_code);
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(results.active_application_id);
                            activeTab.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                            activeTab.down('displayfield[name=reference_no]').setValue(results.reference_no);
                            
                            activeTab.down('hiddenfield[name=product_id]').setValue(results.tra_product_id);
                            
                            activeTab.down('#product_panel').getViewModel().set('isReadOnly', false);
                           
                        }
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
        }

    }, getApplicationApprovalDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            is_update = item.is_update,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id'),
            reg_product_id = record.get('reg_product_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            table_name = item.table_name,
            approval_frm = item.approval_frm,
            form = Ext.widget(approval_frm),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        form.setController('productregistrationvctr');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
       
        if( form.down('datefield[name=expiry_date]')){

            form.down('datefield[name=expiry_date]').setReadOnly(true);
            
        }
        if (is_update > 0) {
            form.down('combo[name=decision_id]').setReadOnly(true);
            form.down('datefield[name=approval_date]').setReadOnly(true);
           
            form.down('textarea[name=comment]').setReadOnly(true);
            form.down('button[name=save_recommendation]').setText('Update Recommendation');
        }
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        form.down('hiddenfield[name=reg_product_id]').setValue(reg_product_id);
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
                    funcShowCustomizableWindow('Recommendation', '60%', form, 'customizablewindow');
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
    getBatchApplicationApprovalDetails:function(btn){
        //Ext.getBody().mask('Please wait...');
        var me = this,
            grid = btn.up('grid'),
            table_name = btn.table_name,
            approval_frm = btn.approval_frm,
            form = Ext.widget(approval_frm),
            storeArray = eval(btn.stores),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(), 
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(), 
            arrayLength = storeArray.length;
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected= [];

             Ext.each(selected_records, function (item) {
                selected.push(item.data.application_code);
            });

        form.setController('productregistrationvctr');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        selected = JSON.stringify(selected),
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        form.down('hiddenfield[name=process_id]').setValue(process_id);
        form.down('hiddenfield[name=selected_appcodes]').setValue(selected);
        form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        funcShowCustomizableWindow('Recommendation', '40%', form, 'customizablewindow');
    },
    saveApplicationComment: function (btn) {
        var  mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(), 
            formPnl = btn.up('form'),
            table_name = btn.table_name,
            frm = formPnl.getForm(),
            panel = formPnl.up('panel'),
            grid = panel.down('grid'),
            store = grid.getStore(),
            add_btn = grid.down('button[name=add_btn]');
        if (frm.isValid()) {
            frm.submit({
                url: 'productregistration/saveProductRegistrationComments',
                params: {
                    application_code: 345,//application_code,
                    table_name:'tra_auditing_overralcomments' //table_name
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
    showPreviousComments: function (btn) {

       
    },
    drugsProductsDetailsFrmDefination:function(frm){
        var me = this,
            mainTabPnl = this.getMainTabPanel(),
            activeTab = mainTabPnl.getActiveTab();
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
              
            if(section_id ==2){
                frm.down('combo[name=target_species_id]').setVisible(false);
                frm.down('textarea[name=obtaining_appropriate_mrls]').setVisible(false);
                frm.down('combo[name=has_maximum_residue_limits]').setVisible(false);
            }
            else{
                // frm.down('combo[name=target_species_id]').setVisible(true);
                // frm.down('textarea[name=obtaining_appropriate_mrls]').setVisible(true);
                // frm.down('combo[name=has_maximum_residue_limits]').setVisible(true);
            }

    },
    saveProductInformation: function (btn) {
        var me = this,
            mainTabPnl = this.getMainTabPanel(),
            url = btn.action_url,
            table = btn.table_name,
            activeTab = mainTabPnl.getActiveTab();
        if (activeTab.down('#productsDetailsFrm')) {
            form = activeTab.down('#productsDetailsFrm'),
                product_id = activeTab.down('hiddenfield[name=product_id]').getValue(),
                application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        } else {
            var win = btn.up('window'),

                form = win.down('form'),
                product_id = form.down('hiddenfield[name=product_id]').getValue(),
                application_id = '';
        }

        frm = form.getForm();
        if (frm.isValid()) {
            if (frm.isValid()) {
                frm.submit({
                    url: url,
                    waitMsg: 'Please wait...',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    params: {
                        application_id: application_id,
                        product_id: product_id
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
    showAddProductOtherdetailsWinFrm: function (btn) {

        var me = this,
            mainTabPnl = this.getMainTabPanel(),
            activeTab = mainTabPnl.getActiveTab();

        if (activeTab.down('hiddenfield[name=product_id]')) {
            product_id = activeTab.down('hiddenfield[name=product_id]').getValue();
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        } else {
            var win = btn.up('window'),
                product_id = win.down('hiddenfield[name=product_id]').getValue();
                section_id = win.down('hiddenfield[name=section_id]').getValue();
        }

        childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;

            if (child.down('hiddenfield[name=section_id]')){

                child.down('hiddenfield[name=section_id]').setValue(section_id);
                
            }


        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        child.down('hiddenfield[name=product_id]').setValue(product_id);
       
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
    },
    showSamplerecApplicationSubmissionWinInvalidated: function (btn) {
        
        var me = this,
            mainTabPnl = this.getMainTabPanel(),
            activeTab = mainTabPnl.getActiveTab();

        if (activeTab.down('hiddenfield[name=product_id]')) {
            product_id = activeTab.down('hiddenfield[name=product_id]').getValue();
        } else {
            var win = btn.up('window'),
                product_id = win.down('hiddenfield[name=product_id]').getValue();
        }
        childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;

        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        child.down('hiddenfield[name=product_id]').setValue(product_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        
    },
    editpreviewGmpProductInformation: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord();
            isReadOnly = item.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            product_id = record.get('product_id'),
            section_id = record.get('section_id'),
            applicant_id = record.get('applicant_id'),
            sub_module_id = record.get('sub_module_id'),
            module_id = record.get('module_id'),
            ref_no = record.get('reference_no'),
            process_id = record.get('process_id'),
            appdata_ammendementrequest_id = record.get('appdata_ammendementrequest_id'),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        //if for the products forms 
        
        if(section_id == 1){

            productdetails_panel = 'drugsProductsDetailsPanel';

        }
        else if(section_id == 4){
            productdetails_panel = 'medicaldevicesproductsdetailspanel';

        }
        this.showProductApplicationMoreDetailsGeneric(application_code,productdetails_panel, application_id, product_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal,appdata_ammendementrequest_id);

    },
    //preview product information 
    editpreviewProductInformation: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord();
        isReadOnly = item.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            product_id = record.get('product_id'),
            section_id = record.get('section_id'),
            applicant_id = record.get('applicant_id'),
            ref_no = record.get('reference_no'),
            process_id = record.get('process_id'),
            appdata_ammendementrequest_id = record.get('appdata_ammendementrequest_id'),
            
            module_id = record.get('module_id'),
            
            sub_module_id = record.get('sub_module_id'),
            
            
            section_id = record.get('section_id');
        

            if(activeTab.down('#main_processpanel')){
                productdetails_panel = activeTab.down('#main_processpanel').productdetails_panel;
            }
            else{
                    if(section_id == 1){
                        productdetails_panel = 'drugsProductsDetailsPanel';
                    }   
                    else{
                        productdetails_panel = 'medicaldevicesproductsdetailspanel';
                    }
            }
           

        //if for the products forms 

        this.showProductApplicationMoreDetailsGeneric(application_code,productdetails_panel, application_id, product_id, applicant_id, ref_no, process_id, '', module_id, sub_module_id, section_id, isReadOnly, is_temporal,appdata_ammendementrequest_id);

    },
    previewproductApplicationQueries: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord();
            isReadOnly = item.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            productqueriespanel = activeTab.down('#main_processpanel').productqueriespanel,
            application_id = record.get('active_application_id'),
            product_id = record.get('product_id'),
            section_id = record.get('section_id'),
            applicant_id = record.get('applicant_id'),
            ref_no = record.get('reference_no'),
            process_id = record.get('process_id'),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            productqueriespanel = Ext.widget(productqueriespanel);

        productqueriespanel.height =550;
        productqueriespanel.querystatus_id= '1,3';
        productqueriespanel.isReadOnly=1;
        //if for the products forms 
        productqueriespanel.down('hiddenfield[name=application_code]').setValue(record.get('application_code'));

        funcShowCustomizableWindow(ref_no, '85%', productqueriespanel, 'customizablewindow');
      
    },
    showPreviousUploadedDocs: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),

            document_type_id = item.document_type_id,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();

        ref_no = record.get('reference_no');
        grid = Ext.widget('previewproductDocUploadsGrid');
        store = grid.store;
        grid.height = 450;
        grid.down('hiddenfield[name=process_id]').setValue(record.get('process_id'));
        grid.down('hiddenfield[name=section_id]').setValue(record.get('section_id'));
        grid.down('hiddenfield[name=module_id]').setValue(record.get('module_id'));
        grid.down('hiddenfield[name=sub_module_id]').setValue(record.get('sub_module_id'));
        grid.down('hiddenfield[name=application_code]').setValue(record.get('application_code'));
        grid.down('combo[name=applicable_documents]').setValue(document_type_id);

        funcShowCustomizableWindow(winTitle + ' :' + ref_no, winWidth, grid, 'customizablewindow');
        

    },showPreviousNonGridPanelUploadedDocs: function (btn) {
        var document_type_id = btn.document_type_id,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        grid = Ext.widget('previewproductDocUploadsGrid');
        store = grid.store;
        grid.height = 450;
       // grid.setController('productregistrationvctr');
       grid.down('hiddenfield[name=process_id]').setValue(process_id);
       grid.down('hiddenfield[name=section_id]').setValue(section_id);
       grid.down('hiddenfield[name=module_id]').setValue(module_id);
       grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
       grid.down('hiddenfield[name=application_code]').setValue(application_code);

       grid.down('combo[name=applicable_documents]').setValue(document_type_id);
        funcShowCustomizableWindow(winTitle , winWidth, grid, 'customizablewindow');
       

    },
    showUploadEvaluationDocuments: function (btn) {
        var document_type_id = btn.document_type_id,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        grid = Ext.widget('productDocUploadsGrid');
        store = grid.store;
        grid.height = 450;
       // grid.setController('productregistrationvctr');
       grid.down('hiddenfield[name=process_id]').setValue(process_id);
       grid.down('hiddenfield[name=module_id]').setValue(module_id);
       grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
       grid.down('hiddenfield[name=application_code]').setValue(application_code);

       grid.down('hiddenfield[name=section_id]').setValue(section_id);
       grid.down('combo[name=applicable_documents]').setValue(document_type_id);
        funcShowCustomizableWindow(winTitle , winWidth, grid, 'customizablewindow');
       

    },
    
    funcPrevAuditReportUpload: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            isReadOnly = btn.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),

            application_code = record.get('application_code'),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue();
            section_id = record.get('section_id');

        ref_no = record.get('reference_no');
        prodclass_category_id = record.get('prodclass_category_id');
        section_id = record.get('section_id');
        classification_id = record.get('classification_id');
        checklist_category_id = '';//for chekclist based 
        //get the evaluation grids options checklist or upload 
        if (section_id == 4 || prodclass_category_id == 2) {
            grid = Ext.widget('productevaluationchecklistsGrid');
            checklist_category_id = 2;
            params = {application_code: application_code, checklist_category_id: checklist_category_id};
            
            var url = 'reports/generateProductAuditReport?application_code=' + application_code + '&sub_module_id=' + sub_module_id;
            print_report(url);
        }else {
            grid = Ext.widget('previewproductDocUploadsGrid');
            store = grid.store;
            grid.height = 450;
            //grid.setController('productregistrationvctr');
            funcShowCustomizableWindow(ref_no, '85%', grid, 'customizablewindow');
            grid.down('hiddenfield[name=process_id]').setValue(record.get('process_id'));
            grid.down('hiddenfield[name=section_id]').setValue(record.get('section_id'));
            grid.down('hiddenfield[name=module_id]').setValue(record.get('module_id'));
            grid.down('hiddenfield[name=sub_module_id]').setValue(record.get('sub_module_id'));
            grid.down('hiddenfield[name=application_code]').setValue(record.get('application_code'));
            grid.down('combo[name=applicable_documents]').setValue(9);

        }
    },//previewproductApplicationQueries
    funcPrevEvaluationReportUpload: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            isReadOnly = btn.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),

            application_code = record.get('application_code'),
            application_id = record.get('application_id'),
            sub_module_id = record.get('sub_module_id');

        ref_no = record.get('reference_no');
        prodclass_category_id = record.get('prodclass_category_id');
        
        section_id = record.get('section_id');
        classification_id = record.get('classification_id');
        checklist_category_id = '';//for chekclist based 
        //get the evaluation grids options checklist or upload 
        if (section_id == 4 || prodclass_category_id == 2) {
            grid = Ext.widget('productevaluationchecklistsGrid');
            checklist_category_id = 2;
            params = {application_code: application_code, checklist_category_id: checklist_category_id};//generateProductAuditReport
            var url = 'reports/generateProductEvaluationReport?application_code=' + application_code + '&sub_module_id=' + sub_module_id;
            print_report(url);

        } else {
            grid = Ext.widget('previewproductDocUploadsGrid');
            store = grid.store;
            grid.height = 450;
           // grid.setController('productregistrationvctr');
            funcShowCustomizableWindow(ref_no, '85%', grid, 'customizablewindow');
            grid.down('hiddenfield[name=process_id]').setValue(record.get('process_id'));
            grid.down('hiddenfield[name=section_id]').setValue(record.get('section_id'));
            grid.down('hiddenfield[name=module_id]').setValue(record.get('module_id'));
            grid.down('hiddenfield[name=sub_module_id]').setValue(record.get('sub_module_id'));
            grid.down('hiddenfield[name=application_code]').setValue(record.get('application_code'));
            grid.down('combo[name=applicable_documents]').setValue(8);

        }

    },funcPanelEvaluationReportUpload: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            isReadOnly = btn.isReadOnly,
            is_temporal = btn.is_temporal;

        checklist_category_id = '';//for chekclist based 
        //get the evaluation grids options checklist or upload 
        if (section_id == 1 || section_id == 3) {
            grid = Ext.widget('productevaluationchecklistsGrid');
            checklist_category_id = 2;
            params = {application_code: application_code, checklist_category_id: checklist_category_id};
            //print reports 
            //genertae evaluation reports
            var url = "evaluationreport";
            print_report(url)
        } else {
            grid = Ext.widget('previewproductDocUploadsGrid');
            store = grid.store;
            grid.height = 450;
          //  grid.setController('productregistrationvctr');
          grid.down('hiddenfield[name=process_id]').setValue(process_id);
          grid.down('hiddenfield[name=section_id]').setValue(section_id);
          grid.down('hiddenfield[name=module_id]').setValue(module_id);
          grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
          grid.down('hiddenfield[name=application_code]').setValue(application_code);
          grid.down('combo[name=applicable_documents]').setValue(8);
            funcShowCustomizableWindow(ref_no, '85%', grid, 'customizablewindow');
           

        }

    },
    showProductApplicationMoreDetails: function (btn) {
       
        var isReadOnly = btn.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            productdetails_panel = activeTab.down('#main_processpanel').productdetails_panel,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            product_id = activeTab.down('hiddenfield[name=product_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

        this.showProductApplicationMoreDetailsGeneric(application_code,productdetails_panel, application_id, product_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal);
    },
    
    funcActiveProductsOtherInformationTab: function (tab) {

        var mainTabPnl = this.getMainTabPanel(),
            activeTab = mainTabPnl.getActiveTab();

        if (activeTab.down('hiddenfield[name=product_id]')) {
            product_id = activeTab.down('hiddenfield[name=product_id]').getValue();
        } else {
            var panel = tab.up('window'),
                product_id = panel.down('hiddenfield[name=product_id]').getValue();

        }
        if (product_id == '') {

            tab.setActiveTab(0);
            toastr.error('Save Product details to proceed', 'Failure Response');
            return;
        }
    },
    showProductApplicationMoreDetailsGeneric: function (application_code,productdetails_panel, application_id, product_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal,appdata_ammendementrequest_id=null) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab()
            is_dataammendment_request =0;

            if(activeTab.down('hiddenfield[name=is_dataammendment_request]')){
                is_dataammendment_request = activeTab.down('hiddenfield[name=is_dataammendment_request]').getValue();

            }
            
        var me = this,
            productdetails_panel = Ext.widget(productdetails_panel);

        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            productdetails_panel.down('button[name=save_btn]').setVisible(false);
            //   prepareNewProductReceivingStage
        }
        if(productdetails_panel.down('hiddenfield[name=section_id]')){

            productdetails_panel.down('hiddenfield[name=section_id]').setValue(section_id);

        }
      
        Ext.Ajax.request({
            method: 'GET',
            url: 'productregistration/getProductApplicationMoreDetails',
            params: {
                application_id: application_id,
                product_id: product_id,
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
                    applicantDetails = resp.applicant_details,
                    product_details = resp.product_details,
                    prodclass_category_id = product_details.prodclass_category_id,
                    zone_id = resp.zone_id;
                if (success == true || success === true) {

                    
                    
                    // if(prodclass_category_id == 2){

                    //     //console.log(productdetails_panel);
                        
                    //     // product_panel = productdetails_panel.down('#product_panel');
                    //     // product_panel.removeAll();
                    //     productdetails_panel.add({xtype: 'antisepticproductsdetailsfrm'});
                        
                    // }
                    
                    products_form = productdetails_panel.down('form');
                    if (product_details) {
                        var model2 = Ext.create('Ext.data.Model', product_details);
                        products_form.loadRecord(model2);
                    }
                    funcShowCustomizableWindow(ref_no, '85%', productdetails_panel, 'customizablewindow');

                    if(sub_module_id == 9){
                            
                        productdetails_panel.add({xtype:'productsvariationrequestsgrid',title: 'Product Variation Requests'});

                        productdetails_panel.down('productsvariationrequestsgrid').down('hiddenfield[name=application_code]').setValue(application_code);
                        productdetails_panel.down('productsvariationrequestsgrid').down('hiddenfield[name=application_id]').setValue(application_id);
                    }
                    if(sub_module_id == 17){
                        productdetails_panel.add({xtype:'productswithdrawalreasonsgrid',title: 'Reasons for Withdrawal'});
                        productdetails_panel.down('productswithdrawalreasonsgrid').down('hiddenfield[name=application_code]').setValue(application_code);
                        productdetails_panel.down('productswithdrawalreasonsgrid').down('hiddenfield[name=application_id]').setValue(application_id);
                    }
                    if(sub_module_id == 20){
                        productdetails_panel.add({xtype:'productdataappealrequestsgrid',title: 'Appeal Reasons'});
                        productdetails_panel.down('productdataappealrequestsgrid').down('hiddenfield[name=application_code]').setValue(application_code);
                        productdetails_panel.down('productdataappealrequestsgrid').down('hiddenfield[name=application_id]').setValue(application_id);
                    }
                    if(is_dataammendment_request == 1){
                        productdetails_panel.add({xtype:'productdataammendmentrequestsgrid',title: 'DATA AMMENDMENT REQUESTS'});
                        productdetails_panel.down('productdataammendmentrequestsgrid').down('hiddenfield[name=application_code]').setValue(application_code);
                        productdetails_panel.down('productdataammendmentrequestsgrid').down('hiddenfield[name=application_id]').setValue(application_id);
                        productdetails_panel.down('productdataammendmentrequestsgrid').down('hiddenfield[name=appdata_ammendementrequest_id]').setValue(appdata_ammendementrequest_id);
                        
                    }
                    queries_panel = 'applicationqueriesgrid';
                    //queries_panel = Ext.widget(queries_panel);
        
                    //add the queries and documents and then set the details 
                    productdetails_panel.add({xtype:'applicationqueriesgrid',title: 'Request for Additional Information(Queries)'});
                    queries_panel = productdetails_panel.down('applicationqueriesgrid');
                    queries_panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    queries_panel.down('hiddenfield[name=application_code]').setValue(application_code);
                    queries_panel.down('hiddenfield[name=module_id]').setValue(module_id);
                    queries_panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    queries_panel.down('hiddenfield[name=section_id]').setValue(section_id);
                    
                   // documents_grid = Ext.widget('previewproductDocUploadsGrid');
                    productdetails_panel.add({xtype:'previewproductDocUploadsGrid',title: 'Application Uploaded Documents (All)'});


                    documents_grid = productdetails_panel.down('previewproductDocUploadsGrid');
                    documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
                    documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
                    documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
                    documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
                    //documents_grid.down('combo[name=applicable_documents]').setValue(document_type_id);
                    
                    if (isReadOnly == 1) {

                        productdetails_panel.getViewModel().set('isReadOnly', true);
                       

                        me.fireEvent('formAuth', process_id, 1, products_form);
                        // me.fireEvent('otherPartsAuth', process_id, wizardPnl);

                    } else {
                        productdetails_panel.getViewModel().set('isReadOnly', false);

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
    prepareProductManagerMeeting: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('productManagerMeetingGrid');
        this.prepareProductMeetingDetailsGeneric(activeTab, applicationsGrid, 0);
    },

    prepareProductRecommReview: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('productReviewTCMeetingGrid');
        this.prepareProductMeetingDetailsGeneric(activeTab, applicationsGrid, 1);
    },

    prepareProductApprovals: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('productApprovalTCMeetingGrid');
        this.prepareProductMeetingDetailsGeneric(activeTab, applicationsGrid, 1);

    },
    prepareProductCertificateRelease: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('productcertificatereleasegrid');
        this.prepareProductMeetingDetailsGeneric(activeTab, applicationsGrid, 1);

    },

    prepareRenProductApprovals: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('renewalproductapprovalgrid');
        this.prepareProductMeetingDetailsGeneric(activeTab, applicationsGrid, 1);

    },
    prepareNewProductCommunication: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('productcommunicationsgrid');
        this.prepareProductMeetingDetailsGeneric(activeTab, applicationsGrid, 1);
    },

    prepareProductMeetingDetailsGeneric: function (activeTab, applicationsGrid, isReadOnly) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            meetingDetailsFrm = activeTab.down('form'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            participantsGrid = activeTab.down('productTcMeetingParticipantsGrid'),
            participantsStore = participantsGrid.getStore(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
            participantsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
            meetingDetailsFrm.down('combo[name=meeting_type_id]').setHidden(true);
            meetingDetailsFrm.down('textfield[name=meeting_venue]').setHidden(true);
            meetingDetailsFrm.down('textfield[name=meeting_time]').setHidden(true);
            meetingDetailsFrm.down('textfield[name=meeting_name]').setFieldLabel('Description/Subject');
            meetingDetailsFrm.down('datefield[name=date_requested]').setFieldLabel('Date Requested');
            sm = applicationsGrid.getSelectionModel();
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            meetingDetailsFrm.getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
        }
        this.redoTcMeetingParticipantsGrid(participantsGrid);
        if (application_id) {
            applicationsStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareProductsRegMeetingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_product_applications'
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
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            meetingDetailsFrm.loadRecord(model);
                        }
                        applicationsStore.load();
                        participantsStore.load();
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
    //save meeting details 
    saveTCMeetingDetails: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form'),
            toaster = btn.toaster,
            frm = form.getForm(),
            applicationsGrid = activeTab.down('productManagerMeetingGrid'),
            sm = applicationsGrid.getSelectionModel(),
            selected_records = sm.getSelection(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            applicationsStore = activeTab.down('productManagerMeetingGrid').getStore(),
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
                url: 'productregistration/saveTCMeetingDetails',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                params: {
                    application_code: application_code,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
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
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        } else {
            toastr.warning('Fill all required fields!!', 'Warning Response');
            return false;
        }
    },
    redoTcMeetingParticipantsGrid: function (grid) {
        var isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
            add_btn = grid.down('button[name=add_participant]'),
            widgetCol = grid.columns[grid.columns.length - 1];
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            add_btn.setVisible(false);
            widgetCol.setHidden(true);
            widgetCol.widget.menu.items = [];
        } else {
            add_btn.setVisible(true);
            widgetCol.setHidden(false);
            widgetCol.widget.menu.items = [
                {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tc_meeting_participants',
                    storeID: 'productTcMeetingParticipantsStr',
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeleteProductRegWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
            ];
        }
    },
    managerMeetingRefreshGrid: function (me) {
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
    alterationproductapprovalRefreshgrid: function (me) {
        var store = me.store,
            table_name = me.table_name,
            strict_mode = me.strict_mode,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

        store.getProxy().extraParams = {
            table_name: table_name,
            workflow_stage_id: workflow_stage_id,
            strict_mode: strict_mode
        };
    },
    beforeManagerMeetingAppsGridDeselect: function (sel, record, index, eOpts) {
        var grid = sel.view.grid,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code1 = record.get('application_code'),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        if (application_code1 == application_code) {
            /* toastr.warning('Action not allowed on this application!!', 'Warning Response');
             return false;*/
        }
    },
    addTcMeetingParticipants: function (btn) {
        var grid = btn.up('grid'),
            win = grid.up('window'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form'),
            meeting_id = form.down('hiddenfield[name=id]').getValue(),
            store = Ext.getStore('productTcMeetingParticipantsStr'),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected = [],
            mask = new Ext.LoadMask(
                {
                    target: grid,
                    msg: 'Please wait...'
                }
            );
        if (!meeting_id) {
            toastr.warning('Please save meeting details first!!', 'Warning Response');
            return false;
        }
        Ext.each(selected_records, function (item) {
            var user_id = item.data.id,
                name = item.data.fullnames,
                phone = item.data.phone,
                email = item.data.email,
                obj = {
                    user_id: user_id,
                    participant_name: name,
                    phone: phone,
                    email: email
                };
            selected.push(obj);
            //selected.push(item.data.id);
        });
        mask.show();
        Ext.Ajax.request({
            url: 'productregistration/syncTcMeetingParticipants',
            params: {
                selected: JSON.stringify(selected),
                meeting_id: meeting_id
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
                if (success || success == true || success === true) {
                    toastr.success(message, 'Success Response!!');
                    store.load();
                    win.close();
                } else {
                    toastr.error(message, 'Failure Response!!');
                }
            },
            failure: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.warning(message, 'Failure Response!!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mask.hide();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },
    showApplicationVariationRequests: function (btn) {

       var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        var childObject = Ext.widget('productsvariationrequestsgrid');
            childObject.down('hiddenfield[name=application_id]').setValue(application_id);
            childObject.down('hiddenfield[name=application_code]').setValue(application_code);
            childObject.height =450;
            funcShowCustomizableWindow(' Variation Request', '70%', childObject, 'customizablewindow');


    },
    showApplicationMoreDetails: function (btn) {
      
        var isReadOnly = btn.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            product_id = activeTab.down('hiddenfield[name=product_id]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

        this.applicationProductMoreDetailsGeneric(application_id, product_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal);
    },
    applicationProductMoreDetailsGeneric: function (application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal) {
        /*
        Ext.getBody().mask('Please wait...');
        
        var me = this,
            wizardPnl = Ext.widget('premiseappmoredetailswizard'),
            applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            premiseFrm = wizardPnl.down('premisedetailsfrm'),
            premiseDetailsTabPnl = wizardPnl.down('premisedetailswintabpnl'), //premisedetailstabpnl
            personnelDetailsGrid = wizardPnl.down('premisepersonneldetailsgrid'),
            otherDetailsGrid = wizardPnl.down('premiseotherdetailsgrid');
        applicantFrm.setHeight(400);
        premiseDetailsTabPnl.setHeight(400);
        applicantFrm.down('button[action=link_applicant]').setDisabled(true);
        wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
        wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
        wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
        wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        }
        personnelDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        otherDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        //otherDetailsGrid.down('hiddenfield[name=is_temporal]').setValue(is_temporal);
        //personnelDetailsGrid.down('hiddenfield[name=is_temporal]').setValue(is_temporal);
        premiseFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        Ext.Ajax.request({
            method: 'GET',
            url: 'premiseregistration/getPremApplicationMoreDetails',
            params: {
                application_id: application_id,
                premise_id: premise_id,
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
                    applicantDetails = resp.applicant_details,
                    premiseDetails = resp.premise_details;
                if (success == true || success === true) {
                    var model1 = Ext.create('Ext.data.Model', applicantDetails),
                        model2 = Ext.create('Ext.data.Model', premiseDetails);
                    applicantFrm.loadRecord(model1);
                    premiseFrm.loadRecord(model2);
                    funcShowCustomizableWindow(ref_no, '85%', wizardPnl, 'customizablewindow');
                    if (sub_module_id == 2 || sub_module_id === 2) {
                        if (isReadOnly < 1) {
                            premiseFrm.getForm().getFields().each(function (field) {
                                field.setReadOnly(true);
                            });
                            personnelDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
                            otherDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
                            me.fireEvent('formAuth', process_id, 1, premiseFrm);
                            me.fireEvent('otherPartsAuth', process_id, wizardPnl);
                        }
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
        */
    },

    funcSelectgmpInspectionDetailsGrid: function (grid, record) {
        
        var me = this,
            win = grid.up('window'),
            manufacturing_site_id = record.get('manufacturing_site_id');
            producmanufacturer_form = me.getproductManuctureringFrm(),
            gmp_productlineStr = producmanufacturer_form.down('combo[name=gmp_productline_id]').getStore();

            gmp_productlineStr.removeAll()
            gmp_productlineStr.load({params:{manufacturing_site_id:manufacturing_site_id}});

            producmanufacturer_form.loadRecord(record);

            win.close();
    },
    funcManufacturerSelection: function (grid, record) {
        var me = this,
            is_apimanufacturer = grid.is_apimanufacturer,
            win = grid.up('window'),
            form = me.getProductManuctureringFrm();
                win.close();
                form.loadRecord(record);

    },

    funcAPIManufacturerSelection: function (grid, record) {
        var me = this,
            is_apimanufacturer = grid.is_apimanufacturer,
            form = me.getProductApiManuctureringFrm();

        win = grid.up('window');

        win.close();
        form.loadRecord(record);
    },
    onSaveManufacturerDetails: function (btn) {
        var me = this,
            producmanufacturer_form = me.getProductManuctureringFrm();
        this.funcSaveproductManufacturedetails(btn, producmanufacturer_form, me);
    },
    onSaveManufacturerSiteDetails: function (btn) {
        var me = this,
            producmanufacturer_form = me.getProductManuctureringFrm();
        this.funcSaveproductManufacturedetails(btn, producmanufacturer_form, me);
    },
    
    onSaveAPIManufacturerDetails: function (btn) {
        var me = this,
            producmanufacturer_form = me.getProductApiManuctureringFrm();
        this.funcSaveproductManufacturedetails(btn, producmanufacturer_form, me);
    },

    funcSaveproductManufacturedetails: function (btn, producmanufacturer_form, me) {
        var url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            storeID = btn.storeID,
            is_apimanufacturer = btn.is_apimanufacturer,
            is_manufacturingsite = btn.is_manufacturingsite,
            store = Ext.getStore(storeID),
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
                        store.removeAll();
                        store.load();
                        if (producmanufacturer_form) {
                            if(is_manufacturingsite == 1){
                                producmanufacturer_form.down('textfield[name=manufacturing_site]').setValue(response.manufacturer_name);
                                producmanufacturer_form.down('hiddenfield[name=man_site_id]').setValue(response.manufacturer_id);
                                producmanufacturer_form.down('textfield[name=physical_address]').setValue(response.physical_address);

                            }
                            else{
                                
                                producmanufacturer_form.down('textfield[name=manufacturer_name]').setValue(response.manufacturer_name);
                                producmanufacturer_form.down('hiddenfield[name=manufacturer_id]').setValue(response.manufacturer_id);
                                producmanufacturer_form.down('textfield[name=physical_address]').setValue(response.physical_address);
                            }
                        }
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
    showPaymentReceptionForm: function (btn) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            title = btn.winTitle,
            width = btn.winWidth,
            childXtype = btn.childXtype,
            table_name = btn.table_name,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        Ext.Ajax.request({
            method: 'GET',
            url: 'premiseregistration/getApplicationApplicantDetails',
            params: {
                application_id: application_id,
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
    },
    prepareNewProductPayments: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
           
            running_balance = activeTab.down('displayfield[name=running_balance]'),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            product_details = otherDetailsFrm.down('displayfield[name=product_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        
       
        activeTab.down('button[name=process_submission_btn]').setVisible(true);
        
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareNewProductPaymentStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_product_applications'
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
                        activeTab.down('hiddenfield[name=product_id]').setValue(results.product_id);
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

                        product_details.setValue(results.product_details);

                        running_balance.setValue(balance + txt);
                       
                        if (module_id == 1 || module_id === 1) {
                            product_details.setVisible(true);
                            product_details.setValue(results.product_details);
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
    saveNewProductsInvoicingDetails: function (btn) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoicingDetailsGrid = activeTab.down('invoicingcostdetailsgrid'),
            invoicingDetailsStore = invoicingDetailsGrid.getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            invoice_id_field = activeTab.down('hiddenfield[name=invoice_id]'),
            invoice_no_field = activeTab.down('displayfield[name=invoice_no]'),
            invoice_id = invoice_id_field.getValue(),
            storeData = invoicingDetailsStore.getData().items,
            details = [];
        if (!application_id) {
            toastr.warning('Problem encountered, application id not set!!', 'Warning Response');
            Ext.getBody().unmask();
            return false;
        }
        if (invoicingDetailsStore.data.length < 1) {
            toastr.warning('No Cost Elements Selected For Invoicing!!', 'Warning Response');
            Ext.getBody().unmask();
            return false;
        }
        Ext.each(storeData, function (item) {
            var element_costs_id = item.data.element_costs_id,
                cost = item.data.cost,
                currency_id = item.data.currency_id,
                exchange_rate = item.data.exchange_rate,
                obj = {
                    element_costs_id: element_costs_id,
                    cost: cost,
                    currency_id: currency_id,
                    exchange_rate: exchange_rate
                };
            details.push(obj);
        });
        Ext.Ajax.request({
            url: 'productregistration/saveApplicationInvoicingDetails',
            jsonData: details,
            params: {
                application_id: application_id,
                application_code: application_code,
                invoice_id: invoice_id
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
                    invoice_id_field.setValue(resp.invoice_id);
                    invoice_no_field.setValue(resp.invoice_no);
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
    
    refreshProductRegistrationsMainGrids: function (me) {

        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = 1;
            console.log('Hardcoded Module_id');
            //module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            var section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            sub_module_id = (grid.down('combo[name=sub_module_id]')) ? grid.down('combo[name=sub_module_id]').getValue() : null,
            workflow_stage_id = (grid.down('combo[name=workflow_stage_id]')) ? grid.down('combo[name=workflow_stage_id]').getValue() : null;

            store.getProxy().extraParams = {
                module_id: module_id,
                sub_module_id: sub_module_id,
                section_id: section_id,
                workflow_stage_id: workflow_stage_id
            };

    },
    //funcActiveProductsOtherInformationTab
    refreshProductsOtherDetailsGrid: function (me) {

        var grid = me.up('grid'),
            store = grid.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();

        //check if has been set or use window 
        if (activeTab.down('hiddenfield[name=product_id]')) {
            product_id = activeTab.down('hiddenfield[name=product_id]').getValue();

        } else {

            var panel = me.up('window'),
                product_id = panel.down('hiddenfield[name=product_id]').getValue();

        }

        store.getProxy().extraParams = {
            product_id: product_id
        };
    },

    refreshproductevaluationcommentsgrid: function (me) {

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
    onInvoiceFeeTypeChange: function (cmbo, newVal) {
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
    saveDrugProductInvoicingDetails: function (btn) {
        Ext.getBody().mask('Please wait...');
        var panel = btn.up('drugnewinvoicingpnl'),
            me = this,
            containerPnl = panel.up('newdrugproductinvoicing'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoicingDetailsGrid = activeTab.down('invoicingcostdetailsgrid'),
            invoicingDetailsStore = invoicingDetailsGrid.getStore(),
            application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
            invoice_id_field = containerPnl.down('hiddenfield[name=invoice_id]'),
            invoice_no_field = panel.down('displayfield[name=invoice_no]'),
            invoice_id = invoice_id_field.getValue(),
            storeData = invoicingDetailsStore.getData().items,
            details = [];
        if (!application_id) {
            toastr.warning('Problem encountered, application id not set!!', 'Warning Response');
            Ext.getBody().unmask();
            return false;
        }
        if (invoicingDetailsStore.data.length < 1) {
            toastr.warning('No Cost Elements Selected For Invoicing!!', 'Warning Response');
            Ext.getBody().unmask();
            return false;
        }
        Ext.each(storeData, function (item) {
            var element_costs_id = item.data.element_costs_id,
                cost = item.data.cost,
                currency_id = item.data.currency_id,
                exchange_rate = item.data.exchange_rate,
                obj = {
                    element_costs_id: element_costs_id,
                    cost: cost,
                    currency_id: currency_id,
                    exchange_rate: exchange_rate
                };
            details.push(obj);
        });
        Ext.Ajax.request({
            url: 'productregistration/saveApplicationInvoicingDetails',
            jsonData: details,
            params: {
                application_id: application_id,
                application_code: application_code,
                invoice_id: invoice_id
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
                    invoice_id_field.setValue(resp.invoice_id);
                    invoice_no_field.setValue(resp.invoice_no);
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

    setProductRegGridsStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.productRegistration.ProductRegGridAbstractStore', config);
        me.setStore(store);
        toolbar.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    setProductRegCombosStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.productRegistration.ProductRegComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    showProductRegWorkflow: function (sub_module_id) {
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

    getWorkflowDetails: function (module_id, section_id, application_type, is_initial) {
        var results = [];
        Ext.Ajax.request({
            method: 'GET',
            async: false,
            url: 'workflow/getWorkflowDetails',
            params: {
                module_id: module_id,
                section_id: section_id,
                sub_module_id: application_type,
                is_initial: is_initial
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success;
                if (success || success == true || success === true) {
                    results = resp.results;
                }
            }
        });
        return results;
    },

    onNewProductRegApplication: function (sub_module_id,btn) {
        Ext.getBody().mask('Please wait...');
        var me = this,
        is_dataammendment_request = btn.is_dataammendment_request,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#productRegDashWrapper'),
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
    onEditDrugProductRegApplication: function (record) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            workflow_stage = record.get('workflow_stage'),
            ref_no = record.get('reference_no'),
            workflow_details = getAllWorkflowDetails(process_id, workflow_stage_id);
        if (!workflow_details) {
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
            me.prepareApplicationBaseDetails(newTab, record);
            mainTabPanel.add(newTab);
            var lastTab = mainTabPanel.items.length - 1;
            mainTabPanel.setActiveTab(lastTab);
        } else {
            mainTabPanel.setActiveTab(tab);
        }
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);
    },

    prepareApplicationBaseDetails: function (tab, record) {
        var me = this,
            application_id = record.get('active_application_id'),
            application_code = recorde.get('active_application_code'),
            process_name = record.get('process_name'),
            workflow_stage = record.get('workflow_stage'),
            application_status = record.get('application_status'),
            reference_no = record.get('reference_no'),
            process_id = record.get('process_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            workflow_stage_id = record.get('workflow_stage_id');
        tab.down('hiddenfield[name=active_application_id]').setValue(application_id);
        var application_code_field = tab.down('hiddenfield[name=active_application_code]');
        if (application_code_field) {
            application_code_field.setValue(application_code);
        }
        tab.down('hiddenfield[name=process_id]').setValue(process_id);
        tab.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        tab.down('hiddenfield[name=module_id]').setValue(module_id);
        tab.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        tab.down('hiddenfield[name=section_id]').setValue(section_id);
        tab.down('displayfield[name=process_name]').setValue(process_name);
        tab.down('displayfield[name=workflow_stage]').setValue(workflow_stage);
        tab.down('displayfield[name=application_status]').setValue(application_status);
        tab.down('displayfield[name=reference_no]').setValue(reference_no);
    },

    prepareNewProductReceiving: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),

            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            applicantFrm = activeTab.down('productapplicantdetailsfrm'),
            localagentFrm = activeTab.down('productlocalapplicantdetailsfrm'),
            products_detailsfrm = activeTab.down('#productsDetailsFrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]'),
            assessment_procedure = activeTab.down('combo[name=assessment_procedure_id]'),
            filter = {section_id: section_id},
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

       
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });

        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }

        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareNewProductReceivingStage',
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
                        ltrResults = resp.ltrDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                    ltr_model = Ext.create('Ext.data.Model', ltrResults);

                    if (success == true || success === true) {

                        applicantFrm.loadRecord(model);
                        localagentFrm.loadRecord(ltr_model);
                        products_detailsfrm.loadRecord(model);
                        // zone_cbo.setReadOnly(true);
                        
                        zone_cbo.setValue(zone_id);
                        if(section_id ==2){

                            assessment_procedure.setValue(results.assessment_procedure_id);
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
    //withdrawal
    prepareWithdrawalProductReceiving: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),

            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            applicantFrm = activeTab.down('productapplicantdetailsfrm'),
            localagentFrm = activeTab.down('productlocalapplicantdetailsfrm'),
            products_detailsfrm = activeTab.down('searchdrugsProductsDetailsFrm'),
            //app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]'),
            assessment_procedure = activeTab.down('combo[name=assessment_procedure_id]'),
            filter = {section_id: section_id},
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
       
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        }); 
       
        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }

        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareNewProductReceivingStage',
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
                        ltrResults = resp.ltrDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                    ltr_model = Ext.create('Ext.data.Model', ltrResults);

                    if (success == true || success === true) {

                        applicantFrm.loadRecord(model);
                        localagentFrm.loadRecord(ltr_model);
                        products_detailsfrm.loadRecord(model);
                      
                        zone_cbo.setValue(zone_id);
                        if(section_id ==2){

                            assessment_procedure.setValue(results.assessment_procedure_id);
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
    //applications 
    prepareEvalResponseOnlineProductReceiving:function(pnl){
            
        Ext.getBody().mask('Please wait...');
        var me = this,
            activeTab = pnl;
        application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            applicantFrm = activeTab.down('productapplicantdetailsfrm'),
            localagentFrm = activeTab.down('productlocalapplicantdetailsfrm'),
            products_detailsfrm = activeTab.down('#productsDetailsFrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            status_type_id = activeTab.down('hiddenfield[name=status_type_id]').getValue(),
            application_code= activeTab.down('hiddenfield[name=application_code]').getValue(),
            
            last_query_ref_id= activeTab.down('hiddenfield[name=last_query_ref_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
        filter = {section_id: section_id},
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();


        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        
        if(sub_module_id == 7 && sub_module_id == 8){
           var checklistTypesGrid = pnl.down('combo[name=applicable_checklist]'),
            checklistTypesStr = checklistTypesGrid.getStore();
            checklistTypesStr.removeAll();
            checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
    
    
        }

            var checklist_gridpanel = activeTab.down('panel[name=checklist_gridpanel]'),

            querieschecklistgrid =  checklist_gridpanel.down('productapplicationqueriesgrid');

            querieschecklistgrid.show();
            querieschecklistgrid.down('hiddenfield[name=application_code]').setValue(application_code);
            querieschecklistgrid.down('hiddenfield[name=last_query_ref_id]').setValue(last_query_ref_id);
          
            //activeTab.down('button[name=save_screening_btn]').setDisabled(true);
            pnl.getViewModel().set('isReadOnly', true);

            pnl.getViewModel().set('prechecking_querytitle', 'EVALUATION QUERY RESPONSES');
        
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareOnlineProductReceivingStage',
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
                        ltrResults = resp.ltrDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                    ltr_model = Ext.create('Ext.data.Model', ltrResults);

                    if (success == true || success === true) {

                        applicantFrm.loadRecord(model);
                        localagentFrm.loadRecord(ltr_model);
                        products_detailsfrm.loadRecord(model);
                        zone_cbo.setReadOnly(true);
                        zone_cbo.setValue(zone_id);
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
    prepareOnlineProductReceiving: function (pnl) {

        Ext.getBody().mask('Please wait...');
        var me = this,
            activeTab = pnl;
        application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),

         //   app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            applicantFrm = activeTab.down('productapplicantdetailsfrm'),
            localagentFrm = activeTab.down('productlocalapplicantdetailsfrm'),
            products_detailsfrm = activeTab.down('#productsDetailsFrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            status_type_id = activeTab.down('hiddenfield[name=status_type_id]').getValue(),
            application_code= activeTab.down('hiddenfield[name=application_code]').getValue(),
            
            last_query_ref_id= activeTab.down('hiddenfield[name=last_query_ref_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
        filter = {section_id: section_id},
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();


        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        
        if(sub_module_id == 7 && sub_module_id == 8){
           var checklistTypesGrid = pnl.down('combo[name=applicable_checklist]'),
            checklistTypesStr = checklistTypesGrid.getStore();
            checklistTypesStr.removeAll();
            checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
    
    
        }

       
          if(status_type_id == 3){
            var checklist_gridpanel = activeTab.down('panel[name=checklist_gridpanel]'),
            productonlinescreeninggrid = checklist_gridpanel.down('productonlinescreeninggrid');

           
          //  checklist_gridpanel.remove(productonlinescreeninggrid, true);
          
           //activeTab.down('button[name=save_screening_btn]').setDisabled(true);
            pnl.getViewModel().set('isReadOnly', true);

            //pnl.getViewModel().set('prechecking_querytitle', 'QUERY RESPONSES');

        }
        else{
           // activeTab.down('button[name=save_screening_btn]').setDisabled(false);
          //  pnl.getViewModel().set('prechecking_querytitle', 'PRE-CHECKING');

        }
      
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareOnlineProductReceivingStage',
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
                        ltrResults = resp.ltrDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                    ltr_model = Ext.create('Ext.data.Model', ltrResults);

                    if (success == true || success === true) {

                        applicantFrm.loadRecord(model);
                        localagentFrm.loadRecord(ltr_model);
                        products_detailsfrm.loadRecord(model);
                        zone_cbo.setReadOnly(true);
                        zone_cbo.setValue(zone_id);
                        activeTab.down('displayfield[name=application_status]').setValue(results.application_status);
                        activeTab.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                        activeTab.down('displayfield[name=process_name]').setValue(results.process_name);
                        activeTab.down('hiddenfield[name=process_id]').setValue(results.process_id);
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
    prepareRenAltProductReceiving: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
        application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            stores = '["dosageformstr", "assessmentprocedurestr", "classificationstr","commonnamesstr","siunitstr","distributionCategoryStr","storageconditionstr","routeofAdministrationStr","routeofAdministrationStr"]',
            storeArray = eval(stores);
        app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            applicantFrm = activeTab.down('productapplicantdetailsfrm'),
            localagentFrm = activeTab.down('productlocalapplicantdetailsfrm'),
            products_detailsfrm = activeTab.down('#productsDetailsFrm'),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
        filter = {section_id: section_id},
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        is_populate_primaryappdata= 0;
        if(activeTab.down('hiddenfield[name=is_populate_primaryappdata]')){
            is_populate_primaryappdata= activeTab.down('hiddenfield[name=is_populate_primaryappdata]').getValue();
        }
        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareNewProductReceivingStage',
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
                        ltrResults = resp.ltrDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                    ltr_model = Ext.create('Ext.data.Model', ltrResults);

                    if (success == true || success === true) {

                        applicantFrm.loadRecord(model);
                        localagentFrm.loadRecord(ltr_model);
                        products_detailsfrm.loadRecord(model);
                        // zone_cbo.setReadOnly(true);
                        zone_cbo.setValue(zone_id);
                        if(is_populate_primaryappdata ==1){
                            activeTab.down('hiddenfield[name=sub_module_id]').setValue(results.sub_module_id);
                        }
                        if(sub_module_id == 9){
                            
                            activeTab.down('productsvariationrequestsgrid').down('hiddenfield[name=application_code]').setValue(application_code);
                            activeTab.down('productsvariationrequestsgrid').down('hiddenfield[name=application_id]').setValue(application_id);
                        }
                        else if(sub_module_id == 17){
                            activeTab.down('productswithdrawalreasonsgrid').down('hiddenfield[name=application_code]').setValue(application_code);
                            activeTab.down('productswithdrawalreasonsgrid').down('hiddenfield[name=application_id]').setValue(application_id);
                        }
                        else if(sub_module_id == 20){
                            activeTab.down('productdataappealrequestsgrid').down('hiddenfield[name=application_code]').setValue(application_code);
                            activeTab.down('productdataappealrequestsgrid').down('hiddenfield[name=application_id]').setValue(application_id);
                            activeTab.down('productdataappealrequestsgrid').store.load();
                        }
                        
                        if(sub_module_id == 17){
                            activeTab.down('combo[name=withdrawal_type_id]').setValue(results.withdrawal_type_id);
                            
                        }else if(sub_module_id == 20){
                            activeTab.down('combo[name=appeal_type_id]').setValue(results.appeal_type_id);
                             
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
    prepareAmmendementProductReceiving: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
        application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            stores = '["dosageformstr", "assessmentprocedurestr", "classificationstr","commonnamesstr","siunitstr","distributionCategoryStr","storageconditionstr","routeofAdministrationStr","routeofAdministrationStr"]',
            storeArray = eval(stores);
             app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            applicantFrm = activeTab.down('productapplicantdetailsfrm'),
            localagentFrm = activeTab.down('productlocalapplicantdetailsfrm'),
            products_detailsfrm = activeTab.down('#productsDetailsFrm'),
            product_panel= activeTab.down('#product_panel'),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            is_populate_primaryappdata= activeTab.down('hiddenfield[name=is_populate_primaryappdata]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            isReadOnly = activeTab.down('hiddenfield[name=isReadOnly]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
        filter = {section_id: section_id},
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareNewProductAmmendMentReceivingStage',
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
                        ltrResults = resp.ltrDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                    ltr_model = Ext.create('Ext.data.Model', ltrResults);

                    if (success == true || success === true) {

                        applicantFrm.loadRecord(model);
                        localagentFrm.loadRecord(ltr_model);
                        products_detailsfrm.loadRecord(model);
                        // zone_cbo.setReadOnly(true);
                        zone_cbo.setValue(zone_id);
                        if(is_populate_primaryappdata ==1){
                            activeTab.down('hiddenfield[name=sub_module_id]').setValue(results.sub_module_id);
                        }
                        if( activeTab.down('productdataammendmentrequestsgrid')){
                            activeTab.down('hiddenfield[name=appdata_ammendementrequest_id]').setValue(results.appdata_ammendementrequest_id);
                            activeTab.down('productdataammendmentrequestsgrid').down('hiddenfield[name=application_code]').setValue(application_code);
                            activeTab.down('productdataammendmentrequestsgrid').down('hiddenfield[name=application_id]').setValue(application_id);
                            activeTab.down('productdataammendmentrequestsgrid').down('hiddenfield[name=appdata_ammendementrequest_id]').setValue(results.appdata_ammendementrequest_id);
    
                            activeTab.down('productdataammendmentrequestsgrid').store.load();

                        }
                        //
                       // alert(isReadOnly)
                       if(isReadOnly == true){
                                 product_panel.getViewModel().set('isReadOnly', true);
                       }
                       else{
                        product_panel.getViewModel().set('isReadOnly', false);
                       }
                        
                        //set the readOnly to product details \
                        me.setApplicationDetailsAlterationSetup(application_code,results.appdata_ammendementrequest_id,product_panel);

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
    setApplicationDetailsAlterationSetup:function(application_code,appdata_ammendementrequest_id,productapp_panel){
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
            Ext.getBody().mask('Synchronising Data Ammendment Setup......');
        Ext.Ajax.request({
            method: 'GET',
            url: 'api/getApplicationDetailsAlterationSetup',
            params: {
                application_code: application_code,appdata_ammendementrequest_id:appdata_ammendementrequest_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success,
                    ammendementrequests = resp.ammendementrequests;

                if (success == true || success === true) {
                   
                    Ext.each(ammendementrequests, function (item) {
                        if(item.status_id == 3){
                                var panel_item_id = item.panel_item_id;
                                    product_panel = activeTab.down('#'+panel_item_id);
                                   // product_panel.setViewModel('productregistrationvm');

                                    product_panel.getViewModel().set('isReadOnly', false);
                              

                        }
                    });
                    
                } else {
                    toastr.error(message, 'Failure Response');
                }
               //productapp_panel.getViewModel().set('isReadOnly', true);
                Ext.getBody().unmask();
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
    prepareNewProductSampleReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            stores = '["dosageformstr", "assessmentprocedurestr", "classificationstr","commonnamesstr","siunitstr","distributionCategoryStr","storageconditionstr","routeofAdministrationStr","routeofAdministrationStr"]',
            storeArray = eval(stores);
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            product_panel = activeTab.down('#product_panel'),
            product_detailspanel = activeTab.down('#product_detailspanel'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),

            applicant_details = activeTab.down('displayfield[name=applicant_details]'),
            local_agentdetails = activeTab.down('displayfield[name=local_agentdetails]'),
            filter = {section_id: section_id},
            sampleStore = Ext.getStore('productsSampledetailsStr'),
            zone_cbo = activeTab.down('combo[name=zone_id]'),
                        assessment_procedure = activeTab.down('combo[name=assessment_procedure_id]'),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

        var app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore();
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        
            
        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        if (application_id) {
            me.fireEvent('refreshStoresWithFilters', storeArray, filter);
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareNewProductReceivingStage',
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
                        ltrResults = resp.ltrDetails,
                        ltrResults = resp.ltrDetails,
                        product_id = results.product_id;
                        prodclass_category_id = results.prodclass_category_id;
                        model = Ext.create('Ext.data.Model', results);

                    if (success == true || success === true) {
                        
                       
                        productsDetailsFrm = activeTab.down('#productsDetailsFrm'),
                        productsDetailsFrm.loadRecord(model);
                        applicant_details.setValue(results.applicant_name + ', ' + results.app_physical_address);
                        if (ltrResults) {
                            local_agentdetails.setValue(ltrResults.applicant_name + ', ' + ltrResults.app_physical_address);

                        }
                        
                       // zone_cbo.setValue(results.zone_id);
                        if(section_id == 1){
                            assessment_procedure.setValue(results.assessment_procedure_id);

                        }
                       
                        sampleStore.removeAll();
                        sampleStore.load({
                            params: {
                                product_id: product_id
                            }
                        });
                    
    //product_detailspanel.getViewModel().set('isReadOnly', true);
   
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
    productRegHome: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            sec_dashboard = btn.sec_dashboard,
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#productRegDashWrapper');
        if (!dashboardWrapper.down(sec_dashboard)) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: sec_dashboard});
        }
    },

    onApplicantSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        if (grid.applicantType === 'local') {
            applicantForm = activeTab.down('productlocalapplicantdetailsfrm');
            if (applicantForm != null) {
                applicantForm.loadRecord(record);
            }
           
        } else {
            var applicantForm = activeTab.down('productapplicantdetailsfrm');
            applicantForm.loadRecord(record);
        }

        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
        
    },

    refreshScreeningChecklistItemsGrid: function (me) {

        var store = me.getStore(),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            checklist_type = activeTab.down('combo[name=applicable_checklist]').getValue();
        store.getProxy().extraParams = {
            application_code: application_code,
            checklist_type: checklist_type
        };
    },
    refreshRegisteredProductsgrid: function (me) {

        var store = me.getStore(),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            status_id = activeTab.down('hiddenfield[name=status_id]').getValue();

                store.getProxy().extraParams = {
                    section_id: section_id,
                    status_id: status_id
                };

    },

    showReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            is_dataammendment_request =0,
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            storeID = getApplicationStore(module_id, section_id);
            if(activeTab.down('hiddenfield[name=is_dataammendment_request]')){
                is_dataammendment_request = activeTab.down('hiddenfield[name=is_dataammendment_request]').getValue();
            }
        valid = this.validateNewProductReceivingSubmission();
        if (valid) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID,'','','',workflow_stage_id,is_dataammendment_request);
          
        } else {
            Ext.getBody().unmask();
            toastr.warning('Please Enter All the required Product Details!!', 'Warning Response');
            return;
        }
    },
    showSamplerecApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
        application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
        workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            storeID = getApplicationStore(module_id, section_id);
          //   var valid = this.validateproducsampleReceivingSubmission(),
           var  validate_documentrecom = validateDocumentsSubmissonRecRecommendation(application_code),
                hasQueries = checkApplicationRaisedQueries(application_code, module_id);
             // valid = this.validateNewPremiseReceivingSubmission(btn),
              storeID = getApplicationStore(module_id, section_id);
              table_name = getApplicationTable(module_id);
              extraParams = [{
                  field_type: 'hiddenfield',
                  field_name: 'has_queries',
                  value: hasQueries
              }];
              if(!hasQueries){
                if(!validate_documentrecom){
                    Ext.getBody().unmask();
                    toastr.warning('Please Enter The Product Application Documents Submission recommendation!!', 'Warning Response');
                    return false;
                    
                }

              }
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsstrictrecommfrm', winWidth, storeID,extraParams,'','',workflow_stage_id);
             
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
    validateproducsampleReceivingSubmission: function () {

        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            productsDetailsFrm = activeTab.down('#productsDetailsFrm'),
            screeningGrid = activeTab.down('productscreeninggrid'),
            productsSampledetailsGrid = activeTab.down('productsSampledetailsGrid'),
            productDocUploadsGrid = activeTab.down('productDocUploadsGrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        //ckech the details 

        if (!productsDetailsFrm.isValid()) {
          //  toastr.warning('Please Enter All the required Product Details!!', 'Warning Response');
            //return false;
        }
        if(section_id != 4){
            if (productsSampledetailsGrid.getStore().data.length < 1) {
              //  toastr.warning('Product Sample details have not been received!!', 'Warning Response');
               // return false;
            }
        }
        

        if (productDocUploadsGrid.getStore().data.length < 1) {
            //   toastr.warning('Upload the Required Application Documents!!', 'Warning Response');
            // return false;
        }

        if (screeningGrid.getStore().getModifiedRecords().length > 0) {
          //  toastr.warning('There are unsaved screening data!!', 'Warning Response');
          //  return false;
        }
      

        return true;

    },
    validateNewProductReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('productapplicantdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),

            productsDetailsFrm = activeTab.down('#productsDetailsFrm'),
            screeningGrid = activeTab.down('foodpremscreeninggrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!productsDetailsFrm.isValid()) {
            toastr.warning('Please Enter All the required Product Details!!', 'Warning Response');
            return false;
        }
        return true;
    },
    showInvoicingApplicationSubmissionWin: function (btn) {
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
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            storeID = getApplicationStore(module_id, section_id);
        valid = this.validateProductsInvoicingSubmission(btn);

        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,'','','',workflow_stage_id);
        } else {
            Ext.getBody().unmask();
        }
    },
    showPaymentsApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            storeID = getApplicationStore(module_id, section_id),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        valid = this.validatePremisePaymentSubmission(btn);

        if (valid == true || valid === true) {

            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,'','','',workflow_stage_id);

        } else {
            Ext.getBody().unmask();
        }
    },
    validatePremisePaymentSubmission: function () {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            paymentDetailsGrid = activeTab.down('applicationpaymentsgrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            balance_str = activeTab.down('displayfield[name=running_balance]').getValue(),
            balance = balance_str.split("(")[0],
            bal_txt = balance.replace('-', ''),
            bal = balance.replace(',', '');
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (paymentDetailsGrid.getStore().getTotalCount() < 1) {
            toastr.warning('No Payment Details Captured!!', 'Warning Response');
            return false;
        }
        if (parseFloat(bal) < 0) {
            toastr.warning('The Application cannot be submitted until the applicant clears a balance of ' + bal_txt + '(Tsh)!!', 'Warning Response');
            return false;
        }
        return true;
    },
    validateProductsInvoicingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            invoiceDetailsGrid = activeTab.down('invoicingcostdetailsgrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            invoice_id = activeTab.down('hiddenfield[name=invoice_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!invoice_id) {
            toastr.warning('Please Save Invoice Details!!', 'Warning Response');
            return false;
        }
        if (invoiceDetailsGrid.getStore().data.length < 1) {
            toastr.warning('No Cost Elements Selected For Invoicing!!', 'Warning Response');
            return false;
        } else {
            this.saveNewProductsInvoicingDetails(btn);
        }
        return true;
    },

    showManagerEvaluationApplicationSubmissionWin: function (btn) {
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
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            storeID = getApplicationStore(module_id, section_id);
        valid = true;// this.validateFoodPremisePaymentSubmission();
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'drugworkflowsubmissionsmanevafrm', winWidth, storeID, '','','',workflow_stage_id);
        } else {
            Ext.getBody().unmask();
        }
    },

    //manager evaluation
    FManagerEvaluation: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            grid = activeTab.down('productmanagerevaluationgrid'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            inTrayStore = Ext.getStore('intraystr'),
            outTrayStore = Ext.getStore('outtraystr'),
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm(),
            sm = grid.getSelectionModel(),
            records = sm.getSelection(),
            selected = [];
        Ext.each(records, function (record) {
            var id = record.get('id');
            if (id) {
                //var obj = {id: id};
                selected.push(id);
            }
        });
        if (frm.isValid()) {
            frm.submit({
                url: 'workflow/submitApplicationManagerEvaluation',
                waitMsg: 'Please wait...',
                params: {
                    selected: JSON.stringify(selected)
                },
                headers: {
                    'X-CSRF-Token': token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.load();
                        inTrayStore.load();
                        outTrayStore.load();
                        win.close();
                        mainTabPanel.remove(activeTab);
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
    showEvaluationApplicationSubmissionWin: function (btn) {

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
            
            hasRecommendation = checkApplicationEvaluationOverralRecom(application_code, 2),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            storeID = getApplicationStore(module_id, section_id);
            if(activeTab.down('hiddenfield[name=isSaved]')){
                templateSaved = activeTab.down('hiddenfield[name=isSaved]').getValue()
            }else{
                templateSaved=0
            }
            
        valid = true;
        // if(!hasRecommendation){
        //     toastr.warning('Enter the Assessment Overrall Recommendation to Proceed!!', 'Warning Response');
        //     Ext.getBody().unmask();
        //     return false;
           
        // }
        if(!form.isValid()){
           // toastr.warning('Enter all the product application details to proceed!!', 'Warning Response');
           // Ext.getBody().unmask();
           // return false;
        }
        if(section_id == 3 || sub_module_id == 8 || sub_module_id == 9){

            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
            
            if (valid == true || valid === true) {
                showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID, extraParams,'','',workflow_stage_id);//workflowsubmissionsfrm
            } else {
                Ext.getBody().unmask();
            }
        }
        else{
            checklist_category_id = '';
            if(activeTab.down('combo[name=applicable_checklist]') ){
                checklist_category_id = activeTab.down('combo[name=applicable_checklist]').getValue();
            }
           
            hasEvalUploadChecklist = checkApplicationChecklistUploadDetails(application_code, module_id,sub_module_id,section_id,checklist_category_id,workflow_stage_id);
            // if(!hasEvalUploadChecklist || templateSaved==1){
            //     toastr.warning('Upload the evaluation report or fill in the Evaluation checklist details(for checklist based evaluation) to proceed!!', 'Warning Response');
            //     Ext.getBody().unmask();
            //     return false;
               
            // }
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
            if (valid == true || valid === true) {
                showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,extraParams,'','',workflow_stage_id);
            } else {
                Ext.getBody().unmask();
            }

        }
    },
    showAuditingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            
            form = activeTab.down('form').getForm(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),

            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            hasRecommendation = checkApplicationEvaluationOverralRecom(application_code, 2),
            storeID = getApplicationStore(module_id, section_id);
            hasQueries = checkApplicationUnstructuredQueries(application_code,module_id);

        valid = true;
        extraParams = [{
            field_type: 'hiddenfield',
            field_name: 'has_queries',
            value: hasQueries
        }];
        // if(!hasRecommendation){
        //     toastr.warning('Enter the 2nd Assessment Overrall Recommendation to Proceed!!', 'Warning Response');
        //     Ext.getBody().unmask();
        //     return false;
        // }
        if(!form.isValid()){
            toastr.warning('Enter all the product application details to proceed!!', 'Warning Response');
            Ext.getBody().unmask();
            return false;

        }
        if (valid == true || valid === true) {
            showRecommendationWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsstrictrecommfrm', winWidth, storeID,1,extraParams,workflow_stage_id);
        } else {
            Ext.getBody().unmask();
        }
    },

    doSubmitData: function (data, storeId, method, url, callback) {
        Ext.getBody().mask('Saving record...');
        Ext.Ajax.on('beforerequest', function (conn, options) {
            Ext.Ajax.setDefaultHeaders({
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json'
            });
        });
        Ext.Ajax.request({
            url: url,
            method: method,
            params: JSON.stringify(data),
            success: function (conn, response, options, eOpts) {
                var result = Ext.JSON.decode(conn.responseText, true);
                var store = null;
                if (storeId != null) {
                    store = Ext.getStore(storeId);
                }

                if (!result) {
                    result = {};
                    result.success = false;
                    result.msg = "Failed to decode the message from the server";
                }

                if (result.success) {
                    toastr.success(result.message);
                    if (store != null) {
                        store.load();
                    }
                } else {
                    toastr.warning(result.message);
                }
                callback(result);
                Ext.getBody().unmask();
            },
            failure: function (conn, response, options, eOpts) {
                Ext.getBody().unmask();
                toastr.error(conn.responseText);
            }
        });
    },

    showMeetingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            storeID = getApplicationStore(module_id, section_id);
        valid = this.validateManagerMeetingApplicationSubmission(btn);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,'','','',workflow_stage_id);
        } else {
            Ext.getBody().unmask();
        }
    },
    validateManagerMeetingApplicationSubmission: function (btn) {
        var valid = true,
            saveInfo = this.saveTCMeetingDetails(btn);
        if (saveInfo == false || saveInfo === false) {
            valid = false;
        }
        return valid;
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
    showProductsImagesDocUploadWin: function (btn) {
        var childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            isWin = btn.isWin,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            product_id = activeTab.down('hiddenfield[name=product_id]').getValue(),
            form = Ext.widget(childXtype);
        form.add({
            xtype: 'hiddenfield',
            name: 'product_id'
        });
        form.down('hiddenfield[name=application_id]').setValue(application_id);
        form.down('hiddenfield[name=application_code]').setValue(application_code);
        form.down('hiddenfield[name=product_id]').setValue(product_id);

        form.down('button[name=uploadimage_btn]').isWin = isWin;
        form.down('hiddenfield[name=document_type_id]').setValue(6);
        
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
       // docReqStr = Ext.getStore('document_requirementsStr');
        docReqStr =  form.down('combo[name=document_requirement_id]').getStore()
        docReqStr.load({
            params: {
                docType_id: 6,
                section_id: section_id,
                module_id: module_id,
                sub_module_id: sub_module_id
            }
        });
    },
    //manager evaluation/Auditing
    funcSubmitApplicationManagerEvaluation: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            grid = activeTab.down('grid'),//assumptions=>there is one main grid
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            inTrayStore = Ext.getStore('intraystr'),
            outTrayStore = Ext.getStore('outtraystr'),
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm(),
            sm = grid.getSelectionModel(),
            records = sm.getSelection(),
            selected = [];
        Ext.each(records, function (record) {
            var id = record.get('id');
            if (id) {
                //var obj = {id: id};
                selected.push(id);
            }
        });
        if (frm.isValid()) {
            frm.submit({
                url: 'workflow/submitApplicationManagerEvaluation',
                waitMsg: 'Please wait...',
                params: {
                    selected: JSON.stringify(selected)
                },
                headers: {
                    'X-CSRF-Token': token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.load();
                        inTrayStore.load();
                        outTrayStore.load();
                        win.close();
                        mainTabPanel.remove(activeTab);
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
    prepareProductsChecklistAuditing: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            checklist_grid = activeTab.down('grid'),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            product_details = otherDetailsFrm.down('displayfield[name=product_details]'),

            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareProductsInvoicingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_product_applications'
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
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=product_id]').setValue(results.product_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);

                        applicant_details.setValue(results.applicant_details);
                        product_details.setValue(results.product_details);

                        product_details.setVisible(true);
                        product_details.setValue(results.product_details);
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
    prepareFoodProductsEvalAud: function () {
        
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            checklist_grid = activeTab.down('grid'),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            product_details = otherDetailsFrm.down('displayfield[name=product_details]'),

            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        var applicable_checkliststore = activeTab.down('combo[name=applicable_checklist]').getStore();
        applicable_checkliststore.removeAll();
        applicable_checkliststore.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareProductsInvoicingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_product_applications'
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
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=product_id]').setValue(results.product_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);

                        applicant_details.setValue(results.applicant_details);
                        product_details.setValue(results.product_details);
                        
                        product_details.setVisible(true);
                        product_details.setValue(results.product_details);
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
    prepareDrugsProductsUploadQueryPanel: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab()
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            product_details = otherDetailsFrm.down('displayfield[name=product_details]'),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

            activeTab.down('drugsmanagerproductsqueriesgrid').down('hiddenfield[name=application_code]').setValue(application_code);
                        
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareProductsInvoicingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_product_applications'
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
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=product_id]').setValue(results.product_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);

                        applicant_details.setValue(results.applicant_details);
                        product_details.setValue(results.product_details);
                        //uploads details 
                        
                        product_details.setVisible(true);

                        product_details.setValue(results.product_details);


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
    prepareProductsProcessUploadEvaluation: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            upload_grid = activeTab.down('grid'),
            applicant_details = activeTab.down('displayfield[name=applicant_details]'),
            product_details = activeTab.down('displayfield[name=product_details]'),
            preview_productdetails = activeTab.down('#preview_productdetails'),
            product_panel = preview_productdetails.down('#product_panel'),
            product_detailspanel = activeTab.down('#product_detailspanel'),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

            
            if(sub_module_id ==9){
                if(activeTab.down('button[name=upload_evaluationreport]')){
                    activeTab.down('button[name=variation_requests]').setVisible(true);
                }
            }
        /*

'modhas_payment_processing' in 'where clause' (SQL: select * from `modules
        */
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareProductsUniformStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_product_applications',
                    operation:0,
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
                        template = resp.template;
                        assessmentId = resp.assessmentId;
                        model = Ext.create('Ext.data.Model', results);

                    if (success == true || success === true) {
                        var prodclass_category_id = results.prodclass_category_id;

                        activeTab.down('hiddenfield[name=product_id]').setValue(results.product_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        prodclass_category_id = results.prodclass_category_id;
                        
                        classification_id = results.classification_id;
                        if(activeTab.down('button[name=upload_evaluationreport]')){
                            activeTab.down('button[name=upload_evaluationreport]').setVisible(false);
                        
                        }
                       
                            var app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore();
                                app_doc_types_store.removeAll();
                                app_doc_types_store.load({
                                    params: {
                                        process_id: process_id,
                                        workflow_stage: workflow_stage_id
                                    }
                                });
                            upload_grid.store.removeAll();
                            upload_grid.store.load({
                                params: {
                                    application_code: application_code
                                }
                            });

                        
                        //uploads details
                        applicant_details.setValue(results.applicant_details);
                       
                        productsDetailsFrm = activeTab.down('#productsDetailsFrm'),
                        productsDetailsFrm.loadRecord(model);

                       // product_detailspanel.getViewModel().set('isReadOnly', true);

                      //  product_detailspanel.down('form').getViewModel().set('isReadOnly', true);
                       
                        product_details.setValue(results.product_details);

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
    prepareProductsProcessUploadAuditingProcess: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            upload_grid = activeTab.down('grid'),
            applicant_details = activeTab.down('displayfield[name=applicant_details]'),
            product_details = activeTab.down('displayfield[name=product_details]'),
            product_panel = activeTab.down('#product_panel'),
           
            product_detailspanel = activeTab.down('#product_detailspanel'),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareProductsUniformStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_product_applications',
                    operation:1
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
                        template = resp.template;
                        assessmentId = resp.assessmentId;
                        model = Ext.create('Ext.data.Model', results);

                    if ((success == true || success === true) && results )  {
                        var module_id = results.module_id,
                           prodclass_category_id = results.prodclass_category_id;

                        activeTab.down('hiddenfield[name=product_id]').setValue(results.product_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        prodclass_category_id = results.prodclass_category_id;
                        
                        classification_id = results.classification_id;
                        
                       
                        var app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore();
                            app_doc_types_store.removeAll();
                            app_doc_types_store.load({
                                params: {
                                    process_id: process_id,
                                    workflow_stage: workflow_stage_id
                                }
                            });
                        upload_grid.store.removeAll();
                        upload_grid.store.load({
                            params: {
                                application_code: application_code
                            }
                        });
                        
                        //uploads details
                        applicant_details.setValue(results.applicant_details);
                        product_details.setValue(results.product_details);

                        productsDetailsFrm = activeTab.down('#productsDetailsFrm'),
                        productsDetailsFrm.loadRecord(model);
                        
                       
                        product_panel.getViewModel().set('isReadOnly', true);
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
    prepareMedicalDevProductsUploadAud: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            product_details = otherDetailsFrm.down('displayfield[name=product_details]'),
            product_panel = activeTab.down('#product_panel'),
            product_detailspanel = activeTab.down('#product_detailspanel'),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),

            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareProductsUniformStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_product_applications'
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
                        classification_id = results.classification_id;

                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=product_id]').setValue(results.product_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);

                        applicant_details.setValue(results.applicant_details);
                        product_details.setValue(results.product_details);
                       
                           var upload_grid = activeTab.down('grid'),
                                app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore();
                            app_doc_types_store.removeAll();
                            app_doc_types_store.load({
                                params: {
                                    process_id: process_id,
                                    workflow_stage: workflow_stage_id
                                }
                            });
                            upload_grid.store.removeAll();
                            upload_grid.store.load({
                                params: {
                                    application_code: application_code
                                }
                            });
                        

                        product_details.setVisible(true);
                        product_details.setValue(results.product_details);
                       
                        product_detailspanel.getViewModel().set('isReadOnly', true);
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
    
    prepareNewProductsInvoicing: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
           
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            product_details = otherDetailsFrm.down('displayfield[name=product_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
           
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        if(activeTab.down('button[name=variation_requests]')){

            variation_requests = activeTab.down('button[name=variation_requests]');
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/prepareProductsInvoicingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_product_applications'
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
                       
                        applicant_details.setValue(results.applicant_details);
                        product_details.setValue(results.product_details);
                        
                        if (module_id == 1 || module_id === 1) {

                            product_details.setVisible(true);
                            product_details.setValue(results.product_details);

                        }
                        if(sub_module_id  == 9){
                            variation_requests.setHidden(false);
                        }
                        
                        activeTab.down('hiddenfield[name=product_id]').setValue(results.product_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);

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
    refreshProductImagesUploadsGrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            table_name = grid.table_name,
            document_type_id = grid.document_type_id,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();

        if (activeTab.down('hiddenfield[name=product_id]')) {
            product_id = activeTab.down('hiddenfield[name=product_id]').getValue();

        } else {

            var panel = me.up('window'),
                product_id = panel.down('hiddenfield[name=product_id]').getValue();

        }

        store.getProxy().extraParams = {
            document_type_id: document_type_id,
            product_id: product_id
        };
    },


});