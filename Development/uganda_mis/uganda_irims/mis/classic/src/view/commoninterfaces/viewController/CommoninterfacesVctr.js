Ext.define('Admin.view.commoninterfaces.viewControllers.CommoninterfacesVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.commoninterfacesVctr',

    init: function () {

    },printInvoice: function (item) {
        this.fireEvent('printInvoice', item);
    },
    setPremiseRegGridsStore: function (obj, options) {
        this.fireEvent('setPremiseRegGridsStore', obj, options);
    }, setParamCombosStore: function (obj, options) {
        this.fireEvent('setParamCombosStore', obj, options);
    },setDynamicTreeGridStore: function (obj, options) {
        this.fireEvent('setGridTreeStore', obj, options);
    },  receiveInvoicePayment: function(item){
        
        this.fireEvent('showPaymentReceptionForm', item);

    },  funConfirmUploadedPaymentsDetails: function(item){
        
        this.fireEvent('funConfirmUploadedPaymentsDetails', item);

    },showGeneralAppAppQueries:function(btn){
        this.fireEvent('showGeneralAppAppQueries', btn);

    },
    showAddApplicationCapaForm: function (btn) {
        var childXtype = btn.childXtype,
        win_title = btn.win_title,
            form = Ext.widget(childXtype),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            // item_resp_id = grid.down('hiddenfield[name=item_resp_id]').getValue(),
            module_id = grid.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
            application_code = grid.down('hiddenfield[name=application_code]').getValue(),
            workflow_stage_id = grid.down('hiddenfield[name=workflow_stage_id]').getValue(),
            process_id = grid.down('hiddenfield[name=process_id]').getValue(),
            section_id = grid.down('hiddenfield[name=section_id]').getValue(),
            win = grid.up('window');
        form.down('hiddenfield[name=module_id]').setValue(module_id);
        form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        form.down('hiddenfield[name=application_code]').setValue(application_code);
        form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        form.down('hiddenfield[name=process_id]').setValue(process_id);
        form.down('hiddenfield[name=section_id]').setValue(section_id);
        form.setHeight(height);
       

        funcShowCustomizableWindow(win_title, "90%", form, 'customizablewindow');
    },
    showPaymentReceiptsWin: function(item){
        var btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            invoice_no = record.get('invoice_no');
        this.fireEvent('showInvoiceReceipts', invoice_no);
    }, printColumnReceipt: function (item) {
        var record = item.getWidgetRecord(),
            payment_id = record.get('id');
        this.fireEvent('printReceipt', payment_id);
    },
    onEditOnlineQuery: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            application_id = grid.down('hiddenfield[name=application_id]').getValue(),
            application_code = grid.down('hiddenfield[name=application_code]').getValue(),
            sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
            module_id = grid.down('hiddenfield[name=module_id]').getValue(),

            win = grid.up('window'),
            queriesFrm = Ext.widget('onlinequeriesfrm'),
            gridHeight = grid.getHeight();
        queriesFrm.loadRecord(record);
        queriesFrm.setHeight(gridHeight);

        queriesFrm.down('hiddenfield[name=application_id]').setValue(application_id);
        queriesFrm.down('hiddenfield[name=application_code]').setValue(application_code);

        queriesFrm.down('hiddenfield[name=module_id]').setValue(module_id);
        queriesFrm.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);


        grid.hide();
        win.add(queriesFrm);
    },

    backToOnlineQueries: function (btn) {
        var queriesFrm = btn.up('form'),
            win = queriesFrm.up('window'),
            grid = win.down('grid');
        win.remove(queriesFrm, true);
        grid.show();
    },
    onAddOnlineQuery: function (btn) {
        var grid = btn.up('grid'),
            win = grid.up('window'),
            application_id = grid.down('hiddenfield[name=application_id]').getValue(),
            application_code = grid.down('hiddenfield[name=application_code]').getValue(),
            sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
            module_id = grid.down('hiddenfield[name=module_id]').getValue(),
            queriesFrm = Ext.widget('onlinequeriesfrm'),
            gridHeight = grid.getHeight();
        queriesFrm.down('hiddenfield[name=application_id]').setValue(application_id);
        queriesFrm.down('hiddenfield[name=application_code]').setValue(application_code);

        queriesFrm.down('hiddenfield[name=module_id]').setValue(module_id);
        queriesFrm.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        queriesFrm.setHeight(gridHeight);
        grid.hide();
        win.add(queriesFrm);
    },
    saveOnlineQuery: function (btn) {
        var action_url = btn.action_url,
            form = btn.up('form'),
            win = form.up('window'),
            grid = win.down('grid'),
            store = grid.getStore(),
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
                        store.removeAll();
                        store.load();
                        win.remove(form, true);
                        grid.show();
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
    showWinAddApplicationUnstrcuturedQueryForm: function (btn) {
        var form = Ext.widget('applicationunstructuredqueriesfrm'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            module_id = grid.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = grid.down('hiddenfield[name=section_id]').getValue(),
            application_code = grid.down('hiddenfield[name=application_code]').getValue();
            form.down('hiddenfield[name=module_id]').setValue(module_id);
            form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            form.down('hiddenfield[name=section_id]').setValue(section_id);
            winWidth = '70%';
            form.down('hiddenfield[name=application_code]').setValue(application_code);
            form.setHeight(height);

        funcShowCustomizableWindow('GCP Inspection Non-Conformance Observation(s)', winWidth, form, 'customizablewindow');
    },

    showAddApplicationUnstrcuturedQueryForm: function (btn) {
        var form = Ext.widget('applicationunstructuredqueriesfrm'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            module_id = grid.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = grid.down('hiddenfield[name=section_id]').getValue(),
            application_code = grid.down('hiddenfield[name=application_code]').getValue(),
            win = grid.up('window');
            form.down('hiddenfield[name=module_id]').setValue(module_id);
            form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            form.down('hiddenfield[name=section_id]').setValue(section_id);

            form.down('hiddenfield[name=application_code]').setValue(application_code);
            form.setHeight(height);
           // grid.hide();
           // win.add(form);
           funcShowCustomizableWindow('Query', "60%", form, 'customizablewindow');
    },

    funcAddquerychecklistitems: function (btn) {
        var frm = btn.up('form'),
            height = frm.getHeight(),
            module_id = frm.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = frm.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = frm.down('hiddenfield[name=section_id]').getValue(),
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            form = Ext.widget(childXtype);


        form.down('hiddenfield[name=module_id]').setValue(module_id);
        form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        form.down('hiddenfield[name=section_id]').setValue(section_id);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');

    },


    doDeleteApplicationRegWidgetParam: function (item) {
        //if (this.fireEvent('checkFullAccess')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
        this.fireEvent('deleteRecord', id, table_name, storeID, url);

    },

    saveUnstructuredApplicationQuery: function (btn) {
        var me = this,
            form = btn.up('form'),
            is_structured = form.down('hiddenfield[name=is_structured]').getValue(),
            application_code = form.down('hiddenfield[name=application_code]').getValue(),
            query_id = form.down('hiddenfield[name=query_id]').getValue();
            reload_base = btn.reload_base,
            action_url = btn.action_url;
            win = form.up('window');
            frm = form.getForm();

        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        
                        if(Ext.getStore('checklistitemsqueriesstr')){
                            store = Ext.getStore('checklistitemsqueriesstr');
                            win.close();
                            store.removeAll();
                            store.load({params: {application_code: application_code,query_id:query_id,is_structured:is_structured}});

                        }
                        if(Ext.getStore('applicationunstructuredqueriesstr')){
                            store = Ext.getStore('applicationunstructuredqueriesstr');
                            win.close();
                            store.removeAll();
                            store.load({params: {application_code: application_code,query_id:query_id,is_structured:is_structured}});

                        }
                        //check the other store 

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
    backToApplicationQueriesGrid: function (btn) {
        var form = btn.up('form'),
            win = form.up('window'),
            grid = win.down('grid');
        win.remove(form, true);
        grid.show();
    },

    functionQueryaction: function (grid, rowIndex, status_id) {

        var store = grid.store,
            record = store.getAt(rowIndex);
        win = grid.up('window'),
            record_id = record.get('id'),
            application_id = win.down('hiddenfield[name=application_id]').getValue();
        application_code = win.down('hiddenfield[name=application_code]').getValue();

        //get the document path
        Ext.getBody().mask('Closing query details..');

        Ext.Ajax.request({
            url: 'premiseregistration/onOnlineApplicationActionQueries',
            method: 'POST',
            params: {
                record_id: record_id,
                application_id: application_id,
                application_code: application_code,
                status_id: status_id
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
                    toastr.success(message, 'Response');
                    store.removeAll();
                    store.load()
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

    },
    onActionCloseInitialQuery: function (grid, rowIndex,) {
        this.functionQueryaction(grid, rowIndex, 4)
    },
    onActionOpenInitialQuery: function (grid, rowIndex,) {
        this.functionQueryaction(grid, rowIndex, 1)
    },
    onDeleteOnlineQuery: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            store = grid.store,
            record = btn.getWidgetRecord(),
            win = grid.up('window'),
            record_id = record.get('id'),

            status_id = record.get('status_id'),
            application_id = win.down('hiddenfield[name=application_id]').getValue();
        application_code = win.down('hiddenfield[name=application_code]').getValue();

        //get the document path
        Ext.getBody().mask('Deleting query details..');

        Ext.Ajax.request({
            url: 'premiseregistration/onDeleteOnlineApplicationQueries',
            method: 'POST',
            params: {
                record_id: record_id,
                application_id: application_id,
                application_code: application_code,
                status_id: status_id
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
                    toastr.success(message, 'Response');
                    store.removeAll();
                    store.load()
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
    },
    setProductRegGridsStore: function (obj, options) {
        this.fireEvent('setProductRegGridsStore', obj, options);
    },
    setProductRegGridsStore: function (obj, options) {
        this.fireEvent('setProductRegGridsStore', obj, options);
    },
    setPremiseRegCombosStore: function (obj, options) {
        this.fireEvent('setPremiseRegCombosStore', obj, options);
    },

    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
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

    setConfigCombosProductfilterStore: function (obj, options) {
        this.fireEvent('setConfigCombosProductfilterStore', obj, options);
    },

    setCommonGridsStore: function (obj, options) {
        this.fireEvent('setCommonGridsStore', obj, options);
    },

    setParamCombosStore: function (obj, options) {
        this.fireEvent('setParamCombosStore', obj, options);
    },
    doSavePrecheckingecommendationDetails: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),

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
    doCreateCommonParamWin: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            storeID = btn.storeID,
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

    showEditCommonParamParamWinFrm: function (item) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
    },

    doDeleteCommonParamWidgetParam: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
    },

    showApplicationDocUploadWin: function (btn) {
        var mainTabPnl = btn.up('#contentPanel'),
            container = mainTabPnl.getActiveTab(),
            process_id = container.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage = container.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_code = container.down('hiddenfield[name=active_application_code]').getValue();
        this.fireEvent('showDocUploadWin', btn, process_id, workflow_stage, application_code);
    },

    updateApplicationDocUploadWin: function (item) {

        var me = this,
            btn = item.up('button'),
            mainTabPnl = item.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            grid = btn.up('treepanel'),
            table_name = grid.table_name,
            upload_tab = grid.upload_tab,
            application_code = record.get('application_code'),
            document_type_id = record.get('document_type_id'),
            document_requirement = record.get('document_requirement_id'),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            form = Ext.widget(childXtype);
            if(application_code <1){
                toastr.error('Missing document to update, Click on the Upload Button and Proceed', 'Failure Response');
                return;
            }
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        var store = Ext.getStore('document_requirementsStr');
        form.down('button[name=upload_file_btn]').upload_tab = upload_tab;
        form.down('button[name=upload_file_btn]').storeID = 'applicationDocumentsUploadsStr';
        var doctype_id = form.down('combo[name=doctype_id]');
        doctype_id.store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
       
        var document_requirement_id = form.down('combo[name=document_requirement_id]');
        doctype_id.setValue(document_type_id);
        document_requirement_id.setValue(document_requirement);
        doctype_id.setReadOnly(true);
        document_requirement_id.setReadOnly(true)
    },

    previewPreviousUploadedDocument: function (item) {
        var me = this,
            btn = item.up('button'),
            storeId = item.storeId,
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            grid = btn.up('treepanel'),
            table_name = grid.table_name,
            record_id = record.get('id'),
            form = Ext.widget(childXtype);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        var store = Ext.getStore(storeId);
        store.removeAll();
        store.load({params: {document_upload_id: record_id, table_name: table_name}});
    },



    onDeleteApplicationDocument: function (item) {

      
        var btn = item.up('button'),
            download = item.download,
            record = btn.getWidgetRecord(),
            grid = btn.up('treepanel'),
            store = grid.store,
            table_name = grid.table_name,
            document_type_id = grid.document_type_id,
            node_ref = record.get('node_ref'),
            record_id = record.get('id'),
            application_code = record.get('application_code');
        //get the document path
        Ext.getBody().mask('Deleting Uploaded Document..');

        Ext.Ajax.request({
            url: 'documentmanagement/onApplicationDocumentDelete',
            method: 'POST',
            params: {
                node_ref: node_ref,
                record_id: record_id,
                application_code: application_code
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
                    toastr.success(message, 'Response');
                    store.removeAll();
                    store.load({
                        params: {
                            table_name: table_name,
                            document_type_id: document_type_id,
                            application_code: application_code
                        }
                    })
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
    },
    onDeleteNonStructureApplicationDocument: function (item) {
        var btn = item.up('button'),
            download = item.download,

            record = btn.getWidgetRecord(),
            grid = btn.up('grid'),
            store = grid.store,
            table_name = grid.table_name,
            document_type_id = grid.document_type_id,

            node_ref = record.get('node_ref'),
            record_id = record.get('id'),
            application_code = record.get('application_code');
        //get the document path
        Ext.getBody().mask('Deleting Uploaded Document..');

        Ext.Ajax.request({
            url: 'documentmanagement/onDeleteNonStructureApplicationDocument',
            method: 'POST',
            params: {
                node_ref: node_ref,
                record_id: record_id,
                table_name: table_name
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
                    toastr.success(message, 'Response');
                    store.removeAll();
                    store.load()
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
    },
    cancelAddApplicationComment: function (btn) {
        var form = btn.up('form'),
            panel = form.up('panel'),
            grid = panel.down('grid'),
            add_btn = grid.down('button[name=add_btn]');
        form.setVisible(false);
        add_btn.setDisabled(false);
    },

    showAddApplicationComment: function (btn) {
        btn.setDisabled(true);
        var grid = btn.up('grid'),
            panel = grid.up('panel'),
            form = panel.down('form');
        form.setVisible(true);
    },

    showEditApplicationComment: function (item) {
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

    doDeleteCommonWidgetParam: function (item) {
        //if (this.fireEvent('checkFullAccess')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
        this.fireEvent('deleteRecord', id, table_name, storeID, url);

    },
    funcAddSampleTestAnalysisrequest: function (btn) {
        var grid = btn.up('grid'),
            panel = grid.up('panel[name=sampleanalysistestrequestspnl]'),
            section_id = panel.down('hiddenfield[name=section_id]').getValue(),
            module_id = panel.down('hiddenfield[name=module_id]').getValue(),
            sample_id = panel.down('hiddenfield[name=sample_id]').getValue(),
            product_id = panel.down('hiddenfield[name=misproduct_id]').getValue(),
            code_ref_no = panel.down('hiddenfield[name=code_ref_no]').getValue(),
            childXtype,
            childObject;
        if (section_id == 1) {
            childXtype = 'foodsampleanalysistestrequestswizard';
        } else if (section_id == 2) {
            childXtype = 'drugssampleanalysistestrequestswizard';
        } else if (section_id == 3) {
            childXtype = 'cosmeticssampleanalysistestrequestswizard';
        } else if (section_id == 4) {
            childXtype = 'medicaldevicessampleanalysistestrequestswizard';
        }
        childXtype = 'sampleanalysistestrequestswizard';
        childObject = Ext.widget(childXtype);
        var sampleDetailsFrm = childObject.down('commonsampledetailsfrm'),
            tabPnl = childObject.down('tabpanel');
        childObject.down('displayfield[name=reference_no]').setValue(code_ref_no);
        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            sampleDetailsFrm.down('combo[name=product_form_id]').setHidden(false);
            sampleDetailsFrm.down('textfield[name=common_name]').setHidden(false);
        } else if (section_id == 4 || section_id === 4) {//medical devices
            sampleDetailsFrm.down('combo[name=device_type_id]').setHidden(false);
        } else {
            sampleDetailsFrm.down('combo[name=dosage_form_id]').setHidden(false);
            tabPnl.items.getAt(1).tab.setHidden(false);
        }
        if (sample_id != '' || product_id != '') {

            this.funcAddPMSSampleTestAnalysisRequest(module_id, panel, childObject, sample_id, product_id);
        } else {
            this.funcAddProductsSampleTestAnalysisRequest(panel, childObject);
        }
    },
    funcAddProductsSampleTestAnalysisRequest: function (panel, childObject) {
        panel.removeAll();
        panel.add(childObject)
    },

    funcAddPMSSampleTestAnalysisRequest: function (module_id, panel, childObject, sample_id, product_id) {
        var form = childObject.down('form'),
            mask = new Ext.LoadMask({
                target: panel,
                msg: 'Please wait...'
            });
        if (module_id == 5) {
            var action_url = 'surveillance/getSurveillanceSampleDetails';
            params = {
                sample_id: sample_id,
            };
        } else if (module_id == 1) {
            var action_url = 'productregistration/getProductSampleDetails';
            params = {
                product_id: product_id,
            };
        }
        form.down('textfield[name=brand_name]').setReadOnly(true);
        form.down('button[action=search_sample]').setDisabled(true);
        //form.down('combo[name=dosage_form_id]').setReadOnly(true);
        form.down('textfield[name=batchno]').setReadOnly(false);
        //form.down('combo[name=classification_id]').setReadOnly(true);
        form.down('datefield[name=manufacturedate]').setReadOnly(false);
        form.down('datefield[name=expirydate]').setReadOnly(false);
        form.down('textfield[name=pack_size]').setReadOnly(false);
        form.down('combo[name=pack_unit_id]').setReadOnly(false);


        mask.show();
        Ext.Ajax.request({
            method: 'GET',
            url: action_url,
            params: params,
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    results = resp.results;
                if (success || success == true || success === true) {
                    //toastr.success(message, 'Success Response!!');
                    if (results) {
                        var model = Ext.create('Ext.data.Model', results);
                        form.loadRecord(model);
                        childObject.down('displayfield[name=reference_no]').setValue(results.sample_refno);
                    }
                    panel.removeAll();
                    panel.add(childObject);
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

    funcActiveSamplesOtherInformationTab: function (tab) {
        this.fireEvent('funcActiveSamplesOtherInformationTab', tab);
    },

    editSsampleanalysistestrequests: function (item) {//kip here
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            panel = btn.up('panel[name=sampleanalysistestrequestspnl]'),
            section_id = panel.down('hiddenfield[name=section_id]').getValue(),
            code_ref_no = panel.down('hiddenfield[name=code_ref_no]').getValue(),
            childXtype,
            childObject;
        if (section_id == 1) {
            childXtype = 'foodsampleanalysistestrequestswizard';
        } else if (section_id == 2) {
            childXtype = 'drugssampleanalysistestrequestswizard';
        } else if (section_id == 3) {
            childXtype = 'cosmeticssampleanalysistestrequestswizard';
        } else if (section_id == 4) {
            childXtype = 'medicaldevicessampleanalysistestrequestswizard';
        }
        childXtype = 'sampleanalysistestrequestswizard';
        childObject = Ext.widget(childXtype);
        var sampleDetailsForm = childObject.down('commonsampledetailsfrm'),
            sampleDetailsFrm = sampleDetailsForm.getForm(),
            tabPnl = childObject.down('tabpanel');
        childObject.down('displayfield[name=reference_no]').setValue(code_ref_no);
        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            sampleDetailsForm.down('combo[name=product_form_id]').setHidden(false);
            sampleDetailsForm.down('textfield[name=common_name]').setHidden(false);
        } else if (section_id == 4 || section_id === 4) {//medical devices
            sampleDetailsForm.down('combo[name=device_type_id]').setHidden(false);
        } else {
            sampleDetailsForm.down('combo[name=dosage_form_id]').setHidden(false);
            tabPnl.items.getAt(1).tab.setHidden(false);
        }
        sampleDetailsFrm.loadRecord(record);
        panel.removeAll();
        panel.add(childObject);
        panel.down('displayfield[name=laboratoryreference_no]').setValue(record.get('reference_no'));
        panel.down('displayfield[name=laboratory_no]').setValue(record.get('laboratory_no'));
        panel.down('displayfield[name=reference_no]').setValue(record.get('reference_no'));
    },

    viewsampleanalysistestResults: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            requeststatus_id = record.get('requeststatus_id'),
            panel = btn.up('panel[name=sampleanalysistestrequestspnl]'),
            section_id = panel.down('hiddenfield[name=section_id]').getValue(),
            code_ref_no = panel.down('hiddenfield[name=code_ref_no]').getValue(),
            childXtype;
        if (requeststatus_id > 4) {
            if (section_id == 1) {
                childXtype = 'foodsampleanalysistestresultswizard';
            } else if (section_id == 2) {
                childXtype = 'drugssampleanalysistestresultswizard';
            } else if (section_id == 3) {
                childXtype = 'cosmeticssampleanalysistestresultswizard';
            } else if (section_id == 4) {
                childXtype = 'medicaldevicessampleanalysistestresultswizard';
            }
            var childObject = Ext.widget(childXtype),
                form = childObject.down('#sampledetailsfrm'),
                frm = form.getForm();
            frm.loadRecord(record)
            panel.removeAll();
            panel.add(childObject);
            panel.down('displayfield[name=laboratoryreference_no]').setValue(record.get('reference_no'));
            panel.down('displayfield[name=laboratory_no]').setValue(record.get('laboratory_no'));
            panel.down('displayfield[name=reference_no]').setValue(record.get('reference_no'));
            panel.down('hiddenfield[name=labreference_no]').setValue(record.get('reference_no'));
        } else {
            toastr.warning('Sample Analysis Results not complete or approved', 'Warning Response!!');
        }
    },

    funcReturnBackSampleTestAnalysisrequest: function (btn) {
        var form = btn.up('form'),
            childXtype = btn.childXtype,
            childObject = Ext.widget(childXtype),
            panel = form.up('panel');
        form.destroy();
        panel.add(childObject)

    },

    funcSampleApplicationSubmissionWin: function (btn) {
        var form = btn.up('form'),
            childXtype = btn.childXtype,
            childObject = Ext.widget(childXtype),
            panel = form.up('panel[name=sampleanalysistestrequestspnl]'),
            application_code = panel.down('hiddenfield[name=application_code]').getValue(),
            sample_app_code = panel.down('hiddenfield[name=sample_application_code]').getValue(),
            limssample_id = form.down('hiddenfield[name=limssample_id]').getValue(),
            mask = new Ext.LoadMask(
                {
                    msg: 'Please wait...',
                    target: panel
                }
            );
        if (sample_app_code) {
            application_code = sample_app_code;
        }
        if (limssample_id) {
            Ext.Msg.prompt("Sample Test Request Submissions", "Please enter the Submission Remarks", function (btnText, sInput) {
                if (btnText === 'ok') {
                    mask.show();
                    Ext.Ajax.request({
                        url: 'sampleanalysis/funcSampleApplicationSubmissionWin',
                        params: {
                            limssample_id: limssample_id,
                            application_code: application_code,
                            remarks: sInput,
                            _token: token
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        },
                        success: function (response) {
                            mask.hide();
                            var resp = Ext.JSON.decode(response.responseText),
                                success = resp.success,
                                message = resp.message;
                            if (success || success == true || success === true) {
                                toastr.success(message, 'Success Response!!');
                                form.destroy();
                                panel.add(childObject)

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
                }
            }, this);

        } else {
            toastr.error('Error: Save Sample Test request to submit', 'Error Response');
        }

    },

    viewsampleanalysistestrequestsProcesses: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            laboratoryreference_no = record.get('reference_no'),
            childXtype = item.childXtype,

            winTitle = item.winTitle,
            winWidth = item.winWidth;

        var child = Ext.widget(childXtype);
        child.setHeight(450)
        child.down('hiddenfield[name=labreference_no]').setValue(laboratoryreference_no);
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');


    }, printSampleTestRequestReview: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            reference_no = record.get('reference_no'),

            report_url = lims_baseurl + 'reports/reports/generateTestReviewReport?reference_no=' + reference_no;
        print_report(report_url);

    },printSampleCertificate:  function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            reference_no = record.get('reference_no'),

            report_url = lims_baseurl + 'reports/reports/printSampleCertificate?reference_no=' + reference_no;
        print_report(report_url);

    },printSampleCertificate:  function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            reference_no = record.get('reference_no'),

            report_url = lims_baseurl + 'reports/reports/printSampleCertificate?reference_no=' + reference_no;
        print_report(report_url);

    },printSampleSummaryReport:  function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            sample_id = record.get('sample_id'),

            report_url = lims_baseurl + 'reports/reports/printReport?sample_id=' + sample_id;
        print_report(report_url);

    },

    quickNavigationSample: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel'),
            limssample_id = motherPnl.down('hiddenfield[name=limssample_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;

        if (step > 0) {
            var thisItem = progressItems[step];
            if (!limssample_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save sample Test Request details first!!', 'Warning Response');
                return false;
            }
        }

        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();
        if (step == 0) {
            motherPnl.getViewModel().set('atBeginning', true);
        } else if (step == 1) {
            motherPnl.getViewModel().set('atBeginning', false);
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
        }
        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();

    },
    onPrevCardClickSample: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigateSampleTestRequest(btn, wizardPnl, 'prev');
    },
    onNextCardClickSample: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigateSampleTestRequest(btn, wizardPnl, 'next');
    },
    setConfigCombosSampleSectionfilterStore: function (obj, options) {
        this.fireEvent('setConfigCombosSampleSectionfilterStore', obj, options);
    },
    funcAddTestAnalysisParameter: function (btn) {
        var childXtype = btn.childXtype,
            child = Ext.widget(childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth;
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
    },
    //
    navigateSampleTestRequest: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            motherPnl = wizardPanel.up('panel'),
            limssample_id = motherPnl.down('hiddenfield[name=limssample_id]').getValue(),
            model = motherPnl.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());

        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }
            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }

    },
    doDeleteSampleTestDetailsdetails: function (item) {
        //if (this.fireEvent('checkFullAccess')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            limssample_id = record.get('limssample_id'),
            storeID = item.storeID,
            store = Ext.getStore(storeID),
            table_name = item.table_name,
            url = item.action_url;
        Ext.MessageBox.confirm('Delete', 'Are you sure to perform this action ?', function (btn) {
            if (btn === 'yes') {
                Ext.getBody().mask('Deleting record...');

                Ext.Ajax.request({
                    url: url,
                    method: 'POST',
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

    addGmpProductLinkageDetails: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            win = grid.up('window'),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype),
            manufacturing_site_id = grid.down('hiddenfield[name=manufacturing_site_id]').getValue(),
            reg_site_id = grid.down('hiddenfield[name=reg_site_id]').getValue(),
            saveBtn = childObject.down('button[name=save_details]');
        childObject.down('hiddenfield[name=manufacturing_site_id]').setValue(manufacturing_site_id);
        childObject.down('hiddenfield[name=reg_site_id]').setValue(reg_site_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
        childObject.getStore().load();
        saveBtn.handler = function () {
            me.saveGmpProductDetails(saveBtn, win);
        }
    },

    saveGmpProductDetails: function (btn, parent_win) {
        var products_grid = parent_win.down('grid'),
            win = btn.up('window'),
            lineGrid = win.down('grid'),
            manufacturing_site_id = lineGrid.down('hiddenfield[name=manufacturing_site_id]').getValue(),
            reg_site_id = lineGrid.down('hiddenfield[name=reg_site_id]').getValue(),
            products_sm = products_grid.getSelectionModel(),
            products_records = products_sm.getSelection(),
            line_sm = lineGrid.getSelectionModel(),
            line_records = line_sm.getSelection(),
            line_id = line_records[0].get('id'),
            products_selected = [],
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        Ext.each(products_records, function (record) {
            var product_id = record.get('product_id'),
                reg_product_id = record.get('reg_product_id'),
                obj = {product_id: product_id, reg_product_id: reg_product_id};
            products_selected.push(obj);
        });
        Ext.Ajax.request({
            url: 'gmpapplications/saveGmpProductInfoLinkage',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            jsonData: products_selected,
            params: {
                inspection_line_id: line_id,
                manufacturing_site_id: manufacturing_site_id,
                reg_site_id: reg_site_id
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success == true || success === true) {
                    win.close();
                    parent_win.close();
                    Ext.getStore('gmpproductslinkagedetailsstr').load();
                    toastr.success(message, 'Success Response');
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                mask.hide();
                var text = Ext.decode(response.responseText);
                toastr.error(text.message, "Response");
            }
        });
    },

    saveSampleSubmissionRemarks:function(btn){

        this.fireEvent('saveSampleSubmissionRemarks', btn);
        

    },
    showAddApplicationQueryForm: function (btn) {
        var childXtype = btn.childXtype,
        win_title = btn.win_title,
            form = Ext.widget(childXtype),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            // item_resp_id = grid.down('hiddenfield[name=item_resp_id]').getValue(),
            module_id = grid.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
            application_code = grid.down('hiddenfield[name=application_code]').getValue(),
            workflow_stage_id = grid.down('hiddenfield[name=workflow_stage_id]').getValue(),
            process_id = grid.down('hiddenfield[name=process_id]').getValue(),
            section_id = grid.down('hiddenfield[name=section_id]').getValue(),
            win = grid.up('window');
            form.down('hiddenfield[name=module_id]').setValue(module_id);
            form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            form.down('hiddenfield[name=application_code]').setValue(application_code);
            form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            form.down('hiddenfield[name=process_id]').setValue(process_id);
            form.down('hiddenfield[name=section_id]').setValue(section_id);
            form.setHeight(height);
            //grid.hide();
            //win.add(form);
            funcShowCustomizableWindow(win_title, "80%", form, 'customizablewindow');
    },

    showQueryPrevResponses: function (item) {
        var btn = item.up('button'),
            query_grid = btn.up('grid');
            if(query_grid.up('window')){
                var win = query_grid.up('window'),
                    width = win.getWidth();
            }else{
                var width = '60%';
            }
        var record = btn.getWidgetRecord(),
            query_id = record.get('id'),
            query = record.get('query'),
            grid = Ext.widget('prevqueryresponsesgrid');
        grid.down('hiddenfield[name=query_id]').setValue(query_id);
        grid.down('displayfield[name=query_desc]').setValue(query);
        funcShowCustomizableWindow('Query Responses', width, grid, 'customizablewindow');
    },checkSavedQuery: function(me){
        var pnl = me.up('panel'),
            query_id = pnl.down('hiddenfield[name=query_id]').getValue();
        if(Ext.getStore('applicationqueriesstr')){
                Ext.getStore('applicationqueriesstr').load();
            }
        if(query_id){
            //
        }else{
            me.setActiveTab(0);
            toastr.warning("Please save the Query Details First", 'Failure Response');
            return false;
        }
    },navigateQueryWizard: function(btn){
        var me_container = btn.up(),
            step = btn.nextStep,
            wizardPnl = me_container.up('#applicationRaiseQueryPnlId'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if(step == 1){
            var query_id = wizardPnl.down('hiddenfield[name=query_id]').getValue();
            if(query_id){
                //well
            }else{
                toastr.warning("Please save the Query Details First", 'Failure Response');
                return false;
            }
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.nextStep) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },
    saveChecklistApplicationQuery: function(btn){
        var form = btn.up('form'),
            frm = form.getForm(),
            pnl = form.up('panel'),
            me = this,
            checklistItemStr = pnl.down('checklistItemsQueriesGrid').getStore(),
           // pnl = panel.up('panel'),
            module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = pnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = pnl.down('hiddenfield[name=section_id]').getValue(),
            query_id = pnl.down('hiddenfield[name=query_id]').getValue(),
            application_code = pnl.down('hiddenfield[name=application_code]').getValue(),
            process_id = pnl.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = pnl.down('hiddenfield[name=workflow_stage_id]').getValue();
        if (frm.isValid()) {
            frm.submit({
                url: btn.action_url,
                waitMsg: 'Please wait...',
                method: 'POST',
                params: {
                    module_id:module_id,
                    sub_module_id:sub_module_id,
                    process_id: process_id,
                    section_id:section_id,
                    application_code:application_code,
                    workflow_stage_id:workflow_stage_id,
                    query_id: query_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        var query_id = response.record_id;
                        checklistItemStr.load();
                        if(Ext.getStore('applicationqueriesstr')){
                            Ext.getStore('applicationqueriesstr').load();
                        }
                        if(Ext.getStore('allQueriesViewGridStr')){
                            Ext.getStore('allQueriesViewGridStr').load();
                        }
                        pnl.down('hiddenfield[name=query_id]').setValue(query_id);
                        me.navigateQueryWizard(btn);
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
    
    saveReinspectiontApplicationQuery: function(btn){
        var form = btn.up('form'),
            frm = form.getForm(),
            pnl = form.up('panel'),
            me = this,
            checklistItemStr = pnl.down('reinspectionsrequestsitemsgrid').getStore(),
           // pnl = panel.up('panel'),
            module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = pnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = pnl.down('hiddenfield[name=section_id]').getValue(),
            query_id = pnl.down('hiddenfield[name=query_id]').getValue(),
            application_code = pnl.down('hiddenfield[name=application_code]').getValue(),
            process_id = pnl.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = pnl.down('hiddenfield[name=workflow_stage_id]').getValue();
        if (frm.isValid()) {
            frm.submit({
                url: btn.action_url,
                waitMsg: 'Please wait...',
                method: 'POST',
                params: {
                    module_id:module_id,
                    sub_module_id:sub_module_id,
                    process_id: process_id,
                    section_id:section_id,
                    application_code:application_code,
                    workflow_stage_id:workflow_stage_id,
                    query_id: query_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        var query_id = response.record_id;
                        checklistItemStr.load();
                        if(Ext.getStore('applicationqueriesstr')){
                            Ext.getStore('applicationqueriesstr').load();
                        }
                        
                        if(Ext.getStore('reinspectionsrequestsgridstr')){
                            Ext.getStore('reinspectionsrequestsgridstr').load();
                        }
                        if(Ext.getStore('reinspectionsrequestsitemsgridstr')){
                            Ext.getStore('reinspectionsrequestsitemsgridstr').load();
                        }
                        
                        
                        pnl.down('hiddenfield[name=query_id]').setValue(query_id);
                        me.navigateQueryWizard(btn);
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
    GenerateQueryInvoice: function(btn){
        var form = btn.up('form'),
            me = this,
            panel = form.up('panel'),
            //panel = pnl.up('panel'),
            query_id = panel.down('hiddenfield[name=query_id]').getValue(),
            record = form.getValues(),
            query_type = record.query_type_id;
        if(!query_id){
            toastr.error("Failed to locate Query Details", "Error on Passed Arguments");
            return false;
        }
        if(query_type != 1){
            toastr.error("Invoices only Allowed on Major Queries", "Error on Passed Arguments");
            return false;
        }
        Ext.MessageBox.confirm('Confirm', 'Generate Query Invoice ?', function (button) {
                if (button === 'yes') {
                        btn.query_id = query_id;
                        btn.application_feetype_id = 2;
                        me.funcGenerateQueryWizardApplicationInvoice(btn);
                    }
            });
    },
    funcGenerateQueryWizardApplicationInvoice: function(btn){
        var payment_pnl = Ext.widget('onlineapplicationgenerateinvoicesGrid');
        //cost parameters
        var panel = Ext.ComponentQuery.query("#applicationRaiseQueryPnlId")[0];
            var assessment_procedure_id = panel.down('hiddenfield[name=assessment_procedure_id]').getValue(),
            classification_id = panel.down('hiddenfield[name=classification_id]').getValue(),
            prodclass_category_id = panel.down('hiddenfield[name=prodclass_category_id]').getValue(),
            product_subcategory_id = panel.down('hiddenfield[name=product_subcategory_id]').getValue(),
            product_origin_id = panel.down('hiddenfield[name=product_origin_id]').getValue(),
            application_id = panel.down('hiddenfield[name=application_id]').getValue(),
            application_code = panel.down('hiddenfield[name=application_code]').getValue(),
            process_id = panel.down('hiddenfield[name=process_id]').getValue(),
            module_id = panel.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = panel.down('hiddenfield[name=section_id]').getValue(),
            curr_stage_id = panel.down('hiddenfield[name=workflow_stage_id]').getValue(),
            //status_type_id = panel.down('hiddenfield[name=status_type_id]').getValue(),
            application_status_id = panel.down('hiddenfield[name=application_status_id]').getValue(),
            applicationfeetype = btn.application_feetype_id,
            query_id = btn.query_id;
        //pass variables
        payment_pnl.down('hiddenfield[name=application_id]').setValue(application_id);
        payment_pnl.down('hiddenfield[name=application_code]').setValue(application_code);
        payment_pnl.down('hiddenfield[name=process_id]').setValue(process_id);
        payment_pnl.down('hiddenfield[name=module_id]').setValue(module_id);
        payment_pnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        payment_pnl.down('hiddenfield[name=section_id]').setValue(section_id);
        //payment_pnl.down('hiddenfield[name=curr_stage_id]').setValue(curr_stage_id);
        //payment_pnl.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
        // payment_pnl.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
        // payment_pnl.down('hiddenfield[name=assessment_procedure_id]').setValue(assessment_procedure_id);
        // payment_pnl.down('hiddenfield[name=classification_id]').setValue(classification_id);
        // payment_pnl.down('hiddenfield[name=prodclass_category_id]').setValue(prodclass_category_id);
        // payment_pnl.down('hiddenfield[name=product_subcategory_id]').setValue(product_subcategory_id);
        // payment_pnl.down('hiddenfield[name=product_origin_id]').setValue(product_origin_id);
        payment_pnl.down('hiddenfield[name=application_feetype_id]').setValue(applicationfeetype);
        payment_pnl.down('hiddenfield[name=query_id]').setValue(query_id);


        funcShowCustomizableWindow('Invoice Quotation', '70%', payment_pnl, 'customizablewindow');
    },
    ViewQueryInvoice: function(btn){
        var form = btn.up('form'),
            me = this,
            panel = form.up('panel'),
           // panel = pnl.up('panel'),
            invoice_id = panel.down('hiddenfield[name=invoice_id]').getValue(),
            record = form.getValues();
        if(!invoice_id){
            toastr.error("Failed to locate Query Invoice Details", "Error on Passed Arguments");
            return false;
        }
        this.fireEvent('printInvoiceById', invoice_id);
    },
   
    appDataAmmendmentStatusUpdate: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            action_url = item.action_url,
            status_id = item.status_id,
            title = item.title,
            grid = btn.up('grid'),
            win = grid.up('window'),
            store = grid.getStore(),
            id = record.get('id'),
            mask = new Ext.LoadMask(
                {
                    target: win,
                    msg: 'Please wait...'
                }
            );
            var title=  'Are you sure to '+title+'?';

        Ext.MessageBox.confirm('Action', title, function (button) {
            if (button === 'yes') {
                mask.show();
                Ext.Ajax.request({
                    url: action_url,
                    params: {
                        record_id: id,
                        status_id:status_id
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
            }
        });
    },
    showReQueryApplicationQueryForm: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            record = btn.getWidgetRecord(),
            item_resp_id = record.get('item_resp_id'),
            query_id = record.get('query_id'),
            win = grid.up('window'),
            module_id = grid.down('hiddenfield[name=module_id]').getValue(),
            application_code = grid.down('hiddenfield[name=application_code]').getValue(),
            section_id = grid.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = grid.down('hiddenfield[name=workflow_stage_id]').getValue(),
          //  process_id = grid.down('hiddenfield[name=process_id]').getValue(),
            sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue();
            if (!item_resp_id) {
                childXtype = 'applicationunstructuredqueriesfrm';
            }else{
                 childXtype = 'applicationqueryfrm';
            }
            form = Ext.widget(childXtype);
            form.loadRecord(record);
            form.setHeight(height);
            form.down('hiddenfield[name=module_id]').setValue(module_id);
            form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            form.down('hiddenfield[name=application_code]').setValue(application_code);
            form.down('hiddenfield[name=section_id]').setValue(section_id);
            //.down('hiddenfield[name=query_id]').setValue(query_id);
          //  form.down('hiddenfield[name=process_id]').setValue(process_id);
            
            //query details form


            form.down('htmleditor[name=query]').setReadOnly(false);
            form.down('textarea[name=comment]').allowBlank = false;
            form.down('textarea[name=comment]').setFieldLabel('Re-Query Comment');
            form.down('textarea[name=comment]').reset();
            form.down('button[action=save_requery]').setVisible(true);
            form.down('button[action=save_query]').setVisible(false);
            grid.hide();
            win.add(form);
    },

    showEditApplicationQueryForm: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            record = btn.getWidgetRecord(),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            application_code = record.get('application_code'),
            workflow_stage_id = record.get('workflow_stage_id'),
            query_id = record.get('query_id'),
            process_id = record.get('process_id'),
            query_id = record.get('query_id'),
            childXtype = item.childXtype,
            //form = Ext.widget(childXtype),//'applicationqueryfrm'
            win = grid.up('window'),
            panel, form;
        
        panel = Ext.widget(childXtype);
        panel.down('hiddenfield[name=module_id]').setValue(module_id);
        panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        panel.down('hiddenfield[name=section_id]').setValue(section_id);
        panel.down('hiddenfield[name=application_code]').setValue(application_code);
        panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        panel.down('hiddenfield[name=query_id]').setValue(query_id);
        panel.down('hiddenfield[name=process_id]').setValue(process_id);
        //query details form

        
        if(panel.down('hiddenfield[name=query_ref_id]')){
            panel.down('hiddenfield[name=document_type_id]').setValue(18);
            panel.down('hiddenfield[name=query_ref_id]').setValue(query_id);
            form = panel.down('form');
        }
        else{
            form =panel;
        }
        
        form.loadRecord(record);
        panel.setHeight(400);
        funcShowCustomizableWindow('Edit Query', '70%', panel, 'customizablewindow');
    },
    showEditApplicationQueryResponseForm: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            record = btn.getWidgetRecord(),
            item_resp_id = record.get('item_resp_id'),
            childXtype = item.childXtype,
            winWidth = item.winWidth,
            document_type_id =item.document_type_id,
            //form = Ext.widget(childXtype),//'applicationqueryfrm'
            win = grid.up('window'),
            module_id = grid.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
            application_code = grid.down('hiddenfield[name=application_code]').getValue(),
           // process_id = grid.down('hiddenfield[name=process_id]').getValue(),
            section_id = grid.down('hiddenfield[name=section_id]').getValue();


        panel = Ext.widget(childXtype);
        form = panel.down('form');
        grid = panel.down('previewproductDocUploadsGrid');
        form.down('hiddenfield[name=module_id]').setValue(module_id);
        form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        form.down('hiddenfield[name=section_id]').setValue(section_id);
        form.loadRecord(record);
        form.setHeight(500);
        grid.setHeight(500);

         grid.down('hiddenfield[name=module_id]').setValue(module_id);
        grid.down('hiddenfield[name=application_code]').setValue(application_code);

        grid.down('combo[name=applicable_documents]').setValue(document_type_id);
        funcShowCustomizableWindow('Query Responses', winWidth, panel, 'customizablewindow');

    },

    showEditApplicationManagerQueryForm: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            record = btn.getWidgetRecord(),
            item_resp_id = record.get('item_resp_id'),
            childXtype = item.childXtype,
            //form = Ext.widget(childXtype),//'applicationqueryfrm'
            win = grid.up('window'),
            module_id = grid.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = grid.down('hiddenfield[name=section_id]').getValue(),
            is_manager_query = grid.down('hiddenfield[name=is_manager_query]').getValue(),
            form;
        if (!item_resp_id) {
            childXtype = 'applicationunstructuredqueriesfrm';
        }
        form = Ext.widget(childXtype);
        if(form.down('htmleditor[name=manager_query_comment]')){

            form.down('htmleditor[name=manager_query_comment]').setVisible(true);
            if ((is_manager_query) && is_manager_query > 0) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                form.down('htmleditor[name=manager_query_comment]').setReadOnly(false);
            } else {

            }
            form.down('htmleditor[name=manager_query_comment]').setReadOnly(false);
        }

        form.down('hiddenfield[name=module_id]').setValue(module_id);
        form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        form.down('hiddenfield[name=section_id]').setValue(section_id);
        form.loadRecord(record);
        form.setHeight(height);
        grid.hide();
        win.add(form);
    },

    showEditApplicationUnstructuredQueryForm: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            record = btn.getWidgetRecord(),
            item_resp_id = record.get('item_resp_id'),
            childXtype = item.childXtype,
            //form = Ext.widget(childXtype),//'applicationqueryfrm'
            win = grid.up('window'),
            module_id = grid.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = grid.down('hiddenfield[name=section_id]').getValue(),
            is_manager_query = grid.down('hiddenfield[name=is_manager_query]').getValue(),
            is_manager_query_response = grid.down('hiddenfield[name=is_manager_query_response]').getValue(),
            form;
        if (!item_resp_id) {
            childXtype = 'applicationunstructuredqueriesfrm';
        }
        form = Ext.widget(childXtype);
        if ((is_manager_query) && is_manager_query > 0) {
            form.down('textfield[name=manager_query_comment]').setVisible(true);
            form.getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
            form.down('textfield[name=manager_query_comment]').setReadOnly(false);
        } else {
            form.down('textfield[name=manager_query_comment]').setReadOnly(true);
        }

        if ((is_manager_query_response) && is_manager_query_response > 0) {
            form.down('textfield[name=manager_queryresp_comment]').setVisible(true);
            form.getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
            form.down('textfield[name=manager_queryresp_comment]').setReadOnly(false);
        } else {
            form.down('textfield[name=manager_queryresp_comment]').setReadOnly(true);
        }

        form.down('hiddenfield[name=module_id]').setValue(module_id);
        form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        form.down('hiddenfield[name=section_id]').setValue(section_id);
        form.loadRecord(record);
        form.setHeight(height);
        grid.hide();
        win.add(form);
    },

    showEditApplicationManagerQueryResponseForm: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            record = btn.getWidgetRecord(),
            item_resp_id = record.get('item_resp_id'),
            childXtype = item.childXtype,
            //form = Ext.widget(childXtype),//'applicationqueryfrm'
            win = grid.up('window'),
            module_id = grid.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = grid.down('hiddenfield[name=section_id]').getValue(),
            is_manager_query_response = grid.down('hiddenfield[name=is_manager_query_response]').getValue(),
            form;
        if (!item_resp_id) {
            childXtype = 'applicationunstructuredqueriesfrm';
        }
        form = Ext.widget(childXtype);
        form.down('textfield[name=manager_queryresp_comment]').setVisible(true);
        if ((is_manager_query_response) && is_manager_query_response > 0) {
            form.getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
            form.down('textfield[name=manager_queryresp_comment]').setReadOnly(false);
        } else {
            form.down('textfield[name=manager_queryresp_comment]').setReadOnly(true);
        }

        form.down('hiddenfield[name=module_id]').setValue(module_id);
        form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        form.down('hiddenfield[name=section_id]').setValue(section_id);
        form.loadRecord(record);
        form.setHeight(height);
        grid.hide();
        win.add(form);
    },
    showEditApplicationManagerQueryResponseForm: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            record = btn.getWidgetRecord(),
            item_resp_id = record.get('item_resp_id'),
            childXtype = item.childXtype,
            //form = Ext.widget(childXtype),//'applicationqueryfrm'
            win = grid.up('window'),
            module_id = grid.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = grid.down('hiddenfield[name=section_id]').getValue(),
            is_manager_query_response = grid.down('hiddenfield[name=is_manager_query_response]').getValue(),
            form;
        if (!item_resp_id) {
            childXtype = 'applicationunstructuredqueriesfrm';
        }
        form = Ext.widget(childXtype);
        form.down('textfield[name=manager_queryresp_comment]').setVisible(true);
        if ((is_manager_query_response) && is_manager_query_response > 0) {
            form.getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
            form.down('textfield[name=manager_queryresp_comment]').setReadOnly(false);
        } else {
            form.down('textfield[name=manager_queryresp_comment]').setReadOnly(true);
        }

        form.down('hiddenfield[name=module_id]').setValue(module_id);
        form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        form.down('hiddenfield[name=section_id]').setValue(section_id);
        form.loadRecord(record);
        form.setHeight(height);
        grid.hide();
        win.add(form);
    },
    saveApplicationQuery: function (btn) {
        var me = this,
            form = btn.up('form'),
            win = form.up('window'),
            store = Ext.getStore(btn.storeID),
            frm = form.getForm(),
            action_url = btn.action_url;
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.load();
                        win.close();
                      //  me.backToApplicationQueriesGrid(btn);
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
    saveDocApplicationQuery: function (btn) {
        var me = this,
            form = btn.up('form'),
            win = form.up('window'),
            store = Ext.getStore(btn.storeID),
            frm = form.getForm(),
            action_url = btn.action_url;
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.load();
                        me.backToApplicationQueriesGrid(btn);
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
///added for documnet view in reports
func_setDocumentGridStore: function(me){
         var panel=me.up('reportDocumentsPnl'),
             form = panel.up('panel'),
           module_id=form.down('hiddenfield[name=module_id]').getValue();
           me.down('hiddenfield[name=module_id]').setValue(module_id);

            store=form.xtype+'dynamicStore';
           //create store
           var config = {
               storeId: store,
               groupField: 'doc_type',
                 proxy: {
                    url: 'summaryreport/getUploadedDocs',
                   }
              };
           Ext.create('Admin.store.summaryreport.ReportsGlobalAbstractStr', config);

           me.reconfigure(Ext.getStore(store));
           me.down('pagingtoolbar').setStore(store);

  },funcDOwnloadApplicationVariationDoc:function(grid, rowIndex, colIndex){
    var rec = grid.getStore().getAt(rowIndex);
        node_ref = rec.get('node_ref');
        if(node_ref != ''){
            this.fireEvent('funcDOwnloadApplicationVariationDoc',grid, rowIndex);

        }
        else{
            toastr.error('Document Not Uploaded', 'Failure Response');
        }
  },showAddApplicationUnstrcuturedQueries: function (btn) {
    var grid = Ext.widget('applicationunstructuredqueriesgrid'),
        wizard = btn.up('panel'),
        mainTabPnl = btn.up('#contentPanel'),
        containerPnl = mainTabPnl.getActiveTab();
        application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();
        module_id = containerPnl.down('hiddenfield[name=module_id]').getValue();
        sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue();
        section_id = containerPnl.down('hiddenfield[name=section_id]').getValue();
        application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue();
        workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue();
        
        
        grid.down('hiddenfield[name=module_id]').setValue(module_id);
        grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        grid.down('hiddenfield[name=section_id]').setValue(section_id);

        grid.down('hiddenfield[name=application_code]').setValue(application_code);
        grid.down('hiddenfield[name=application_id]').setValue(application_id);
        grid.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        grid.setHeight(450);
       
       funcShowCustomizableWindow('Query', "70%", grid, 'customizablewindow');

},
previewUploadedDocument: function (item) {
    var record = item.getWidgetRecord(),
        node_ref = record.get('node_ref'),
        application_code = record.get('application_code'),
        download = item.download,
        grid = item.up('grid'),
        uploadeddocuments_id = record.get('uploadeddocuments_id');
        
        
        if(node_ref != ''){

            this.functDownloadAppDocument(node_ref,download,application_code,uploadeddocuments_id, grid);
        }
        else{
            toastr.error('Document Not Uploaded', 'Failure Response');
        }
},
previewMultiUploadedDocument: function (item) {
    var btn = item.up('button'),
        grid = item.up('grid'),
         download = item.download
        record = btn.getWidgetRecord(),
        node_ref = record.get('node_ref'),
        application_code = record.get('application_code'),
        uploadeddocuments_id = record.get('uploadeddocuments_id');
        
        if(node_ref != ''){

            this.functDownloadAppDocument(node_ref,download,application_code,uploadeddocuments_id, grid);
        }
        else{
            toastr.error('Document Not Uploaded', 'Failure Response');
        }
        
},

funcCancelGeneratedInvoice: function(item){
    var btn = item.up('button'),
        record = btn.getWidgetRecord(),
        grid = item.up('grid'),
        invoice_no = record.get('invoice_no'),
        invoice_id = record.get('invoice_id'),
        application_code = record.get('application_code'),
        store = grid.getStore();

        Ext.MessageBox.confirm('Proforma Invoice Cancellation', 'Do you want to cancel the generate  Application Proforma Invoice?', function (button) {
            if (button === 'yes') {
                Ext.Ajax.request({
                    url: 'revenuemanagement/onCancelGeneratedApplicationInvoice',
                    method: 'GET',
                    params: {
                        application_code:application_code,
                        invoice_id:invoice_id,
                        invoice_no:invoice_no
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
                        
                            toastr.error(message, 'Failure Response');
                            store.removeAll();
                            store.load();
        
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                     
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error data: ' + errorThrown, 'Error Response');
                    }
                });

            }
        });
        

},
functDownloadAppDocument:function(node_ref,download,application_code,uploadeddocuments_id=null, grid){
        //get the document path 
        if(grid != ''){
            //grid.mask('Document Preview..');
           // Ext.getBody().mask('Document Preview..............');

        }
        var action_url = "documentmanagement/getApplicationDocumentDownloadurl?node_ref="+node_ref+"&application_code="+application_code+"&uploadeddocuments_id="+uploadeddocuments_id;
        if(node_ref != '' && node_ref != 'undefined'){
            download_report(action_url);
        }
        else{

            toastr.error('Document not found, upload to download', 'Failure Response');
        }
        return;
},onEditApplicationsQuery: function (item) {
    var btn = item.up('button'),
        grid = btn.up('grid'),
        record = btn.getWidgetRecord(),
        form = Ext.widget('applicationunstructuredqueriesfrm'),
            panel = grid.up('panel'),
            height = grid.getHeight(),
            application_code = panel.down('hiddenfield[name=application_code]').getValue(),
            workflow_stage_id = panel.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = panel.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue(),
            process_id = panel.down('hiddenfield[name=process_id]').getValue(),
            section_id = panel.down('hiddenfield[name=section_id]').getValue(),
           // is_structured = panel.down('hiddenfield[name=is_structured]').getValue(),
            query_id = panel.down('hiddenfield[name=query_id]').getValue();

        form.down('hiddenfield[name=module_id]').setValue(module_id);
        form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        form.down('hiddenfield[name=application_code]').setValue(application_code);
        form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        form.down('hiddenfield[name=process_id]').setValue(process_id);
        form.down('hiddenfield[name=section_id]').setValue(section_id);
        form.down('hiddenfield[name=query_id]').setValue(query_id);
       // form.down('hiddenfield[name=is_structured]').setValue(is_structured);
        var doc_grid = 
        form.setHeight(400);
        form.loadRecord(record);
        funcShowCustomizableWindow("Add CAPA/Query Findings", "80%", form, 'customizablewindow');


},onDeleteApplicationQueries: function (item) {
    var btn = item.up('button'),
        grid = btn.up('grid'),
        store = grid.store,
        record = btn.getWidgetRecord(),
        win = grid.up('window'),
        record_id = record.get('id'),

        status_id = record.get('status_id'),
        application_id = win.down('hiddenfield[name=application_id]').getValue();
    application_code = win.down('hiddenfield[name=application_code]').getValue();

    //get the document path 
    Ext.getBody().mask('Deleting query details..');

    Ext.Ajax.request({
        url: 'api/onDeleteApplicationQueries',
        method: 'POST',
        params: {
            record_id: record_id,
            application_id: application_id,
            application_code: application_code,
            status_id: status_id
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
                toastr.success(message, 'Response');
                store.removeAll();
                store.load()
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
}, showAddchecklistitemsqueriefrm:function(btn){
    var form = Ext.widget('applicationunstructuredqueriesfrm'),
            grid = btn.up('grid'),
            panel = grid.up('panel'),
            height = 400,
            application_code = panel.down('hiddenfield[name=application_code]').getValue(),
            workflow_stage_id = panel.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = panel.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue(),
            process_id = panel.down('hiddenfield[name=process_id]').getValue(),
            section_id = panel.down('hiddenfield[name=section_id]').getValue(),
            is_structured = 1,
            query_id = panel.down('hiddenfield[name=query_id]').getValue();

        form.down('hiddenfield[name=module_id]').setValue(module_id);
        form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        form.down('hiddenfield[name=application_code]').setValue(application_code);
        form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        form.down('hiddenfield[name=process_id]').setValue(process_id);
        form.down('hiddenfield[name=section_id]').setValue(section_id);
        form.down('hiddenfield[name=query_id]').setValue(query_id);
        form.down('hiddenfield[name=is_structured]').setValue(is_structured);

        form.setHeight(height);
        //grid.hide();
        //win.add(form);
        funcShowCustomizableWindow("Add Query", "80%", form, 'customizablewindow');


},functDownloadAppDocument12:function(node_ref,download,application_code=null,uploadeddocuments_id=null){
        //get the document path
    //   Ext.getBody().mask('Document Preview..');

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


},
 downloadAllSelectedDocuments: function(btn) {
    var grid = btn.up('grid'),
        sm = grid.getSelectionModel(),
        selected_records = sm.getSelection(),
        name_type = btn.type,
        selected = [];
        var zipper = Ext.create('Ext.exporter.file.zip.Archive', {id:'FilesExport'});
        if (!sm.hasSelection()) {
            toastr.warning('No record selected. Please select a document(s) to download!!', 'Warning Response');
            return;
        }
        if( name_type != 'zip' ){
           
                Ext.MessageBox.confirm('Confirm', 'Are you sure you want to download selected document(s)?', function (check) {
                    if (check === 'yes') {
                        Ext.getBody().mask('Please wait...');
                        Ext.each(selected_records, function (item) {
                            //selected.push(item.data.id);
                            var action_url = "documentmanagement/getApplicationDocumentDownloadurl?node_ref="+item.data.node_ref+"&application_code="+item.data.application_code+"&uploadeddocuments_id="+item.data.uploadeddocuments_id;
                            download_report(action_url);
                        });

                    }
                });
       }else{
           Ext.each(selected_records, function (item) {
                    selected.push([item.data.node_ref, item.data.application_code, item.data.uploadeddocuments_id, item.data.file_name,item.data.initial_file_name]);

                });
                var action_url = "documentmanagement/getDocumentArchive?selected="+ btoa(JSON.stringify(selected));
                download_report(action_url);
                return;
       }

  }, showEditAdhocQueryFrm: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            form = Ext.widget(childXtype);

        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');

    },
    showPreviewQueryLetter: function (item) {
        var button = item.up('button'),
            record = button.getWidgetRecord(),
            query_id = record.get('query_id'),
            application_code = record.get('application_code'),
            module_id = record.get('module_id');
        print_report('reports/printRequestForAdditionalInformation?query_id='+query_id+'&application_code='+application_code+'&module_id='+module_id);
        this.fireEvent('printReceipt', payment_id);
    },
    
    closeApplicationQuery: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            action_url = item.action_url,
            grid = btn.up('grid'),
            
            store = grid.getStore(),
            store2 = Ext.getStore('checklistresponsescmnstr'),
            id = record.get('query_id'),
            status = record.get('status');
            if(grid.up('window')){
              var win = grid.up('window');  
            }else if(grid.up('panel')){
                var win = grid.up('panel');
            }else{
             toastr.error("unable to mask correct window", 'Mask Failure');  
             win = grid; 
            }
            var mask = new Ext.LoadMask(
                {
                    target: win,
                    msg: 'Please wait...'
                }
            );
            if(status == 1){
                var title=  'Are you sure to close this query Open Query(Note the query has not been responsed to)?';
            }
            else{
                var title = 'Are you sure to close this query?';
            }
        Ext.MessageBox.confirm('Close', title, function (button) {
            if (button === 'yes') {
                mask.show();
                Ext.Ajax.request({
                    url: action_url,
                    params: {
                        query_id: id,
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
                            if(store2){
                                store2.load();
                            }
                            
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
            }
        });
    },deleteChecklistRaisedQuery: function(item){
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            store = grid.getStore(),
            record = btn.getWidgetRecord(),
            query_id = record.get('query_id');
        Ext.MessageBox.confirm('Delete', "Are you sure you want to delete this query", function (button) {
            if (button === 'yes') {
                grid.mask('Deleting....');
                Ext.Ajax.request({
                    url: item.action_url,
                    method: 'POST',
                    params: {
                        _token: token,
                        query_id: query_id
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        grid.unmask();
                        if (success == true || success === true) {
                            toastr.success(message, 'Success Response');
                            store.load();
                        } else {
                            grid.unmask();
                            toastr.error(resp.message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        grid.unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        grid.unmask();
                        toastr.error('Error downloading data: ' + errorThrown, 'Error Response');
                    }
                });
            }else{
                toastr.warning("Deletion terminated", 'Terminated');
            }
        });
    },
    funcInvoiceGenerateApplicationDetails: function (btn) {
        var grid = btn.up('grid'),
            panel = grid.up('panel'),
            application_code = panel.down('hiddenfield[name=application_code]').getValue(),
            application_id = panel.down('hiddenfield[name=application_id]').getValue(),
            sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue(),
            module_id = panel.down('hiddenfield[name=module_id]').getValue(),
            section_id = panel.down('hiddenfield[name=section_id]').getValue(),
            win = grid.up('window'),
            me = this,
            application_feetype_id = panel.down('hiddenfield[name=application_feetype_id]').getValue(),
            fasttrack_option_id = panel.down('hiddenfield[name=fasttrack_option_id]').getValue(),
            store = grid.getStore(),query_id;
        if(panel.down('hiddenfield[name=query_id]')){
            panel.down('hiddenfield[name=query_id]').getValue();
        }
        if (store.getCount()) {

            Ext.MessageBox.confirm('Proforma Invoice Generation', 'Do you want to generate the Application Proforma Invoice?', function (button) {
                if (button === 'yes') {
                    Ext.getBody().mask('Generating Invoice(s)');
                    Ext.Ajax.request({
                       url: btn.action_url,
                       method: 'POST',
                       waitMsg: 'Please wait...',
                       params:{
                           module_id: module_id,
                           application_code: application_code,
                           sub_module_id: sub_module_id,
                           section_id: section_id,
                           application_feetype_id: application_feetype_id,
                           fasttrack_option_id:fasttrack_option_id,
                           query_id: query_id,
                            _token: token
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
                               toastr.success(message, "Success Response");
                               //find store and refresh
                               if(Ext.getStore('paymentinvoicingcostdetailsgridStr')){
                                   Ext.getStore('paymentinvoicingcostdetailsgridStr').load();
                               }
                               if(Ext.getStore('reinvoicingdetailsgridStr')){
                                   Ext.getStore('reinvoicingdetailsgridStr').load();
                               }
                               if(grid.is_query_invoice_check){
                                   var query_form = Ext.ComponentQuery.query("#applicationRaiseQueryFrmId")[0];
                                   query_form.down('button[name=print_invoice]').setVisible(true);
                                   query_form.down('button[name=generate_invoice]').setVisible(false);
                               }
                               
                               win.close();
                               //preview the Invoice 
                               if(resp.invoice_id >0){
                                me.fireEvent('funcgenerateApplicationInvoice',application_id, module_id, resp.invoice_id,application_code);
                               }
                           } else {
                               toastr.error(message, 'Failure Response');
                           }
                       },
                       failure: function (fm, action) {
                           var resp = Ext.JSON.decode(response.responseText);
                           Ext.getBody().unmask();
                           toastr.error(resp.message, 'Failure Response');
                       },
                       error: function (jqXHR, textStatus, errorThrown) {
                           Ext.getBody().unmask();
       
                           toastr.error('Error: ' + errorThrown, 'Error Response');
                       }
                   });

                }
            });
        }else{
            toastr.error("No Quotation was retrieved", 'Failure Response');
        }
    },
    
    saveChecklistApplicationCAPA:function(btn){
        var form = btn.up('form'),
            frm = form.getForm(),
            pnl = form.up('panel'),
            me = this,
            checklistItemStr = pnl.down('#checklistItemsQueriesGrid').getStore(),
           // pnl = panel.up('panel'),
            module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = pnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = pnl.down('hiddenfield[name=section_id]').getValue(),
            inspection_capa_id = pnl.down('hiddenfield[name=inspection_capa_id]').getValue(),
            application_code = pnl.down('hiddenfield[name=application_code]').getValue(),
            process_id = pnl.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = pnl.down('hiddenfield[name=workflow_stage_id]').getValue();
        if (frm.isValid()) {
            frm.submit({
                url: btn.action_url,
                waitMsg: 'Please wait...',
                method: 'POST',
                params: {
                    module_id:module_id,
                    sub_module_id:sub_module_id,
                    process_id: process_id,
                    section_id:section_id,
                    application_code:application_code,
                    workflow_stage_id:workflow_stage_id,
                    inspection_capa_id: inspection_capa_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        var inspection_capa_id = response.record_id;
                       
                        if(Ext.getStore('inspectionscaparequestsgridstr')){
                            Ext.getStore('inspectionscaparequestsgridstr').load();
                        }
                       
                        pnl.down('hiddenfield[name=inspection_capa_id]').setValue(inspection_capa_id);
                        me.navigateCAPAREquestWizard(btn);
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
    },  navigateCAPAREquestWizard: function(btn){
        var me_container = btn.up(),
            step = btn.nextStep,
            wizardPnl = me_container.up('#applicationRaiseQueryPnlId'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if(step == 1){
            var inspection_capa_id = wizardPnl.down('hiddenfield[name=inspection_capa_id]').getValue();
            if(inspection_capa_id){
                //well
            }else{
                toastr.warning("Please save the Details to proceed", 'Failure Response');
                return false;
            }
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.nextStep) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    }, showPreviewCAPAQueryLetter: function (item) {
        var button = item.up('button'),
            record = button.getWidgetRecord(),
            query_id = record.get('query_id'),
            application_code = record.get('application_code'),
            module_id = record.get('module_id');
        print_report('reports/printRequestForCAPAResponses?query_id='+query_id+'&application_code='+application_code+'&module_id='+module_id);
        this.fireEvent('printReceipt', payment_id);
    },
    showPreviewREinspectionueryLetter: function (item) {
        var button = item.up('button'),
            record = button.getWidgetRecord(),
            query_id = record.get('query_id'),
            application_code = record.get('application_code'),
            module_id = record.get('module_id');
        print_report('reports/printREinspectionueryLetter?query_id='+query_id+'&application_code='+application_code+'&module_id='+module_id);
        this.fireEvent('printReceipt', payment_id);
    },
    
    onEditREinspectionQuery:function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            form = Ext.widget('reinspectionchecklistitemsfrm'),
                panel = grid.up('panel'),
                height = grid.getHeight(),
                application_code = panel.down('hiddenfield[name=application_code]').getValue(),
                workflow_stage_id = panel.down('hiddenfield[name=workflow_stage_id]').getValue(),
                module_id = panel.down('hiddenfield[name=module_id]').getValue(),
                sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue(),
                process_id = panel.down('hiddenfield[name=process_id]').getValue(),
                section_id = panel.down('hiddenfield[name=section_id]').getValue(),
               // is_structured = panel.down('hiddenfield[name=is_structured]').getValue(),
                query_id = panel.down('hiddenfield[name=query_id]').getValue();

            form.down('hiddenfield[name=module_id]').setValue(module_id);
            form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            form.down('hiddenfield[name=application_code]').setValue(application_code);
            form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            form.down('hiddenfield[name=process_id]').setValue(process_id);
            form.down('hiddenfield[name=section_id]').setValue(section_id);
            form.down('hiddenfield[name=query_id]').setValue(query_id);
           // form.down('hiddenfield[name=is_structured]').setValue(is_structured);

            form.setHeight(height);
            form.loadRecord(record);
            funcShowCustomizableWindow("Add CAPA/Query Findings", "80%", form, 'customizablewindow');


    }, onAddRasonforREjections:function(btn){
        var form = Ext.widget('applicationrejectiondetailsfrm'),
                grid = btn.up('grid'),
                height = grid.getHeight(),
                application_code = grid.down('hiddenfield[name=application_code]').getValue();
            form.down('hiddenfield[name=application_code]').setValue(application_code);
            form.setHeight(350);
            funcShowCustomizableWindow("Add Reasons for Rejection", "45%", form, 'customizablewindow');
    }, onEditRasonforREjections:function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            form = Ext.widget('applicationrejectiondetailsfrm'),
            application_code = grid.down('hiddenfield[name=application_code]').getValue();

            form.down('hiddenfield[name=application_code]').setValue(application_code);

            form.setHeight(350);
            form.loadRecord(record);

            funcShowCustomizableWindow("Add Reason for Rejection", "80%", form, 'customizablewindow');

    },  onEditApplicationsCAPAFindings: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            form = Ext.widget('applicationcapafindingsfrm'),
                panel = grid.up('panel'),
                height = grid.getHeight(),
                application_code = panel.down('hiddenfield[name=application_code]').getValue(),
                workflow_stage_id = panel.down('hiddenfield[name=workflow_stage_id]').getValue(),
                module_id = panel.down('hiddenfield[name=module_id]').getValue(),
                sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue(),
                process_id = panel.down('hiddenfield[name=process_id]').getValue(),
                section_id = panel.down('hiddenfield[name=section_id]').getValue(),
               inspection_capa_id = panel.down('hiddenfield[name=inspection_capa_id]').getValue();

            form.down('hiddenfield[name=module_id]').setValue(module_id);
            form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            form.down('hiddenfield[name=application_code]').setValue(application_code);
            form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            form.down('hiddenfield[name=process_id]').setValue(process_id);
            form.down('hiddenfield[name=section_id]').setValue(section_id);
            form.down('hiddenfield[name=inspection_capa_id]').setValue(inspection_capa_id);
        
            form.setHeight(height);
            form.loadRecord(record);
            funcShowCustomizableWindow("Add CAPA/Query Findings", "80%", form, 'customizablewindow');


    },
    showAddchecklistitemscapafrm:function(btn){
        var form = Ext.widget('applicationcapafindingsfrm'),
                grid = btn.up('grid'),
                panel = grid.up('panel'),
                height = grid.getHeight(),
                application_code = panel.down('hiddenfield[name=application_code]').getValue(),
                workflow_stage_id = panel.down('hiddenfield[name=workflow_stage_id]').getValue(),
                module_id = panel.down('hiddenfield[name=module_id]').getValue(),
                sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue(),
                process_id = panel.down('hiddenfield[name=process_id]').getValue(),
                section_id = panel.down('hiddenfield[name=section_id]').getValue(),
                inspection_capa_id = panel.down('hiddenfield[name=inspection_capa_id]').getValue();

            form.down('hiddenfield[name=module_id]').setValue(module_id);
            form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            form.down('hiddenfield[name=application_code]').setValue(application_code);
            form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            form.down('hiddenfield[name=process_id]').setValue(process_id);
            form.down('hiddenfield[name=section_id]').setValue(section_id);
            form.down('hiddenfield[name=inspection_capa_id]').setValue(inspection_capa_id);
           
            form.setHeight(height);

            funcShowCustomizableWindow("Add Findings", "80%", form, 'customizablewindow');


    },
    
    saveApplicationCapaDeficiencies:function (btn) {
        var me = this,
            form = btn.up('form'),
            inspection_capa_id = form.down('hiddenfield[name=inspection_capa_id]').getValue();
            reload_base = btn.reload_base,
            action_url = btn.action_url;
            win = form.up('window');
            frm = form.getForm();

        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store = Ext.getStore('capafindingcheckliststr');
                        win.close();
                        
                        store.removeAll();
                       
                        store.removeAll();
                        store.load({params: {inspection_capa_id:inspection_capa_id}});
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
    onDeleteApplicationCAPAfindings: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            store = grid.store,
            record = btn.getWidgetRecord(),
            table_name = item.table_name,
            win = grid.up('window'),
            record_id = record.get('id'),

            status_id = record.get('status_id'),
            application_id = win.down('hiddenfield[name=application_id]').getValue();
        application_code = win.down('hiddenfield[name=application_code]').getValue();

        Ext.MessageBox.confirm('Delete', 'Do you want to remove the selected Findings?', function (btn) {
            if (btn === 'yes') {
              
                //get the document path 
                Ext.getBody().mask('Deleting deficiencies details..');

                Ext.Ajax.request({
                    url: 'api/onDeleteAppInspectionsDeficiencies',
                    method: 'POST',
                    params: {
                        record_id: record_id,
                        application_id: application_id,
                        application_code: application_code,
                        table_name: table_name,
                        status_id: status_id
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
                            toastr.success(message, 'Response');
                            store.removeAll();
                            store.load()
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

            }
        });
        
    },showEditApplicationCAPAForm: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            record = btn.getWidgetRecord(),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            application_code = record.get('application_code'),
            workflow_stage_id = record.get('workflow_stage_id'),
            query_id = record.get('query_id'),
            process_id = record.get('process_id'),
            inspection_capa_id = record.get('inspection_capa_id'),
            childXtype = item.childXtype,
            win_title = item.winTitle,
            win = grid.up('window'),
            panel, form;
        
        panel = Ext.widget(childXtype);
        panel.down('hiddenfield[name=module_id]').setValue(module_id);
        panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        panel.down('hiddenfield[name=section_id]').setValue(section_id);
        panel.down('hiddenfield[name=application_code]').setValue(application_code);
        panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        panel.down('hiddenfield[name=inspection_capa_id]').setValue(inspection_capa_id);
        panel.down('hiddenfield[name=process_id]').setValue(process_id);
        //query details form
        form = panel.down('#applicationRaiseQueryFrmId');
        form.loadRecord(record);
        panel.setHeight(550);
        funcShowCustomizableWindow(win_title, '90%', panel, 'customizablewindow');
    },showEditREinspectionRequstestForm: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            record = btn.getWidgetRecord(),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            application_code = record.get('application_code'),
            workflow_stage_id = record.get('workflow_stage_id'),
            query_id = record.get('query_id'),
            process_id = record.get('process_id'),
            query_id = record.get('query_id'),
            childXtype = item.childXtype,
            win_title = item.winTitle,
            win = grid.up('window'),
            panel, form;
        
        panel = Ext.widget(childXtype);
        panel.down('hiddenfield[name=module_id]').setValue(module_id);
        panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        panel.down('hiddenfield[name=section_id]').setValue(section_id);
        panel.down('hiddenfield[name=application_code]').setValue(application_code);
        panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        panel.down('hiddenfield[name=query_id]').setValue(query_id);
        panel.down('hiddenfield[name=process_id]').setValue(process_id);
        //query details form
        form = panel.down('#applicationRaiseQueryFrmId');
        form.loadRecord(record);
        panel.setHeight(550);
        funcShowCustomizableWindow(win_title, '90%', panel, 'customizablewindow');
    },closeApplicationCAPAREquest: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            action_url = item.action_url,
            grid = btn.up('grid'),
            
            store = grid.getStore(),
            store2 = Ext.getStore('checklistresponsescmnstr'),
            inspection_capa_id = record.get('inspection_capa_id'),
            status = record.get('status');
            if(grid.up('window')){
              var win = grid.up('window');  
            }else if(grid.up('panel')){
                var win = grid.up('panel');
            }else{
             toastr.error("unable to mask correct window", 'Mask Failure');  
             win = grid; 
            }
            var mask = new Ext.LoadMask(
                {
                    target: win,
                    msg: 'Please wait...'
                }
            );
            if(status == 1){
                var title=  'Are you sure to close this Open CAPA Request(Note the CAPA has not been responsed to)?';
            }
            else{
                var title = 'Are you sure to close this  Open CAPA Request?';
            }
        Ext.MessageBox.confirm('Close', title, function (button) {
            if (button === 'yes') {
                mask.show();
                Ext.Ajax.request({
                    url: action_url,
                    params: {
                        inspection_capa_id: inspection_capa_id,
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
                            if(store2){
                                store2.load();
                            }
                            
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
            }
        });
    },
    showAddReInspectionchecklistitemsfrm:function(btn){
        var form = Ext.widget('reinspectionchecklistitemsfrm'),
                grid = btn.up('grid'),
                panel = grid.up('panel'),
                height = grid.getHeight(),
                application_code = panel.down('hiddenfield[name=application_code]').getValue(),
                workflow_stage_id = panel.down('hiddenfield[name=workflow_stage_id]').getValue(),
                module_id = panel.down('hiddenfield[name=module_id]').getValue(),
                sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue(),
                process_id = panel.down('hiddenfield[name=process_id]').getValue(),
                section_id = panel.down('hiddenfield[name=section_id]').getValue(),
                query_id = panel.down('hiddenfield[name=query_id]').getValue();

            form.down('hiddenfield[name=module_id]').setValue(module_id);
            form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            form.down('hiddenfield[name=application_code]').setValue(application_code);
            form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            form.down('hiddenfield[name=process_id]').setValue(process_id);
            form.down('hiddenfield[name=section_id]').setValue(section_id);
            form.down('hiddenfield[name=query_id]').setValue(query_id);

            form.setHeight(height);

            funcShowCustomizableWindow("Add Observations/Queries/Finding", "80%", form, 'customizablewindow');


    },saveReinspectionchecklistitems: function (btn) {
        var me = this,
            form = btn.up('form'),
            query_id = form.down('hiddenfield[name=query_id]').getValue();
            reload_base = btn.reload_base,
            action_url = btn.action_url;
            win = form.up('window');
            frm = form.getForm();

        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store = Ext.getStore('reinspectionsrequestsitemsgridstr');
                        win.close();
                     //   store.load();
                        store.removeAll();
                       
                        store.removeAll();
                        store.load({params: {query_id:query_id}});
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
    saveApplicationRejectionDetails: function (btn) {
        var me = this,
            form = btn.up('form'),
            application_code = form.down('hiddenfield[name=application_code]').getValue();
            reload_base = btn.reload_base,
            action_url = btn.action_url;
            win = form.up('window');
            frm = form.getForm();

        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store = Ext.getStore('applicationrejectiondetailsstr');
                        win.close();
                        store.removeAll();
                       
                        store.removeAll();
                        store.load({params: {application_code:application_code}});
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
});
