Ext.define('Admin.view.sampleinventory.viewcontroller.SampleInventoryVCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sampleinventoryvctr',

    /**
     * Called when the view is created
     */
    init: function() {
        Form_record = '';
        Ext.apply(Ext.form.field.VTypes, {
            semiColonList: function(value, field) {
                if(!this.semiColonListRe.test(value)){
                    field.setValue(value.slice(0, -1));
                }
                return true;
            },
 
           semiColonListRe: /[^,]+$/,
           semiColonListText: "Please use semicolon as a separator",
           semiColonListMask: /[^!\,\a]/,
        });
    },

    setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },
    setReportGlobalStore:function (obj, options) {
        this.fireEvent('setReportGlobalStore', obj, options);
    },
    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
    setUserCombosStore: function (obj, options) {
        this.fireEvent('setUserCombosStore', obj, options);
    },
    //graphs
    onAxisLabelRender: function (axis, label, layoutContext) {
        var value = layoutContext.renderer(label);
        return value === 0 ? '0' : Ext.util.Format.number(value);
    },

    onSeriesLabelRender: function (value) {
        return Ext.util.Format.number(value);
    },

    onGridColumnRender: function (v) {
        return Ext.util.Format.number(v);
    },
    //end of graphs
reloadParentGridOnChange: function (combo) {
        var grid = combo.up('grid'),
            store = grid.getStore();
        store.load();
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
    
    },
     doDeleteInvemtoryItem: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
    
    },
    receivedsamplegridsearch: function(item) {
        var me = this,
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
       
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        
    },
    LoadIssueInventorygrid: function(item) {
        var me = this,
            panel = item.up('panel'),
            item_reference_no = panel.down('textfield[name=item_reference_no]').getValue(),
            remaining_quantity = panel.down('textfield[name=remaining_quantity]').getValue(),
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.down('textfield[name=item_reference_no]').setValue(item_reference_no);
        form.down('hiddenfield[name=remaining_quantity]').setValue(remaining_quantity);

        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        
    },
    receivedsamplegridDbclick: function(dv, record, item, index, e) {

    if(record.data.remaining_quantity > 0){
             var panel = Ext.widget('issuinginventory'),
                 form = panel.down('form');
             form.loadRecord(record);
             var tea = dv.up('window');
             tea.hide();
            funcShowCustomizableWindow("Issue Item", "90%", panel, 'customizablewindow');

        }else{
            toastr.error("Please restock...", 'No Stock Left');
        }
            
        },
    disposeItemDBClick: function(dv, record, item, index, e) {

        if(record.data.remaining_quantity > 0){
                 var form =  Ext.ComponentQuery.query("#disposalInventoryForm")[0];
                 form.loadRecord(record);
                 var tea = dv.up('window');
                 tea.hide();
            }else{
                toastr.error("Out Of stock...", 'No Stock Left');
            }
            
        },


issuerequestedItemgridDbclick: function(dv, record, item, index, e) {

             var form = Ext.widget('issuerequestedinventoryitemFrm');

             form.loadRecord(record);
             var tea = dv.up('window');
             tea.hide();
            funcShowCustomizableWindow("Issue Item", "40%", form, 'customizablewindow');
            
        },
     showEditConfigParamWinFrm: function (item) {
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
        Form_record = record;
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
       
    },

    showInventoryItemDetails: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            panel = Ext.widget(childXtype),
            form = panel.down('form'),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, panel, 'customizablewindow');
       
    },


     showAddConfigParamWinFrm: function (btn) {
      
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
       
    },
   LoadRecordsForEdit: function(item) {
       
   },
    loadProductDetails: function(dv, record, item, index, e) {
       var form =Ext.ComponentQuery.query("#SampleInventoryForm")[0]; 
       delete(record.data.id);
       console.log(record);
       form.loadRecord(record);
       if(form.down('combo[name=common_name_id]')){
               form.down('combo[name=common_name_id]').setReadOnly(true);
               form.down('combo[name=section_id]').setReadOnly(true);
               form.down('combo[name=classification_id]').setReadOnly(true);
        }
     var tea = dv.up('window');
     tea.hide();

    },

    loadNewSampleForm: function(combo, newvalue, oldValue, eopt) {
        var  formpanel = combo.up('form');
        
        formpanel.down('combo[name=item_type_id]').setReadOnly(true);
        
        var config = {
                storeId: 'itemtype_formconfigStr',
                proxy: {
                    url: 'sampleinventory/getConfigFormDetails',
                    method: 'GET',
                    extraParams: {
                        table_name: 'par_itemtype_formconfig',
                        sample_item_type_id: newvalue
                    },
                   }
              };

        Ext.create('Admin.store.summaryreport.ReportsGlobalAbstractStr', config);

     
        Ext.getStore('itemtype_formconfigStr').load(function() {
         
        var store= Ext.getStore('itemtype_formconfigStr');
        store.each(function(record){
             
                        var xtype = record.get('xtype'),
                            required = record.get('is_required'),
                            editable = record.get('is_editable');
                        if(required){
                            required = false;
                        }else{
                            required = true;
                        }
                        if(editable){
                            editable = false;
                        }else{
                            editable = true;
                        }


                     if(xtype == 'textfield'){
                        formpanel.add(Ext.create("Ext.form.field.Text", 
                            {
                                fieldLabel:record.get('field_label'),
                                name: record.get('field_name'),
                                allowBlank: required,
                                margin: '0 20 20 0',
                                readOnly: editable,
                                columnWidth: 0.5
                            }));
                          
                        }
                     if(xtype == 'combobox'){
                        formpanel.add(Ext.create("Ext.form.ComboBox", 
                            {
                                fieldLabel:record.get('field_label'),
                                name: record.get('field_name'),
                                margin: '0 20 20 0',
                                allowBlank: required,
                                readOnly: editable,
                                valueField: 'id',
                                displayField: 'name',
                                forceSelection: true,
                                columnWidth: 0.5,
                                queryMode: 'local',
                                listeners: {
                                    beforerender: {
                                        fn: 'setConfigCombosStore',
                                        config: {
                                            pageSize: 1000,
                                            proxy: {
                                                url: 'commonparam/getCommonParamFromTable',
                                                extraParams: {
                                                    table_name: record.get('combo_table_name')
                                                }
                                            }
                                        },
                                        isLoad: true
                                    }
                                }
                            }));
                        }
                    if(xtype == 'datefield'){
                        formpanel.add(Ext.create("Ext.form.field.Date", 
                            {
                                fieldLabel:record.get('field_label'),
                                name: record.get('field_name'),
                                allowBlank: required,
                                format: 'Y-m-d',
                                margin: '0 20 20 0',
                                readOnly: editable,
                                columnWidth: 0.5
                            }));
                          
                        }
                     if(xtype == 'numberfield'){
                        formpanel.add(Ext.create("Ext.form.field.Number", 
                            {
                                fieldLabel:record.get('field_label'),
                                name: record.get('field_name'),
                                allowBlank: required,
                                margin: '0 20 20 0',
                                readOnly: editable,
                                columnWidth: 0.5
                            }));
                          
                        }

                     });
            var ref = formpanel.down('textfield[name = reference_no]').getValue();
                   // item.loadRecord(Form_record);
                   if(ref != ''){
                        formpanel.loadRecord(Form_record);
                        Form_record = '';
                   }

             });

        formpanel.down('button[name=search_btn]').enable();
        

    },

doSaveInventory: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form_xtype = btn.up('form'),
            win = form_xtype.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID);

        var frm = form_xtype.getForm();
            
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {table_name: table},
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
    doSaveIssueInventory: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form_xtype = btn.up('form'),
            win = form_xtype.up('window'),
            issue_form =Ext.ComponentQuery.query("#issuinginventoryId")[0], 
            remaining_quantity =  form_xtype.down('hiddenfield[name=remaining_quantity]').getValue(),
            quantity_issued =  form_xtype.down('textfield[name=quantity_issued]').getValue(),
            storeID = btn.storeID,
            store = Ext.getStore(storeID);
        if(quantity_issued < remaining_quantity){
        var frm = form_xtype.getForm();
            
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {table_name: table},
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
                        if(issue_form){
                            issue_form.hide();
                            var tea = issue_form.up('panel');
                            tea.hide();
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
    }else{
         toastr.error("Only "+remaining_quantity+" stock remains", 'Overdraft Issue');
    }
    },

    issueInventoryDBClick: function(dv, record, item, index, e) {
        var me = this,
            child = Ext.widget('issueinventoryFrm');
            child.loadRecord(record);

        funcShowCustomizableWindow('Issue Inventory Item', '40%', child, 'customizablewindow');
    },

    func_filterInventoryReport: function(btn) {
        var form = btn.up('form'),
            inventory_type_id = form.down('combo[name = inventory_type_id]').getValue(),
            reference = form.down('textfield[name = reference]').getValue(),
            date_opt = form.down('combo[name = date_opt]').getValue(),
            from_date = form.down('datefield[name = from_date]').getValue(),
            to_date = form.down('datefield[name = to_date]').getValue(),
            cont_form = form.up('form'),
            cartesianStr = cont_form.down('cartesian').getStore(),
            gridStr = cont_form.down('gridpanel').getStore();

            cartesianStr.removeAll();
            gridStr.removeAll();

            cartesianStr.load({params:{
                        inventory_type_id:inventory_type_id,
                        reference:reference,
                        date_opt:date_opt,
                        from_date:from_date,
                        to_date:to_date
            }});

            gridStr.load({params:{
                        inventory_type_id:inventory_type_id,
                        reference:reference,
                        date_opt:date_opt,
                        from_date:from_date,
                        to_date:to_date
            }});

          console.log('called');  
        // if (frm.isValid()) {
        //     frm.submit({
        //         url: 'sampleinventory/getInventoryStockReportgrid',
        //         method: 'GET',
        //         waitMsg: 'Please wait...',
                 
        //         success: function (form, action) {
        //             var response = Ext.decode(action.response.responseText),
        //                 success = response.success,
        //                 message = response.message;
        //             if (success == true || success === true) {
        //                 toastr.success(message, "Success Response");
        //                 gridStr.removeAll();
        //                 gridStr.loadRecord(response.results);

        //             } else {
        //                 toastr.error(message, 'Failure Response');
        //             }
        //         },
        //         failure: function (form, action) {
        //             var resp = action.result;
        //             toastr.error(resp.message, 'Failure Response');
        //         }
        //     });
        // }

    },

    
    showApplicantSelectionList: function (btn) {
        var grid = Ext.widget('productapplicantselectiongrid');
        if (btn.applicantType == 'local') {
            grid.applicantType = btn.applicantType;
        } else {
            grid.applicantType = 'nonlocal';
        }
        funcShowCustomizableWindow('Applicant Selection List', '90%', grid, 'customizablewindow');
    },
     quickNavigation: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel'),
            application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;

        if (step > 1) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            wizardPnl.down('button[name=save_btn]').setDisabled(true);
            motherPnl.getViewModel().set('atBeginning', true);
        } else if (step == 1) {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', false);
            motherPnl.getViewModel().set('atEnd', true);
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
            motherPnl.getViewModel().set('atEnd', false);
        }

        if (step === 3) {
            wizardPanel.down('button[name=save_screening_btn]').setVisible(true);
            motherPnl.getViewModel().set('atEnd', true);

        } else {
            wizardPnl.down('button[name=save_btn]').setText('Save Application Details');
           // wizardPnl.down('button[name=save_btn]').handler = 'saveProductReceivingBaseDetails';
           
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            }
            else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },

    loadDipsposalApprovalFrm: function(item) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            is_update = item.is_update,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            recommendation_id = record.get('recommendation_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id'),
            item_reference_no = record.get('item_reference_no'),
            inventory_id = record.get('inventory_id'),
            item_id = record.get('item_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            table_name = item.table_name,
            approval_frm = item.approval_frm,
            form = Ext.widget(approval_frm),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
       
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        if (recommendation_id) {
            form.down('button[name=save_recommendations]').setText('Update Recommendation');
        }
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        form.down('hiddenfield[name=item_reference_no]').setValue(item_reference_no);
        form.down('hiddenfield[name=inventory_id]').setValue(inventory_id);
        form.down('hiddenfield[name=item_id]').setValue(item_id);
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

    selectDisposalsampleDbclick: function(dv, record, item, index, e) {
    var store = Ext.getStore('disposalinventorySelectionStr');
    store.load(record, false);
     var tea = dv.up('window');
     tea.hide();

    
},


     showDisposalSelectionList: function (btn) {
        var grid = Ext.widget('inventoryDashboardGrid'),
            grid2 = Ext.ComponentQuery.query('#inventoryDisposalSelectionGrid')[0];
        grid.events['itemdblclick'].clearListeners();
        grid.events['itemdblclick'].addListener(function(dv, record, item, index, e) {
            if(record.data.remaining_quantity > 0){
                var store = grid2.getStore();
                store.add(record);
             var tea = dv.up('window');
             tea.hide();
            }else{
                    toastr.error("Out of Stock...", 'No Stock Left');
                }
    });
      
        funcShowCustomizableWindow('Disposal Items Selection List', '70%', grid, 'customizablewindow');
    },

    disposeInventoryDBClick: function(dv, record, item, index, e) {

     Ext.getBody().mask('Please wait...');
     var check = true;

      var   dashboardWrapper = Ext.ComponentQuery.query("#disposalInventorycnt")[0],
            process_name = record.get('process_name'),
            workflow_stage = record.get('workflow_stage'),
            application_status = record.get('application_status'),
            //tracking_no = record.get('tracking_no'),
            reference_no = record.get('reference_no'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            active_application_id = record.get('active_application_id'),
            active_application_code = record.get('active_application_code'),
            application_status_id = record.get('application_status_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            status_type_id = record.get('status_type_id');

            if(!active_application_code){
               active_application_code = record.get('application_code');
            }

            workflow_details = getAllWorkflowDetails(process_id, workflow_stage_id);

            if (!workflow_details) {
                    Ext.getBody().unmask();
                    toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
                    check = false;
                    return false;
                }
    if(check){
      //var workflowContainer =Ext.widget('newDisposalApplicationPnl'),  
          var workflowContainer = Ext.widget(workflow_details.viewtype);
          dashboardWrapper.getViewModel().set('pnl_title', workflow_stage);

          wrapper = Ext.ComponentQuery.query("#disposalInventorycnt")[0];
          wrapper.removeAll();

          workflowContainer.down('displayfield[name = process_name]').setValue(process_name);
          workflowContainer.down('displayfield[name = workflow_stage]').setValue(workflow_stage);
          workflowContainer.down('displayfield[name = application_status]').setValue(application_status);
         // workflowContainer.down('displayfield[name = tracking_no]').setValue(tracking_no);
          workflowContainer.down('displayfield[name = reference_no]').setValue(reference_no);


          workflowContainer.down('hiddenfield[name = process_id]').setValue(process_id);
          workflowContainer.down('hiddenfield[name = workflow_stage_id]').setValue(workflow_stage_id);
          workflowContainer.down('hiddenfield[name = active_application_id]').setValue(active_application_id);
          workflowContainer.down('hiddenfield[name = active_application_code]').setValue(active_application_code);
          workflowContainer.down('hiddenfield[name = application_status_id]').setValue(application_status_id);
          workflowContainer.down('hiddenfield[name = module_id]').setValue(module_id);
          workflowContainer.down('hiddenfield[name = sub_module_id]').setValue(sub_module_id);
          workflowContainer.down('hiddenfield[name = section_id]').setValue(section_id);
          workflowContainer.down('hiddenfield[name = status_type_id]').setValue(status_type_id);

          wrapper.add(workflowContainer);
    }

    Ext.Function.defer(function () {
        Ext.getBody().unmask();
    }, 300);
    },
    opennewInventoryDBClick: function(dv, record, item, index, e) {
         Ext.getBody().mask('Please wait...');
         var check = true;
        var me = this,
            mainTabPanel = Ext.ComponentQuery.query("#disposeinventory")[0],
            dashboardWrapper = Ext.ComponentQuery.query("#disposalInventorycnt")[0],
            diposalDashboardtabpanel = Ext.ComponentQuery.query("#diposalDashboardtabpanel")[0],
            module_id = record.get('module_id'),
            section_id = record.get('section_id'),
            sub_module_id = record.get('sub_module_id');
             
            mainTabPanel.down('hiddenfield[name=module_id]').setValue(module_id);
            mainTabPanel.down('hiddenfield[name=section_id]').setValue(section_id);
            mainTabPanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

    
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id);
            mainTabPanel.down('disposeinventorytbr').hide();
       
        if (!workflow_details) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            check = false;
            return false;
        }
 if(check){
        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(workflow_details.viewtype);
        dashboardWrapper.getViewModel().set('pnl_title', 'New Disposal Request');
        //var workflowContainer = Ext.widget('newDisposalApplicationPnl');
        workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
        workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
        workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.applicationStatus);
        workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
        workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
        workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
        workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);
        workflowContainer.down('hiddenfield[name=active_application_code]').setValue(record.get('application_code'));
        workflowContainer.down('hiddenfield[name=active_application_id]').setValue(record.get('application_id'));


        //set values
        var disposalinventoryFrm = workflowContainer.down('disposalinventoryFrm');
        disposalinventoryFrm.loadRecord(record);
        diposalDashboardtabpanel.setActiveTab(dashboardWrapper);
        dashboardWrapper.add(workflowContainer);
      
    }
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);
    
        
    },
    initiateNewDisposalApplication: function(btn) {

        Ext.getBody().mask('Please wait...');
        var check = true;
        var me = this,
            mainTabPanel = Ext.ComponentQuery.query("#disposeinventory")[0],
            dashboardWrapper = Ext.ComponentQuery.query("#disposalInventorycnt")[0],
            module_id = mainTabPanel.down('hiddenfield[name=module_id]').getValue(),
            section_id = mainTabPanel.down('hiddenfield[name=section_id]').getValue(),
            sub_module_id = mainTabPanel.down('hiddenfield[name=sub_module_id]').getValue(),
            filter = {section_id: section_id};
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id);
mainTabPanel.down('disposeinventorytbr').hide();
       
        if (!workflow_details) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            check = false;
            return false;
        }
    if(check){
        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(workflow_details.viewtype);
        dashboardWrapper.getViewModel().set('pnl_title', 'New Disposal Request');
        //var workflowContainer = Ext.widget('newDisposalApplicationPnl');
        workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
        workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
        workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.applicationStatus);
        workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
        workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
        workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
        workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);
        dashboardWrapper.add(workflowContainer);
      }
       
            Ext.getBody().unmask();
      

        //load the stores
    },
    Backhome:function(btn) {
       var dashboardWrapper = Ext.ComponentQuery.query("#disposalInventorycnt")[0],
            container = Ext.ComponentQuery.query("#disposeinventory")[0],
            panel = Ext.widget('disposeinventoryGrid');
        if(dashboardWrapper){
        dashboardWrapper.getViewModel().set('pnl_title', 'Active Request');
        dashboardWrapper.removeAll();
        dashboardWrapper.add(panel);
        //add toolbar
        container.down('disposeinventorytbr').show();
        }else{
            var dashboard = btn.up('dashboard');
            console.log(dashboard);
        }

    },

    saveDisposalRequestDetails: function(btn) {
        Ext.getBody().mask('Please wait...');
        var activeTab = Ext.ComponentQuery.query("#newDisposalApplicationPnl")[0],
            disposalItemFrm = activeTab.down("disposalinventoryFrm"),
            itemStore = activeTab.down("inventoryDisposalSelectionGrid").getStore(),
            process_id = activeTab.down('hiddenfield[name = process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name = workflow_stage_id]').getValue(),
            active_application_id = activeTab.down('hiddenfield[name = active_application_id]').getValue(),
            active_application_code = activeTab.down('hiddenfield[name = active_application_code]').getValue(),
            application_status_id = activeTab.down('hiddenfield[name = application_status_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name = module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name = sub_module_id]').getValue(),
            item_records = itemStore.getCount(),
          //  store = Ext.getStore('disposeInventoryStr'),
            frm = disposalItemFrm.getForm();

        items = [];
        for (var i = 0; i < itemStore.data.items.length; i++) {
            var record = itemStore.data.items [i];

            if(record.get('remaining_quantity') >= record.get('disposal_quantity')){
                obj = {
                    item_reference_no: record.get('item_reference_no'),
                    inventory_id: record.get('id'),
                    disposal_quantity: record.get('disposal_quantity')
                };
          //   if (record.dirty) {
                items.push(obj);
            // }
             }else{
                Ext.getBody().unmask();
                toastr.error("The given Disposal Quantity for item id "+record.get('id')+" exceeds available stock", 'Quantity Exceeded Stock');
               return false;
             }
        }

items = JSON.stringify(items);
        if(item_records > 0){
            if (frm.isValid()) {
                frm.submit({
                    url: 'sampleinventory/saveDisposalRequest',
                    params: {
                        items: items,
                        process_id: process_id,
                        workflow_stage_id: workflow_stage_id,
                        active_application_id: active_application_id,
                        active_application_code: active_application_code,
                        application_status_id: application_status_id,
                        module_id: module_id,
                        sub_module_id: sub_module_id
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
                            itemStore.removeAll();
                            itemStore.load();

                            //setting variables
                            activeTab.down('hiddenfield[name = active_application_id]').setValue(response.active_application_id);
                            activeTab.down('hiddenfield[name = active_application_code]').setValue(response.active_application_code);
                            activeTab.down('hiddenfield[name = application_status_id]').setValue(response.application_status_id);
                            Ext.getBody().unmask();
                        } else {
                            toastr.error(message, 'Failure Response');
                            Ext.getBody().unmask();

                        }
                    },
                    failure: function (form, action) {
                        var resp = action.result;
                            Ext.getBody().unmask();
                        toastr.error(resp.message, 'Failure Response');
                    }
                });
        }else{
             Ext.getBody().unmask();
            toastr.error("Please provide all required disposal details", 'Incomplete Disposal Details');
        }
        }else{ 
             Ext.getBody().unmask();
            toastr.error("Please select atleast one item for disposal", 'No Disposal Items Selected');
        }


    },

    showReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var activeTab = Ext.ComponentQuery.query("#newDisposalApplicationPnl")[0],
            application_code = activeTab.down('hiddenfield[name = active_application_code]').getValue(),
            disposalItemFrm = activeTab.down("disposalinventoryFrm"),
            inventoryDisposalSelectionGrid = activeTab.down("inventoryDisposalSelectionGrid"),
            //applicantFrm = activeTab.down("productapplicantdetailsfrm"),
            storeID = btn.storeID,
            table_name = btn.table_name,
            item_store = inventoryDisposalSelectionGrid.getStore(),
            is_saved = true,
            winWidth = btn.winWidth;
            
        //check any unsaved edits
        for (var i = 0; i < item_store.data.items.length; i++) {
            var record = item_store.data.items [i];
             if (record.dirty) {
                Ext.getBody().unmask();
                toastr.error("Please save quantity updates before submitting", 'Unsaved Edits');
               is_saved = false;
              }
             }
        if(application_code == ''){
            Ext.getBody().unmask();
            toastr.error("Please save updates before submitting", 'Unsaved Edits');
            is_saved = false;
        }


           var  frm = disposalItemFrm.getForm(),
             valid = frm.isValid();
       if(is_saved){
         if (valid) {
            if(item_store.getCount() > 0){
                var application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
                    application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
                    workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
                    is_dataammendment_request =0,
                    module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
                    storeID = [];
        
                showWorkflowSubmissionWin(application_id, application_code, table_name, 'Inventorydisposalsubmissionsreceivingfrm', winWidth, storeID,'','','','',is_dataammendment_request);
          
            }else {
                    Ext.getBody().unmask();
                    toastr.warning('Please add disposal items', 'Warning Response');
                    return;
            }
         } 
         else {
            Ext.getBody().unmask();
            toastr.warning('Please Enter All the required Disposal Details!!', 'Warning Response');
            return;
         }
        }

    },

    save_recommendation: function(btn) {
        
        Ext.getBody().mask('Please wait...');
        var form = btn.up('form'),
            store = Ext.getStore('inventorydisposalapprovalitemsSstr'),
            cont = form.up('window'),
            frm = form.getForm();

            if (frm.isValid()) {
                frm.submit({
                    url: 'sampleinventory/ApproveItemDisposalRequest',
                    params: { },
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

                            cont.hide();

                            Ext.getBody().unmask();
                        } else {
                            toastr.error(message, 'Failure Response');
                            Ext.getBody().unmask();

                        }
                    },
                    failure: function (form, action) {
                        var resp = action.result;
                            Ext.getBody().unmask();
                        toastr.error(resp.message, 'Failure Response');
                    }
                });

            }
    },

submit_selected: function(btn) {
    Ext.getBody().mask('Please wait...');

     var grid = btn.up('grid');
     items = [];
     var check = true;
     //confirm all items are recommended
     grid.getStore().each(function(record){
          if(!record.get('recommendation_id')){
            toastr.error("Please recommend item "+record.get('item_reference_no'), 'Failure Response');
            check = false;
            return false;
          }
        });

    if(check){
        var grid = btn.up('grid'),
            activeTab = grid.up('panel'),
            applicantFrm = activeTab.down("productapplicantdetailsfrm"),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth;
            
          var  application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
                application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
                workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
                is_dataammendment_request =0,
                module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
                storeID = [];
        
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'Inventorydisposalsubmissionsreceivingfrm', winWidth, storeID,'','','','',is_dataammendment_request);
          
      
    }

            Ext.getBody().unmask();
       
},

viewDisposalRequestDetails: function(item) {
    var btn = item.up('button'),
        record = btn.getWidgetRecord(),
        application_code = record.get('application_code'),
        panel = Ext.widget('inventoryDisposalRequestDetailsPnl'),
        grid = panel.down('grid'),
        info_panel = panel.down('panel'),
        grid_store = grid.getStore();

        panel.down('hiddenfield[name = application_code]').setValue(application_code);

        Ext.Ajax.request({
                  url: 'sampleinventory/getDisposalRequestDetails',
                  method: 'get',
                  params : {
                        'application_code':application_code
                     },
                  
                   success: function (response, textStatus, request) {
                        var results = JSON.parse(response.responseText);

                         if(results.success){
                            info_panel.down('displayfield[name = requested_by]').setValue(results.requested_by);
                            info_panel.down('displayfield[name = disposal_date]').setValue(results.disposal_date);
                            info_panel.down('displayfield[name = disposal_reason]').setValue(results.disposal_reason);
                            info_panel.down('displayfield[name = disposal_method]').setValue(results.disposal_method);
                            info_panel.down('textarea[name = comment]').setValue(results.comment);
                         }
  
                  },
                  failure: function(conn, response, options, eOpts) {
                    var results = JSON.parse(response.responseText);
                    toastr.error(results.message, 'Failure Response');
                  }
            });
    funcShowCustomizableWindow("Disposal Request Details", '60%', panel, 'customizablewindow');
},

approveAllRequests: function(btn) {
    var grid = btn.up('grid'),
        store = grid.getStore();

    store.each(function(record){
         var form=Ext.create('Ext.form.Panel', {}),
          frm=form.getForm();

          frm.submit({
                    url: 'sampleinventory/ApproveItemDisposalRequest',
                    params: {
                        item_id: record.get('item_id'),
                        decision_id: 1,
                        inventory_id: record.get('inventory_id'),
                        approval_date: new Date(),
                        comment: 'Approved as batch',
                        reason_for_rejection: ''
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
                        if (!success) {
                            toastr.success(message, "Success Response");
                            return false;
                        }
                    },
                    failure: function (form, action) {
                        toastr.error(resp.message, 'Failure Response');
                     return false;
                    }
                });
        });

        store.removeAll();
        store.load();
        Ext.getBody().unmask();
},

RemoveInventoryItemSelection: function(item) {
    var btn = item.up('button'),
        record = btn.getWidgetRecord(),
        store = item.up('grid').getStore(),
        entry_id = record.get('entry_id');

        var form=Ext.create('Ext.form.Panel', {}),
          frm=form.getForm();

          frm.submit({
                    url: 'sampleinventory/removeDisposalItemEntry',
                    params: {
                        entry_id: entry_id
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
                        if (success) {
                            toastr.success(message, "Success Response");
                            store.removeAll();
                            store.load();

                            Ext.getBody().unmask();
                            return true;
                        }
                    },
                    failure: function (form, action) {
                        store.removeAll();
                            store.load();
                            Ext.getBody().unmask();
                        toastr.error(resp.message, 'Failure Response');
                     return false;
                    }
                });
        }
    
});