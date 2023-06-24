/**
 * Created by Kip on 9/12/2018.
 */
Ext.define('Admin.controller.WorkflowManagementCtr', {
    extend: 'Ext.app.Controller',
    stores: [
        'Admin.store.workflowmanagement.WorkflowGridAbstractStore',
        'Admin.store.workflowmanagement.WorkflowComboAbstractStore',
        'Admin.store.workflowmanagement.SubmissionStageActionsStr',
        'Admin.store.workflowmanagement.SubmissionNextStagesStr',
        'Admin.store.workflowmanagement.SubmissionResponsibleUsersStr',
        'Admin.store.workflowmanagement.SubmissionsUrgenciesStr',
        'Admin.store.workflowmanagement.SubmissionRecommendationsStr',
        'Admin.store.workflowmanagement.ApplicationReturnOptionsStr',
        'Admin.store.workflowmanagement.TransitionsStr'
    ],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }],

        control: {
            'workflowsubmissionsfrm button[name=app_submission_btn]': {
                click: 'funcSubmitApplication'
            },
             'Inventorydisposalsubmissionsreceivingfrm button[name=app_submission_btn]': {
                click: 'funcSubmitInventoryDisposalRequest'
            },
            
            'workflowsubmissionsreceivingfrm button[name=app_submission_btn]': {
                click: 'funcSubmitApplication'
            },
            'workflowsubmissionsopenrecommfrm button[name=app_submission_btn]': {
                click: 'funcSubmitApplication'
            },
            'workflowsubmissionsstrictrecommfrm button[name=app_submission_btn]': {
                click: 'funcSubmitApplication'
            },
            'workflowportalinitialsubmissionsfrm button[name=app_submission_btn]': {
                click: 'funcSubmitInitialPortalApplication'
            },
            
            'workflowsubmissionmanagerqueryfrm button[name=app_submission_btn]': {
                click: 'funcSubmitManagerApplicationsGeneric'
            },
            'workflowsubmissionmanagersgenericfrm button[name=app_submission_btn]': {
                click: 'funcSubmitManagerApplicationsGeneric'
            },
            'workflowsubmissionsinspectionsfrm button[name=app_submission_btn]': {
                click: 'funcSubmitManagerApplicationsGeneric'
            },
            'workflowsubmissionspmssamplesfrm button[name=app_submission_btn]': {
                click: 'funcSubmitPMSApplicationGeneric'
            },
            'foodpremreggrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'drugspremreggrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'cosmeticspremreggrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'meddevicespremreggrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'foodgmpgrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'drugsgmpgrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'cosmeticsgmpgrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'meddevicesgmpgrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'clinicaltrialgrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'drugssurveillancegrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'foodsurveillancegrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'cosmeticssurveillancegrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'meddevicessurveillancegrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },'controldocument_managementdashgrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'processworkflowstagesgrid': {
                refresh: 'refreshProcessWorkflowStageGrid',
                itemclick: 'onProcessStageClick'
            },
            'productregistrationgrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'disposalapplicationsdashgrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            //promotion materials

            'promotionmaterialapplicationgrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'promotionadvertsfoodapplicationgrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'promotionadvertcosmeticshomegrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },
            'promotionadvertsmedicaldevicesapplicationgrid combo[name=sub_module_id]': {
                change: 'filterWorkflowStages'
            },'revenuerequestsubmissionsfrm button[name=app_submission_btn]': {
                click: 'funcSubmitApplication'
            }, 'paymentspanel button[name=returnback_submission_btn]': {
                click: 'showReturnBackApplicationSubmissionWin'
            }, 'importexportpermitreleasepnl button[name=returnback_submission_btn]': {
                click: 'showReturnBackApplicationSubmissionWin'
            },'controlleddrugsimpmanagerreviewwizrd button[name=returnback_submission_btn]': {
                click: 'showReturnBackApplicationSubmissionWin'
            },'paymentVerificationPnl button[name=returnback_submission_btn]': {
                click: 'showReturnBackApplicationSubmissionWin'
            }, 
            'paymentVerificationPnl button[name=rejection_submission_btn]': {
                click: 'showRejectionApplicationSubmissionWin'
            },  
            'paymentVerificationPnl button[name=query_submission_btn]': {
                click: 'showQueryApplicationSubmissionWin'
            },
            'applicationunstructuredqueriesgrid button[name=query_submission_btn]': {
                click: 'showQueryApplicationSubmissionWin'
            },
            
            'paymentVerificationPnl button[name=process_submission_btn]': {
                click: 'showPaymentsApplicationSubmissionWin'
            },
            'paymentVerificationPnl button[name=returnback_submission_btn]': {
                click: 'showReturnBackApplicationSubmissionWin'
            }, 
            'paymentVerificationPnl': {
                afterrender: 'addApplicantDetailstoTab'
            },
        }
    },
    init: function () {

    },

    listen: {
        controller: {
            '*': {
                setWorkflowGridsStore: 'setWorkflowGridsStore',
                setWorkflowCombosStore: 'setWorkflowCombosStore',
                setReportGlobalStore:'setReportGlobalStore'
            }
        }
    },showPaymentsApplicationSubmissionWin: function (btn) {
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
    }, validatePremisePaymentSubmission: function () {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            // paymentDetailsGrid = activeTab.down('applicationpaymentsgrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            balance_str = activeTab.down('displayfield[name=running_balance]').getValue(),
            balance = balance_str.split("(")[0],
            bal_txt = balance.replace('-', ''),
            bal = balance.replace(',', '');
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        // if (paymentDetailsGrid.getStore().getTotalCount() < 1) {
        //     toastr.warning('No Payment Details Captured!!', 'Warning Response');
        //     return false;
        // }
        if (parseFloat(bal) > 0) {
            toastr.warning('The Application cannot be submitted until the applicant clears a balance of ' + balance_str, 'Warning Response');
            return false;
        }
        return true;
    },showQueryApplicationSubmissionWin:function(btn){

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
            hasQueries = checkApplicationRaisedQueries(application_code, module_id);
               
            if(!hasQueries){

                toastr.error('No Query Entered for the selected applications, add to proceed', 'Failure Response');
            }else{

                storeID = getApplicationStore(module_id, section_id);
                extraParams = [ {
                    field_type: 'hiddenfield',
                    field_name: 'has_queries',
                    value: hasQueries
                }]; 
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth,storeID,extraParams,'','',workflow_stage_id);

            }
            
        Ext.getBody().unmask();
    },
    showRejectionApplicationSubmissionWin:function(btn){

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
                value: 3
            }]; 
        showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth,storeID,extraParams,'','',workflow_stage_id);
        Ext.getBody().unmask();
    },
    refreshProcessWorkflowStageGrid: function (me) {
        var store = me.getStore(),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_id = activeTab.down('hiddenfield[name=workflow_id]').getValue();
        store.getProxy().extraParams = {
            workflow_id: workflow_id
        };
    },

    filterWorkflowStages: function (cmb, newVal) {//application based


        var grid = cmb.up('grid'),
            gridStore = grid.getStore(),
            stagesField = grid.down('combo[name=workflow_stage_id]'),
            store = stagesField.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            sub_module_id = newVal;


        gridStore.load();
        store.removeAll();
        store.load({params: {module_id: module_id, section_id: section_id, sub_module_id: sub_module_id}});
        // gridStore.removeAll();
        // gridStore.load({params: {module_id: module_id, section_id: section_id, sub_module_id: sub_module_id}});
    },
    showReturnBackApplicationSubmissionWin:function(btn){

        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            //table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form').getForm(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
             table_name = getApplicationTable(module_id),
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
    //generic
    funcSubmitApplication: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            storeID = btn.storeID,
            action_url = btn.action_url,
            store = Ext.getStore(storeID),
            intrayStore = Ext.getStore('intraystr'),
            outtrayStore = Ext.getStore('outtraystr'),
            onlineapplicationdashboardgridstr= Ext.getStore('onlineapplicationdashboardgridstr'),
            form = btn.up('form'),
           
            win = form.up('window'),
            frm = form.getForm();
            non_mainpanel_close = 0;
            
            if(form.down('hiddenfield[name=non_mainpanel_close]')){
                non_mainpanel_close = form.down('hiddenfield[name=non_mainpanel_close]').getValue();
            }
            
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
                        externaluserintraystr = Ext.getStore('externaluserintraystr');
                        externaluserintraystr.load();
                        
                        onlineapplicationdashboardgridstr.load();
                        win.close();
                        closeActiveWindow() ;
                        if(non_mainpanel_close != 1){

                            mainTabPanel.remove(activeTab);
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
        }
    },
    
    funcSubmitInitialPortalApplication: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            storeID = btn.storeID,
            action_url = btn.action_url,
            store = Ext.getStore(storeID),
            intrayStore = Ext.getStore('intraystr'),
            outtrayStore = Ext.getStore('outtraystr'),
            onlineapplicationdashboardgridstr= Ext.getStore('onlineapplicationdashboardgridstr'),
            form = btn.up('form'),
            
            win = form.up('window'),
            frm = form.getForm();
            non_mainpanel_close = 0;
        if(form.down('hiddenfield[name=non_mainpanel_close]')){
            non_mainpanel_close = form.down('hiddenfield[name=non_mainpanel_close]').getValue();
        }
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
    //generic
    funcSubmitInventoryDisposalRequest: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            storeID = btn.storeID,
            action_url = btn.action_url,
            store = Ext.getStore(storeID),
            homeBtn = activeTab.down('button[name=backHome]'),
            intrayStore = Ext.getStore('intraystr'),
            outtrayStore = Ext.getStore('outtraystr'),
            form = btn.up('form'),
           
            win = form.up('window'),
            frm = form.getForm();
            non_mainpanel_close = 0;

            if(form.down('hiddenfield[name=non_mainpanel_close]')){
                non_mainpanel_close = form.down('hiddenfield[name=non_mainpanel_close]').getValue();
            }
            
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
                        externaluserintraystr = Ext.getStore('externaluserintraystr');
                        externaluserintraystr.load();
                        
                        win.close();
                        if( activeTab.xtype == 'disposeinventory' ){
                            console.log("activeTab");
                            //homeBtn.fireEvent('click');
                            homeBtn.fireHandler();
                            
                        }else{
                            mainTabPanel.remove(activeTab);
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
        }
    },

    //managers submissions
    funcSubmitManagerApplicationsGeneric: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            gridXtype = btn.gridXtype,
            action_url = btn.action_url,
            grid = (gridXtype) ? activeTab.down(gridXtype) : activeTab.down('grid'),//assumptions=>there is one main grid
            storeID = btn.storeID,
            noTabClose = btn.noTabClose,
            store = Ext.getStore(storeID),
            inTrayStore = Ext.getStore('intraystr'),
            outTrayStore = Ext.getStore('outtraystr'),
            form = btn.up('form'),
            curr_stage_id = form.down('hiddenfield[name=curr_stage_id]').getValue(),
            mode = form.getApplicationSelectionMode(),
            win = form.up('window'),
            frm = form.getForm();
            //sm = grid.getSelectionModel(),
            //records = sm.getSelection(),
            if(gridXtype != ''){
                if(activeTab.down(gridXtype)){
                    grid =  activeTab.down(gridXtype)
                }
                else{
                        grid =  activeTab.down('grid');
                }
            }
            else{
                grid = activeTab.down('grid');
            }
            
            selected = this.buildApplicationsToSubmit(grid, mode,activeTab);
       
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
                        store.load();

                        externaluserintraystr = Ext.getStore('externaluserintraystr');
                        externaluserintraystr.load();
                        
                        if ((noTabClose) && noTabClose == 1) {
                            grid.getStore().load();
                        } else {
                            mainTabPanel.remove(activeTab);
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
        }
    },

    buildApplicationsToSubmit: function (grid, mode,activeTab='') {
        var records,
            selected_appIds = [],
            selected_appCodes = [];
            
        if (mode == 'all' || mode === 'all') {
            records = grid.getStore().data.items;
        } else {
            var sm = grid.getSelectionModel();
            records = sm.getSelection()
        }
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

    //Surveillance/PMS
    funcSubmitPMSApplicationGeneric: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            grid = activeTab.down('grid'),
            noTabClose = btn.noTabClose,
            storeID = btn.storeID,
            action_url = btn.action_url,
            store = Ext.getStore(storeID),
            intrayStore = Ext.getStore('intraystr'),
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
                        externaluserintraystr = Ext.getStore('externaluserintraystr');
                        externaluserintraystr.load();
                        win.close();
                        closeActiveWindow();
                        if ((noTabClose) && noTabClose == 1) {
                            grid.getStore().load();
                        } else {
                            mainTabPanel.remove(activeTab);
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
        }
    },

    setWorkflowGridsStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.workflowmanagement.WorkflowGridAbstractStore', config);
        me.setStore(store);
        toolbar.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    setWorkflowCombosStore: function (me, options) {

        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.workflowmanagement.WorkflowGridAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },
   setReportGlobalStore: function (me, options) {

        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.summaryreport.ReportsGlobalAbstractStr', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },
    onProcessStageClick: function (view, record, item, index, e, eOpts) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            config_type = activeTab.down('hiddenfield[name=config_type]').getValue(),
            //mainPnl = view.up('processchecklistconfigpnl'),
            stage_id = record.get('id'),
            stage_name = record.get('name'),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            checklistsGridXtype,
            checklistsGrid,
            store,
            title;
        if (config_type == 'checklists' || config_type === 'checklists') {
            checklistsGridXtype = 'processworkflowstagechecklistsgrid';
            title = 'Applicable Checklist Categories';
        } else if (config_type == 'documents' || config_type === 'documents') {
            checklistsGridXtype = 'processworkflowstagedocumentsgrid';
            title = 'Applicable Document Types';
        }
        checklistsGrid = activeTab.down(checklistsGridXtype);
        store = checklistsGrid.getStore();
        activeTab.down('hiddenfield[name=stage_id]').setValue(stage_id);
        checklistsGrid.setTitle(title + ' - ' + stage_name + ' Stage');
        store.removeAll();
        store.load({params: {process_id: process_id, workflow_stage: stage_id}});
    }, addApplicantDetailstoTab: function (pnl) {
        var application_code = pnl.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = pnl.down('hiddenfield[name=module_id]').getValue();

        if(pnl.down('displayfield[name=applicant_details]')){
            Ext.Ajax.request({
                method: 'GET',
                url: 'getApplicationApplicantDetails',
                params: {
                    table_name: getApplicationTable(module_id),
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
                        txt;
                    if (success == true || success === true) {
                        txt = ' '+results.applicant_name + ' <br> '+ results.physical_address + ' <br> ' +results.postal_address + ' <br> ' +results.telephone_no;

                        pnl.down('displayfield[name=applicant_details]').setValue(txt);

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
        }
    }

});