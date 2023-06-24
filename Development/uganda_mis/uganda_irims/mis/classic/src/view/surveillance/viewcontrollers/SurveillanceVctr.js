/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.viewcontrollers.SurveillanceVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.surveillancevctr',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    setSurveillanceGridsStore: function (obj, options) {
        this.fireEvent('setSurveillanceGridsStore', obj, options);
    },
     funcUploadTCMeetingtechnicalDocuments:function(btn){
        
        this.fireEvent('funcUploadTCMeetingtechnicalDocuments', btn);
        
    },

    setSurveillanceCombosStore: function (obj, options) {
        this.fireEvent('setSurveillanceCombosStore', obj, options);
    },
    setConfigCombosStoreWithSectionFilter: function (obj, options) {
        this.fireEvent('setConfigCombosStoreWithSectionFilter', obj, options);
    },
    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },

    setParamCombosStore: function (obj, options) {
        this.fireEvent('setParamCombosStore', obj, options);
    },

    setUserCombosStore: function (obj, options) {
        this.fireEvent('setUserCombosStore', obj, options);
    },

    setAdminGridsStore: function (obj, options) {
        this.fireEvent('setAdminGridsStore', obj, options);
    },

    setWorkflowGridsStore: function (obj, options) {
        this.fireEvent('setWorkflowGridsStore', obj, options);
    },

    setPremiseRegGridsStore: function (obj, options) {
        this.fireEvent('setPremiseRegGridsStore', obj, options);
    },

    setClinicalTrialGridsStore: function (obj, options) {
        this.fireEvent('setClinicalTrialGridsStore', obj, options);
    },

    setConfigCombosStoreWithSectionFilter: function (obj, options) {
        this.fireEvent('setConfigCombosStoreWithSectionFilter', obj, options);
    },

    reloadParentGridOnChange: function (combo) {
        var grid = combo.up('grid'),
            store = grid.getStore();
        store.load();
    },

    showPmsApplicationWorkflow: function (btn) {
        var application_type = btn.app_type,
            wrapper_xtype = btn.wrapper_xtype;
        this.fireEvent('showApplicationWorkflow', application_type, wrapper_xtype);
    },

    showNewPmsApplication: function (btn) {
        var application_type = btn.app_type,
            wrapper_xtype = btn.wrapper_xtype;
        this.fireEvent('newPmsApplication', application_type, wrapper_xtype);
    },
    
    showEditPmsProgram: function (item) {//wrong
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            section_id = record.get('section_id'),
            grid = btn.up('grid'),
            homePnl = grid.up('panel'),
            addPnl = Ext.widget('pmsprogramcontainer');
           
        addPnl.down('form').loadRecord(record);
        grid.hide();
        homePnl.add(addPnl);
    },

    doCreateSurveillanceParamWin: function (btn) {
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

    doDeleteSurveillanceWidgetParam: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
    },
    doSavePmsProgramImplementation: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            storeID  = btn.storeID,
            win = form.up('window'),
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
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        store.removeAll();
                        store.load();
                        win.close();
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
    doSavePmsProgramDetails: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            frm = form.getForm(),
            mainTabPnl = form.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {model: table, section_id: section_id},
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message,
                        record_id = response.record_id;
                    if (success == true || success === true) {
                        form.down('hiddenfield[name=id]').setValue(record_id);
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

    showAddSurveillanceWinFrm: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showEditSurveillanceWinFrm: function (item) {
        var me = this,
            btn = item.up('button'),
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

    showAddPmsProgramRegionWinFrm: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            containerPnl = grid.up('pmsprogramcontainer'),
            program_id = containerPnl.down('form').down('hiddenfield[name=id]').getValue(),
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (!program_id) {
            toastr.warning('Save program details first!!', 'Warning Response');
            return;
        }
        childObject.down('hiddenfield[name=program_id]').setValue(program_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showAddPmsProgramProductWinFrm: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            containerPnl = grid.up('pmsprogramcontainer'),
            mainTabPnl = containerPnl.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            program_id = containerPnl.down('form').down('hiddenfield[name=id]').getValue(),
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            productsStr = childObject.down('tagfield[name=product_ids]').getStore(),
            filters = {
                section_id: section_id
            };
        if (!program_id) {
            toastr.warning('Save program details first!!', 'Warning Response');
            return;
        }
        filters = JSON.stringify(filters);
        productsStr.removeAll();
        productsStr.load({params: {filters: filters}});
        childObject.down('hiddenfield[name=program_id]').setValue(program_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showAddPmsProgramPlanWinFrm: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            containerPnl = grid.up('pmsprogramcontainer'),
            mainTabPnl = containerPnl.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            program_id = containerPnl.down('form').down('hiddenfield[name=id]').getValue(),
            program_implementation_id = containerPnl.down('hiddenfield[name=program_implementation_id]').getValue(),
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            dosageFormsStr = childObject.down('combo[name=dosage_form_id]').getStore(),
            samplingSitesStore = childObject.down('combo[name=sampling_site_id]').getStore(),
            
            packagingUnitsStore = childObject.down('combo[name=packaging_unit_id]').getStore(),
            filters = {
                section_id: section_id
            };
        if (!program_id) {
            toastr.warning('Save program details first!!', 'Warning Response');
            return;
        }
        
        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            childObject.down('combo[name=product_form_id]').setHidden(false);
        } else if (section_id == 4 || section_id === 4) {//medical devices
            childObject.down('combo[name=device_type_id]').setHidden(false);
        } else {
            childObject.down('combo[name=dosage_form_id]').setHidden(false);
        }
        //sampling_site_id
        filters = JSON.stringify(filters);
        dosageFormsStr.removeAll();
        dosageFormsStr.load({params: {filters: filters}});
        samplingSitesStore.removeAll();
        samplingSitesStore.load({params: {filters: filters}});
       
        packagingUnitsStore.removeAll();
        packagingUnitsStore.load({params: {filters: filters}});
        childObject.down('hiddenfield[name=program_id]').setValue(program_id);
        childObject.down('hiddenfield[name=program_implementation_id]').setValue(program_implementation_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showEditPmsProgramPlanWinFrm: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            grid = btn.up('grid'),
            containerPnl = grid.up('pmsprogramcontainer'),
            mainTabPnl = containerPnl.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length,
            dosageFormsStr = childObject.down('combo[name=dosage_form_id]').getStore(),
            samplingSitesStore = childObject.down('combo[name=sampling_site_id]').getStore(),
            packagingUnitsStore = childObject.down('combo[name=packaging_unit_id]').getStore(),
            filters = {
                section_id: section_id
            };
        filters = JSON.stringify(filters);
        dosageFormsStr.removeAll();
        dosageFormsStr.load({params: {filters: filters}});
        samplingSitesStore.removeAll();
        samplingSitesStore.load({params: {filters: filters}});
        packagingUnitsStore.removeAll();
        packagingUnitsStore.load({params: {filters: filters}});
        childObject.loadRecord(record);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
     //   section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
         if (section_id == 4 || section_id === 4) {//medical devices
            childObject.down('combo[name=device_type_id]').setHidden(false);
        } else {
            childObject.down('combo[name=dosage_form_id]').setHidden(false);
        }
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    onViewSurveillanceApplication: function (view, record) {
        var is_locked = record.get('is_locked');
        if (is_locked == 1 || is_locked === 1) {
            toastr.warning('This application is locked and cannot be accessed from here, use In-Tray to access the application!!', 'Warning Response');
            return false;
        }
        this.fireEvent('viewApplicationDetails', record);
    },
    generateProductInformationReport:function(item){
          var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            sample_id = record.get('sample_id');
        var action_url = 'reports/printProductInformationReport?application_id=' + sample_id;
            print_report(action_url);
    },
    showEditSampleWindow: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            grid = btn.up('grid'),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            storeID = item.storeID,
            winWidth = item.winWidth,
            isReadOnly = item.isReadOnly;
            if(grid.up('#contentPanel')){
                var mainTabPnl = grid.up('#contentPanel'),
                activeTab = mainTabPnl.getActiveTab();
            }else{
                var planProgramForm = Ext.ComponentQuery.query("#applicationpmsplandetailsfrmRefID")[0],
                    wizard = planProgramForm.up('panel'),
                    activeTab = wizard.up('panel');
            }
            
            var section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            
            pms_program_id = activeTab.down('hiddenfield[name=program_id]').getValue(),
            childObject = Ext.widget(childXtype),
            sampleDetailsFrm = childObject.down('form'),
            
            productsStr = childObject.down('#pmsprogramplan').down('combo[name=product_id]').getStore(),
            pmsprogramplan = childObject.down('#pmsprogramplan'); 

           
        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            sampleDetailsFrm.down('combo[name=product_form_id]').setHidden(false);
            sampleDetailsFrm.down('textfield[name=common_name]').setHidden(false);
        } else if (section_id == 4 || section_id === 4) {//medical devices
            sampleDetailsFrm.down('combo[name=device_type_id]').setHidden(false);
        } else {
            sampleDetailsFrm.down('combo[name=dosage_form_id]').setHidden(false);
            //childObject.items.getAt(1).tab.setHidden(false);
        }
        
        pmsprogramplan.loadRecord(record);
        childObject.down('#sampledetailsfrm').loadRecord(record);
        childObject.down('#sampledetailsfrm').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        childObject.down('pmssampleingredientsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        childObject.down('button[action=save_form_data]').storeID = storeID;
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        if (isReadOnly == 1) {
            childObject.down('button[action=save_form_data]').setVisible(false);
        }
        productsStr.removeAll();
        productsStr.load({params: {program_id: pms_program_id}});
        //
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showPmsApplicationMoreDetailsOnDblClick: function (view, record) {
        Ext.getBody().mask('Please wait...');
        var ref_no = record.get('reference_no'),
            application_id = record.get('id'),
            applicant_id = record.get('applicant_id'),
            premise_id = record.get('premise_id'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            isReadOnly = view.grid.appDetailsReadOnly;
           view.grid.up('panel').up('panel').getViewModel().set('isReadOnly', false);
        if (sub_module_id == 37 || sub_module_id === 37) {
            this.fireEvent('pmsApplicationMoreDetailsUnstructured', application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly);
        } else {
            this.fireEvent('pmsApplicationMoreDetails', application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly);
        }
    },

    showPmsApplicationMoreDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            ref_no = record.get('reference_no'),
            application_id = record.get('id'),
            applicant_id = record.get('applicant_id'),
            premise_id = record.get('premise_id'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            isReadOnly = item.appDetailsReadOnly;
        if (sub_module_id == 37 || sub_module_id === 37) {
            this.fireEvent('pmsApplicationMoreDetailsUnstructured', application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly);
        } else {
            this.fireEvent('pmsApplicationMoreDetails', application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly);
        }
        //this.fireEvent('pmsApplicationMoreDetails', application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly);
    },

    //More details
    //Structured
    onPrevCardClickMoreDetails: function (btn) {
        var wizardPnl = btn.up('pmsappmoredetailswizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateMoreDetails(btn, wizardPnl, 'prev');
    },

    onNextCardClickMoreDetails: function (btn) {
        var wizardPnl = btn.up('pmsappmoredetailswizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateMoreDetails(btn, wizardPnl, 'next');
    },

    navigateMoreDetails: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'), //this.lookupReference('progress'),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;
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

        // beginning disables previous
        if (activeIndex === 0) {
            //wizardPanel.down('button[name=save_btn]').setDisabled(true);
            model.set('atBeginning', true);
        } else {
            //wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        }
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setDisabled(true);
        } else {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
        }
        if (activeIndex === 1) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },

    quickNavigationMoreDetails: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('pmsappmoredetailswizard'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            //wizardPnl.down('button[name=save_btn]').setDisabled(true);
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            // wizardPnl.down('button[name=save_btn]').setDisabled(false);
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setDisabled(true);
        } else {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
        }
        if (step == 2) {
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.getViewModel().set('atEnd', false);
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
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },
    //Non Structured
    onPrevCardClickMoreDetailsUnstructured: function (btn) {
        var wizardPnl = btn.up('pmsappmoredetailswizardunstructured');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateMoreDetailsUnstructured(btn, wizardPnl, 'prev');
    },

    onNextCardClickMoreDetailsUnstructured: function (btn) {
        var wizardPnl = btn.up('pmsappmoredetailswizardunstructured');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateMoreDetailsUnstructured(btn, wizardPnl, 'next');
    },

    navigateMoreDetailsUnstructured: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'), //this.lookupReference('progress'),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;
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

        // beginning disables previous
        if (activeIndex === 0) {
            //wizardPanel.down('button[name=save_btn]').setDisabled(true);
            model.set('atBeginning', true);
        } else {
            //wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        }
        if (activeIndex > 0) {
            wizardPanel.down('button[name=save_btn]').setDisabled(true);
        } else {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
        }
        if (activeIndex === 1) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },

    quickNavigationMoreDetailsUnstructured: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('pmsappmoredetailswizardunstructured'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            //wizardPnl.down('button[name=save_btn]').setDisabled(true);
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            // wizardPnl.down('button[name=save_btn]').setDisabled(false);
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step > 0) {
            wizardPnl.down('button[name=save_btn]').setDisabled(true);
        } else {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
        }
        if (step == 1) {
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.getViewModel().set('atEnd', false);
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
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },

    showPmsSampleProductInfoReview: function (view, record) {
        var me = this,
            grid = view.grid,
            decision_id = record.get('decision_id'),
            comments = record.get('results_comments'),
            sample_id = record.get('sample_id'),
            section_id = record.get('section_id'),
            program_id = record.get('program_id'),
            childXtype = grid.childXtype,
            winTitle = grid.winTitle,
            isReadOnly = grid.isReadOnly,
            winWidth = grid.winWidth,
            tabIndex = grid.tabIndex,
            childObject = Ext.widget(childXtype),
            parentTabPnl = childObject.down('pirtabpanel'),
            childTabPnl = childObject.down('pirsampledetailstabpanel'),
            sampleDetailsFrm = childObject.down('sampledetailsfrm');
            pmsprogramplanfrm = childObject.down('#pmsprogramplan');
         
        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            sampleDetailsFrm.down('combo[name=product_form_id]').setHidden(false);
            sampleDetailsFrm.down('textfield[name=common_name]').setHidden(false);
        } else if (section_id == 4 || section_id === 4) {//medical devices
            sampleDetailsFrm.down('combo[name=device_type_id]').setHidden(false);
        } else {
            sampleDetailsFrm.down('combo[name=dosage_form_id]').setHidden(false);
           // childTabPnl.items.getAt(1).tab.setHidden(false);
        }
        childObject.down('button[action=save_form_data]').storeID = grid.storeID;
        childObject.down('button[action=save_form_data]').setVisible(false);
        childObject.down('combo[name=decision_id]').setValue(decision_id);
        childObject.down('textfield[name=comments]').setValue(comments);
        
       // programproductsstr = childObject.down('combo[name=dataproduct_id]').getStore();
       // programproductsstr = childObject.down('combo[name=product_id]').getStore();
       // console.log(pmsprogramplanfrm.down('combo[name=dataproduct_id]'))
         //programproductsstr.load({params:{program_id:program_id} })
         
         childObject.down('button[action=link_pms_plan]').setDisabled(true);
        childObject.down('#sampledetailsfrm').loadRecord(record);
        childObject.down('#pmsprogramplan').loadRecord(record);
        
        childObject.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        childObject.down('hiddenfield[name=sample_id]').setValue(sample_id);
        parentTabPnl.items.getAt(tabIndex).tab.setHidden(false);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showPmsSampleLabRecommendation: function (item) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            sample_id = record.get('sample_id'),
            sample_application_code = record.get('sample_appcode'),
            sample_refNo = record.get('sample_refno'),
            childXtype = item.childXtype,
            winWidth = item.winWidth,
            analysis_type = item.analysis_type_id,
            mainTabPnl = grid.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=module_id]').setValue(module_id);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=sample_application_code]').setValue(sample_application_code);
        childObject.down('hiddenfield[name=sample_id]').setValue(sample_id);
        childObject.down('hiddenfield[name=analysis_type_id]').setValue(analysis_type);
        funcShowCustomizableWindow('Application Ref Number: ' + sample_refNo, winWidth, childObject, 'customizablewindow');
    },

    showPmsSampleRecommendationWin: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            sample_id = record.get('sample_id'),
            sample_application_code = record.get('sample_appcode'),
            recomm_id = record.get('recomm_id'),
            decision_id = record.get('decision_id'),
            limssample_id =record.get('limssample_id'),
            comments = record.get('results_comments'),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            storeID = item.storeID,
            analysis_type_id = item.analysis_type_id,
            decision_table = item.decision_table,
            childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=analysis_type_id]').setValue(analysis_type_id);
        childObject.down('hiddenfield[name=decision_table]').setValue(decision_table);
        childObject.down('button[name=save_btn]').storeID = storeID;
        childObject.down('hiddenfield[name=id]').setValue(recomm_id);
        childObject.down('hiddenfield[name=sample_id]').setValue(sample_id);
         childObject.down('hiddenfield[name=application_id]').setValue(sample_id);
         childObject.down('hiddenfield[name=limssample_id]').setValue(limssample_id);

        childObject.down('hiddenfield[name=sample_appcode]').setValue(sample_application_code);
        childObject.down('combo[name=decision_id]').setValue(decision_id);
        childObject.down('textfield[name=comments]').setValue(comments);
        childObject.setHeight(520);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showPmsSampleTCMeetingRecommendation: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            sample_id = record.get('sample_id'),
            recomm_id = record.get('tc_recomm_id'),
            decision_id = record.get('tcm_decision_id'),
            comments = record.get('tcm_comments'),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            storeID = item.storeID,
            analysis_type_id = item.analysis_type_id,
            decision_table = item.decision_table,
            childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=analysis_type_id]').setValue(analysis_type_id);
        childObject.down('hiddenfield[name=decision_table]').setValue(decision_table);
        childObject.down('button[name=save_btn]').storeID = storeID;
        childObject.down('hiddenfield[name=id]').setValue(recomm_id);
        childObject.down('hiddenfield[name=sample_id]').setValue(sample_id);
        childObject.down('combo[name=decision_id]').setValue(decision_id);
        childObject.down('textfield[name=comments]').setValue(comments);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    printPIRReport:function(btn){
         var panel = btn.up('panel'),
            sample_id = panel.down('hiddenfield[name=sample_id]').getValue();
        var action_url = 'reports/printProductInformationReport?application_id=' + sample_id;
            print_report(action_url);
    },
   
     
    
    savePIRRecommendation: function (btn) {
        btn.setLoading(true);
        var panel = btn.up('panel'),
            sample_id = panel.down('hiddenfield[name=sample_id]').getValue(),
            decision_id = panel.down('combo[name=decision_id]').getValue(),
            analysis_type_id = panel.down('hiddenfield[name=analysis_type_id]').getValue(),
            comments = panel.down('textfield[name=comments]').getValue(),
            storeID = btn.storeID,
            store = Ext.getStore(storeID);
        if (!decision_id) {
            btn.setLoading(false);
            toastr.warning('Please give PIR Recommendation to save!!', 'Warning Response');
            return false;
        }
        Ext.Ajax.request({
            url: 'surveillance/savePmsPIRRecommendation',
            params: {
                sample_id: sample_id,
                decision_id: decision_id,
                comments: comments,
                analysis_type_id: analysis_type_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                btn.setLoading(false);
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
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

    showAddSampleLabResultsWinFrm: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            win = btn.up('window'),
            sample_id = win.down('hiddenfield[name=sample_id]').getValue();
        childObject.down('hiddenfield[name=sample_id]').setValue(sample_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    onPrevCardClickCmn: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateCmn(btn, wizardPnl, 'prev');
    },

    onNextCardClickCmn: function (btn) {
        var wizardPnl = wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateCmn(btn, wizardPnl, 'next');
    },

    navigateCmn: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'),
            model = wizardPanel.getViewModel(),
            submodule = wizardPanel.submodule,
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;
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
        activeItem.focus();

        // beginning disables previous
        if (activeIndex === 0) {
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
        if ((submodule) && submodule == 37) {
            if (activeIndex === 2) {
                model.set('atEnd', true);
            } else {
                model.set('atEnd', false);
            }
        } else {
            if (activeIndex === 3) {
                model.set('atEnd', true);
            } else {
                model.set('atEnd', false);
            }
        }
    },

    quickNavigationCmn: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('panel'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items,
            submodule = wizardPnl.submodule;

        if (step == 0) {
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if ((submodule) && submodule == 37) {
            if (step == 2) {
                wizardPnl.getViewModel().set('atEnd', true);
            } else {
                wizardPnl.getViewModel().set('atEnd', false);
            }
        } else {
            if (step == 2) {
                wizardPnl.getViewModel().set('atEnd', true);
            } else {
                wizardPnl.getViewModel().set('atEnd', false);
            }
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
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },

    submit_sample_back: function (btn) {
        btn.setLoading(true);
        Ext.MessageBox.show({
            title: 'Reason',
            msg: 'Please provide a reason for submiting back this sample',
            width: 320,
            buttons: Ext.MessageBox.OKCANCEL,
            multiline: true,
            scope: this,
            animateTarget: btn,
            fn: function (btnr, text) {
                var reason = text;
                if (btnr === 'ok') {
                    var rec = btn.up('button'),
                        record = rec.getWidgetRecord(),
                        storeID = btn.storeID,
                        application_id = record.get('application_id'),
                        sample_id = record.get('id'),
                        sample_stage_id = btn.stage_id,
                        store = Ext.getStore(storeID);
                    Ext.getBody().mask('Resubmitting...');
                    Ext.Ajax.request({
                        url: 'surveillance/processReturnBackApplicationSubmission',
                        params: {
                            sample_id: sample_id,
                            application_id: application_id,
                            sample_stage_id: sample_stage_id,
                            reason:reason
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        },
                        success: function (response) {
                            btn.setLoading(false);
                            Ext.getBody().unmask();
                            var resp = Ext.JSON.decode(response.responseText),
                                message = resp.message,
                                success = resp.success;
                            if (success == true || success === true) {
                                toastr.success(message, 'Success Response');
                                store.load();
                            } else {
                                toastr.error(message, 'Failure Response');
                            }
                        },
                        failure: function (response) {
                            btn.setLoading(false);
                            Ext.getBody().unmask();
                            var resp = Ext.JSON.decode(response.responseText),
                                message = resp.message;
                            toastr.error(message, 'Failure Response');
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            btn.setLoading(false);
                            Ext.getBody().unmask();
                            toastr.error('Error: ' + errorThrown, 'Error Response');
                        }
                    });
                }else{
                     btn.setLoading(false);
                    toastr.success('Operation Terminated', 'Termination Response');
                }
            }
        });
    },
    addProgramImplementationDetails:function(btn){
        var winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = btn.childObject,
            childObject = Ext.widget(childObject),
            mainTabPnl = btn.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            program_id = activeTab.down('hiddenfield[name=id]').getValue();
            childObject.down('hiddenfield[name=program_id]').setValue(program_id);

        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    showProgramImplementationEdit:function(item){
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            childObject = item.childObject;
            childObject = Ext.widget(childObject)
            frm = childObject.getForm();
            
            frm.loadRecord(record);
            
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    showProgramImplementationPlans:function(item){
        var childObject = item.childObject,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
              childObjectTitle = item.childObjectTitle,
            mainTabPnl = btn.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            pmsprogramimplpanel = activeTab.down('#pmsprogramimplpanel'),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

            pmsprogramimplpanel.removeAll();
            pmsprogramimplpanel.add({xtype:childObject,title:childObjectTitle});

            pmsprogramimplpanel.down('displayfield[name=program_implementation]').setValue(record.get('program_implementation'));
            pmsprogramimplpanel.down('hiddenfield[name=program_implementation_id]').setValue(record.get('id'));
            pmsprogramimplpanel.down('displayfield[name=implementation_timeline]').setValue(record.get('implementationstart_date')+' -'+record.get('implementationend_date'));
            pmsprogramimplpanel.down('displayfield[name=program]').setValue(record.get('program_name'));

            
            var plansGrid = pmsprogramimplpanel.down('pmsprogramplansgrid'),
            dosageFormCol = plansGrid.getColumnManager().getHeaderByDataIndex('dosage_form'),
            productFormCol = plansGrid.getColumnManager().getHeaderByDataIndex('product_form'),
            deviceTypeCol = plansGrid.getColumnManager().getHeaderByDataIndex('device_type');

        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            if (productFormCol) {
                productFormCol.setHidden(false);
            }
        } else if (section_id == 4 || section_id === 4) {//medical devices
            if (deviceTypeCol) {
                deviceTypeCol.setHidden(false);
            }
        } else {
            if (dosageFormCol) {
                dosageFormCol.setHidden(false);
            }
        }
        
    },funcBacktoProgramImplementationList:function(btn){
        var mainTabPnl = btn.up('#contentPanel'),
            childObject = btn.childObject,
            activeTab = mainTabPnl.getActiveTab(),
            pmsprogramimplpanel = activeTab.down('#pmsprogramimplpanel');

            pmsprogramimplpanel.removeAll();
            pmsprogramimplpanel.add({xtype:childObject});
    },funcPreviewProgramImplDetails:function(btn){
        var winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = btn.childObject;
            childObject = Ext.widget(childObject);
            
            funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');

    },
    showAddConfigParamWinFrm: function (btn) {
            var me = this,
                childXtype = btn.childXtype,
                winTitle=btn.winTitle,
                winWidth=btn.winWidth,
                child = Ext.widget(childXtype);

            funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
           
        }, 
   showAddPremiseParamWinFrm: function (btn) {
            var me = this,
                grid = btn.up('grid'),
                section_id = grid.down('hiddenfield[name=section_id]').getValue(),
                childXtype = btn.childXtype,
                winTitle=btn.winTitle,
                winWidth=btn.winWidth,
                child = Ext.widget(childXtype);
            child.down('hiddenfield[name=section_id]').setValue(section_id);
            funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
           
        }, 
    doSaveNewPmsPremise: function (btn) {
        var form = btn.up('form'),
            frm = form.getForm(),
            store = Ext.getStore(btn.store),
            win = form.up('window');
        if (frm.isValid()) {
            frm.submit({
                url: "premiseregistration/savePremiseRegCommonData",
                waitMsg: 'Please wait...',
                params: {table_name: 'tra_premises'},
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
    loadSelectedPCollectionSite: function(view, record) {
        var form = Ext.ComponentQuery.query("#samplecollectionsitefrmId")[0],
            grid = Ext.ComponentQuery.query("#pmscollectionsiteselectiongridId")[0],
            win = grid.up('window');
        form.loadRecord(record);
        win.close();

    },
    
});