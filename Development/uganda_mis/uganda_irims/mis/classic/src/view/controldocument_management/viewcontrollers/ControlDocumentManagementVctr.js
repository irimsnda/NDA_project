Ext.define('Admin.view.controldocument_management.viewcontrollers.ControlDocumentManagementVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.controldocumentmanagementvctr',

    /**
     * Called when the view is created
     */
    init: function () {

    },showPreviousUploadedDocs: function (item) {
        this.fireEvent('showPreviousUploadedDocs', item);
    },

    
    showAddApplicationEvaluationComment: function (btn) {
        btn.setDisabled(true);
        var grid = btn.up('grid'),
            panel = grid.up('panel'),
            form = panel.down('form');
        form.setVisible(true);
    },
    showEditApplicationEvaluationComment: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            grid = btn.up('grid'),
            panel = grid.up('panel'),
            form = panel.down('form'),
            add_btn = grid.down('button[name=add_btn]');
        form.loadRecord(record);
        form.setVisible(true);
        add_btn.setDisabled(true);
    },

    cancelAddApplicationEvaluationComment: function (btn) {
        var form = btn.up('form'),
            panel = form.up('panel'),
            grid = panel.down('grid'),
            add_btn = grid.down('button[name=add_btn]');
        form.setVisible(false);
        add_btn.setDisabled(false);
    },

    showControlDocumentApplication: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('showControlDocumentApplication', application_type);
    },
    saveReviewedControlDocumentApplication: function (btn) {
        var wizard = btn.wizardpnl,
             wizardPnl = btn.up(wizard),
             action_url = btn.action_url,
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),

            process_id = containerPnl.down('hiddenfield[name=process_id]').getValue(),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            
            workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            checkapplication_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            controlDocForm = btn.up('form').getForm();

        
        if (controlDocForm.isValid()) {
            controlDocForm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id, section_id: section_id,
                    workflow_stage_id: workflow_stage_id,
                    active_application_id: active_application_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    '_token': token,
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        active_application_id = resp.active_application_id,
                        active_application_code = resp.application_code,
                        ref_no = resp.ref_no;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        if (checkapplication_id == '') {
                            containerPnl.down('hiddenfield[name=active_application_id]').setValue(active_application_id);
                            containerPnl.down('displayfield[name=reference_no]').setValue(ref_no);
                            containerPnl.down('hiddenfield[name=active_application_code]').setValue(active_application_code);
                            
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
    saveControlDocumentApprovals: function (btn) {
        var wizard = btn.wizardpnl,
             wizardPnl = btn.up(wizard),
             action_url = btn.action_url,
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            controlDocForm = btn.up('form').getForm();

        if (controlDocForm.isValid()) {
            controlDocForm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                params: {
                    active_application_id: active_application_id,
                    '_token': token,
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        
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
    }, reloadParentGridOnChange: function (combo) {
        var grid = combo.up('grid'),
            store = grid.getStore();
        store.load();
    },
    onViewControlDocumentApplication: function (grid, record) {
        this.fireEvent('viewApplicationDetails', record);
    },
    setProductRegGridsStore: function (obj, options) {
        this.fireEvent('setProductRegGridsStore', obj, options);
    },

    setProductRegCombosStore: function (obj, options) {
        this.fireEvent('setProductRegCombosStore', obj, options);
    },

    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
    onshowNewImportExportPOEInspection: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('onshowNewImportExportPOEInspection', application_type);
    },
   
    
    setConfigGridsStore: function (obj, options) {

        this.fireEvent('setConfigGridsStore', obj, options);
    },
    setConfigCombosSectionfilterStore: function (obj, options) {

        this.fireEvent('setConfigCombosStoreWithSectionFilter', obj, options);
    },
    setConfigCombosStore: function (obj, options) {

        this.fireEvent('setConfigCombosStore', obj, options);
    },
    setTraderConfigCombosStore: function (obj, options) {
       
        this.fireEvent('setTraderConfigCombosStore', obj, options);
    },
    
    showControlDocumentProcessWorkflow: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('showControlDocumentProcessWorkflow', application_type);
    },

   
    funcSearchControlDocument: function (btn) {
        // if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;

        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
    },
   
    showAddControlDocAccessManagement: function (btn) {
      
        var me = this,
             mainTabPnl = btn.up('#contentPanel'),
             containerPnl = mainTabPnl.getActiveTab(),
            active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        child.down('hiddenfield[name=application_id]').setValue(active_application_id)
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
       
    }, showEditConfigParamWinFrm: function (item) {
      
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
       
    },
    showPreviousDocumentVersions: function (item) {
        
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            reg_doccontrolreview_id = record.get('reg_doccontrolreview_id'),
            directorate_name = record.get('directorate_name'),
            directorate_unit = record.get('directorate_unit'),
            document_type = record.get('document_type'),
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            childXtype = Ext.widget(childXtype);
            childXtype.setHeight(300);
        funcShowCustomizableWindow(winTitle, winWidth, childXtype, 'customizablewindow');
        childXtype.down('hiddenfield[name=reg_doccontrolreview_id]').setValue(reg_doccontrolreview_id);
        childXtype.down('displayfield[name=directorate_name]').setValue(directorate_name);
        childXtype.down('displayfield[name=directorate_unit]').setValue(directorate_unit);
        childXtype.down('displayfield[name=document_type]').setValue(document_type);
    },
    
    funcChangeDirectorates:function(cbo,newVal){
            var frm = cbo.up('form'),
                 directorate_unitStr = frm.down('combo[name=directorate_unit_id]').getStore();
                 
                 var filters = {directorate_id:newVal},
                    filters = JSON.stringify(filters);
                    directorate_unitStr.removeAll();
                    directorate_unitStr.load({params:{filters:filters} });
              
    },
    funcChangeDirectoratesOnGrid:function(cbo,newVal){
        var grid = cbo.up('grid'),
             directorate_unitStr = grid.down('combo[name=directorate_unit_id]').getStore();
             
             var filters = {directorate_id:newVal},
                filters = JSON.stringify(filters);
                directorate_unitStr.removeAll();
                directorate_unitStr.load({params:{filters:filters} });
                Ext.data.StoreManager.lookup('controllleddocumentsaccessstr').reload();
},
    
    saveControlDocumentsAccessDetails: function (btn) {
        var me = this,
            url = btn.action_url,
            form_xtype = btn.up('form'),
            win = form_xtype.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID);
        var frm = form_xtype.getForm();
            
        if (frm.isValid()) {
            frm.submit({
                url: url,
                waitMsg: 'Please wait...',
                params:{
                    '_token': token,
                },
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
    doDeleteConfigWidgetParam: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
    },previewUploadedDocument: function (item) {
        var btn = item.up('button'),
            download = 0,
            record = btn.getWidgetRecord(),
            node_ref = record.get('node_ref');
            application_code = record.get('application_code');
            uploadeddocuments_id = record.get('uploadeddocuments_id');
            if(node_ref != ''){
                Ext.Ajax.request({
                    url: 'documentmanagement/getApplicationDocumentDownloadurl',
                    method: 'GET',
                    params: {
                        node_ref: node_ref,
                        application_code:application_code,
                        uploadeddocuments_id:uploadeddocuments_id
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success;
                        document_url = resp.document_url;
                        if (success == true || success === true) {
                            if (download == 1 || download === 1) {
                                download_report(document_url);
                            } else {
                                print_report(document_url);
                            }
                        } else {
                            toastr.error(resp.message, 'Failure Response');
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
                        toastr.error('Error downloading data: ' + errorThrown, 'Error Response');
                    }
                });
            }
            else{
                toastr.error('Document Not Uploaded', 'Failure Response');
            }
            
    
    },
    
    functDownloadAppDocument:function(node_ref,download){

            
    
    
    },
    modifyUploadGridForDocumentsControl: function(grid, object) {
        grid.columns[2].setVisible(false);
        grid.down('button[name=add_upload]').show_assessor = false;
    },
    navigate: function(btn) {
        var pnl = btn.up('panel'),
            progress = pnl.down('#progress_tbar'),
            progressItems = progress.items.items;
       if(btn.name == "next_btn"){
           pnl.setActiveItem(1);
           progressItems[0].setPressed(false);
           progressItems[1].setPressed(true);
       }else{
           pnl.setActiveItem(0);
           progressItems[0].setPressed(true);
           progressItems[1].setPressed(false);

       }
    },
    updateDistributionType: function (combo, newVal, oldVal, eopts) {
        var form = combo.up('form'),
            pnl = form.up('panel'),
            gridStore = pnl.down('grid').getStore();
        if(newVal == 1 && gridStore.getCount() > 0){
            var me = this;
            Ext.MessageBox.confirm('Confirm', 'The option revokes the already assaigned users, Continue?', function (button) {
            if (button === 'yes') {
               var mainTabPnl = combo.up('#contentPanel'),
                   containerPnl = mainTabPnl.getActiveTab(),
                   active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue();
                me.revokeDistributionUserList(active_application_id);
            }else{
                combo.setValue(2);
            }});
        }else{
            //fg
        }
    },
    clearDistributionList: function (btn) {
        var me = this,
               mainTabPnl = btn.up('#contentPanel'),
               containerPnl = mainTabPnl.getActiveTab(),
               active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue();
            this.revokeDistributionUserList(active_application_id);
    },
    revokeDistributionUserList: function(application_id, record_id = null) {
        Ext.getBody().mask('please wait');
        Ext.Ajax.request({
                    url: 'controldocumentsmng/revokeDistributionUserList',
                    method: 'GET',
                    params: {
                        application_id: application_id,
                        record_id: record_id,
                        '_token':token
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success;
                            message = resp.message;
                            Ext.getStore('documentdistributionusersStr').reload();
                        if (success == true || success === true) {
                            toastr.success(message, "Success Response");
                        } else {
                            toastr.error(resp.message, 'Failure Response');
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
                        toastr.error(errorThrown, 'Error Response');
                    }
                });
    },
    saveDistributionDetails: function (btn) {
        var form = btn.up('form'),
            panel = form.up('panel'),
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue();
        if (form.isValid()) {
            var distribution_type = form.down('combo[name=distribution_type_id]').getValue(),
                gridStore = panel.down('grid').getStore();
             if(distribution_type == 2 && gridStore.getCount() < 1){
                 toastr.warning("please select at least one user for access", "Select Access users");
                 return false;
             }
             if(active_application_id == 0 ){
                 toastr.warning("please save the application first", "Save the application first");
                 return false;
             }

             form.submit({
                url: "usermanagement/saveUserCommonData",
                waitMsg: 'Please wait...',
                params: {application_id: active_application_id},
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        record_id = resp.record_id;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        form.down('hiddenfield[name=id]').setValue(record_id);
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
    loadDistributionDetailsForm: function (form) {
       var  mainTabPnl = form.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue();
        Ext.getBody().mask('please wait');
        Ext.Ajax.request({
                    url: 'controldocumentsmng/getAccessControlDetails',
                    method: 'GET',
                    params: {
                        table_name: 'tra_doccontrolaccess_management',
                        application_id : active_application_id,
                        '_token':token
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success;
                            message = resp.message;
                        if (success == true || success === true) {
                            results = resp.results;
                            if (results === undefined || results.length == 0) {
                                    return false;
                                }
                            obj = results[0];
                            model = Ext.create('Ext.data.Model', obj);
                            form.loadRecord(model);
                        } else {
                            toastr.error(resp.message, 'Failure Response');
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
                        toastr.error(errorThrown, 'Error Response');
                    }
                });
    },
    deleteDocumentDistributionUser: function (btn) {
        var record = btn.getWidgetRecord(),
            record_id = record.get('id'),
               mainTabPnl = btn.up('#contentPanel'),
               containerPnl = mainTabPnl.getActiveTab(),
               active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue();
            this.revokeDistributionUserList(active_application_id, record_id);
    },
    saveDocumentDistributionUserList: function (button) {
       var me = this,
            grid = button.up('grid'),
            application_id = grid.down('hiddenfield[name=application_id]').getValue(),
            store = grid.getStore(),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected = [];
        if (!sm.hasSelection()) {
            toastr.warning('No record selected. Please select a record(s) to add!!', 'Warning Response');
            return false;
        }
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to include the selected group(s)?', function (btn) {
            if (btn === 'yes') {
                Ext.getBody().mask('Please wait...');
                Ext.each(selected_records, function (item) {
                    selected.push(item.data.id);
                });
                Ext.Ajax.request({
                    url: 'controldocumentsmng/saveDocumentDistributionUserList',
                    method: 'POST',
                    params: {
                        application_id: application_id,
                        group_id: JSON.stringify(selected),
                        '_token': token
                    },
                    headers: {
                        'Authorization':'Bearer '+access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success || success == true || success === true) {
                            toastr.success(message, 'Success Response!!');
                            Ext.getStore('documentdistributionusersStr').reload();
                            grid.up('window').close();
                        } else {
                            toastr.error(message, 'Failure Response!!');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        toastr.warning(message, 'Failure Response!!');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },

});