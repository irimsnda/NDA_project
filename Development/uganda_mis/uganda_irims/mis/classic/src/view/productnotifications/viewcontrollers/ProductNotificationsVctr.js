Ext.define('Admin.view.productnotifications.viewcontrollers.ProductNotificationsVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productnotificationsvctr',

    /**
     * Called when the view is created
     */
    init: function () {

    },
	
    getBatchApplicationApprovalDetails: function (btn) {

        this.fireEvent('getBatchApplicationApprovalDetails', btn);
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
    onViewProductNotificationsApplication: function (grid, record) {

        this.fireEvent('viewApplicationDetails', record);

    },
    setConfigGridsStore: function (obj, options) {

        this.fireEvent('setConfigGridsStore', obj, options);
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
        this.fireEvent('onNewProductRegApplication', application_type);
    },
    showRenAltProductRegistration: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('onRenAltProductRegistration', application_type);
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
            model.set('atBeginning', true);
        } else if (activeIndex === 1) {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        } else {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        }

        wizardPanel.down('button[name=save_btn]').setVisible(true);

        if (activeIndex === 3) {
            wizardPanel.down('button[name=save_btn]').setDisabled(true);
            wizardPanel.down('button[name=save_screening_btn]').setVisible(true);
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atEnd', true);
        } else {
            
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            model.set('atEnd', false);
        }
    },
     quickNavigationonlineprev:function(btn){
       
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
            if (step == 0) {
                wizardPnl.getViewModel().set('atBeginning', true);
            } else {
                wizardPnl.getViewModel().set('atBeginning', false);
            }
            if (step === 3) {
                wizardPnl.getViewModel().set('atEnd', true);
            } else {
                wizardPnl.getViewModel().set('atEnd', false);
            }
    
            if (step === 0) {
               // wizardPnl.down('button[action=reject_app]').setVisible(false);
               wizardPnl.down('button[name=save_productnotification]').setVisible(false);
                wizardPnl.down('button[name=submit_btn]').setVisible(false);
                wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
                wizardPnl.getViewModel().set('atBeginning', true);
                wizardPnl.getViewModel().set('atEnd', false);
                
            } else if (step === 1) {
                
                wizardPnl.down('button[name=save_productnotification]').setVisible(true);
                wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
            }else if (step === 3) {
                //wizardPnl.down('button[action=reject_app]').setVisible(false);
                wizardPnl.down('button[name=submit_btn]').setVisible(true);
                
                wizardPnl.down('button[name=save_screening_btn]').setVisible(true);
                wizardPnl.getViewModel().set('atBeginning', false);
                wizardPnl.getViewModel().set('atEnd', true);
                
            } else {
               // wizardPnl.down('button[action=reject_app]').setVisible(false);
               wizardPnl.down('button[name=save_productnotification]').setVisible(true);
                wizardPnl.down('button[name=submit_btn]').setVisible(false);
               
                wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
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
                
                sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
                model = wizardPanel.getViewModel(),
                item, i, activeItem, activeIndex;
                console.log(layout);
            layout[direction]();

            activeItem = layout.getActiveItem();
            activeIndex = wizardPanel.items.indexOf(activeItem);

            // beginning disables previous
            if (activeIndex === 0) {
                //wizardPanel.down('button[action=reject_app]').setVisible(false);
                
                wizardPanel.down('button[name=submit_btn]').setVisible(false);
                wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
                wizardPanel.down('button[name=save_productnotification]').setVisible(false);
               
                model.set('atBeginning', true);
            }  else if (activeIndex === 1) {
                
                wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
                wizardPanel.down('button[name=save_productnotification]').setVisible(true);
                 
             }else if (activeIndex === 3) {
                //wizardPanel.down('button[action=reject_app]').setVisible(false);
                wizardPanel.down('button[name=submit_btn]').setVisible(true);
                wizardPanel.down('button[name=save_screening_btn]').setVisible(true);

                model.set('atBeginning', false);
                model.set('atEnd', true);
            } else {
              //  wizardPanel.down('button[action=reject_app]').setVisible(false);
                wizardPanel.down('button[name=submit_btn]').setVisible(true);
                wizardPanel.down('button[name=save_productnotification]').setVisible(true);
                wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
                model.set('atBeginning', false);
            
            }

            wizardPanel.down('button[name=save_btn]').setVisible(true);

            if (activeIndex === 3) {

                
                model.set('atEnd', true);

            } else {
            
                model.set('atEnd', false);
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
            table_name = 'wb_product_notifications',
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
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
        }

        if (step === 3) {
            wizardPnl.down('button[name=save_btn]').setDisabled(true);
            wizardPnl.down('button[name=save_screening_btn]').setVisible(true);
            motherPnl.getViewModel().set('atEnd', true);

        } else {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
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
            wizardPanel.down('button[name=save_btn]').setDisabled(true);
            model.set('atBeginning', true);
        } else if (activeIndex === 1) {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        } else {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        }

        wizardPanel.down('button[name=save_btn]').setVisible(true);

        if (activeIndex === 3) {
            wizardPanel.down('button[name=save_btn]').setDisabled(true);
            wizardPanel.down('button[name=save_screening_btn]').setVisible(true);
            model.set('atEnd', true);

        } else {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            model.set('atEnd', false);
        }
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
            motherPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', true);
        } else if (step == 1) {
            motherPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', false);
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
        }
        if (step == 3) {
            motherPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.down('button[name=save_screening_btn]').setVisible(true);
            motherPnl.getViewModel().set('atEnd', true);
        } else {
          
            motherPnl.down('button[name=save_btn]').setVisible(true);
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
    saveProductNotificationReceivingBaseDetails: function (btn) {console.log( btn.action_url);
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

            applicantDetailsForm = containerPnl.down('productapplicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            localApplicantDetailsForm = containerPnl.down('productlocalapplicantdetailsfrm'),
            local_applicant_id = localApplicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            productDetailsForm = containerPnl.down('#productsDetailsFrm'),
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
            toastr.warning('Please select Zone Location!!', 'Warning Response');
            return false;
        }


        if (productDetailsFrm.isValid()) {
            productDetailsFrm.submit({
                url: 'productnotification/'+action_url,
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
                            containerPnl.down('displayfield[name=ref_no]').setValue(ref_no);
                            containerPnl.down('hiddenfield[name=product_id]').setValue(product_id);
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

    onEditDrugProductRegApplication: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord();
        this.fireEvent('onEditDrugProductRegApplication', record);
    },
    //application_approvalbtn
    getApplicationApprovalDetails: function (item) {

        this.fireEvent('getApplicationApprovalDetails', item);
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

        this.fireEvent('showReceivingApplicationSubmissionWin', btn);
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
    showProductPreviousComments: function (item) {
        
        this.fireEvent('showProductPreviousComments', item);

    },
    editpreviewProductInformation: function (item) {
        this.fireEvent('editpreviewProductNotificationInformation', item);
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
    previewOnlineApplication: function (view,record) {
        var grid = view.grid,
            tracking_no = record.get('tracking_no'),
            application_id = record.get('active_application_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            last_query_ref_id = record.get('last_query_ref_id'),
            status_type_id = record.get('status_type_id'),
            isRejection = grid.isRejection,
            wizard_pnl = grid.wizard_pnl, 
            
            application_code = record.get('application_code'),
            onlinePanel = Ext.widget(wizard_pnl);

            if (isRejection == 1) {
                onlinePanel.down('button[name=prev_rejections]').setVisible(true);
                onlinePanel.down('button[name=actions]').setVisible(true);
                onlinePanel.down('button[name=submit_btn]').setVisible(false);
                onlinePanel.down('button[name=query_btn]').setVisible(false);
                onlinePanel.down('button[name=reject_btn]').setVisible(false);
            }   
            
            onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
            onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
            onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
            onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

            onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
            onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
            onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
            onlinePanel.down('button[name=link_applicant]').setDisabled(true);
            onlinePanel.down('button[name=link_localagent]').setDisabled(true);
            onlinePanel.down('hiddenfield[name=last_query_ref_id]').setValue(last_query_ref_id);

            
            docsGrid = onlinePanel.down('onlineproductdocuploadsgrid');
            docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
            docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
            docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
            docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            
            onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);

            funcShowCustomizableWindow(tracking_no, '80%', onlinePanel, 'customizablewindow');
            onlinePanel.getViewModel().set('isReadOnly', false);
                    
    },
    //the windows option 
    
    submitWinRejectedOnlineApplication: function (btn) {
        var win = btn.up('window'),
            action_url = 'submitRejectedOnlineApplication',
            
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=application_code]').getValue(),
            table_name = 'wb_product_notifications';
            win.fireEvent('submitApplication', application_id, application_code, action_url, table_name);
        win.close();
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
            application_code = win.down('hiddenfield[name=application_code]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue();
           //is_manager_query
          
        showOnlineSubmissionWin(application_id, module_id, sub_module_id, section_id, 'onlinesubmissionsfrm', winWidth, storeID, tracking_no, '');
        
      //  win.close();
    },
    submitRejectedOnlineApplication: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            action_url = 'submitRejectedOnlineApplication',
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            table_name = 'wb_product_notifications';
        grid.fireEvent('submitApplication', application_id, application_code, action_url, table_name);
    }, queryOnlineApplication: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            tracking_no = record.get('tracking_no'),
            application_status = record.get('application_status_id'),
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

    },generateProductNotificationCertificate: function (item) {
        var record = item.getWidgetRecord(),
        application_code = record.get('application_code');
        this.fireEvent('generateProductNotificationCertificate', application_code);
    } , 
    generateProductNotificationApprovalLetter: function (item) {
        var record = item.getWidgetRecord(),
            application_code = record.get('application_code');
        this.fireEvent('generateProductNotificationApprovalLetter', application_code);
    }
    //receive online 
    
});