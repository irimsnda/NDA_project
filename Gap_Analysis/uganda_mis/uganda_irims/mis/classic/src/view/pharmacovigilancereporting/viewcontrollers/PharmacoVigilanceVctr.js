/**
 * Created by Kip on 1/15/2019.
 */
Ext.define('Admin.view.clinicaltrial.viewcontrollers.PharmacoVigilanceVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacovigilancevctr',

    /**
     * Called when the view is created
     */
    init: function () {

    },
    funcUploadTCMeetingtechnicalDocuments:function(btn){
        
        this.fireEvent('funcUploadTCMeetingtechnicalDocuments', btn);
        
    },
    setClinicalTrialGridsStore: function (obj, options) {
        this.fireEvent('setClinicalTrialGridsStore', obj, options);
    },

    setClinicalTrialCombosStore: function (obj, options) {
        this.fireEvent('setClinicalTrialCombosStore', obj, options);
    },

    setPremiseRegGridsStore: function (obj, options) {
        this.fireEvent('setPremiseRegGridsStore', obj, options);
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

    showClinicalTrialApplicationWorkflow: function (btn) {
        var application_type = btn.app_type,
            wrapper_xtype = btn.wrapper_xtype;
        this.fireEvent('showApplicationWorkflow', application_type, wrapper_xtype);
    },setCommonGridsStore: function (obj, options) {
        this.fireEvent('setCommonGridsStore', obj, options);
    },


    showNewClinicalTrialApplication: function (btn) {
        var application_type = btn.app_type,
            wrapper_xtype = btn.wrapper_xtype;
        this.fireEvent('newClinicalTrial', application_type, wrapper_xtype);
    },
    showAddApplicationalertObservations: function (btn) {
        var form = Ext.widget('safetyalertreportsobservationsfrm'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            application_code = grid.down('hiddenfield[name=application_code]').getValue();
     
        form.down('hiddenfield[name=application_code]').setValue(application_code);
        
        form.setHeight(height);
        
        funcShowCustomizableWindow("Add New Safet Alert Observation & Recommendation", "80%", form, 'customizablewindow');
    },

    showAddClinicalTrialParamWinFrm: function (btn) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
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
    showRegistererdProductSelectionList: function (btn) {
	
        var grid = Ext.widget('pmsregisteredproductsdetailsgrid'),
		            form=btn.up('form');
        
        funcShowCustomizableWindowWithObject('Registered Product Selection List', '90%', grid, 'customizablewindow',form);
    }, 
	
    doCreateClinicalTrialParamWin: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            storeID = btn.storeID,
            frm = form.getForm(),
            store;
        if (storeID) {
            store = Ext.getStore(storeID);
        }
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
                        if (storeID) {
                            store.removeAll();
                            store.load();
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

    doDeleteClinicalTrialWidgetParam: function (item) {
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

    reloadParentGridOnChange: function (combo) {
        var grid = combo.up('grid'),
            store = grid.getStore();
        store.load();
    },

    onViewClinicalTrialApplication: function (view, record) {
        this.fireEvent('viewApplicationDetails', record);
    },

    //More details wizard starts
    onPrevCardClickMoreDetails: function (btn) {
        var wizard = btn.wizard;
        wizardPnl = btn.up(wizard);
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateMoreDetails(btn, wizardPnl, 'prev');
    },

    onNextCardClickMoreDetails: function (btn) {
        var wizard = btn.wizard;
             wizardPnl = btn.up(wizard);
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateMoreDetails(btn, wizardPnl, 'next');
    },

    navigateMoreDetails: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            max_step = button.max_step,
            progress = wizardPanel.down('#progress_tbar'),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        if (activeIndex === 0) {
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
            
        if (activeIndex === 1) {
            model.set('atDetails', true);
        } else {
            model.set('atDetails', false);
        }
        if (activeIndex === 4) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }

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
    },
    showPreviousNonGridPanelUploadedDocs: function (item) {
        this.fireEvent('showPreviousNonGridPanelUploadedDocs', item);
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
        
        child.down('hiddenfield[name=code_ref_no]').setValue(reference_no);
        
        child.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        
    },showAddConfigParamWinFrm: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype);

        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
       
    },   onViewpharmacovigilanceReportingApplication: function (view, record) {
        this.fireEvent('viewApplicationDetails', record);
    },
    quickNavigationMoreDetails: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            max_step = btn.max_step,
            wizardPnl = btn.up(wizard),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step > 0) {
           // wizardPnl.down('button[name=save_btn]').setDisabled(true);
        } else {
           // wizardPnl.down('button[name=save_btn]').setDisabled(false);
        }
        if (step == 1) {
            wizardPnl.getViewModel().set('atDetails', true);
        } else {
            wizardPnl.getViewModel().set('atDetails', false);
        }
        if (step == max_step) {
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
    //ctr registry detai
    onPrevCardClickCtrRegDetails: function (btn) {
        var wizardPnl = btn.up('editclinicaltrialregistrywizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateOnlineCtrRegDetails(btn, wizardPnl, 'prev');
    },
    onNextCardClickCtrRegDetails: function (btn) {
        var wizardPnl = btn.up('editclinicaltrialregistrywizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateOnlineCtrRegDetails(btn, wizardPnl, 'next');
    },
    //end more details wizard
    onPrevCardClickCtrRegOnlineDetails: function (btn) {
        var wizardPnl = btn.up('clinicaltrialonlineregistrypreviewwizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateOnlineCtrRegDetails(btn, wizardPnl, 'prev');
    },
    onNextCardClickCtrRegOnlineDetails: function (btn) {
        var wizardPnl = btn.up('clinicaltrialonlineregistrypreviewwizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateOnlineCtrRegDetails(btn, wizardPnl, 'next');
    },
    navigateOnlineCtrRegDetails: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        if (activeIndex === 0) {
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
        if (activeIndex === 1) {
            model.set('atDetails', true);
        } else {
            model.set('atDetails', false);
        }
        if (activeIndex === 12) {
           
            model.set('atEnd', true);
        } else {
           
            model.set('atEnd', false);
        }

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

        if(activeIndex == 1){
            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(true);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);
            
        }
        else if(activeIndex == 2){
            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(true);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }
        else if(activeIndex == 3){

            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(true);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }
        else if(activeIndex == 5){

            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(true);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }else if(activeIndex == 9){

            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(true);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }else if(activeIndex == 10){
            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(true);

        }
        else{
            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }
        
        activeItem.focus();
    },
   
    //Online preview details wizard starts
    onPrevCardClickOnlineDetails: function (btn) {
        var wizardPnl = btn.up('clinicaltrialonlinepreviewwizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateOnlineDetails(btn, wizardPnl, 'prev');
    },

    onNextCardClickOnlineDetails: function (btn) {
        var wizardPnl = btn.up('clinicaltrialonlineregistrypreviewwizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateOnlineDetails(btn, wizardPnl, 'next');
    },

    navigateOnlineDetails: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        if (activeIndex === 0) {
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
        if (activeIndex === 1) {
            model.set('atDetails', true);
        } else {
            model.set('atDetails', false);
        }
        if (activeIndex === 6) {
            wizardPanel.down('button[name=print_invoice]').setVisible(true);
            wizardPanel.down('button[name=receive_invoicebtn]').setVisible(true);
           
            model.set('atEnd', true);
        } else {
            wizardPanel.down('button[name=print_invoice]').setVisible(false);
            wizardPanel.down('button[name=receive_invoicebtn]').setVisible(false);
           
            model.set('atEnd', false);
        }

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
    },
    //the details 
    onPrevCardClickProgressRptOnlineDetails: function (btn) {
        var wizardPnl = btn.up('clinicaltrialprogressrptonlinepreviewwizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateOnlineDetails(btn, wizardPnl, 'prev');
    },

    onNextCardClickProgressRptOnlineDetails: function (btn) {
        var wizardPnl = btn.up('clinicaltrialprogressrptonlinepreviewwizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateProgressRptOnlineDetails(btn, wizardPnl, 'next');
    },

    navigateProgressRptOnlineDetails: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        if (activeIndex === 0) {
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
        if (activeIndex === 1) {
            model.set('atDetails', true);
        } else {
            model.set('atDetails', false);
        }
        if (activeIndex === 3) {
            
            
            model.set('atEnd', true);
        } else {
           
            
            model.set('atEnd', false);
        }

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
    },
    quickNavCtrRegistryDetails: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('editclinicaltrialregistrywizard'),
            progress = wizardPnl.down('#progress_tbar'),
            wizardPanel = wizardPnl,
            progressItems = progress.items.items;
        if (step == 0) {
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step == 12) {
           
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
        if(step == 1){
            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(true);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);
        }
        else if(step == 2){
            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(true);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }
        else if(step == 3){

            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(true);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }
        else if(step == 5){

            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(true);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }else if(step == 9){

            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(true);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }else if(step == 10){
            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(true);

        }
        else{
            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }
        activeItem.focus();
    },
    quickNavCtrRegistryOnlineDetails: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('clinicaltrialonlineregistrypreviewwizard'),
            wizardPanel = wizardPnl,
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step == 12) {
           
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
        if(step == 1){
            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(true);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);
        }
        else if(step == 2){
            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(true);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }
        else if(step == 3){

            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(true);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }
        else if(step == 5){

            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(true);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }else if(step == 9){

            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(true);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }else if(step == 10){
            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(true);

        }
        else{
            wizardPanel.down('button[name=save_clinicalregdetails]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalseconaryids]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalstudyDesign]').setVisible(false);
            wizardPanel.down('button[name=save_clinicaleligibilitycriteria]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalfundingsource]').setVisible(false);
            wizardPanel.down('button[name=save_clinicalcollaborators]').setVisible(false);

        }
        activeItem.focus();
    },
    quickNavigationOnlineDetails: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('clinicaltrialonlinepreviewwizard'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step == 6) {
            
            wizardPnl.down('button[name=print_invoice]').setVisible(true);
            wizardPnl.down('button[name=receive_invoicebtn]').setVisible(true);
           
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            
            wizardPnl.down('button[name=print_invoice]').setVisible(false);
            wizardPnl.down('button[name=receive_invoicebtn]').setVisible(false);
           
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
    }, quickNavigationProgressRptOnlineDetails: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('clinicaltrialprogressrptonlinepreviewwizard'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step == 3) {
            
           
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
    //end online preview details wizard
    addApplicationStudySitestr: function (btn) {
        var form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm(),
            storeID = btn.storeID,
            store = Ext.getStore(storeID);
        if (frm.isValid()) {
            frm.submit({
                url: 'clinicaltrial/addClinicalStudySite',
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
    onStudySiteDbClick: function (view, record) {
        var me = this,
            site_id = record.get('id'),
            grid = view.grid,
            win = grid.up('window'),
            application_id = grid.down('hiddenfield[name=application_id]').getValue(),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        Ext.Ajax.request({
            url: 'clinicaltrial/addClinicalStudySite',
            waitMsg: 'Please wait...',
            params: {
                application_id: application_id,
                site_id: site_id
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
                    Ext.getStore('clinicaltrialstudysitesstr').load();
                    win.close();
                    toastr.success(message, "Success Response");
                } else {
                    toastr.error(message, "Failure Response");
                }
            },
            failure: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                toastr.error(message, "Failure Response");
            }
        });
    },
    
    addApplicationOtherInvestigator: function (btn) {
        var form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm(),
            storeID = btn.storeID,
            store = Ext.getStore(storeID);
        if (frm.isValid()) {
            frm.submit({
                url: 'clinicaltrial/addApplicationOtherInvestigators',
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
    saveImpProductDetails: function (btn) {
        var win = btn.up('window'),
            form = win.down('form'),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: 'clinicaltrial/saveClinicalTrialCommonData',
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (frm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message,
                        record_id = response.record_id;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        form.down('hiddenfield[name=id]').setValue(record_id);
                        Ext.getStore('impproductsstr').load();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        } else {
            toastr.warning('Please fill all required fields!!', 'Warning Response');
        }
    },showPreviousNonGridPanelUploadedDocs: function (item) {
        this.fireEvent('showPreviousNonGridPanelUploadedDocs', item);
    },showSampleAnalysisrequestswin: function (btn) {
  
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            isWin = btn.isWin,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
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
        
        child.down('hiddenfield[name=code_ref_no]').setValue(reference_no);
        
        child.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        
    },
    editClinicalStudySiteDetails:function(item){
        var btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            childObject = Ext.widget(item.childXtype),
            winTitle = item.winTitle,
            winWidth = item.winWidth;
            childObject.loadRecord(record);
            funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },editwAddApplicationalertObservations:function(item){
        var btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            childObject = Ext.widget(item.childXtype),
            winTitle = item.winTitle,
            winWidth = item.winWidth;
            childObject.loadRecord(record);
            funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    showImpProductDetails: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            childObject = Ext.widget(item.childXtype),
            form = childObject.down('form'),
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            mainTabPnl = grid.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            dosageFormsStr = childObject.down('combo[name=dosage_form_id]').getStore(),
            commonNamesStr = childObject.down('combo[name=common_name_id]').getStore(),
            manufacturersStr = childObject.down('combo[name=manufacturer_id]').getStore(),
            filters = {
                section_id: section_id
            };
        filters = JSON.stringify(filters);
        dosageFormsStr.removeAll();
        dosageFormsStr.load({params: {filters: filters}});
        commonNamesStr.removeAll();
        commonNamesStr.load({params: {filters: filters}});
        manufacturersStr.removeAll();
        manufacturersStr.load({params: {section_id: section_id}});
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showImpProductDetailsFromWin: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            isReadOnly = item.isReadOnly,
            childObject = Ext.widget(item.childXtype),
            form = childObject.down('form'),
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            win = grid.up('window'),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            dosageFormsStr = childObject.down('combo[name=dosage_form_id]').getStore(),
            commonNamesStr = childObject.down('combo[name=common_name_id]').getStore(),
            manufacturersStr = childObject.down('combo[name=manufacturer_id]').getStore(),
            filters = {
                section_id: section_id
            };
        filters = JSON.stringify(filters);
        dosageFormsStr.removeAll();
        dosageFormsStr.load({params: {filters: filters}});
        commonNamesStr.removeAll();
        commonNamesStr.load({params: {filters: filters}});
        manufacturersStr.removeAll();
        manufacturersStr.load({params: {section_id: section_id}});
        form.loadRecord(record);

        childObject.down('form').getViewModel().set('isReadOnly', isReadOnly);
        
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showAddExternalAssessor: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            application_id = record.get('id'),
            ref_no = record.get('reference_no'),
            childObject = Ext.widget('externalassessorfrm'),
            mask = new Ext.LoadMask({
                target: grid,
                msg: 'Please wait...'
            });
        mask.show();
        childObject.down('hiddenfield[name=application_id]').setValue(application_id);
        Ext.Ajax.request({
            method: 'GET',
            url: 'clinicaltrial/getExternalAssessorDetails',
            params: {
                application_id: application_id
            },
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
                    if (results) {
                        var model = Ext.create('Ext.data.Model', results);
                        childObject.loadRecord(model);
                    }
                    funcShowCustomizableWindow(ref_no + ' External Assessor', '40%', childObject, 'customizablewindow')
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

    showAddTcMeetingParticipants: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            pnl = grid.up('panel'),//('newclinicaltrialmanagermeetingpanel'),
            mainTabPnl = pnl.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            meeting_id = activeTab.down('form').down('hiddenfield[name=id]').getValue(),
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
    
    showGCPInspectionDetailsWizard: function (view, record) {
        Ext.getBody().mask('Please wait...');
        var ref_no = record.get('reference_no'),
        app_inspection_id = record.get('inspection_id'),
        application_id = record.get('id'),
            applicant_id = record.get('applicant_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            isReadOnly = view.grid.appDetailsReadOnly,
            is_temporal = view.grid.is_temporal;
        this.fireEvent('showGCPInspectionDetailsWizard', application_id,'gcpinspectionprocesswizard', app_inspection_id,application_code, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal);
    },
    showGCPApprovlInspectionDetailsWizard: function (view, record) {
        Ext.getBody().mask('Please wait...');
        var ref_no = record.get('reference_no'),
        app_inspection_id = record.get('inspection_id'),
        application_id = record.get('id'),
            applicant_id = record.get('applicant_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            isReadOnly = view.grid.appDetailsReadOnly,
            is_temporal = view.grid.is_temporal;
        this.fireEvent('showGCPInspectionDetailsWizard', application_id,'gcpapprovalinspectionprocesswizard', app_inspection_id,application_code, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal);
    },
    
    getApplicationApprovalDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            is_update = item.is_update,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            table_name = item.table_name, 
            approvalfrm = item.approvalfrm,
            form =  approvalfrm,// Ext.widget('clinicaltrialapprovalrecommfrm'),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
            if(form == ''){
                form = 'clinicaltrialapprovalrecommfrm';
            }
            form = Ext.widget(form);
        form.setController('clinicaltrialvctr');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        if (is_update > 0) {
            form.down('combo[name=decision_id]').setReadOnly(true);
            form.down('datefield[name=approval_date]').setReadOnly(true);
            form.down('datefield[name=expiry_date]').setReadOnly(true);
            form.down('textarea[name=comment]').setReadOnly(true);
            form.down('button[name=save_recommendation]').setText('Update Recommendation');
        }
        form.down('hiddenfield[name=table_name]').setValue(table_name);
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
                    funcShowCustomizableWindow('Recommendation', '40%', form, 'customizablewindow');
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

    showTcMeetingDetails: function (item) {
        var childObject = Ext.widget('tcmeetingdetailspnl'),
            form = childObject.down('form'),
            participantsGrid = childObject.down('grid'),
            btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: grid
            });
        participantsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        form.getForm().getFields().each(function (field) {
            field.setReadOnly(true);
        });
        mask.show();
        Ext.Ajax.request({
            method: 'GET',
            url: 'clinicaltrial/getTcMeetingDetails',
            waitMsg: 'Please wait...',
            params: {
                application_code: application_code
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    results = resp.results;
                if (success == true || success === true) {
                    if (results) {
                        var model = Ext.create('Ext.data.Model', results);
                        form.loadRecord(model);
                    }
                    funcShowCustomizableWindow('TC Meeting', '50%', childObject, 'customizablewindow');
                } else {
                    toastr.error(message, "Failure Response");
                }
            },
            failure: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                toastr.error(message, "Failure Response");
            }
        });
    },

    showAddClinicalSiteFromWin: function (btn) {
        var winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype),
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=application_id]').getValue();
        childObject.down('hiddenfield[name=application_id]').setValue(application_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showAddClinicalTrialOtherInvestigatorFromWin: function (btn) {
        var grid = btn.up('grid'),
            personnel_type = btn.personnel_type,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype),
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=application_id]').getValue();
        childObject.down('hiddenfield[name=application_id]').setValue(application_id);
        childObject.down('hiddenfield[name=personnel_type]').setValue(personnel_type);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showAddImpProductFromWin: function (btn) {
        var winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype),
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=application_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            dosageFormsStr = childObject.down('combo[name=dosage_form_id]').getStore(),
            commonNamesStr = childObject.down('combo[name=common_name_id]').getStore(),
            manufacturersStr = childObject.down('combo[name=manufacturer_id]').getStore(),
            filters = {
                section_id: section_id
            };
        filters = JSON.stringify(filters);
        dosageFormsStr.removeAll();
        dosageFormsStr.load({params: {filters: filters}});
        commonNamesStr.removeAll();
        commonNamesStr.load({params: {filters: filters}});
        manufacturersStr.removeAll();
        manufacturersStr.load({params: {section_id: section_id}});
        childObject.down('hiddenfield[name=application_id]').setValue(application_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    
    showSafetyAlertApplicationMoreDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            ref_no = record.get('reference_no'),
            application_id = record.get('id'),
            applicant_id = record.get('applicant_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            isReadOnly = item.appDetailsReadOnly;
        this.fireEvent('showSafetyAlertApplicationMoreDetails', application_id, application_code, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly);
        
    },showClinicalTrialRegistryMoreDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            ref_no = record.get('reference_no'),
            application_id = record.get('id'),
            applicant_id = record.get('applicant_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            isReadOnly = item.appDetailsReadOnly;
        this.fireEvent('showClinicalTrialRegistryMoreDetails', item);
    },
    
    previewClinicalApplicationMoreDetails:function(btn){
        this.fireEvent('previewClinicalApplicationMoreDetails',btn);

    },
    previewClinicalTrialApplicationOnGridDetails:function(btn){
        this.fireEvent('previewClinicalTrialApplicationOnGridDetails',btn);

    },
    
    compareClinicalTrialApplicationDetails: function (item) {
        var comparePanel = Ext.widget('clinicaltrialcomparepanel'),
            portalPanel = comparePanel.down('clinicaltrialportalcomparepreviewpnl'),
            portalWizard = portalPanel.down('panel[name=wizardPanel]'),
            misPanel = comparePanel.down('clinicaltrialmiscomparepreviewpnl'),
            misWizard = misPanel.down('panel[name=wizardPanel]'),
            portalStudySitesGrid = portalPanel.down('onlineclinicaltrialstudysitesgrid'),
            misStudySitesGrid = misPanel.down('clinicaltrialstudysiteswingrid'),
            portalInvestigatorsGrid = portalPanel.down('onlineclinicaltrialotherinvestigatorsgrid'),
            misInvestigatorsGrid = misPanel.down('clinicaltrialotherinvestigatorswingrid'),
            portalImpProductsGrid = portalPanel.down('onlineimpproductsgrid'),
            misImpProductsGrid = misPanel.down('impproductswingrid'),
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            portal_application_id = record.get('portal_id'),
            mis_application_id = record.get('id'),
            application_code = record.get('application_code'),
            ref_no = record.get('reference_no');
        portalStudySitesGrid.setIsCompare(1);
        misStudySitesGrid.setIsCompare(1);
        portalInvestigatorsGrid.setIsCompare(1);
        misInvestigatorsGrid.setIsCompare(1);
        portalImpProductsGrid.setIsCompare(1);
        misImpProductsGrid.setIsCompare(1);
        portalPanel.down('hiddenfield[name=application_id]').setValue(portal_application_id);
        portalPanel.down('hiddenfield[name=application_code]').setValue(application_code);
        portalPanel.down('hiddenfield[name=active_application_id]').setValue(portal_application_id);
        portalPanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
        misPanel.down('hiddenfield[name=application_id]').setValue(mis_application_id);
        misPanel.down('hiddenfield[name=application_code]').setValue(application_code);
        portalPanel.down('applicantdetailsfrm').down('button[action=link_applicant]').setDisabled(true);
        misPanel.down('applicantdetailsfrm').down('button[action=link_applicant]').setDisabled(true);
        /*portalPersonnelDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        misPersonnelDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        misBusinessDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);*/
        portalWizard.down('button[step=' + (portalWizard.items.length - 1) + ']').setHidden(true);
        portalWizard.down('*[name=navigation-toolbar]').setHidden(true);
        misWizard.down('*[name=navigation-toolbar]').setHidden(true);
        Ext.each(portalPanel.query('field'), function (field) {
            field.setReadOnly(true);
        });
        Ext.each(misPanel.query('field'), function (field) {
            field.setReadOnly(true);
        });
        funcShowCustomizableWindow(ref_no + ' Compare Details', '95%', comparePanel, 'customizablewindow');
    },

    acceptPortalAmendedDetails: function (button) {
        Ext.MessageBox.confirm('Confirm', 'This will override MIS details with PORTAL details, Continue?', function (btn) {
            if (btn === 'yes') {
                alert('changes effected');
            }
        });
    },

    showApplicationQueries: function (item) {
        this.fireEvent('showApplicationQueries', item);
    },

    showApplicationChecklists: function (item) {
        this.fireEvent('showApplicationChecklists', item);
    },

    previewOnlineApplication: function (view, record) {
        this.fireEvent('previewOnlineClincialTrialApplication', view, record);
        
    },

    receiveOnlineApplicationDetails: function (item) {
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
    },

    queryOnlineApplication: function (item) {
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
    },

    queryOnlineApplicationFrmBtn: function (btn) {
        var win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
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
        funcShowCustomizableWindow(tracking_no + ' - Queries', '55%', queriesGrid, 'customizablewindow');
    },

    submitRejectedOnlineApplication: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            action_url = 'submitRejectedOnlineApplication',
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            table_name = 'wb_gmp_applications';
        grid.fireEvent('submitApplication', application_id, application_code, action_url, table_name);
    },

    submitRejectedOnlineApplicationFrmBtn: function (btn) {
        var action_url = 'submitRejectedOnlineApplication',
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            table_name = 'wb_premises_applications';
        btn.fireEvent('submitApplication', application_id, application_code, action_url, table_name);
    },

    showPreviousUploadedDocs: function (item) {
        this.fireEvent('showPreviousUploadedDocs', item);
    },

    showApplicationComments: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            application_id = record.get('active_application_id');
        this.fireEvent('showApplicationCommentsWin', item, application_id, application_code);
    },

    printClinicalTrialCertificate: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code');
        this.fireEvent('generateClinicalCertificate', application_id, application_code);
    },
    printColumnClinicalTrialCertificate:function(item){
        var record = item.getWidgetRecord(),
        application_id = record.get('active_application_id'),
        application_code = record.get('application_code');
        this.fireEvent('generateClinicalCertificate', application_id, application_code);
    },
   
    showAddClinicalTrialUnstructuredQueriesWin: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            reference_no = containerPnl.down('displayfield[name=reference_no]').getValue(),
            tracking_no = containerPnl.down('displayfield[name=tracking_no]').getValue(),
            app_status_id = containerPnl.down('hiddenfield[name=application_status_id]').getValue(),
            respCol = child.getColumnManager().getHeaderByDataIndex('last_response'),
            managerQryCol = child.getColumnManager().getHeaderByDataIndex('manager_query_comment'),
            managerQryRespCol = child.getColumnManager().getHeaderByDataIndex('manager_queryresp_comment');
        if (app_status_id == 8 || app_status_id === 8) {//manager raise query
            //child.down('hiddenfield[name=is_manager_query]').setValue(1);
            if (managerQryCol) {
                managerQryCol.setHidden(false);
            }
        }
        if (app_status_id == 13 || app_status_id === 13) {//manager query response
            //child.down('hiddenfield[name=is_manager_query_response]').setValue(1);
            if (managerQryRespCol) {
                managerQryRespCol.setHidden(false);
            }
            if (respCol) {
                respCol.setHidden(false);
            }
        }
        child.setHeight(600);
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        child.down('hiddenfield[name=application_code]').setValue(application_code);
        child.down('hiddenfield[name=section_id]').setValue(section_id);
        child.down('hiddenfield[name=module_id]').setValue(module_id);
        child.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        child.down('displayfield[name=tracking_no]').setValue(tracking_no);
        child.down('displayfield[name=reference_no]').setValue(reference_no);
    },
    doSaveInspectionDetails: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            storeID = btn.storeId,
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
                            //close the window
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
    saveSafetyAlertReportsObservations: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            storeID = btn.storeId,
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
                            //close the window
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
    onPrevInspectionCardClickMoreDetails: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateINspectionMoreDetails(btn, wizardPnl, 'prev');
    },

    onNextInspectionCardClickMoreDetails: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateINspectionMoreDetails(btn, wizardPnl, 'next');
    },

    navigateINspectionMoreDetails: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
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
            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();

        // beginning disables previous
        if (activeIndex === 0) {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
            model.set('atBeginning', true);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
            model.set('atBeginning', false);
        }
        if (activeIndex === 2) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },
    quickInspectionNavigationMoreDetails: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('panel'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
            wizardPnl.getViewModel().set('atBeginning', false);
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
    printMeetingDetails: function(btn) {
        var grid = btn.up('grid'),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            workflow_stage_id,
            check = 1;
            selected = [];
        if (!sm.hasSelection()) {
            toastr.warning('No record selected. Please select a record(s) to to export!!', 'Warning Response');
            return;
        }
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to export the saved Meeting Application Details?', function (btn) {
            if (btn === 'yes') {
     
                Ext.each(selected_records, function (item) {
                    if(item.data.meeting_id){
                      selected.push({'meeting_id':item.data.meeting_id, 'application_code':item.data.application_code});  
                      workflow_stage_id = item.data.workflow_stage_id;
                  }else{
                       check = 0;
                       return false;
                  }
                });
                if(check){
                     url = "clinicaltrial/printApplicationMeetingDetails?selected="+encodeURIComponent(JSON.stringify(selected))+"&workflow_stage_id="+workflow_stage_id;
                    
                     print_report(url);
                
            }else{
                toastr.warning('Some selections havent been saved', 'Warning Response');
                 Ext.getBody().unmask();
            }
        }
        });
    },
     showDataCleanUpWindow: function(btn) {
        var container = Ext.ComponentQuery.query("#contentPanel")[0],
             activeTab = container.getActiveTab(), 
             wrapper = activeTab.down(btn.wrapper_xtype),
             child = Ext.widget(btn.childXtype);
        wrapper.removeAll();
        wrapper.add(child);
    },
    showClinicalRegDataCleanUpWindow: function(btn) {
        var container = Ext.ComponentQuery.query("#contentPanel")[0],
             activeTab = container.getActiveTab(), 
             wrapper = activeTab.down(btn.wrapper_xtype),
             child = Ext.widget(btn.childXtype);
             child.down('clinicaltrialregistrydetailsfrm').down('hiddenfield[name=isReadOnly]').setValue(0);
        wrapper.removeAll();
        wrapper.add(child);
    },
    loadClinicalTrialEditApp: function (view, record) {
        Ext.getBody().mask('Please wait...');
        var grid = Ext.ComponentQuery.query("#allclinicaltrialappgridId")[0],
            caller = grid.down('hiddenfield[name=gridCaller]').getValue();

        var me = this,
            activeTab = Ext.ComponentQuery.query("#"+caller)[0],
            application_status_id = record.get('application_status_id'),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            detailsFrm = activeTab.down('clinicaltrialdetailsfrm'),
            sponsorFrm = activeTab.down('clinicaltrialsponsorfrm'),
            investigatorFrm = activeTab.down('clinicaltrialinvestigatorfrm'),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            application_id = record.get('active_application_id]'),
            process_id = record.get('process_id]'),
            workflow_stage_id = record.get('workflow_stage_id]'),
            sub_module_id = record.get('sub_module_id]'),
            zone_fld = activeTab.down('combo[name=zone_id]');
      //set
        activeTab.down('hiddenfield[name=process_id]').setValue(record.get('process_id'));
        activeTab.down('hiddenfield[name=workflow_stage_id]').setValue(record.get('workflow_stage_id'));
        activeTab.down('hiddenfield[name=active_application_id]').setValue(record.get('active_application_id'));
        activeTab.down('hiddenfield[name=active_application_code]').setValue(record.get('application_code'));
        activeTab.down('hiddenfield[name=application_status_id]').setValue(record.get('application_status_id'));
        activeTab.down('hiddenfield[name=module_id]').setValue(record.get('module_id'));
        activeTab.down('hiddenfield[name=sub_module_id]').setValue(record.get('sub_module_id'));
        activeTab.down('hiddenfield[name=section_id]').setValue(record.get('section_id'));
        activeTab.down('textfield[name=reference_no]').setValue(record.get('reference_no'));
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (record.get('active_application_id')) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'clinicaltrial/prepareNewClinicalTrialReceivingStage',
                params: {
                    application_id: record.get('active_application_id')
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
                        sponsorDetails = resp.sponsorDetails,
                        investigatorDetails = resp.investigatorDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            zone_fld.setValue(results.zone_id);
                            applicantFrm.loadRecord(model);
                            detailsFrm.loadRecord(model);
                        }
                        if (sponsorDetails) {
                            var model2 = Ext.create('Ext.data.Model', sponsorDetails);
                            sponsorFrm.loadRecord(model2);
                        }
                        if (investigatorDetails) {
                            var model3 = Ext.create('Ext.data.Model', investigatorDetails);
                            investigatorFrm.loadRecord(model3);
                        }
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
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }

        var grid = Ext.ComponentQuery.query("#allclinicaltrialappgridId")[0],
            win = grid.up('window');
         win.close();

    },
    loadClinicalTrialRegistryEditApp: function (grid, record) {
       
        this.fireEvent('loadClinicalTrialRegistryEditApp', grid, record);
    },
  showApplicationsSelectionList: function(btn) {
       var grid = Ext.widget(btn.childXtype),
           winTitle = btn.winTitle,
           winWidth = btn.winWidth;
        if(grid.down('hiddenfield[name=gridCaller]')){
           grid.down('hiddenfield[name=gridCaller]').setValue(btn.origin);
        }
       funcShowCustomizableWindow(winTitle, winWidth, grid, 'customizablewindow');
    },
  saveEditAppBaseDetails: function (btn) {
        var me = this,
            toaster = 1,
            //activeTab = Ext.ComponentQuery.query("#editclinicaltrialreceivingId")[0],
            mainTabPnl = btn.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            zone_fld = activeTab.down('combo[name=zone_id]'),
            zone_id = zone_fld.getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            sponsorForm = activeTab.down('clinicaltrialsponsorfrm'),
            detailsForm = activeTab.down('clinicaltrialdetailsfrm'),
            detailsFrm = detailsForm.getForm(),
            sponsor_id = sponsorForm.down('hiddenfield[name=id]').getValue(),
            investigatorForm = activeTab.down('clinicaltrialinvestigatorfrm'),
            investigator_id = investigatorForm.down('hiddenfield[name=id]').getValue();
        if (!zone_id) {
            toastr.warning('Please select zone!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        Ext.getBody().mask('Please wait...');
        
        if (detailsFrm.isValid()) {
            detailsFrm.submit({
                url: 'clinicaltrial/saveEditAppBaseDetails',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                params: {
                    sponsor_id: sponsor_id,
                    investigator_id: investigator_id,
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    zone_id: zone_id
                },
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    
                    Ext.getBody().unmask();
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                            toastr.success(message, "Success Response");
                        
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
        
        /*
        Ext.Ajax.request({
            url: 'clinicaltrial/saveEditAppBaseDetails',
            waitMsg: 'Please wait...',
            params: {
                process_id: process_id,
                workflow_stage_id: workflow_stage_id,
                application_id: application_id,
                applicant_id: applicant_id,
                module_id: module_id,
                sub_module_id: sub_module_id,
                section_id: section_id,
                zone_id: zone_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    record_id = resp.record_id,
                    ref_no = resp.ref_no,
                    application_code = resp.application_code;
                if (success == true || success === true) {
                    if (toaster == 1 || toaster === 1) {
                        toastr.success(message, "Success Response");
                        zone_fld.setReadOnly(true);
                        activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                        activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                        activeTab.down('displayfield[name=reference_no]').setValue(ref_no);
                    }
                } else {
                    toastr.error(message, "Failure Response");
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                toastr.error(message, "Failure Response");
            }
        });
        */
    },
    loadAdhocQueryGrid: function(grid, newTab, oldTab, eopts){
        //loading params
            var panel = grid.up('panel'),
                wrapper = panel.up('panel');
            if(wrapper.down('hiddenfield[name=active_application_code]').getValue()){
                 grid.down('hiddenfield[name=application_id]').setValue(wrapper.down('hiddenfield[name=active_application_id]').getValue());
                 grid.down('hiddenfield[name=application_code]').setValue(wrapper.down('hiddenfield[name=active_application_code]').getValue());
                 grid.down('hiddenfield[name=module_id]').setValue(wrapper.down('hiddenfield[name=module_id]').getValue());
                 grid.down('hiddenfield[name=sub_module_id]').setValue(wrapper.down('hiddenfield[name=sub_module_id]').getValue());
                 grid.down('hiddenfield[name=section_id]').setValue(wrapper.down('hiddenfield[name=section_id]').getValue());
            }else{
                 var btn = panel.down('button[name=prev_btn]');
                 toastr.warning("Please select an application first", "No record selected");
                 btn.fireHandler();
            }
            

    }
});

