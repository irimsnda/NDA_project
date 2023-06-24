Ext.define('Admin.view.document_management.viewcontrollers.OnlineservicesconfVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.onlineservicesconfVctr',
    ///the export option
    requires: [
        'Ext.exporter.text.CSV',
        'Ext.exporter.text.Html',
        'Ext.exporter.excel.Xlsx'
    ],
    
    showSimpleConfigModuleGridForm: function (btn) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            formWidget = btn.form,
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            form = Ext.widget(formWidget),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        grid.hide();
        parentPanel.add(form);
        /*} else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }*/
    },

    showEditConfigParamGridFrm: function (item) {//for tree panels
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            record = btn.getWidgetRecord(),
            formWidget = item.form,
            form = Ext.widget(formWidget),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        form.reset();
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        grid.hide();
        parentPanel.add(form);
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

   
    configBackToDashboard: function (btn) {
        var currentPnl = btn.up('form'),
            containerPnlXtype = btn.containerPnlXtype,
            hiddenCompXtype = btn.hiddenCompXtype,
            containerPnl = btn.up(containerPnlXtype),
            grid = containerPnl.down(hiddenCompXtype);
        containerPnl.remove(currentPnl);
        grid.show();
    },

    doCreateConfigParam: function (btn) {
        var me = this,
            action_url = btn.action_url,
            form = btn.up('form'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        store.removeAll();
                        store.load();
                        me.configBackToDashboard(btn);
                        toastr.success(message, "Success Response");
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
    doCreateConfigParamWin: function (btn) {
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
funcSaveformData:function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        //  console.log(store)
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
AddFormTypeFields: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            form = Ext.widget(childXtype),
            form_field_id = record.get('id');
            app_formsdefination_id = record.get('id');
            form.down('hiddenfield[name=form_field_id]').setValue(form_field_id);
            form.down('hiddenfield[name=app_formsdefination_id]').setValue(app_formsdefination_id);

        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
    },
showEditConfigParamWinFrm: function (item) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
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
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

    
    showAddConfigParamWinFrm: function (btn) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
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
 setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },
     setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },
    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
    doDeleteConfigWidgetParam: function (item) {
        //if (this.fireEvent('checkFullAccess')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
        /*  } else {
              toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
              return false;
          }*/
    },

    generateReport: function (btn) {
        var grid_reference = btn.grid_reference,
            title = btn.title,
            type = btn.type,
            file_name = btn.file_name;

        this.doExport({
            type: type,
            title: title,
            fileName: file_name
        }, grid_reference);

    },
    generatePDFReport: function (btn) {
        var grid_reference = btn.grid_reference,
            title = btn.title,
            type = btn.type,
            file_name = btn.file_name,
            grid = this.lookupReference(grid_reference);
        grid.saveDocumentAs({
            fileName: file_name
        });

    },

    doExport: function (config, grid_reference) {
        var grid = this.lookupReference(grid_reference);
        grid.saveDocumentAs(config);
    },

    onBeforeDocumentSave: function (view) {
        view.mask('Document is prepared for export. Please wait ...');
    },

    onDocumentSave: function (view) {
        view.unmask();
    },
     showAddFormWin: function (btn, evt, opts) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var form = Ext.widget(btn.form);
                form.setHeight('');
                form.down('button[name=btnDataWin]').table_name= btn.table_name;
                form.down('button[name=btnDataWin]').storeID= btn.store_name;
                funcShowCustomizableWindow(btn.title, "40%", form, "customizablewindow");
                
        }
    },
     doSaveParameter: function (btn, evt, opts) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var form = btn.up('form'),
                params = {},
                method = "POST";
                params.token = form.down("textfield[name=_token]").getValue();
                params.name = form.down("textfield[name=name]").getValue();
                params.description = form.down("textfield[name=description]").getValue();
                
                this.fireEvent('doSubmitData',
                    params,
                    form.store,
                    method,
                    form.action_url,
                    function () {
                        var win = form.up('window')
                        win.close();
                    });
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    },showHideParent: function (combo, newVal, oldVal) {
        var me = this,
            selectedVal = newVal,
            form = combo.up('form'),
            parentField = form.down('combo[name=parent_id]');
        if (selectedVal == 1) {
            //show parent only
            parentField.setFieldLabel('Parent');
            parentField.setVisible(true);
        }else{
            parentField.setVisible(false);
        }
    },
    setAdminCombosStore: function (obj, options) {
        this.fireEvent('setAdminCombosStore', obj, options);
    },

    onChangeNavigationType: function (combo, newVal, oldVal) {
        var me = this,
            selectedVal = newVal,
            store = Ext.getStore('onlineparentmenus');
            
            store.removeAll();
            store.load({params:{navigation_type_id: selectedVal}});
            
    },
    reloadProcessStore: function(combo, newVal, oldVal, eopts) {
        var form = combo.up('form'),
            def_sub_module_id = form.down('combo[name=def_sub_module_id]').getValue(),
            def_module_id = form.down('combo[name=def_module_id]').getValue(),
            def_section_id = form.down('combo[name=def_section_id]').getValue(),
            processStr = form.down('combo[name=process_id]').getStore(),
            filter = JSON.stringify({'module_id': def_module_id, 'sub_module_id': def_sub_module_id, 'section_id': def_section_id});
        processStr.removeAll();
        processStr.load({params:{filters: filter}});
    },
});