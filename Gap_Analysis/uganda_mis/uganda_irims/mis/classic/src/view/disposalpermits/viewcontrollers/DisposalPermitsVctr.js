Ext.define('Admin.view.disposalpermits.viewcontrollers.DisposalPermitsVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.disposalpermitsvctr',

    /**
     * Called when the view is created
     */
    init: function () {

    },
	editpreviewPermitQueryinformation: function (grid,record) {
        this.fireEvent('editpreviewDisposalQueryinformation', grid,record);
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
    showNewDisposalApplications: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('showNewDisposalApplications', application_type);
    },
    doCreateProductRegParamWin: function (btn) {
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
                params: { model: table },
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

    addInvoiceCostElement: function (sel, record) {
        var gridView = sel.view,
            selection_grid = gridView.grid,
            panel = gridView.up('drugnewinvoicingpnl'),
            summary_grid = panel.down('productinvoicingcostdetailsgrid'),
            summary_store = summary_grid.getStore(),
            index = summary_store.indexOf(record);
        if (index < 0) {
            summary_store.add(record);
        }
    },
    showAddTcMeetingParticipants: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            pnl = grid.up('panel'),//('newclinicaltrialmanagermeetingpanel'),
            meeting_id = pnl.down('form').down('hiddenfield[name=id]').getValue(),
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
        meeting_id = containerPnl.down('hiddenfield[name=id]').getValue();

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
    onViewDisposalPermitsApplication: function (grid, record) {
        this.fireEvent('viewApplicationDetails', record);
    },
    onDblClickregisterednonregisteredprodgrid: function (grid, record) {
        var me = this,
            product_id = record.get('product_id'),
            brand_name =record.get('brand_name'), 
            section_id =record.get('section_id'), 

            winTitle ='Permit Products Details',
            winWidth = 600,
            childObject = Ext.widget('importexportpermitsproductsfrm');
          

            funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
            childObject.down('hiddenfield[name=product_id]').setValue(product_id);
            childObject.down('textfield[name=brand_name]').setValue(brand_name);
            
            if(section_id == 4){
                childObject.down('combo[name=device_type_id]').show();
           
            }
            else{
                childObject.down('combo[name=device_type_id]').hide();
           
            }
    },
    onDblClicksearchproductsinformationgrid: function (grid, record) {
        var me = this,
            product_id = record.get('product_id'),
            brand_name =record.get('brand_name'), 
            section_id =record.get('section_id'), 

            winTitle ='Disposal Permit Products Details',
            winWidth = 600,
            childObject = Ext.widget('disposalpermitsproductsfrm');
          

            funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
            childObject.down('hiddenfield[name=product_id]').setValue(product_id);
            childObject.down('textfield[name=brand_name]').setValue(brand_name);
            
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
    
    onChangeIsRegulatedProduct:function(cbo, value){
                var frm = cbo.up('form');
                    regulated_prodpermit = frm.down('combo[name=regulated_prodpermit_id]');
                if(value == 1){
                    regulated_prodpermit.setDisabled(false);
                }
                else{
                    regulated_prodpermit.setDisabled(true);
                }


    },
    funcSearchregisterednonregisteredProd:function(btn){
            var grid = btn.up('grid'),
            store = grid.store,
                search_field = grid.down('combo[name=search_field]').getValue(),
                search_value = grid.down('textfield[name=search_value]').getValue();
                        

            store.removeAll();
            store.load({params: {search_field:search_field,search_value:search_value }});


    },
    funcResetregisterednonregisteredProd:function(btn){
        var grid = btn.up('grid'),
        store = grid.store;
                grid.down('combo[name=search_field]').setValue(''),
                grid.down('textfield[name=search_value]').setValue('');
                        

            store.removeAll();
            store.load();

    },

    setConfigCombosProductfilterStore: function (obj, options) {

        this.fireEvent('setConfigCombosProductfilterStore', obj, options);
    },
    filterWorkflowStages: function (cmb, newVal) {
        var grid = cmb.up('grid'),
            stagesField = grid.down('combo[name=workflow_stage_id]'),
            store = stagesField.store,
            containerPnl = grid.up('drugproductregctn'),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            app_type = newVal;
        store.removeAll();
        store.load({ params: { module_id: module_id, section_id: section_id, sub_module_id: app_type } });
    },

    showImportExportPermitRegWorkflow: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('showImportExportPermitRegWorkflow', application_type);
    },

    showImportPermitApplication: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('showImportPermitApplication', application_type);
    },
   
    //Receiving Wizard starts
    onPrevCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            wizardPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');
    },
    prevonPrevCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            wizardPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');
    },

    onNextCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);

            wizardPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },
   
    prevonNextCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            
            wizardPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },
    //application_approvalbtn
    getApplicationApprovalDetails: function (item) {

        this.fireEvent('getImportpermitApplicationApprovalDetails', item);

    },
    navigate: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            motherPnl = wizardPanel.up('panel'),
            application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());

        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        if (nextStep > 1 && (direction == 'next' || direction === 'next')) {
            if (!application_id) {
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        
        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
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

        // beginning disables previous
        if (activeIndex === 0) {
           
            wizardPanel.down('button[name=save_evaluationchecklist]').setDisabled(false);
            wizardPanel.down('button[name=save_evaluationchecklist]').setVisible(true);

            
            wizardPanel.down('button[name=save_btn]').setDisabled(true);
            wizardPanel.down('button[name=save_btn]').setVisible(false);

            wizardPanel.down('button[name=process_submission_btn]').setVisible(false);
         
            model.set('atBeginning', true);
            model.set('atEnd', false);
        } else if (activeIndex === 3) {
          
            wizardPanel.down('button[name=process_submission_btn]').setDisabled(false);
            wizardPanel.down('button[name=save_btn]').setVisible(false);

            wizardPanel.down('button[name=process_submission_btn]').setVisible(true);
            

            model.set('atBeginning', false);
            model.set('atEnd', true);
        } else {
             wizardPanel.down('button[name=save_btn]').setDisabled(false);
            wizardPanel.down('button[name=save_btn]').setVisible(true);

            wizardPanel.down('button[name=save_evaluationchecklist]').setDisabled(true);
            wizardPanel.down('button[name=save_evaluationchecklist]').setVisible(false);

            wizardPanel.down('button[name=process_submission_btn]').setDisabled(true);
            
            wizardPanel.down('button[name=process_submission_btn]').setVisible(false);
            
            model.set('atBeginning', false);
        }
       
    },
    showAddFormWin: function (btn, evt, opts) {
        var form = Ext.widget(btn.form);
            form.setHeight('');
            form.down('button[name=btnDataWin]').table_name= btn.table_name;
            form.down('button[name=btnDataWin]').storeID= btn.store_name;
            form.down('button[name=btnDataWin]').action_url=  'configurations/saveConfigCommonData';
          
            funcShowCustomizableWindow(btn.title, "40%", form, "customizablewindow");

    },
    quickNavigationonlineprev:function(btn){
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel'),
            progress = wizardPnl.down('#progress_tbar');
            //wizardPanel 
            wizardPnl.getLayout().setActiveItem(step);
            var layout = wizardPnl.getLayout(),
                item = null,
                i = 0,
                activeItem = layout.getActiveItem();
                
            activeItem.focus();

            if (step === 0) {
                motherPnl.down('button[name=submit_btn]').setVisible(true);
                
                wizardPnl.getViewModel().set('atBeginning', true);
                wizardPnl.getViewModel().set('atEnd', false);
            } else if (step === 4) {
                motherPnl.down('button[name=submit_btn]').setVisible(true);
                
                wizardPnl.getViewModel().set('atBeginning', false);
                wizardPnl.getViewModel().set('atEnd', true);
            } else {
                motherPnl.down('button[name=submit_btn]').setVisible(true);
                
                wizardPnl.getViewModel().set('atBeginning', false);
                
                wizardPnl.getViewModel().set('atEnd', false);
               
            }
    

    },
    quickNavigation: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            motherPnl = wizardPnl;
            panel = wizardPnl.up('panel'),
            application_id = panel.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;

        if (step > 0) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        
        if (step == 0) {
           
            wizardPnl.down('button[name=process_submission_btn]').setDisabled(false);
          
            motherPnl.getViewModel().set('atBeginning', true);
            
        } else if (step == 3) {
           
            wizardPnl.down('button[name=process_submission_btn]').setDisabled(false);
            wizardPnl.down('button[name=process_submission_btn]').setVisible(true);
            wizardPnl.down('button[name=save_btn]').setVisible(false);
            motherPnl.getViewModel().set('atBeginning', false);
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
            wizardPnl.down('button[name=save_btn]').setVisible(true);
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
    prevquickNavigation: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            motherPnl = wizardPnl;

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
            motherPnl.getViewModel().set('atBeginning', true);
        } else if (step == 1) {
            motherPnl.getViewModel().set('atBeginning', false);
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
        }

        if (step === 2) {
            motherPnl.getViewModel().set('atEnd', true);

        } else {
            motherPnl.getViewModel().set('atEnd', false);
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
    // Receiving wizard ends

    // Sample Receiving Wizard starts
    onPrevCardClickSample: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigateSample(btn, wizardPnl, 'prev');
    },

   
    printPreviewPermitForApproval:function(btn){
        var me = this,
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),

            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            application_code = containerPnl.down('hiddenfield[name=application_code]').getValue();
            this.fireEvent('generateImportExportpermit', application_code,module_id,'Print Review Import/Export Permit');
    },
    generateDisposalpermit: function (item) {
        var record = item.getWidgetRecord(),
            application_code = record.get('application_code');
            module_id = record.get('module_id');
            this.fireEvent('generateDisposalpermit', application_code,module_id,'');
            
    },
    editpreviewPermitinformation: function (item) {
        this.fireEvent('editDisposalpreviewPermitinformation', item);
    },
    editpreviewPermitVerificationinformation: function (item) {
        this.fireEvent('editpreviewPermitVerificationinformation', item);
    },
    
    
    saveApplicationScreeningDetails: function (btn) {
        btn.setLoading(true);
        var mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
            screeningGrid = containerPnl.down('productscreeninggrid'),
            checklist_type = screeningGrid.down('combo[name=applicable_checklist]').getValue(),
            store = screeningGrid.getStore(),
            params = [];
        for (var i = 0; i < store.data.items.length; i++) {
            var record = store.data.items[i],
                checklist_item_id = record.get('id'),
                pass_status = record.get('pass_status'),
                comment = record.get('comment'),
                item_resp_id = record.get('item_resp_id');
            var obj = {
                application_id: application_id,
                application_code: application_code,
                item_resp_id: item_resp_id,
                created_by: user_id,
                checklist_item_id: checklist_item_id,
                pass_status: pass_status,
                comment: comment
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
            url: 'premiseregistration/saveApplicationChecklistDetails',
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

    setUserCombosStore: function (obj, options) {
        this.fireEvent('setUserCombosStore', obj, options);
    },

    setAdminGridsStore: function (obj, options) {
        this.fireEvent('setAdminGridsStore', obj, options);
    },

    showAddImpPermitProductsWinFrm: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            title = btn.winTitle,
            width = btn.winWidth,
            childXtype = btn.childXtype,
            form = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            filter = "section_id:" + section_id;
            form.setHeight(450);
        funcShowCustomizableWindow(title, '80%', form, 'customizablewindow');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }

    },


    showApplicationQueriesWin: function (widgetColumn) {
        var record = widgetColumn.getWidgetRecord(),
            grid = Ext.widget('applicationqueriesgrid'),
            checklist_item = record.get('name'),
            item_resp_id = record.get('item_resp_id');
        grid.down('hiddenfield[name=item_resp_id]').setValue(item_resp_id);
        funcShowCustomizableWindow(checklist_item + ' - Queries', '75%', grid, 'customizablewindow');
    },

    showAddApplicationQueryForm: function (btn) {
        var form = Ext.widget('applicationqueryfrm'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            item_resp_id = grid.down('hiddenfield[name=item_resp_id]').getValue(),
            win = grid.up('window');
        form.down('hiddenfield[name=item_resp_id]').setValue(item_resp_id);
        form.setHeight(height);
        grid.hide();
        win.add(form);
    },

    showEditApplicationQueryForm: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            record = btn.getWidgetRecord(),
            form = Ext.widget('applicationqueryfrm'),
            win = grid.up('window');
        form.loadRecord(record);
        form.setHeight(height);
        grid.hide();
        win.add(form);
    },

    backToApplicationQueriesGrid: function (btn) {
        var form = btn.up('form'),
            win = form.up('window'),
            grid = win.down('grid');
        win.remove(form, true);
        grid.show();
    },

    saveApplicationQuery: function (btn) {
        var me = this,
            form = btn.up('form'),
            win = form.up('window'),
            store = win.down('grid').getStore(),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: 'productregistration/saveProductRegCommonData',
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

    showReceivingApplicationSubmissionWin: function (btn) {

        this.fireEvent('showImpExpReceivingApplicationSubmissionWin', btn);
    },
    showDisposalReceivingApplicationSubmissionWin: function (btn) {

        this.fireEvent('showDisposalReceivingApplicationSubmissionWin', btn);
    },
    showSamplerecApplicationSubmissionWin: function (btn) {

        this.fireEvent('showSamplerecApplicationSubmissionWin', btn);
    },

    showAddPermitRegParamWinFrm: function (btn) {
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
    showApplicationEvaluationUploads: function (btn) {
        // if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
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

        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');

        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
    },

    showSampleAnalysisrequestswin: function (btn) {
  
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            isWin = btn.isWin,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            product_id = containerPnl.down('hiddenfield[name=product_id]').getValue(),
            application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            reference_no = containerPnl.down('displayfield[name=reference_no]').getValue(),
            
            arrayLength = storeArray.length;
            child.setHeight(600);
       
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        //set values 
        child.down('hiddenfield[name=application_code]').setValue(application_code);
        child.down('hiddenfield[name=section_id]').setValue(section_id);
        child.down('hiddenfield[name=module_id]').setValue(module_id);
        child.down('hiddenfield[name=misproduct_id]').setValue(product_id);
        
        child.down('hiddenfield[name=code_ref_no]').setValue(reference_no);
        
        child.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        
    },
    showAddMeetingAttendeeFrm: function (btn) {
        var me = this,
            win = Ext.widget('meetingattendeefrm');
        funcShowCustomizableWindow("Add Member", 400, win, 'customizablewindow');
    },
    addMember: function (btn) {
        var me = this,
            grid = Ext.ComponentQuery.query('productmeetingdetailsfrm grid')[0],
            form = btn.up('form'),
            store = grid.getStore(),
            cnt = store.getCount();
        if (cnt === 0) {
            store = Ext.create('Ext.data.Store', {
                autoLoad: true,
                fields: [{
                    name: 'selected',
                    type: 'boolean',
                    defaultValue: false
                }, {
                    name: 'member_name',
                    type: 'string'
                }]
            });
        }
        form = form.getForm();
        store.add({
            member_name: form.getValues().name
        });
        grid.setStore(store);
    },
    removeMembers: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            store = grid.getStore(),
            items = store.getData().items;
        var remainingItems = [];
        for (var i = 0; i < items.length; i++) {
            if (!items[i].getData().selected) {
                remainingItems.push(items[i].getData());
            }
        }
        store.setData(remainingItems);
    },
    backToFrm: function (btn) {
        var me = this,
            form = btn.up('form'),
            // main_tabPanel = form.up('#contentPanel'),
            activeTab = form.up('panel'),//main_tabPanel.getActiveTab(),
            routeId = activeTab.routeId,
            frmWidget = btn.frm,
            frm = activeTab.down(frmWidget);
        activeTab.remove(form);
        if (frm) {
            frm.show();
        } else {
            activeTab.close();
        }
    },

    // Meeting Details wizard start

    onPreviousClickMeeting: function (btn) {
        var wizardPnl = btn.up('newdrugapprovalswizard'),
            motherPnl = wizardPnl.up('newdrugapprovals');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigateMeeting(btn, wizardPnl, 'prev');
    },

    onNextClickMeeting: function (btn) {
        var wizardPnl = btn.up('newdrugapprovalswizard'),
            motherPnl = wizardPnl.up('newdrugapprovals');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigateMeeting(btn, wizardPnl, 'next');
    },

    navigateMeeting: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            motherPnl = wizardPanel.up('newdrugapprovals'),
            application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
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
            }
            else {
                item.setPressed(false);
            }

            // IE8 has an odd bug with handling font icons in pseudo elements;
            // it will render the icon once and not update it when something
            // like text color is changed via style addition or removal.
            // We have to force icon repaint by adding a style with forced empty
            // pseudo element content, (x-sync-repaint) and removing it back to work
            // around this issue.
            // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
            // and this: https://github.com/twbs/bootstrap/issues/13863
            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },


    // Meeting Details wizard start
    saveMeeting: function (btn) {
        var me = this,
            wizardPnl = btn.up('newdrugapprovalswizard'),
            motherPnl = wizardPnl.up('newdrugapprovals'),
            form = wizardPnl.down('form'),
            meetingDetails = form.getForm().getValues(),
            grid = wizardPnl.down('grid[itemId=meetingMembers]'),
            store = grid.getStore(),
            items = store.getData().items;

        var remainingItems = [];
        for (var i = 0; i < items.length; i++) {
            if (!items[i].getData().selected) {
                remainingItems.push(items[i].getData().member_name);
            }
        }
        meetingDetails.members = remainingItems;
        this.fireEvent('doSubmitData',
            meetingDetails,
            null,
            "POST",
            "productregistration/saveMeeting",
            function (data) {
                var meetingBtn = wizardPnl.down("*[name=meeting_next_btn]").setDisabled(false);
            });
    }, savePermitInformation: function (btn) {

        this.fireEvent('savePermitInformation', btn);

    },
    previewproductApplicationQueries: function (item) {
        this.fireEvent('showApplicationQueries', item);
    },

    reloadParentGridOnChange: function (combo) {
        var grid = combo.up('grid'),
            store = grid.getStore();
        store.load();
    },

    funcActiveProductsOtherInformationTab: function (tab) {

        this.fireEvent('funcActiveProductsOtherInformationTab', tab);

    },
    
    showAddPermitsOtherdetailsWinFrm: function (btn) {
        this.fireEvent('showAddPermitsOtherdetailsWinFrm', btn);
    },
   
    saveproductOtherdetails: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            product_id = form.down('hiddenfield[name=product_id]').getValue(),
            win = form.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();

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
                        store.removeAll();
                        store.load({ params: { product_id: product_id } });
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

    doDeletePermitOtherdetails: function (item) {
        //if (this.fireEvent('checkFullAccess')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
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
    showAddDisposalSupervisors: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            pnl = grid.up('panel'),
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            childObject;

        childObject = Ext.widget(childXtype);
        
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    funcSearchProductManufacturer: function (btn) {
        var childXtype = btn.childXtype,
            me = this,
            win = btn.up('window'),
            title = btn.winTitle
        form = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;


        funcShowCustomizableWindow(title, '80%', form, 'customizablewindow');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }

    }, funcSearchProductManufacturerfrm: function (btn) {
        var childXtype = btn.childXtype,
            me = this,
            win = btn.up('window'),
            title = btn.winTitle
        form = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;


        funcShowCustomizableWindow(title, '60%', form, 'customizablewindow');
        win.close();
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
    },
    showProductApplicationMoreDetails: function (item) {

        //showEditProductOtherdetailWinFrm: function (item) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            section_id = record.get('section_id'),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            form = Ext.widget(childXtype);

        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        

    },
    showEditProductOtherdetailWinFrm: function (item) {

        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            form = Ext.widget(childXtype);

        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        if(section_id == 4){
            form.down('combo[name=device_type_id]').show();
       
        }
        else{
            form.down('combo[name=device_type_id]').hide();
       
        }
    },
    showProductPreviousComments: function (item) {
        
        this.fireEvent('showProductPreviousComments', item);

    },
    editpreviewPermitinformation: function (item) {
        this.fireEvent('editDisposalpreviewPermitinformation', item);
    },
    funcPrevGridApplicationDocuments: function (item) {
        this.fireEvent('funcPrevGridApplicationDocuments', item);
    },
    funcPrevEvaluationReportUpload: function (item) {
        this.fireEvent('funcPrevEvaluationReportUpload', item);
    },
    funcPrevAuditReportUpload: function (item) {
        this.fireEvent('funcPrevAuditReportUpload', item);
    },
    showPreviousUploadedDocs: function (item) {
        this.fireEvent('showPreviousUploadedDocs', item);
    },
    showTcRecommendation: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            storeArray = eval(item.stores),
            arrayLength = storeArray.length,
            childObject = Ext.widget(childXtype);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=id]').setValue(record.get('recomm_id'));
        childObject.down('combo[name=decision_id]').setValue(record.get('decision_id'));
        childObject.down('textarea[name=comments]').setValue(record.get('comments'));
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    previewUploadedProductImage:function(item){
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            originaluploaded_image = record.get('originaluploaded_image');
            print_report(originaluploaded_image);
        
    },
    previewOnlineApplication: function (view, record) {
        var ref_no = record.get('reference_no'),
            application_id = record.get('active_application_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            status_type_id = record.get('status_type_id'),
            isRejection= record.get('status_type_id'),
            grid = view.up('grid'),
            wizard_pnl = grid.wizard_pnl, 
            
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

            onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
              
            
            docsGrid = onlinePanel.down('onlineimportexportdocuploadsgrid');
            docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
            docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
            docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
            docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

         
            funcShowCustomizableWindow(ref_no, '80%', onlinePanel, 'customizablewindow');

            onlinePanel.getViewModel().set('isReadOnly', true);

    },
    //the windows option 
    
    submitWinRejectedOnlineApplication: function (btn) {
        var win = btn.up('window'),
            action_url = 'submitRejectedOnlineApplication',
            
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=application_code]').getValue(),
            table_name = 'wb_importexport_applications';
            win.fireEvent('submitApplication', application_id, application_code, action_url, table_name);
        win.close();
    },
    queryWinOnlineApplication:function (btn) {
        var win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=application_code]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            application_status = win.down('hiddenfield[name=application_status_id]').getValue(),
           
            queriesGrid = Ext.widget('onlinequeriesgrid');

        queriesGrid.down('hiddenfield[name=application_id]').setValue(application_id);
        queriesGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        queriesGrid.down('hiddenfield[name=module_id]').setValue(module_id);

        if (application_status == 17 || application_status === 17) {
            queriesGrid.down('button[action=add_query]').setVisible(false);
            queriesGrid.down('button[action=submit_app]').setVisible(false);
            queriesGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        }

        funcShowCustomizableWindow(ref_no + ' - Queries', '55%', queriesGrid, 'customizablewindow');
        win.close();
    },
    showOnlineApplicationRejections: function (btn) {
        var win = btn.up('window'),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            winWidth = btn.winWidth,
            childXtype = btn.childXtype,
            childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        funcShowCustomizableWindow(tracking_no + ' Rejections', winWidth, childObject, 'customizablewindow');
    },
    receiveOnlineApplicationDetailsFrmBtn: function (btn) {
        Ext.getBody().mask('Please wait...');
        var storeID = btn.storeID,
            winWidth = btn.winWidth,
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            is_manager_query = 0;
        showOnlineSubmissionWin(application_id, module_id, sub_module_id, section_id, 'onlinesubmissionsfrm', winWidth, storeID, tracking_no, is_manager_query);
        
    },  submitManagerRejectedOnlineApplicationFrmBtn: function (btn) {
        var action_url = 'onlineApplicationManagerRejectionAction',
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            table_name = 'wb_product_applications',
            application_status = btn.application_status;
        btn.fireEvent('onlineManagerRejectionApplicationSubmit', application_id, action_url, table_name, application_status);
    },
    productPreviewEditDisposalDetails: function (item) {
        
        this.fireEvent('productPreviewEditDisposalDetails', item);//showProductApplicationMoreDetails

    },
    receiveWinOnlineApplicationDetails:function(btn){

        Ext.getBody().mask('Please wait...');
        var storeID = btn.storeID,
            winWidth = btn.winWidth,
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue();
            status_type_id = win.down('hiddenfield[name=status_type_id]').getValue();
            hasQueries = checkApplicationRaisedQueries(application_code, module_id);

            if ((hasQueries) && hasQueries == 1) {
                this.showQueriedApplicationSubmissionWin(btn);
            } else {
                this.submitOnlineApplicationDetailsToOfficer(btn);
            }

    },
    
    submitOnlineApplicationDetailsToOfficer: function (btn) {
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
            is_manager_query = win.down('hiddenfield[name=is_manager_query]').getValue(),
            status_type_id = win.down('hiddenfield[name=status_type_id]').getValue(),
            
            application_status_id = win.down('hiddenfield[name=application_status_id]').getValue(),
            table_name = getApplicationTable(module_id),
            extraParams = [
                {
                    field_type: 'hiddenfield',
                    field_name: 'is_manager_query',
                    value: is_manager_query
                }, {
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
                }
            ];

        showOnlineSubmissionWin(application_id, module_id, sub_module_id, section_id, 'onlinesubmissionsfrm', winWidth, storeID, tracking_no, status_type_id, extraParams);

    },

    showQueriedApplicationSubmissionWin: function (btn) {
        Ext.getBody().unmask();
        var action_url = 'submitStructuredQueriedOnlineApplication',
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            table_name = 'wb_importexport_applications';
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
    },
    submitRejectedOnlineApplication: function (item) {
       
        var btn = item.up('button'),
            grid = btn.up('grid'),
            action_url = 'submitRejectedOnlineApplication',
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            table_name = 'wb_importexport_applications';
            grid.fireEvent('submitApplication', application_id, application_code, action_url, table_name,grid);

    }, queryOnlineApplication: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            module_id = record.get('module_id'),
            ref_no = record.get('reference_no'),
            application_status = record.get('application_status_id'),
            queriesGrid = Ext.widget('onlinequeriesgrid');

            queriesGrid.down('hiddenfield[name=application_id]').setValue(application_id);
            queriesGrid.down('hiddenfield[name=application_code]').setValue(application_code);
            queriesGrid.down('hiddenfield[name=module_id]').setValue(module_id);
            
        if (application_status == 17 || application_status === 17) {
            queriesGrid.down('button[action=add_query]').setVisible(false);
            queriesGrid.down('button[action=submit_app]').setVisible(false);
            queriesGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        }
        funcShowCustomizableWindow(ref_no + ' - Queries', '55%', queriesGrid, 'customizablewindow');
    }, receiveOnlineApplicationDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var storeID = item.storeID,
            winWidth = item.winWidth,
            bttn = item.up('button'),
            record = bttn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            tracking_no = record.get('reference_no'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            is_manager_query = record.get('is_manager_query');
        showOnlineSubmissionWin(application_id, module_id, sub_module_id, section_id, 'onlinesubmissionsfrm', winWidth, storeID, tracking_no, is_manager_query);
    }, searchregisteredProducts: function (btn) {
        //
        var mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            var me = this,
                childXtype = btn.childXtype,
                winTitle = btn.winTitle,
                winWidth = btn.winWidth,
                grid = Ext.widget(childXtype);
                grid.height= 550;
            funcShowCustomizableWindow(winTitle, winWidth, grid, 'customizablewindow');
        }
        else {
            toastr.error('Alert: ', 'Application has already been saved, update the details to continue');
        }

    },
    funcSearchProductApplications: function (btn) {
        var grid = btn.up('grid'),
            store = grid.store,
            search_value = grid.down('textfield[name=search_value]').getValue(),
            search_field = grid.down('combo[name=search_field]').getValue();
        if (search_field != '') {
            store.removeAll();
            store.load({ params: { search_value: search_value, search_field: search_field } })
        }
    }, funcClearSearchApplications: function (btn) {
        var grid = btn.up('grid'),
            store = grid.store;
        grid.down('textfield[name=search_value]').setValue(''),
            search_field = grid.down('combo[name=search_field]').setValue('');

            store.removeAll();
        store.load();

    }, showApplicantSelectionList: function (btn) {
        var childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    
    onPrevCardClickOnline: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            wizardPnl.getViewModel().set('atEnd', false);
        this.navigateOnlineTabs(btn, wizardPnl, 'prev');
    },
    onNextCardClickOnline: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateOnlineTabs(btn, wizardPnl, 'next');

    },
    navigateOnlineTabs: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            
            model = wizardPanel.getViewModel(),
            item, i, activeItem, activeIndex;
            console.log(layout);
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);
        
        // beginning disables previous
        if (activeIndex === 0) {
            wizardPanel.down('button[name=submit_btn]').setVisible(false);
            wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            
            model.set('atBeginning', true);
        } else if (activeIndex === 3) {
            wizardPanel.down('button[name=submit_btn]').setVisible(true);
            wizardPanel.down('button[name=save_screening_btn]').setVisible(true);
            
            
            model.set('atBeginning', false);
            model.set('atEnd', true);
        } else {
            wizardPanel.down('button[name=submit_btn]').setVisible(false);
            wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            
            model.set('atBeginning', false);
           
        }

      //  wizardPanel.down('button[name=save_btn]').setVisible(true);

    },
    saveImporExportPermitReceivingBaseDetails: function (btn) {console.log( btn.action_url);
        var wizard = btn.wizardpnl
             wizardPnl = btn.up(wizard),
             action_url = btn.action_url,
            mainTabPnl = btn.up('#contentPanel'),

            containerPnl = mainTabPnl.getActiveTab(),

            process_id = containerPnl.down('hiddenfield[name=process_id]').getValue(),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            zone_id = containerPnl.down('combo[name=zone_id]').getValue(),
            workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            checkapplication_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),

            applicantDetailsForm = containerPnl.down('importexportapplicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            
            importexportdetailsfrm = containerPnl.down('#importexportdetailsfrm'),
            importexportdetailsform = importexportdetailsfrm.getForm();

        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        if (!zone_id) {
            toastr.warning('Please select Zone Location!!', 'Warning Response');
            return false;
        }


        if (importexportdetailsform.isValid()) {
            importexportdetailsform.submit({
                url: 'importexportpermits/'+action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    active_application_id: active_application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    zone_id: zone_id,
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
                        product_id = resp.product_id,
                        ref_no = resp.ref_no;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        if (checkapplication_id == '') {
                            containerPnl.down('hiddenfield[name=active_application_id]').setValue(active_application_id);
                            containerPnl.down('displayfield[name=reference_no]').setValue(ref_no);
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
    saveDisposalDestructionDetails: function (btn) {
        var wizard = btn.wizardpnl,
        action_url = btn.action_url,
            wizardPnl = btn.up(wizard);
            form = wizardPnl.down('disposaldestructionfrm').getForm(),
            active_application_id = wizardPnl.down('hiddenfield[name=active_application_id]').getValue();

        if (form.isValid()) {
            form.submit({
                url: 'importexportpermits/'+action_url,
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
    },
    updateDisposaltReceivingBaseDetails: function (btn) {console.log( btn.action_url);
        var wizard = btn.wizardpnl
            wizardPnl = btn.up(wizard);
            active_application_id = wizardPnl.down('hiddenfield[name=active_application_id]').getValue(),
          
            applicantDetailsForm = wizardPnl.down('disposalapplicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            
            disposalpermitsdetailspnl = wizardPnl.down('#disposalpermitsdetailspnl'),
            disposalpermitsdetailspnl = disposalpermitsdetailspnl.getForm();

        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        if (!zone_id) {
            toastr.warning('Please select Zone Location!!', 'Warning Response');
            return false;
        }


        if (disposalpermitsdetailspnl.isValid()) {
            disposalpermitsdetailspnl.submit({
                url: 'importexportpermits/'+action_url,
                waitMsg: 'Please wait...',
                params: {
                    active_application_id: active_application_id,
                    applicant_id: applicant_id,
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
    },
    saveDisposaltReceivingBaseDetails: function (btn) {console.log( btn.action_url);
        var wizard = btn.wizardpnl
             wizardPnl = btn.up(wizard),
             action_url = btn.action_url,
            mainTabPnl = btn.up('#contentPanel'),

            containerPnl = mainTabPnl.getActiveTab(),
            
            process_id = containerPnl.down('hiddenfield[name=process_id]').getValue(),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            zone_id = containerPnl.down('combo[name=zone_id]').getValue(),
            workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            checkapplication_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),

            applicantDetailsForm = containerPnl.down('disposalapplicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            
            disposalpermitsdetailspnl = containerPnl.down('#disposalpermitsdetailsfrm'),
            disposalpermitsdetailspnl = disposalpermitsdetailspnl.getForm();

        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        if (!zone_id) {
            toastr.warning('Please select Zone Location!!', 'Warning Response');
            return false;
        }

        if (disposalpermitsdetailspnl.isValid()) {
            disposalpermitsdetailspnl.submit({
                url: 'importexportpermits/'+action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    active_application_id: active_application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    zone_id: zone_id,
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
                        tracking_no = resp.tracking_no,
                        ref_no = resp.ref_no;
                    if (success == true || success === true) {
                                toastr.success(message, "Success Response");
                            containerPnl.down('hiddenfield[name=active_application_id]').setValue(active_application_id);
                            containerPnl.down('displayfield[name=reference_no]').setValue(ref_no);
                            containerPnl.down('displayfield[name=tracking_no]').setValue(tracking_no);

                            containerPnl.down('hiddenfield[name=active_application_code]').setValue(active_application_code);
                     
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
            toastr.warning('Please fill all the required fields on Disposal Application Information Form!!', 'Warning Response');
        }
    }, showProductRegWorkflow: function (btn) {
        var application_type = btn.app_type;
            wrapper_xtype = btn.wrapper_xtype;
        this.fireEvent('showApplicationWorkflow', application_type,wrapper_xtype);
    },

});