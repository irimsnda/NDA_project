Ext.define('Admin.view.productregistration.viewcontrollers.ProductRegistrationVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productregistrationvctr',

    /**
     * Called when the view is created
     */
   
	// 
    saveGmpproductStatusesdetails: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
         
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
	showAddProductGmpInspectionStatusWin: function (btn) {
        var me = this,
        childXtype = btn.childXtype,
        winTitle = btn.winTitle,
        winWidth = btn.winWidth,
        isWin = btn.isWin,table_name = btn.table_name,
        child = Ext.widget(childXtype),
        mainTabPnl = btn.up('#contentPanel'),
        containerPnl = mainTabPnl.getActiveTab(),
        application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();
        model ='';
        
        Ext.getBody().mask('Loading Details...');
        filter = {
            application_code: application_code
        };
        filter = JSON.stringify(filter);
                Ext.Ajax.request({
                    url: 'configurations/getRegistrationApplicationParameters',
                    method: 'GET',
                    params: {
                        filters: filter,
                        table_name:table_name
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            results = resp.results;
                            if(results !=''){
                                results = Object.values(results)[0];
                                 model = Ext.create('Ext.data.Model', results);
                            child.getForm().loadRecord(model);
                            }
                            console.log(results);
                            console.log(model);

                           
                            child.setHeight(400);
                            funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
                            child.down('hiddenfield[name=application_code]').setValue(application_code);
                           

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
    setDynamicTreeGridStore: function (obj, options) {
        this.fireEvent('setGridTreeStore', obj, options);
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

    
    doCreateProductRegParamWin: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            storeID = btn.storeID,
            is_winclosaable  = btn.is_winclosaable,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: { model: table },
                waitMsg: 'Please wait...',
                
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.removeAll();
                        store.load();
                        if(is_winclosaable == 1){
                                form.down('textfield[name=id]').setValue(response.record_id);
                                
                        }
                        else{
                            win.close();

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
        this.fireEvent('showAddTcMeetingParticipants', btn);
       
    },doDeleteClinicalTrialWidgetParam: function (item) {
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
    funcUploadTCMeetingtechnicalDocuments:function(btn){
        
        this.fireEvent('funcUploadTCMeetingtechnicalDocuments', btn);
        
    },
    onViewDrugProductApplication: function (grid, record) {

        this.fireEvent('viewApplicationDetails', record);

    },
    setConfigGridsStore: function (obj, options) {

        this.fireEvent('setConfigGridsStore', obj, options);
    },
    showAddTcMeetingExternalParticipant: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            meeting_id = grid.down('hiddenfield[name=meeting_id]').getValue(),
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


    setConfigCombosSectionfilterStore: function (obj, options) {

        this.fireEvent('setConfigCombosStoreWithSectionFilter', obj, options);
    },
    setConfigCombosStore: function (obj, options) {

        this.fireEvent('setConfigCombosStore', obj, options);
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

    showProductRegWorkflow: function (btn) {
        var application_type = btn.app_type;
            wrapper_xtype = btn.wrapper_xtype;
        this.fireEvent('showApplicationWorkflow', application_type,wrapper_xtype);
    },

    showNewProductRegistration: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('onNewProductRegApplication', application_type,btn);
    },
    showRenAltProductRegistration: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('onRenAltProductRegistration', application_type,btn);
    },
    //Receiving Wizard starts
    
    onPrevCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
            
        motherPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');

    },

    onNextCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },

    navigate: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            motherPnl = wizardPanel.up('panel'),
            application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
            model = motherPnl.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
            nextStep = wizardPanel.items.indexOf(layout.getNext());
            if (nextStep > 1 && (direction == 'next' || direction === 'next')) {
                if (!application_id) {
                    toastr.warning('Please save application details first!!', 'Warning Response');
                    return false;
                }
            }
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

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();

        // beginning disables previous
        if (activeIndex === 0) {
            wizardPanel.down('button[name=save_btn]').setDisabled(true);
            wizardPanel.down('button[name=process_submission_btn]').setVisible(false);
            wizardPanel.down('button[name=prechecking_recommendation]').setVisible(false);
            model.set('atBeginning', true);
            model.set('atEnd', false);
        } else if (activeIndex === 1) {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            wizardPanel.down('button[name=process_submission_btn]').setVisible(false);
            wizardPanel.down('button[name=prechecking_recommendation]').setVisible(false);
            model.set('atBeginning', false);
            model.set('atEnd', false);
        }else if (activeIndex === 3) {
            wizardPanel.down('button[name=process_submission_btn]').setVisible(true);
            wizardPanel.down('button[name=prechecking_recommendation]').setVisible(true);
            model.set('atBeginning', false);
            model.set('atEnd', true);
        } else {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            wizardPanel.down('button[name=process_submission_btn]').setVisible(false);
            wizardPanel.down('button[name=prechecking_recommendation]').setVisible(false);
            model.set('atBeginning', false);
            model.set('atEnd', false);
        }

        wizardPanel.down('button[name=save_btn]').setVisible(true);

        if (activeIndex === 3) {
            
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atEnd', true);
            model.set('atBeginning', false);
        } else {
            wizardPanel.down('button[name=save_btn]').setText('Save Application Details');
            wizardPanel.down('button[name=save_btn]').handler = 'saveProductReceivingBaseDetails';
            model.set('atBeginning', false);
            model.set('atEnd', false);
        }
    },
    quickNavigationRenewal: function (btn) {
        
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
                    wizardPnl.down('button[name=save_btn]').setDisabled(false);
                    motherPnl.getViewModel().set('atBeginning', true);
                    wizardPnl.down('button[name=process_submission_btn]').setVisible(false);
                    wizardPnl.down('button[name=prechecking_recommendation]').setVisible(false);
                } else if (step == 1) {
                    wizardPnl.down('button[name=save_btn]').setDisabled(false);
                    wizardPnl.down('button[name=process_submission_btn]').setDisabled(false);
                    wizardPnl.down('button[name=prechecking_recommendation]').setVisible(false);
                    motherPnl.getViewModel().set('atBeginning', false);
                }   else if (step == 4) {
                    wizardPnl.down('button[name=process_submission_btn]').setVisible(true);
                    wizardPnl.down('button[name=prechecking_recommendation]').setVisible(true);
                    motherPnl.getViewModel().set('atBeginning', true);
                    motherPnl.getViewModel().set('atEnd', true);
                }else {
                    motherPnl.getViewModel().set('atBeginning', false);
                    wizardPnl.down('button[name=process_submission_btn]').setVisible(false);
                    wizardPnl.down('button[name=prechecking_recommendation]').setVisible(false);
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
    }, quickNavigation: function (btn) {
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
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', true);
            motherPnl.getViewModel().set('atEnd', false);
            wizardPnl.down('button[name=process_submission_btn]').setVisible(false);
         //   wizardPnl.down('button[name=prechecking_recommendation]').setVisible(false);
        } else if (step == 1) {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            wizardPnl.down('button[name=process_submission_btn]').setDisabled(false);
         //   wizardPnl.down('button[name=prechecking_recommendation]').setVisible(false);
         motherPnl.getViewModel().set('atBeginning', false);
         motherPnl.getViewModel().set('atEnd', false);
        }   else if (step == 3) {
            wizardPnl.down('button[name=process_submission_btn]').setVisible(true);
           // wizardPnl.down('button[name=prechecking_recommendation]').setVisible(true);
            motherPnl.getViewModel().set('atBeginning', false);
            motherPnl.getViewModel().set('atEnd', true);
        }else {
            motherPnl.getViewModel().set('atBeginning', false);
            motherPnl.getViewModel().set('atEnd', false);
            wizardPnl.down('button[name=process_submission_btn]').setVisible(false);
            wizardPnl.down('button[name=prechecking_recommendation]').setVisible(false);
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
    }, setConfigCombosProdSampleSectionfilterStore: function (obj, options) {
        this.fireEvent('setConfigCombosProdSampleSectionfilterStore', obj, options);
    },
    setConfigCombosProdSampleNonfilterStore: function (obj, options) {
        this.fireEvent('setConfigCombosProdSampleNonfilterStore', obj, options);
    },
    quickNavigationonlineprev:function(btn){
       
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel'),
            progress = wizardPnl.down('#progress_tbar'),
            sub_module_id = motherPnl.down('hiddenfield[name=sub_module_id]').getValue(),
            status_type_id = motherPnl.down('hiddenfield[name=status_type_id]').getValue(),
            progressItems = progress.items.items;
            if(sub_module_id == 9){
                    max_step = 4;
            }
            else{
                max_step =4;
            }
        if (step == 0) {
           
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step === max_step) {
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.getViewModel().set('atEnd', false);
        }
       
        if (step === 0) {
           
            wizardPnl.down('button[name=submit_btn]').setVisible(false);
            if(sub_module_id == 7 || sub_module_id == 8 || sub_module_id == 9){
                
            wizardPnl.down('button[name=save_productapplications]').setVisible(false);

             
            }
           
            wizardPnl.getViewModel().set('atBeginning', true);
            wizardPnl.getViewModel().set('atEnd', false);
            
        }else if(step == 1){
            wizardPnl.down('button[name=save_productapplications]').setVisible(false);

            
        } else if (step === max_step) {
           
            wizardPnl.down('button[name=submit_btn]').setVisible(true);
            
            if(sub_module_id == 7 || sub_module_id == 8 || sub_module_id == 9){

                wizardPnl.down('button[name=save_productapplications]').setVisible(false);
            }
            else{
            }

            wizardPnl.getViewModel().set('atBeginning', false);
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
           
            if(sub_module_id == 7 || sub_module_id == 8 || sub_module_id == 9){

            wizardPnl.down('button[name=save_productapplications]').setVisible(false);
            }
            wizardPnl.down('button[name=submit_btn]').setVisible(false);
            
          
            wizardPnl.getViewModel().set('atEnd', false);
            
            wizardPnl.getViewModel().set('atBeginning', false);
        }

        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();
        //activeIndex = wizardPnl.items.indexOf(activeItem);

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
        if(status_type_id == 1 || status_type_id == 2){
            wizardPnl.down('button[name=submit_btn]').setVisible(true);
            wizardPnl.down('button[name=save_productapplications]').setVisible(false);
        }
        else{
            wizardPnl.down('button[name=submit_btn]').setVisible(true);
            wizardPnl.down('button[name=save_productapplications]').setVisible(false);
        }
        
        activeItem.focus();
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
            
            win = button.up('window'),
            
            status_type_id = win.down('hiddenfield[name=status_type_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            model = wizardPanel.getViewModel(),
            item, i, activeItem, activeIndex;
            console.log(layout);
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);
        if(sub_module_id == 9){
                max_step = 4;
        }
        else{
            max_step =4;
        }
        // beginning disables previous
        if (activeIndex === 0) {
            
            wizardPanel.down('button[name=submit_btn]').setVisible(false);
            
            if(sub_module_id == 7 || sub_module_id == 8 || sub_module_id == 9){

             wizardPanel.down('button[name=save_productapplications]').setVisible(false);
            }
            
            model.set('atBeginning', true);
        }else if (activeIndex === 1) {
            
            if(sub_module_id == 7 || sub_module_id == 8 || sub_module_id == 9){

                wizardPanel.down('button[name=save_productapplications]').setVisible(true);
            }
        } else if (activeIndex === max_step) {
            
            wizardPanel.down('button[name=submit_btn]').setVisible(true);
            
            model.set('atBeginning', false);
            model.set('atEnd', true);
        } else {
            
            wizardPanel.down('button[name=submit_btn]').setVisible(true);
            
            if(sub_module_id == 7 || sub_module_id == 8 || sub_module_id == 9){
                wizardPanel.down('button[name=save_productapplications]').setVisible(false);
            
            }
            
            model.set('atBeginning', false);
        }
        
        if (activeIndex === max_step) {
            
            model.set('atEnd', true);

        } else {
           
            model.set('atEnd', false);
        }
        if(status_type_id ==3){
            wizardPanel.down('button[name=submit_btn]').setVisible(true);
            wizardPanel.down('button[name=save_productapplications]').setVisible(false);
        }
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
   

    // Receiving wizard ends

    // Sample Receiving Wizard starts
    onPrevCardClickSample: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigateSample(btn, wizardPnl, 'prev');
    },

    onNextCardClickSample: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigateSample(btn, wizardPnl, 'next');
    },
    onNextCardClickRenewal: function (btn) {
        //check if data has been savd 

        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
            progress = this.lookupReference('progress'),
            progressItems = progress.items.items,
        application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue();
        var thisItem = progressItems[step];
        if (!application_id) {
            thisItem.setPressed(false);
            toastr.warning('Please save application details first!!', 'Warning Response');
            return false;

        }
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigateSample(btn, wizardPnl, 'next');
    },

    navigateSample: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            motherPnl = wizardPanel.up('panel'),
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
            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        // beginning disables previous
        if (activeIndex === 0) {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            wizardPanel.down('button[name=save_btn]').setVisible(true);
            model.set('atBeginning', true);
            model.set('atEnd', false);
        } else if (activeIndex === 3) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
            model.set('atBeginning', false);
            model.set('atEnd', true);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
            model.set('atBeginning', false);
            model.set('atEnd', false);
        }
        
        wizardPanel.down('button[name=save_btn]').setVisible(true);

        if (activeIndex === 1) {

          //  wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            model.set('atEnd', true);

        } else {
           // wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            model.set('atEnd', false);
        }
    },
    printSampleSubmissionReport:function(btn){
       
            this.fireEvent('printSampleSubmissionReport', btn);
    },
    quickNavigationSampleReceiving: function (btn) {

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
            
            wizardPnl.down('button[name=save_btn]').setVisible(true);
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', true);

            motherPnl.getViewModel().set('atEnd', false);
        } else if (step == 3) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
            wizardPnl.down('button[name=save_btn]').setDisabled(true);
            motherPnl.getViewModel().set('atBeginning', false);
            

            motherPnl.getViewModel().set('atEnd', true);
        }else {
            motherPnl.getViewModel().set('atBeginning', false);

            wizardPnl.down('button[name=save_btn]').setVisible(false);
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

    // Sample Receiving Wizard ends

    showApplicantSelectionList: function (btn) {
        var grid = Ext.widget('productapplicantselectiongrid');
        if (btn.applicantType == 'local') {
            grid.applicantType = btn.applicantType;
        } else {
            grid.applicantType = 'nonlocal';
        }
        funcShowCustomizableWindow('Applicant Selection List', '90%', grid, 'customizablewindow');
    },
    saveProductReceivingBaseDetails: function (btn) {console.log( btn.action_url);
        var wizard = btn.wizardpnl,
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

            applicantDetailsForm = containerPnl.down('productapplicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            is_local_applicant = applicantDetailsForm.down('hiddenfield[name=is_local]').getValue(),
            localApplicantDetailsForm = containerPnl.down('productlocalapplicantdetailsfrm'),
            local_applicant_id = localApplicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            productDetailsForm = containerPnl.down('#productsDetailsFrm'),
            zone_id = 2,
            productDetailsFrm = productDetailsForm.getForm();

        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        if(is_local_applicant != 1){
            if (!local_applicant_id) {
                toastr.warning('Please select Local Technical Representative Details!!', 'Warning Response');
                return false;
            }
        }
      
        if (!zone_id) {
            //toastr.warning('Please select Zone Location!!', 'Warning Response');
          // return false;
        }
        withdrawal_type_id = 0;
        //check types of withdrawal
        if(sub_module_id == 17){
            withdrawal_type_id = containerPnl.down('combo[name=withdrawal_type_id]').getValue();
            if (!withdrawal_type_id) {
                toastr.warning('Please select WithDrawal Type Details!!', 'Warning Response');
                return false;
            }

        }
        appeal_type_id = 0;
        if(sub_module_id == 20){
            appeal_type_id = containerPnl.down('combo[name=appeal_type_id]').getValue();
             
            if (!appeal_type_id) {
                toastr.warning('Please select Type of Appeal Details!!', 'Warning Response');
                return false;
            }

        }
        if (productDetailsFrm.isValid()) {
            productDetailsFrm.submit({
                url: 'productregistration/'+action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    active_application_id: active_application_id,
                    applicant_id: applicant_id,
                    local_applicant_id: local_applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    zone_id: zone_id,
                    withdrawal_type_id:withdrawal_type_id,
                    appeal_type_id:appeal_type_id,
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
                        active_application_code = resp.active_application_code,
                        product_id = resp.product_id,
                        ref_no = resp.ref_no;
                        tracking_no = resp.tracking_no;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        if (checkapplication_id == '') {
                            containerPnl.down('hiddenfield[name=active_application_id]').setValue(active_application_id);
                            containerPnl.down('hiddenfield[name=active_application_code]').setValue(active_application_code);
                            
                            containerPnl.down('displayfield[name=reference_no]').setValue(ref_no);
                            containerPnl.down('displayfield[name=tracking_no]').setValue(tracking_no);
                            
                            containerPnl.down('hiddenfield[name=product_id]').setValue(product_id);
                        }
                        if(sub_module_id == 9){
                            
                            containerPnl.down('productsvariationrequestsgrid').down('hiddenfield[name=application_code]').setValue(active_application_code);
                            containerPnl.down('productsvariationrequestsgrid').down('hiddenfield[name=application_id]').setValue(active_application_id);
                        }
                        else if(sub_module_id == 17){
                            containerPnl.down('productswithdrawalreasonsgrid').down('hiddenfield[name=application_code]').setValue(active_application_code);
                            containerPnl.down('productswithdrawalreasonsgrid').down('hiddenfield[name=application_id]').setValue(active_application_id);
                        }
                        else if(sub_module_id == 20){
                            containerPnl.down('productdataappealrequestsgrid').down('hiddenfield[name=application_code]').setValue(active_application_code);
                            containerPnl.down('productdataappealrequestsgrid').down('hiddenfield[name=application_id]').setValue(active_application_id);
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
    
    saveProductDataAmmendmentRequest: function (btn) {console.log( btn.action_url);
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
            active_application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),

            appdata_ammendementrequest_id = containerPnl.down('hiddenfield[name=appdata_ammendementrequest_id]').getValue(),
            applicantDetailsForm = containerPnl.down('productapplicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            localApplicantDetailsForm = containerPnl.down('productlocalapplicantdetailsfrm'),
            local_applicant_id = localApplicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            productDetailsForm = containerPnl.down('#productsDetailsFrm'),
            zone_id = 2,
            productDetailsFrm = productDetailsForm.getForm();

        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        if (!local_applicant_id) {
            toastr.warning('Please select Local Agent!!', 'Warning Response');
            return false;
        }
        if (!zone_id) {
           // toastr.warning('Please select Zone Location!!', 'Warning Response');
           // return false;
        }
        
        if (productDetailsFrm.isValid()) {
            productDetailsFrm.submit({
                url: 'workflow/'+action_url,
                waitMsg: 'Please wait...',
                params: {
                    workflow_stage_id: workflow_stage_id,
                    active_application_id: active_application_id,
                    application_code: active_application_code,
                    appdata_ammendementrequest_id:appdata_ammendementrequest_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    process_id:process_id,
                    zone_id: zone_id,
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
                        containerPnl.down('hiddenfield[name=appdata_ammendementrequest_id]').setValue(resp.appdata_ammendementrequest_id);
                        containerPnl.down('productdataammendmentrequestsgrid').down('hiddenfield[name=application_code]').setValue(active_application_code);
                         containerPnl.down('productdataammendmentrequestsgrid').down('hiddenfield[name=application_id]').setValue(active_application_id);
                         containerPnl.down('productdataammendmentrequestsgrid').down('hiddenfield[name=appdata_ammendementrequest_id]').setValue(resp.appdata_ammendementrequest_id);
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
    onEditDrugProductRegApplication: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord();
        this.fireEvent('onEditDrugProductRegApplication', record);
    },
    
    showApplicationCommentsGeneric: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            active_application_id = record.get('active_application_id'),
            active_application_code = record.get('application_code');
           
        this.fireEvent('showApplicationCommentsWin', item,active_application_id,active_application_code );
    },
    //application_approvalbtn
    getApplicationApprovalDetails: function (item) {

        this.fireEvent('getApplicationApprovalDetails', item);
    },
    getBatchApplicationApprovalDetails: function (btn) {

        this.fireEvent('getBatchApplicationApprovalDetails', btn);
    },
    setUserCombosStore: function (obj, options) {
        this.fireEvent('setUserCombosStore', obj, options);
    },

    setAdminGridsStore: function (obj, options) {
        this.fireEvent('setAdminGridsStore', obj, options);
    },

    showAddProductDetails: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            title = btn.winTitle,
            width = btn.winWidth,
            wizard = grid.up('newdrugproductreceivingwizard'),
            container = wizard.up('drugproductreceiving'),
            productFrm = wizard.down('productdetailsfrm'),
            product_id = productFrm.down('hiddenfield[name=product_id]').getValue(),
            form = Ext.widget('productdetailsfrm'),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            section_id = container.down('hiddenfield[name=section_id]').getValue(),
            filter = "section_id:" + section_id,
            busTypesStr = form.down('combo[name=business_type_id]').getStore();
        form.down('hiddenfield[name=product_id]').setValue(product_id);

        busTypesStr.removeAll();
        busTypesStr.load({ params: { filter: filter } });


        funcShowCustomizableWindow(title, '35%', form, 'customizablewindow');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }

    },

    showEditProductRegParamWinFrm: function (item) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;

        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
    },

    doDeleteProductRegWidgetParam: function (item) {
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
    showManagerEditApplicationQueryForm: function (btn) {
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

    showReceivingApplicationSubmissionWin: function (btn) {

        this.fireEvent('showReceivingApplicationSubmissionWin', btn);
    },showReceivingFromSubmissionDetailsWin: function (btn) {

        this.fireEvent('showReceivingFromSubmissionDetailsWin', btn);

    },
    
    showSamplerecApplicationSubmissionWin: function (btn) {
        this.fireEvent('showSamplerecApplicationSubmissionWin', btn);
    },

    showAddProductRegParamWinFrm: function (btn) {
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
    showAddProductGmpInspectionDetailsinFrm: function (btn) {
        
        this.fireEvent('showAddProductGmpInspectionDetailsinFrm', btn);
    },
    showPreviousQueriesResponses: function (btn) {
        // if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
            //query configures 
            child.querystatus_id ='2,4';
            child.isReadOnly ='2,4';
            child.height= 550;
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
   
    showAddProductUnstructuredQueriesWin: function (btn) {
  
        var me = this,
        childXtype = btn.childXtype,
        winTitle = btn.winTitle,
        winWidth = btn.winWidth,
        isWin = btn.isWin,
        child = Ext.widget(childXtype),
        mainTabPnl = btn.up('#contentPanel'),
        containerPnl = mainTabPnl.getActiveTab(),
        product_id = containerPnl.down('hiddenfield[name=product_id]').getValue(),
        application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
        module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
        sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
        section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
        workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
        reference_no = containerPnl.down('displayfield[name=reference_no]').getValue(),
        tracking_no = containerPnl.down('displayfield[name=tracking_no]').getValue();
        
        child.setHeight(600);
   
    funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
   
    child.down('hiddenfield[name=application_code]').setValue(application_code);
    child.down('hiddenfield[name=section_id]').setValue(section_id);
    child.down('hiddenfield[name=module_id]').setValue(module_id);
    //child.down('hiddenfield[name=product_id]').setValue(product_id);
    child.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
    
    child.down('displayfield[name=tracking_no]').setValue(tracking_no);
    child.down('displayfield[name=reference_no]').setValue(reference_no);


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
    }, saveProductInformation: function (btn) {

        this.fireEvent('saveProductInformation', btn);

    },

    reloadParentGridOnChange: function (combo) {
        var grid = combo.up('grid'),
            store = grid.getStore();
        store.load();
    },

    funcActiveProductsOtherInformationTab: function (tab) {

        this.fireEvent('funcActiveProductsOtherInformationTab', tab);

    },
    
    
    showAddProductOtherdetailsWinFrm: function (btn) {
        this.fireEvent('showAddProductOtherdetailsWinFrm', btn);
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
                 params: { 
                    _token:token
                },
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

    doDeleteProductOtherdetails: function (item) {
        //if (this.fireEvent('checkFullAccess')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            product_id = record.get('product_id'),
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
                            store.load({ params: { product_id: product_id } });
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
    funcSearchProductManufacturerSite: function (btn) {
        var childXtype = btn.childXtype,
            me = this,
            win = btn.up('window'),
            frm = btn.up('form'),
            title = btn.winTitle
            form = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
            manufacturer_id = frm.down('hiddenfield[name=manufacturer_id]').getValue();
            
        if(manufacturer_id >0){

            form.down('hiddenfield[name=manufacturer_id]').setValue(manufacturer_id);
            
            funcShowCustomizableWindow(title, '80%', form, 'customizablewindow');
            if (arrayLength > 0) {
                me.fireEvent('refreshStores', storeArray);
            }
        }else{
            toastr.error('Select Manufacturer Details  first!! ', 'Error Response');
        }
       

    },   funcSearchGMPManufatcureingSite: function (btn) {
        var childXtype = btn.childXtype,
            me = this,
            win = btn.up('window'),
            product_id = win.down('hiddenfield[name=product_id]').getValue(),
            title = btn.winTitle
        form = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;

            form.down('hiddenfield[name=product_id]').setValue(product_id);
        funcShowCustomizableWindow(title, '80%', form, 'customizablewindow');
       

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
    }, funcSearchProducSitetManufacturerfrm: function (btn) {
        var grid = btn.up('grid'),
            manufacturer_id = grid.down('hiddenfield[name=manufacturer_id]').getValue(),
            childXtype = btn.childXtype,
            me = this,
            win = btn.up('window'),
            title = btn.winTitle
            form = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;

            form.down('hiddenfield[name=manufacturer_id]').setValue(manufacturer_id),
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

    },
    productPreviewEditProductsDetails: function (item) {
        
        this.fireEvent('showProductApplicationMoreDetails', item);

    },
    showProductPreviousComments: function (item) {
        
        this.fireEvent('showProductPreviousComments', item);

    },
    editpreviewProductInformation: function (item) {
        this.fireEvent('editpreviewProductInformation', item);
    },
    previewproductApplicationQueries: function (item) {
        this.fireEvent('showApplicationQueries', item);
    },

    
    funcPrevGridApplicationDocuments: function (item) {
        this.fireEvent('funcPrevGridApplicationDocuments', item);
    },
    funcPrevEvaluationReportUpload: function (item) {
        this.fireEvent('funcPrevEvaluationReportUpload', item);
    },
    funcPanelEvaluationReportUpload: function (item) {
        this.fireEvent('funcPanelEvaluationReportUpload', item);
    },
    
    funcPrevAuditReportUpload: function (item) {
        this.fireEvent('funcPrevAuditReportUpload', item);
    },
    showPreviousUploadedDocs: function (item) {
        this.fireEvent('showPreviousUploadedDocs', item);
    },showPreviousNonGridPanelUploadedDocs: function (item) {
        this.fireEvent('showPreviousNonGridPanelUploadedDocs', item);
    },
    
    showUploadEvaluationDocuments: function (item) {
        this.fireEvent('showUploadEvaluationDocuments', item);
    },
    
    
    showTcRecommendation: function (item) {
        this.fireEvent('showTcRecommendationUploads', item);
    },

    showBatchTcRecommendation: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            childObject = Ext.widget(childXtype);
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected= [];
             Ext.each(selected_records, function (item) {
                selected.push(item.data.application_code);
            });
            if (arrayLength > 0) {
                me.fireEvent('refreshStores', storeArray);
            }
            selected = JSON.stringify(selected),
            childObject.down('hiddenfield[name=selected_appcodes]').setValue(selected);
            
            funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');

    },
    funcChangeDevTypeClass:function(cbo,value){
        
            var frm = cbo.up('form'),
                classification_id = frm.down('combo[name=classification_id]').getValue(),
                 device_type_id = frm.down('combo[name=device_type_id]').getValue();
                
                 filter = {
                        classification_id: classification_id,
                        device_type_id:device_type_id
                };
                filter = JSON.stringify(filter);
                if(frm.down('combo[name=reason_for_classification_id]')){
                    reason_for_classificationStr = frm.down('combo[name=reason_for_classification_id]').getStore();


                    reason_for_classificationStr.removeAll();
                    reason_for_classificationStr.load({params:{filters:filter}});
        

                }
               

    },
    
    previewUploadedProductImage:function(item){
        
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            originaluploaded_image = record.get('originaluploaded_image');
            print_report(originaluploaded_image);
        
    },
    previewOnlineApplication: function (view, record) {
        this.fireEvent('previewProductOnlineApplication', view, record);

    },
    //the windows option 
    
    submitWinRejectedOnlineApplication: function (btn) {
        var action_url = 'submitRejectedOnlineApplication',
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            table_name = 'wb_products_applications';
             btn.fireEvent('submitApplication', application_id, application_code, action_url, table_name);
    },
    
    queryWinOnlineApplication:function (btn) {

        var win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=application_code]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            application_status = win.down('hiddenfield[name=application_status_id]').getValue(),
           
            queriesGrid = Ext.widget('onlinequeriesgrid');

            queriesGrid.down('hiddenfield[name=application_id]').setValue(application_id);
            queriesGrid.down('hiddenfield[name=application_code]').setValue(application_code);
            queriesGrid.down('hiddenfield[name=module_id]').setValue(module_id);
            queriesGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

            if (application_status == 17 || application_status === 17) {
                queriesGrid.down('button[action=add_query]').setVisible(false);
                queriesGrid.down('button[action=submit_app]').setVisible(false);
                queriesGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
            }
            funcShowCustomizableWindow(tracking_no + ' - Queries', '55%', queriesGrid, 'customizablewindow');
            
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
            table_name = 'wb_product_applications';
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

    closeApplicationQuery: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            action_url = item.action_url,
            grid = btn.up('grid'),
            win = grid.up('window'),
            store = grid.getStore(),
            id = record.get('id'),
            application_code = record.get('application_code'),
            mask = new Ext.LoadMask(
                {
                    target: win,
                    msg: 'Please wait...'
                }
            );
            
        Ext.MessageBox.confirm('Close', 'Are you sure to close this query?', function (button) {
            if (button === 'yes') {
                mask.show();
                Ext.Ajax.request({
                    url: action_url,
                    params: {
                        query_id: id,
                        application_code: application_code
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
                            store2.load();
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
    submitRejectedOnlineApplication: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            action_url = 'submitRejectedOnlineApplication',
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            table_name = 'wb_product_applications';
        grid.fireEvent('submitApplication', application_id, application_code, action_url, table_name);
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
            application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            is_populate_primaryappdata = 0,
            status_id = '',
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue();
            if(containerPnl.down('hiddenfield[name=is_populate_primaryappdata]')){
                is_populate_primaryappdata =  containerPnl.down('hiddenfield[name=is_populate_primaryappdata]').getValue();
            }
            if(containerPnl.down('hiddenfield[name=status_id]')){
                 status_id =  containerPnl.down('hiddenfield[name=status_id]').getValue();
            }
        if (!application_id || is_populate_primaryappdata == 1){
            var me = this,
                childXtype = btn.childXtype,
                winTitle = btn.winTitle,
                winWidth = btn.winWidth,
                grid = Ext.widget(childXtype);
                grid.height= 550;
                grid.down('hiddenfield[name=section_id]').setValue(section_id);
                if(grid.down('hiddenfield[name=status_id]')){
                    grid.down('hiddenfield[name=status_id]').setValue(status_id);
                }
            funcShowCustomizableWindow(winTitle, winWidth, grid, 'customizablewindow');
            
        }
        else {
            toastr.error('Alert: ', 'Application has already been saved, update the details to continue');
        }

    },
    
    funcAddATCProductApplicationParamter:function(btn){
        var form = btn.up('form'),
            common_name_id = form.down('combo[name=common_name_id]').getValue()
            childXtype = btn.childXtype,
            section_id = btn.section_id,
            table_name = btn.table_name,
            childXtype = Ext.widget(childXtype);
            if(common_name_id != ''){
                childXtype.down('hiddenfield[name=common_name_id]').setValue(common_name_id);

                funcShowCustomizableWindow('Parameter', '55%', childXtype, 'customizablewindow');
            }
            else{
                toastr.error('Alert: ', 'Select the common name details first!!');
            }
        
    },

    
    funcAddSubCategoryProductParamter:function(btn){
        var form = btn.up('form'),
             product_category_id = form.down('combo[name=product_category_id]').getValue()
            childXtype = btn.childXtype,
            section_id = btn.section_id,
            table_name = btn.table_name,
            childXtype = Ext.widget(childXtype);
            if(product_category_id != ''){
                childXtype.down('hiddenfield[name=product_category_id]').setValue(product_category_id);

                funcShowCustomizableWindow('Parameter', '55%', childXtype, 'customizablewindow');
            }
            else{
                toastr.error('Alert: ', 'Select the Product Category details first!!');
            }
    },
    funcAddProductApplicationParamter:function(btn){
        var form = btn.up('form'),
            childXtype = btn.childXtype,
            section_id = btn.section_id,
            table_name = btn.table_name,
            childXtype = Ext.widget(childXtype);
            if(childXtype.down('hiddenfield[name=section_id]')){
                childXtype.down('hiddenfield[name=section_id]').setValue(section_id);
            }

            funcShowCustomizableWindow('Parameter', '55%', childXtype, 'customizablewindow');
            
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

    },generateProductRegCertificate: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code');
        this.fireEvent('generateProductRegCertificate', application_code);
    },newGenerateProductRegCertificate: function (item) {
        var record = item.getWidgetRecord(),
        application_code = record.get('application_code');
        this.fireEvent('generateProductRegCertificate', application_code);
    },generateProductRejectionLetter: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code');
        this.fireEvent('generateProductRejectionLetter', application_code);
    },
    saveSampleSubmissionRemarks:function(btn){

        this.fireEvent('saveSampleSubmissionRemarks', btn);
        

    },
    funcCheckDrugsProductsPanel:function(panel){
            var form = panel.down('form'),
                prodclass_category_id = form.down('hiddenfield[name=prodclass_category_id]').getValue();

            if(prodclass_category_id == 2){
                    //remove all details on the product panel and add the 
            }else{

            }

    },
    //export
    exportMeetingDetails: function(btn) {
        var grid=btn.up('grid'),
            panel=grid.up('panel'),
            meetingfrm=panel.down('productMeetingDetailsFrm'),
            meeting_id=meetingfrm.down('hiddenfield[name=id]').getValue();
          Ext.getBody().mask('Exporting Please wait...');

        Ext.Ajax.request({
                    url: 'productregistration/ExportMeetingReport',
                    method: 'GET',
                    params: {
                        id: meeting_id
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                       var t = JSON.parse(response.responseText);
                        var a = document.createElement("a");
                        a.href = t.file; 
                        a.download = t.name;
                        document.body.appendChild(a);

                        a.click();
                     
                        a.remove();
                        Ext.getBody().unmask();
                      },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        mask.hide();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
    
        
    },
    
    //receive online 
    funcCheckProductsOtherInformationTab: function(tab) {
        var form = tab.down('editdrugsProductsDetailsFrm'),
            product_id = form.down('hiddenfield[name=product_id]').getValue();
        
        if (product_id == '') {

            tab.setActiveTab(0);
            toastr.error('Save Product details to proceed', 'Failure Response');
            return;
        }
    },
    showDataCleanUpWindow: function(btn) {
        var container = Ext.ComponentQuery.query("#contentPanel")[0],
             activeTab = container.getActiveTab(), 
             wrapper = activeTab.down(btn.wrapper),
             child = Ext.widget(btn.childXtype);
        wrapper.removeAll();
        wrapper.add(child);
    },
    editregisteredProductsSearch: function(btn) {
        var grid = Ext.widget(btn.childXtype);
        funcShowCustomizableWindow("All Product Applications", "70%", grid, 'customizablewindow');

    },
    
    showregisteredProductsSearch: function (btn) {
        //
        var mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            is_populate_primaryappdata = 0,
            status_id = '',
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue();
            if(containerPnl.down('hiddenfield[name=is_populate_primaryappdata]')){
                is_populate_primaryappdata =  containerPnl.down('hiddenfield[name=is_populate_primaryappdata]').getValue();
            }
            if(containerPnl.down('hiddenfield[name=status_id]')){
                 status_id =  containerPnl.down('hiddenfield[name=status_id]').getValue();
            }
        if (!application_id || is_populate_primaryappdata == 1){
            var me = this,
                childXtype = btn.childXtype,
                winTitle = btn.winTitle,
                winWidth = btn.winWidth,
                grid = Ext.widget(childXtype);

                grid.height= 550;
                if(grid.down('hiddenfield[name=status_id]')){
                    grid.down('hiddenfield[name=status_id]').setValue(status_id);
                }
                if(grid.down('hiddenfield[name=section_id]')){
                    grid.down('hiddenfield[name=section_id]').setValue(section_id);
                }
            funcShowCustomizableWindow(winTitle, winWidth, grid, 'customizablewindow');
            
        }
        else {
            toastr.error('Alert: ', 'Application has already been saved, update the details to continue');
        }

    },
    loadSelectedProduct :function(view, record) {
        var wrapper = Ext.ComponentQuery.query("#editProductwizardpnl")[0],
            product_pnl = wrapper.down('editdrugsproductsdetailspnl'),
            product_form = product_pnl.down('editdrugsProductsDetailsFrm'),
            applicant_frm = wrapper.down('productapplicantdetailsfrm'),
            local_applicant_frm = wrapper.down('productlocalapplicantdetailsfrm'),
            grid = view.up('grid');
           
        //load applicant form details
        Ext.getBody().mask('loading...');
        Ext.Ajax.request({
                    url: "tradermanagement/getApplicantsList",
                    method: 'GET',
                    params: {
                        applicant_id: record.get('applicant_id'),
                        start: 0,
                        limit: 1000
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
                            var model = Ext.create('Ext.data.Model', resp.results[0]);
                               
                           applicant_frm.loadRecord(model);
                        } else {
                            toastr.error(message, 'Failure Response');
                            var model = Ext.create('Ext.data.Model', []);
                            return model;
                        }
                    },
                    failure: function (response) {
                        
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                        var model = Ext.create('Ext.data.Model', []);
                        return model;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      
                        toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                        var model = Ext.create('Ext.data.Model', []);
                        return model;
                    }
                });
       Ext.Ajax.request({
                    url: "tradermanagement/getApplicantsList",
                    method: 'GET',
                    params: {
                        applicant_id: record.get('local_agent_id'),
                        start: 0,
                        limit: 1000
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
                            var model = Ext.create('Ext.data.Model', resp.results[0]);
                               
                           local_applicant_frm.loadRecord(model);
                        } else {
                            toastr.error(message, 'Failure Response');
                            
                        }
                    },
                    failure: function (response) {
                        
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                        
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      
                        toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                       
                    }
                });
        product_form.loadRecord(record);
        product_pnl.down('combo[name=zone_id]').setValue(record.get('zone_id'))
        Ext.getBody().unmask();
        grid.up('window').close();
    },
    loadSelectedMDProduct :function(view, record) {
        var wrapper = Ext.ComponentQuery.query("#editmedicaldevicesapplicationwizard")[0],
            product_pnl = wrapper.down('editmedicaldevicesProductsDetailsPnl'),
            product_form = product_pnl.down('editmedicaldevicesproductsdetailsfrm'),
            applicant_frm = wrapper.down('productapplicantdetailsfrm'),
            local_applicant_frm = wrapper.down('productlocalapplicantdetailsfrm'),
            grid = view.up('grid');
           
        //load applicant form details
        Ext.getBody().mask('loading...');
        Ext.Ajax.request({
                    url: "tradermanagement/getApplicantsList",
                    method: 'GET',
                    params: {
                        applicant_id: record.get('applicant_id'),
                        start: 0,
                        limit: 1000
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
                            var model = Ext.create('Ext.data.Model', resp.results[0]);
                               
                           applicant_frm.loadRecord(model);
                        } else {
                            toastr.error(message, 'Failure Response');
                            var model = Ext.create('Ext.data.Model', []);
                            return model;
                        }
                    },
                    failure: function (response) {
                        
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                        var model = Ext.create('Ext.data.Model', []);
                        return model;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      
                        toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                        var model = Ext.create('Ext.data.Model', []);
                        return model;
                    }
                });
       Ext.Ajax.request({
                    url: "tradermanagement/getApplicantsList",
                    method: 'GET',
                    params: {
                        applicant_id: record.get('local_agent_id'),
                        start: 0,
                        limit: 1000
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
                            var model = Ext.create('Ext.data.Model', resp.results[0]);
                               
                           local_applicant_frm.loadRecord(model);
                        } else {
                            toastr.error(message, 'Failure Response');
                            
                        }
                    },
                    failure: function (response) {
                        
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                        
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      
                        toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                       
                    }
                });
        product_form.loadRecord(record);
        product_pnl.down('combo[name=zone_id]').setValue(record.get('zone_id'))
        Ext.getBody().unmask();
        grid.up('window').close();
    },
    loadProductPreview :function(view, record) {
        var wrapper = Ext.ComponentQuery.query("#registrationproductpreviewqueryWizardId")[0],
            product_pnl = wrapper.down('previewdrugsProductsDetailsPnl'),
            product_form = product_pnl.down('drugsProductsDetailsFrm'),
            product_other = product_pnl.down('drugsProductsOtherInformationFrm'),
            applicant_frm = wrapper.down('productapplicantdetailsfrm'),
            local_applicant_frm = wrapper.down('productlocalapplicantdetailsfrm'),
            grid = view.up('grid');
           
        //load applicant form details
        product_form.getForm().getFields().each (function (field) {
          field.setReadOnly (true);
        });
        applicant_frm.getForm().getFields().each (function (field) {
          field.setReadOnly (true);
        });
        local_applicant_frm.getForm().getFields().each (function (field) {
          field.setReadOnly (true);
        });
        product_form.query('.button').forEach(function(c){c.setDisabled(true);});
        applicant_frm.query('.button').forEach(function(c){c.setDisabled(true);});
        local_applicant_frm.query('.button').forEach(function(c){c.setDisabled(true);});
        wrapper.down('productDocUploadsGrid').down('button[name=add_upload]').hide();
        //set values
        wrapper.down('textfield[name=reference_no]').setValue(record.get('reference_no'));
        wrapper.down('hiddenfield[name=process_id]').setValue(record.get('process_id'));
        wrapper.down('hiddenfield[name=workflow_stage_id]').setValue(record.get('workflow_stage_id'));
        wrapper.down('hiddenfield[name=active_application_id]').setValue(record.get('active_application_id'));
        wrapper.down('hiddenfield[name=active_application_code]').setValue(record.get('application_code'));
        wrapper.down('hiddenfield[name=application_status_id]').setValue(record.get('status_id'));
        wrapper.down('hiddenfield[name=module_id]').setValue(record.get('module_id'));
        wrapper.down('hiddenfield[name=sub_module_id]').setValue(record.get('sub_module_id'));
        wrapper.down('hiddenfield[name=section_id]').setValue(record.get('section_id'));
        wrapper.down('hiddenfield[name=is_manager_query]').setValue(0);
    
        wrapper.getViewModel().set('isReadOnly', true);




        Ext.getBody().mask('loading...');
        Ext.Ajax.request({
                    url: "tradermanagement/getApplicantsList",
                    method: 'GET',
                    params: {
                        applicant_id: record.get('applicant_id'),
                        start: 0,
                        limit: 1000
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
                            var model = Ext.create('Ext.data.Model', resp.results[0]);
                               
                           applicant_frm.loadRecord(model);
                        } else {
                            toastr.error(message, 'Failure Response');
                            var model = Ext.create('Ext.data.Model', []);
                            return model;
                        }
                    },
                    failure: function (response) {
                        
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                        var model = Ext.create('Ext.data.Model', []);
                        return model;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      
                        toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                        var model = Ext.create('Ext.data.Model', []);
                        return model;
                    }
                });
       Ext.Ajax.request({
                    url: "tradermanagement/getApplicantsList",
                    method: 'GET',
                    params: {
                        applicant_id: record.get('local_agent_id'),
                        start: 0,
                        limit: 1000
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
                            var model = Ext.create('Ext.data.Model', resp.results[0]);
                               
                           local_applicant_frm.loadRecord(model);
                        } else {
                            toastr.error(message, 'Failure Response');
                            
                        }
                    },
                    failure: function (response) {
                        
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                        
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      
                        toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                       
                    }
                });
        product_form.loadRecord(record);
        product_pnl.down('combo[name=zone_id]').setValue(record.get('zone_id'))
        Ext.getBody().unmask();
        grid.up('window').close();
    },
    saveProductEditionBaseDetails: function(btn) {
        var form_wizard = btn.up('panel'),
            product_pnl = form_wizard.down('editdrugsproductsdetailspnl'),
            product_form = product_pnl.down('editdrugsProductsDetailsFrm'),
            applicant_frm = form_wizard.down('productapplicantdetailsfrm'),
            local_applicant_frm = form_wizard.down('productlocalapplicantdetailsfrm'),
            applicant_id = applicant_frm.down('hiddenfield[name=applicant_id]').getValue(),
            zone_id = product_pnl.down('combo[name=zone_id]').getValue(),
            local_applicant_id = local_applicant_frm.down('hiddenfield[name=applicant_id]').getValue(),
            frm = product_form.getForm();
        if(!zone_id){
            toastr.warning('Please select a zone!!!', 'Warning Response');
            return false;
          }
        if(!applicant_id){
                toastr.warning('Please select a applicant!!!', 'Warning Response');
                return false;
              }
        if(!local_applicant_id){
                toastr.warning('Please select a local Agent!!!', 'Warning Response');
                return false;
             }
        if(frm.isValid()){
            frm.submit({
                url: "productregistration/saveProductEditionBaseDetails",
                params: { 
                    applicant_id:applicant_id,
                    zone_id:zone_id,
                    local_agent_id:local_applicant_id
                },
                waitMsg: 'Please wait...',
                
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        form_wizard.down('hiddenfield[name=active_application_id]').setValue(response.record_id);
                        form_wizard.down('hiddenfield[name=active_application_code]').setValue(response.application_code);
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
            toastr.warning('Please fill all mandatory fields!!!', 'Warning Response');
            return false;
        }
    },  
    saveMDProductEditionBaseDetails: function(btn) {
        var form_wizard = btn.up('panel'),
            product_pnl = form_wizard.down('editmedicaldevicesProductsDetailsPnl'),
            product_form = product_pnl.down('editmedicaldevicesproductsdetailsfrm'),
            applicant_frm = form_wizard.down('productapplicantdetailsfrm'),
            local_applicant_frm = form_wizard.down('productlocalapplicantdetailsfrm'),
            applicant_id = applicant_frm.down('hiddenfield[name=applicant_id]').getValue(),
            zone_id = product_pnl.down('combo[name=zone_id]').getValue(),
            local_applicant_id = local_applicant_frm.down('hiddenfield[name=applicant_id]').getValue(),
            frm = product_form.getForm();
        if(!zone_id){
            toastr.warning('Please select a zone!!!', 'Warning Response');
            return false;
          }
        if(!applicant_id){
                toastr.warning('Please select a applicant!!!', 'Warning Response');
                return false;
              }
        if(!local_applicant_id){
                toastr.warning('Please select a local Agent!!!', 'Warning Response');
                return false;
             }
        if(frm.isValid()){
            frm.submit({
                url: "productregistration/saveProductEditionBaseDetails",
                params: { 
                    applicant_id:applicant_id,
                    zone_id:zone_id,
                    local_agent_id:local_applicant_id
                },
                waitMsg: 'Please wait...',
                
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        form_wizard.down('hiddenfield[name=active_application_id]').setValue(response.record_id);
                        form_wizard.down('hiddenfield[name=active_application_code]').setValue(response.application_code);
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
            toastr.warning('Please fill all mandatory fields!!!', 'Warning Response');
            return false;
        }
    },  
    showPreviewApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = btn.up('panel'),
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
            extraParams = [{
                    field_type: 'hiddenfield',
                    field_name: 'workflowaction_type_id',
                    value: 12
                  }];
        valid = 1;
        if (valid) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,extraParams);          
        } else {
            Ext.getBody().unmask();
            toastr.warning('Please Enter All the required Product Details!!', 'Warning Response');
            return;
        }
    },
    loadAdhocQueryGrid: function(grid, newTab, oldTab, eopts){
        //loading params
            var wrapper = grid.up('panel');
            if(wrapper.down('hiddenfield[name=active_application_code]').getValue()){
                 grid.down('hiddenfield[name=application_id]').setValue(wrapper.down('hiddenfield[name=active_application_id]').getValue());
                 grid.down('hiddenfield[name=application_code]').setValue(wrapper.down('hiddenfield[name=active_application_code]').getValue());
                 grid.down('hiddenfield[name=module_id]').setValue(wrapper.down('hiddenfield[name=module_id]').getValue());
                 grid.down('hiddenfield[name=sub_module_id]').setValue(wrapper.down('hiddenfield[name=sub_module_id]').getValue());
                 grid.down('hiddenfield[name=section_id]').setValue(wrapper.down('hiddenfield[name=section_id]').getValue());
            }else{
                 toastr.warning("Please select an application first", "No record selected");
            }      
    },

    saveAssessmentTemplate: function(btn){
        //Evaluation Assessment saving by Salehe
        var assessment_form = btn.up('assessmenttemplatefrm'),
            template = assessment_form.down('ckeditor'),
            operation =assessment_form.down('hiddenfield[name=operation]').getValue(),
            assessmentId = assessment_form.down('hiddenfield[name=assessmentId]').getValue(),
            application_code = assessment_form.down('hiddenfield[name=application_code]').getValue(),
            frm = assessment_form.getForm();

         if(frm.isValid()){
            frm.submit({
                url: "productregistration/saveAssessmentTemplate",
                params: { 
                    application_code:application_code,
                    operation:operation,
                    assessmentId:assessmentId
                },
                waitMsg: 'Please wait...',
                
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        assessment_form.down('hiddenfield[name=assessmentId]').setValue(response.record_id);
                        assessment_form.down('hiddenfield[name=isSaved]').setValue(1);
                        //form_wizard.down('hiddenfield[name=active_application_code]').setValue(response.application_code);
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
            toastr.warning('Please fill all mandatory fields!!!', 'Warning Response');
            return false;
        }

    },

    printAssessmentTemplate: function(btn){
          var assessment_form = btn.up('assessmenttemplatefrm'),
            //template = assessment_form.down('ckeditor'),
            operation =assessment_form.down('hiddenfield[name=operation]').getValue(),
            //assessmentId = assessment_form.down('hiddenfield[name=assessmentId]').getValue(),
            application_code = assessment_form.down('hiddenfield[name=application_code]').getValue();
     
        var action_url = 'reports/printAssessmentTemplate?application_code=' + application_code+'&&operation='+operation;
        print_report(action_url);
        
    },

    printEvalTemplateManagerAudit:function(item){
         var btn = item.up('button'),
            operation =0,
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code');
     
        var action_url = 'reports/printAssessmentTemplate?application_code=' + application_code+'&&operation='+operation;
        print_report(action_url);
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

});