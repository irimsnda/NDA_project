Ext.define('Admin.view.parameters.viewcontrollers.parametervctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.parametervctr',

    ///the export option
    requires: [
        'Ext.exporter.text.CSV',
        'Ext.exporter.text.Html',
        'Ext.exporter.excel.Xlsx'
    ],

    showAddParameterFrm: function (btn, evt, opts) {
        console.log(btn);
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var me = this,
                formWidget = btn.form,
                grid = btn.up('grid'),
                activeTab = grid.up('panel'),
                form = Ext.widget(formWidget);
            form.action = "create";
            grid.hide();
            activeTab.add(form);
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    },
setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },

/*
    var me = this,
            form = btn.up('form'),
            // main_tabPanel = form.up('#contentPanel'),
            activeTab = form.up('panel'),//main_tabPanel.getActiveTab(),
            routeId = activeTab.routeId,
            gridWidget = btn.grid,
            grid = activeTab.down(gridWidget);
        activeTab.remove(form);
        if (grid) {
            grid.show();
        } else {
            activeTab.close();
        }


*/
    doCreateConfigParamWin: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            formPnl = btn.up('form'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            activeTab = formPnl.up('panel'),
            gridWidget = btn.grid,
            grid = activeTab.down(gridWidget);
            frm = formPnl.getForm();
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

                            activeTab.remove(formPnl);
                            if (grid) {
                                grid.show();
                            } else {
                                activeTab.close();
                            }

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
    showMergeParameterWin: function (btn, evt, opts) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var me = this,
                panelWidget = btn.panel,
                grid = btn.up('grid'),
                activeTab = grid.up('panel'),
                win = Ext.widget(btn.mergeGrid),
                selectedRecords = [],
                store = grid.getStore();
            store.each(function (rec) {
                if (rec.getData().selected) {
                    var selectedRec = rec.copy();
                    selectedRec.set('selected', false);
                    selectedRecords.push(selectedRec);
                }
            });
            var selectedStore = new Ext.data.Store({
                recordType: store.recordType
            });
            selectedStore.add(selectedRecords);
            win.getView().bindStore(selectedStore);
            win.action = "merge";
            funcShowCustomizableWindow("Merge ", "500px", win, "customizablewindow");
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    },
    submitMergeFrm: function (btn, evt, opts) {
        var mergeToId = null;
        var items = store.getData().items;
        var ids = [];
        for (var i = 0; i < items.length; i++) {
            var rec = items[i].getData();
            if (rec.selected) {
                mergeToId = rec.id;
            } else {
                ids.push(rec.id);
            }
        }
        var params = {
            mergeToId: mergeToId,
            ids: ids
        };
        this.fireEvent('doSubmitData',
            params,
            btn.store,
            "PUT",
            btn.action_url,
            function () {
                var activeTab = grid.up('panel');
                activeTab.close();
                grid.destroy();
            });
    },
    resetMergeGrid: function (btn) {
        var store = Ext.getStore(btn.store);
        var grid = Ext.ComponentQuery.query(btn.mergeGrid)[0];
        var panel = grid.up("panel");
        panel.destroy();
        var selectedRecords = [];
        store.each(function (rec) {
            if (rec.getData().selected) {
                var selectedRec = rec.copy();
                selectedRec.set('selected', false);
                selectedRecords.push(selectedRec);
            }
        });
        var selectedStore = new Ext.data.Store({
            recordType: store.recordType
        });
        selectedStore.add(selectedRecords);
        var win = Ext.widget(btn.mergeGrid);
        win.getView().bindStore(selectedStore);
        win.action = "merge";
        funcShowCustomizableWindow("Merge ", "500px", win, "customizablewindow");
    },
    showEditParameterFrm: function (item) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var me = this,
                btn = item.up('button'),
                grid = btn.up('grid'),
                activeTab = grid.up('panel'),
                record = btn.getWidgetRecord(),
                id = record.get('id'),
                form = Ext.widget(item.form),
                routeId = activeTab.routeId;

            form.action = "edit";
            form.loadRecord(record);
            var costCenter = form.down("textfield[name=costcenter]");
            if (costCenter) {
                costCenter.setValue(record.getData().cost_center_id);
            }
            var costCategory = form.down("textfield[name=costcategory]");
            if (costCategory) {
                costCategory.setValue(record.getData().cost_category_id);
            }
            var countryField = form.down("textfield[name=country]");
            if (countryField) {
                countryField.setValue(record.getData().country_id);
            }
            var currencyField = form.down("textfield[name=currency]");
            if (currencyField) {
                currencyField.setValue(record.getData().currency_id);
            }
            var sectionField = form.down("textfield[name=section]");
            if (sectionField) {
                sectionField.setValue(record.getData().section_id);
            }
            var businesstypeField = form.down("textfield[name=businesstype]");
            if (businesstypeField) {
                businesstypeField.setValue(record.getData().business_type_id);
            }
            var studyField = form.down("textfield[name=studyfield]");
            if (studyField) {
                studyField.setValue(record.getData().study_field_id);
            }
            var regionField = form.down("textfield[name=region]");
            if (regionField) {
                var store = regionField.getStore();
                store.clearFilter();
                store.getFilters().add(function (item) {
                    return item.getData().country_id == record.getData().country_id;
                });
                store.load();
                regionField.setValue(record.getData().region_id);
            }
            grid.hide();
            activeTab.add(form);
        }
    },
    showAddFormWin: function (btn, evt, opts) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var form = Ext.widget(btn.form);
            form.setHeight('');
            funcShowCustomizableWindow(btn.title, "40%", form, "customizablewindow");
        }
    },
    doSaveParameter: function (btn) {
     
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var form = btn.up('form'),
                params = {},
                method = "POST";
            params.token = form.down("textfield[name=_token]").getValue();
            params.name = form.down("textfield[name=name]").getValue();
            params.description = form.down("textfield[name=description]").getValue();

            var codeField = form.down("textfield[name=code]");
            if (codeField) {
                params.code = codeField.getValue();
            }
            var countryField = form.down("textfield[name=country]");
            if (countryField) {
                params.country_id = countryField.getValue();
            }
            var regionField = form.down("textfield[name=region]");
            if (regionField) {
                params.region_id = regionField.getValue();
            }
            var sectionField = form.down("textfield[name=section]");
            if (sectionField) {
                params.section_id = sectionField.getValue();
            }
            var businesstypeField = form.down("textfield[name=businesstype]");
            if (businesstypeField) {
                params.business_type_id = businesstypeField.getValue();
            }
            var districtField = form.down("textfield[name=district]");
            if (districtField) {
                params.district_id = districtField.getValue();
            }
            var costCenterField = form.down("textfield[name=costcenter]");
            if (costCenterField) {
                params.cost_center_id = costCenterField.getValue();
            }
            var costCategoryField = form.down("textfield[name=costcategory]");
            if (costCategoryField) {
                params.cost_category_id = costCategoryField.getValue();
            }
            var studyField = form.down("textfield[name=studyfield]");
            if (studyField) {
                params.study_field_id = studyField.getValue();
            }
            if (form.action === "edit") {
                method = "PUT";
                params.id = form.down("hiddenfield[name=id]").getValue();
            }

            this.fireEvent('doSubmitData',
                params,
                form.store,
                method,
                form.action_url,
                function () {
                    console.log(btn);
                    var activeTab = form.up('panel');
                       locationsGrid = activeTab.queryById(btn.grid);
                    if (locationsGrid) {
                        locationsGrid.show();
                    } else {
                       activeTab.close();
                   }
                    form.destroy();
                });
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    },
    
    doSaveDirectorateParameter: function (btn, evt, eOpts) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var form = btn.up('form'),
                params = {},
                method = "POST";
            params.token = form.down("textfield[name=_token]").getValue();
            params.name = form.down("textfield[name=name]").getValue();
            params.description = form.down("textfield[name=description]").getValue();

            if (form.action === "edit") {
                method = "PUT";
                params.id = form.down("hiddenfield[name=id]").getValue();
            }

            this.fireEvent('doSubmitData',
                params,
                form.store,
                method,
                form.action_url,
                function () {
                    var activeTab = form.up('panel'),
                        directoratesGrid = activeTab.queryById(btn.grid);
                    if (directoratesGrid) {
                        directoratesGrid.show();
                    } else {
                        activeTab.close();
                    }
                    form.destroy();
                });
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    },
    doSaveExchangeRate: function (btn, evt, eOpts) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var form = btn.up('form'),
                params = {},
                method = "POST";
            params.token = form.down("textfield[name=_token]").getValue();
            params.rate = form.down("textfield[name=exchange_rate]").getValue();
            params.description = form.down("textfield[name=description]").getValue();
            params.currency_id = form.down("textfield[name=currency]").getValue();

            if (form.action === "edit") {
                method = "PUT";
                params.id = form.down("hiddenfield[name=id]").getValue();
            }

            this.fireEvent('doSubmitData',
                params,
                form.store,
                method,
                form.action_url,
                function () {
                    var activeTab = form.up('panel'),
                        locationsGrid = activeTab.queryById(btn.grid);
                    if (locationsGrid) {
                        locationsGrid.show();
                    } else {
                        activeTab.close();
                    }
                    form.destroy();
                });
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    },
    doSaveTransactionType: function (btn, evt, eOpts) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var form = btn.up('form'),
                params = {},
                method = "POST";
            params.token = form.down("textfield[name=_token]").getValue();
            params.name = form.down("textfield[name=name]").getValue();
            params.t_code = form.down("textfield[name=t_code]").getValue();
            params.description = form.down("textfield[name=description]").getValue();
            params.t_type = form.down("textfield[name=t_type]").getValue();
            params.output = form.down("textfield[name=output]").getValue();
            params.system_invoice = form.down("checkboxfield[name=system_invoice]").getValue();
            params.system_receipt = form.down("checkboxfield[name=system_receipt]").getValue();

            if (form.action === "edit") {
                method = "PUT";
                params.id = form.down("hiddenfield[name=id]").getValue();
            }

            this.fireEvent('doSubmitData',
                params,
                form.store,
                method,
                form.action_url,
                function () {
                    var activeTab = form.up('panel'),
                        locationsGrid = activeTab.queryById(btn.grid);
                    if (locationsGrid) {
                        locationsGrid.show();
                    } else {
                        activeTab.close();
                    }
                    form.destroy();
                });
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    },
    doSavePaymentInterval: function (btn, evt, eOpts) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var form = btn.up('form'),
                params = {},
                method = "POST";
            params.token = form.down("textfield[name=_token]").getValue();
            params.name = form.down("textfield[name=name]").getValue();
            params.duration = form.down("numberfield[name=duration]").getValue();
            params.unit = form.down("numberfield[name=unit]").getValue();
            params.fixed = form.down("checkboxfield[name=fixed]").getValue();
            params.fixed_entry_point = form.down("textfield[name=fixed_entry_point]").getValue();
            params.notification_time_interval = form.down("numberfield[name=notification_time_interval]")
                .getValue();
            params.notification_time_interval_unit = form.down("numberfield[name=notification_time_interval_unit]")
                .getValue();

            if (form.action === "edit") {
                method = "PUT";
                params.id = form.down("hiddenfield[name=id]").getValue();
            }

            this.fireEvent('doSubmitData',
                params,
                form.store,
                method,
                form.action_url,
                function () {
                    var activeTab = form.up('panel'),
                        locationsGrid = activeTab.queryById(btn.grid);
                    if (locationsGrid) {
                        locationsGrid.show();
                    } else {
                        activeTab.close();
                    }
                    form.destroy();
                });
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    },
    doSaveFeeType: function (btn, evt, eOpts) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var form = btn.up('form'),
                params = {},
                method = "POST";
            params.token = form.down("textfield[name=_token]").getValue();
            params.name = form.down("textfield[name=name]").getValue();
            params.gl_code = form.down("textfield[name=gl_code]").getValue();

            if (form.action === "edit") {
                method = "PUT";
                params.id = form.down("hiddenfield[name=id]").getValue();
            }

            this.fireEvent('doSubmitData',
                params,
                form.store,
                method,
                form.action_url,
                function () {
                    var activeTab = form.up('panel'),
                        locationsGrid = activeTab.queryById(btn.grid);
                    if (locationsGrid) {
                        locationsGrid.show();
                    } else {
                        activeTab.close();
                    }
                    form.destroy();
                });
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    },
    doDeleteParameter: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.store,
            url = item.action_url + "/" + id + "/" + item.action_type;
        this.fireEvent('deleteRecord', id, item.entity, item.store, url, "DELETE");
    },
    ////////////////////////////////////////////////////////
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
    paramBackToGrid: function (btn) {
        var me = this,
            form = btn.up('form'),
            
            // main_tabPanel = form.up('#contentPanel'),
            activeTab = form.up('panel'),//main_tabPanel.getActiveTab(),
            routeId = activeTab.routeId,
            gridWidget = btn.grid,
            grid = activeTab.down(gridWidget);
        activeTab.remove(form);
        if (grid) {
            grid.show();
        } else {
            activeTab.close();
        }
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
    doCostElementEdit: function(item) {
        //alert();
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var me = this,
                btn = item.up('button'),
                grid = btn.up('grid'),
                activeTab = grid.up('panel'),
                record = btn.getWidgetRecord(),
                id = record.get('id'),
                form = Ext.widget(item.form),
                routeId = activeTab.routeId;

            form.action = "edit";
            form.loadRecord(record);
            grid.hide();
            activeTab.add(form);
        }
    },
     doSaveElementcostParameter: function (btn, evt, opts) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
           var form = btn.up('form'),
                params = {},
                method = "POST";
            params.token = form.down("textfield[name=_token]").getValue();
            params.feetype = form.down("textfield[name=feetype]").getValue();
            params.category = form.down("combo[name=category]").getValue();
            params.subcategory = form.down("combo[name=subcategory]").getValue();
            params.costelement = form.down("textfield[name=costelement]").getValue();
            params.cost = form.down("textfield[name=cost]").getValue();
            params.currency = form.down("combo[name=currency]").getValue();

           var opt = form.down("combo[name=optional]").getValue();
            if(opt=='Yes'){
            params.optional = 1;
                         }else{
            params.optional = 0;     
                         }


            this.fireEvent('doSubmitData',
                params,
                form.store,
                method,
                form.action_url,
                function () {
                    var activeTab = form.up('panel'),
                        locationsGrid = activeTab.queryById(btn.grid);
                    if (locationsGrid) {
                        locationsGrid.show();
                    } else {
                        activeTab.close();
                    }
                    form.destroy();
                });
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    },
     doSaveRecord: function (btn, evt, eOpts) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {

            var form = btn.up('form'),
                params={},
                store=btn.storeID,
                token = form.down("textfield[name=_token]").getValue(),
                name = form.down("textfield[name=name]").getValue(),
                description = form.down("textarea[name=description]").getValue(),
                is_enabled = form.down("checkbox[name=is_enabled]").getValue();
                 
                var section = form.down("combo[name=section_id]");
                if(section){
                    params.section_id=section.getValue();
                }
                var fee_type = form.down("combo[name=fee_type_id]");
                 if(fee_type){
                    params.fee_type_id=fee_type.getValue();
                }
                var device_type = form.down("combo[name=device_type_id]");
                 if(device_type){
                    params.device_type_id=device_type.getValue();
                }
             Ext.getBody().mask("saving");

                 form.submit({
                     url: 'commonparam/saveCommonParameter',
                     method: 'GET',
                     params : {
                                '_token': token,
                                'name': name,
                                'description': description,
                                'is_enabled': is_enabled,
                                'table_name':btn.table_name
                              },
                      success: function(response, textStatus, request) {
                         Ext.getBody().unmask();
                               toastr.success(textStatus.result.message, 'Success');
                               var activeTab = form.up('panel'),
                               locationsGrid = activeTab.queryById(btn.grid);
                            if (locationsGrid) {
                                locationsGrid.show();
                            } else {
                                activeTab.close();
                            }
                            form.destroy();
                            Ext.getStore(store).reload();
                           return true; 
                          
                      },
                      failure: function(response, textStatus, request) {
                         Ext.getBody().unmask();
                         toastr.warning(textStatus.result.message, 'Failed!'); 
                      },
                          });
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    },

     doDeleteRecord: function (btn, evt, eOpts) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {

            var btnn = btn.up('button'),
                record = btnn.getWidgetRecord();
             Ext.getBody().mask("Deleting...");

              Ext.Ajax.request({
                     url: 'commonparam/deleteParameters',
                      method: 'GET',
                      headers: {
                                'Authorization':'Bearer '+access_token
                            },
                     params : {
                                '_token': token,
                                'id': record.get('id'),
                                'action': btn.action_type,
                                'table_name':btn.table_name
                              },
                    
                       success: function(response, textStatus, request) {
                               Ext.getBody().unmask();
                               toastr.success(JSON.parse(response.responseText).message, 'Success');
                               Ext.getStore(btn.store).reload();
                               return true; 
                          
                      },
                      failure: function(response, textStatus, request) {
                         Ext.getBody().unmask();
                         toastr.warning(JSON.parse(response.responseText).message, 'Failed!'); 
                      },
                  });

                 
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    }

});