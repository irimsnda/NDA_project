/**
 * Created by softclans
 * user robinson odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.controller.ProductNotificationsCtr', {
    extend: 'Ext.app.Controller',
    stores: [
        //application store
        'Admin.store.productnotification.AuthorisedProdNotificationDashStr',
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
            'onlinemedicaldevicesnotificationrecwizard': {
                afterrender: 'prepareOnlineMedicalDevicesNotReceiving'
            },
            'authorisedprodnotificationdashgrid': {
                refresh: 'refreshProductNotificationssMainGrids'
            },
            'medicaldevicesnotificationreceiving': {
                afterrender: 'prepareProductNotificationReceiving'
            },'medicaldevicesnotificationassessmentpnl': {
                afterrender: 'prepareMedicalDevicesProductsUploadEvalAud'
            }, 'medicaldevicesnotificationassessmentpnl button[name=more_app_details]': {
                click: 'showProductNptificationApplicationMoreDetails'
            },
            'medicaldevicesnotificationassessmentpnl button[name=process_submission_btn]': {
                click: 'showNotEvaluationApplicationSubmissionWin'
            },
            'onlinemedicaldevicesnotificationrecwizard button[name=save_productnotification]': {
                click: 'funcSaveOnlineProductnotification'
            },
            
            'productnotificationapprovalgrid': {
                refresh: 'productnotificationapprovalrefreshgrid',
                beforedeselect: 'beforeProductNotificationAppsGridDeselect'
            }, 'productnotificationcertificatereleasegrid': {
                refresh: 'productnotificationapprovalrefreshgrid',
                beforedeselect: 'beforeProductNotificationAppsGridDeselect'
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
                editpreviewProductNotificationInformation: 'editpreviewProductNotificationInformation',
                
            }
        }
    }, beforeProductNotificationAppsGridDeselect: function (sel, record, index, eOpts) {
        var grid = sel.view.grid,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code1 = record.get('application_code'),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        if (application_code1 == application_code) {
            /* toastr.warning('Action not allowed on this application!!', 'Warning Response');
             return false;*/
        }
    }, productnotificationapprovalrefreshgrid: function (me) {
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
    },  showNotEvaluationApplicationSubmissionWin: function (btn) {
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
            storeID = getApplicationStore(module_id, section_id);
        valid = true;
        hasQueries = checkApplicationUnstructuredQueries(application_code,module_id);

        valid = true;
        extraParams = [{
            field_type: 'hiddenfield',
            field_name: 'has_queries',
            value: hasQueries
        }];
        //this.validateFoodPremisePaymentSubmission();
        if (valid == true || valid === true) {
            showRecommendationWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsstrictrecommfrm', winWidth, storeID,1,extraParams);
        } else {
            Ext.getBody().unmask();
        }
        
    }, prepareMedicalDevicesProductsUploadEvalAud: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            upload_grid = activeTab.down('grid'),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            product_details = otherDetailsFrm.down('displayfield[name=product_details]'),

            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        var app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore();
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productnotification/prepareMedicaldevicesUniformStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_product_notifications'
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

                        upload_grid.store.removeAll();
                        upload_grid.store.load({
                            params: {
                                application_code: application_code
                            }
                        });

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
    showProductNptificationApplicationMoreDetails: function (btn) {
        var isReadOnly = btn.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            
            productdetails_panel = activeTab.down('#main_processpanel').productdetails_panel,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            product_id = activeTab.down('hiddenfield[name=product_id]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

    
        this.showProductnotificationMoreDetailsGeneric(productdetails_panel, application_id, product_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal);
    },
    editpreviewProductNotificationInformation: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord();
        isReadOnly = item.isReadOnly,
            is_temporal = btn.is_temporal,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            productdetails_panel = activeTab.down('#main_processpanel').productdetails_panel,
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

        this.showProductnotificationMoreDetailsGeneric(productdetails_panel, application_id, product_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal);

    }, showProductnotificationMoreDetailsGeneric: function (productdetails_panel, application_id, product_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal) {
        Ext.getBody().mask('Please wait...');

        var me = this,
            productdetails_panel = Ext.widget(productdetails_panel),
            tab = productdetails_panel.down('panel'),
            products_form = productdetails_panel.down('form');

        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            productdetails_panel.down('button[name=save_btn]').setVisible(false);
            //   prepareNewProductReceivingStage
        }
        productdetails_panel.down('hiddenfield[name=section_id]').setValue(section_id);
        

        Ext.Ajax.request({
            method: 'GET',
            url: 'productnotification/getProductNotificationDetails',
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
                    zone_id = resp.zone_id;
                if (success == true || success === true) {

                    if (product_details) {
                        var model2 = Ext.create('Ext.data.Model', product_details);
                        products_form.loadRecord(model2);
                    }
                    funcShowCustomizableWindow(ref_no, '85%', productdetails_panel, 'customizablewindow');

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
    },prepareProductNotificationReceiving: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),

            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            applicantFrm = activeTab.down('productapplicantdetailsfrm'),
            localagentFrm = activeTab.down('productlocalapplicantdetailsfrm'),
            products_detailsfrm = activeTab.down('#productsDetailsFrm'),
            app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]'),
            filter = {section_id: section_id},
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

        app_check_types_store.removeAll();
        app_check_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
       
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
                url: 'productnotification/prepareProductNotificationReceivingStage',
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
    },
    refreshProductNotificationssMainGrids: function (me) {

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
    prepareOnlineMedicalDevicesNotReceiving: function (pnl) {

        Ext.getBody().mask('Please wait...');
        var me = this,
            activeTab = pnl;
        application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),

            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            applicantFrm = activeTab.down('productapplicantdetailsfrm'),
            localagentFrm = activeTab.down('productlocalapplicantdetailsfrm'),
            products_detailsfrm = activeTab.down('#productsDetailsFrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=zone_id]');
            filter = {section_id: section_id},
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

            var checklistTypesGrid = pnl.down('combo[name=applicable_checklist]'),
                checklistTypesStr = checklistTypesGrid.getStore();
                checklistTypesStr.removeAll();
                checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
        
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'productnotification/prepareOnlineProductNotReceivingStage',
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

                        activeTab.down('displayfield[name=application_status]').setValue(results.application_status);
                        activeTab.down('displayfield[name=tracking_no]').setValue(results.tracking_no);

                        activeTab.down('displayfield[name=process_name]').setValue(results.process_name);
                        pnl.getViewModel().set('isReadOnly', false);

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
    funcSaveOnlineProductnotification:function(btn){
        var wizard_pnl = btn.wizard,
            wizardPnl = btn.up(wizard_pnl),
            zone_id = wizardPnl.down('combo[name=zone_id]').getValue(),
            application_code = wizardPnl.down('hiddenfield[name=active_application_code]').getValue(),
            form = wizardPnl.down('medicaldevicesnotificationsdetailsfrm'),
            form = form.getForm();

        if(form.isValid()){
                form.submit({
                    params: {
                        zone_id: zone_id,
                        application_code:application_code
                    },headers: {
                        'X-CSRF-Token': token
                    }, headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    waitMsg: 'Updating Product Notification Details',
                    url: 'productnotification/saveOnlineProductNotificationReceiving',
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
        


    }
});