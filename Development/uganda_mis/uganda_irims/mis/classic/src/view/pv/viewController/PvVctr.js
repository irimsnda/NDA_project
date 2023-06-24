Ext.define('Admin.view.pv.viewcontrollers.PvVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pvvctr',

    /**
     * Called when the view is created
     */
   
	// 
    setGridStore: function (obj, options) {
        this.fireEvent('setGridStore', obj, options);
    },
    setDynamicTreeGridStore: function (obj, options) {
        this.fireEvent('setDynamicTreeGridStore', obj, options);
    },
    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    setCompStore: function (obj, options) {
        this.fireEvent('setCompStore', obj, options);
    },
    showNewPv: function (btn) {
        var application_type = btn.app_type,
            me = this;
            me.fireEvent('onNewPvApplication', application_type, btn, 0);
    },
	showAddConfigParamWinFrm: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype);

        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
       
    },
    onViewMirApplication: function (grid, record) {
        this.fireEvent('viewApplicationDetails', record);

    },
    funcActiveOtherPvInformationTab: function (tab) {

        this.fireEvent('funcActiveOtherPvInformationTab', tab);

    },
    showPreviousNonGridPanelUploadedDocs: function (item) {
        this.fireEvent('showPreviousNonGridPanelUploadedDocs', item);
    },
    onNextCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },
    onPrevCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
            
        motherPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');

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
            activeItem = layout.getActiveItem();
            activeIndex = wizardPanel.items.indexOf(activeItem);
            if(direction == 'next'){
                activeIndex++;
            }else{
                activeIndex--;
            }
            
            if(activeIndex > 1 && direction == 'next'){
                if(application_id){
                    //fgdg
                }else{
                    toastr.warning('Please save patient details first!!', 'Warning Response');
                    return false;
                }
            }
            layout[direction]();
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
                wizardPanel.down('button[name=save_btn]').setDisabled(false);
                model.set('atBeginning', true);
            } else {
                wizardPanel.down('button[name=save_btn]').setDisabled(true);
                model.set('atBeginning', false);
            }

            // wizardPanel.down('button[name=save_btn]').setVisible(true);

            if (activeIndex === 4) {
                model.set('atEnd', true);
                wizardPanel.down('button[name=save_btn]').setDisabled(true);
                
            }else{
                model.set('atEnd', false);
            }
       
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
            motherPnl.getViewModel().set('atEnd', true);
            // wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
            // motherPnl.getViewModel().set('atEnd', true);

        }
        else {
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
    savePvReceivingBaseDetails: function(btn){
        var wizard = btn.wizardpnl,
            wizardPnl = btn.up(wizard),
            action_url = btn.action_url,
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            process_id = containerPnl.down('hiddenfield[name=process_id]').getValue(),
            // prodclass_category_id = containerPnl.down('hiddenfield[name=prodclass_category_id]').getValue(),
            // assessment_procedure_id = containerPnl.down('combo[name=assessment_procedure_id]').getValue(),
            // assessmentprocedure_type_id = containerPnl.down('combo[name=assessmentprocedure_type_id]').getValue(),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            // branch_id = containerPnl.down('combo[name=branch_id]').getValue(),
            workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            active_application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
            checkapplication_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),

            applicantDetailsForm = containerPnl.down('productapplicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            DetailsForm = containerPnl.down('#DetailsFrm'),
            DetailsFrm = DetailsForm.getForm();

        if (!applicant_id) {
            toastr.warning('Please select Reporter!!', 'Warning Response');
            return false;
        }

        if (DetailsFrm.isValid()) {
            DetailsFrm.submit({
                url: 'pv/'+action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    active_application_id: active_application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    '_token': token
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
                        pv_id = resp.pv_id,
                        ref_no = resp.ref_no;
                        tracking_no = resp.tracking_no;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        if(containerPnl.down('hiddenfield[name=pv_id]')){
                            containerPnl.down('hiddenfield[name=pv_id]').setValue(pv_id);
                        }
                        if (checkapplication_id == '') {
                            containerPnl.down('hiddenfield[name=active_application_id]').setValue(active_application_id);
                            containerPnl.down('hiddenfield[name=active_application_code]').setValue(active_application_code);
                            
                            containerPnl.down('displayfield[name=reference_no]').setValue(ref_no);
                            containerPnl.down('displayfield[name=tracking_no]').setValue(tracking_no);
                            containerPnl.down('hiddenfield[name=pv_id]').setValue(pv_id);
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result;
                   
                        message = resp.message;
                        console.log(message);
                    toastr.error(message, "Failure Response");
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
        }
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
    showUploadEvaluationDocuments: function (item) {
        this.fireEvent('showUploadEvaluationDocuments', item);
    },
    showApplicationMoreDetails: function (btn) {
        this.fireEvent('showApplicationMoreDetails', btn);
    },
    showSelectedApplicationMoreDetails: function(btn) {
        // showApplicationMoreDetails
         var button = btn.up('button'),
            grid = button.up('grid'),
            container = grid.up('panel'),
            record = button.getWidgetRecord(),
            application_code = record.get('application_code'),
            pv_id = record.get('pv_id');
        container.down('hiddenfield[name=active_application_code]').setValue(application_code);
        container.down('hiddenfield[name=pv_id]').setValue(pv_id);
        this.fireEvent('showApplicationMoreDetails', btn);
    },
    showApplicationUploadedDocument: function(btn) {
        // showApplicationMoreDetails
         this.fireEvent('showPreviousUploadedDocs', btn);
    },
     onFindingsNextCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
        wizardPnl.getViewModel().set('atBeginning', false);
        this.Findingsnavigate(btn, wizardPnl, 'next');
    },
    onFindingsPrevCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
        wizardPnl.getViewModel().set('atEnd', false);
        this.Findingsnavigate(btn, wizardPnl, 'prev');

    },

    Findingsnavigate: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            application_id = wizardPanel.down('hiddenfield[name=id]').getValue(),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
            activeItem = layout.getActiveItem();
            activeIndex = wizardPanel.items.indexOf(activeItem);
            if(direction == 'next'){
                activeIndex++;
            }else{
                activeIndex--;
            }
            
            if(activeIndex > 0 && direction == 'next'){
                if(application_id){
                    //fgdg
                }else{
                    toastr.warning('Please save patient details first!!', 'Warning Response');
                    return false;
                }
            }
            layout[direction]();
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
                model.set('atBeginning', true);
            } else {
                model.set('atBeginning', false);
            }

            // wizardPanel.down('button[name=save_btn]').setVisible(true);

            if (activeIndex === 2) {
                model.set('atEnd', true);
                
            }else{
                model.set('atEnd', false);
            }
       
    },
    quickFindingsNavigation: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            application_id = wizardPnl.down('hiddenfield[name=id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;

        if (step > 0) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save patient details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            wizardPnl.getViewModel().set('atBeginning', true);
        }
        else if (step === 2) {
            wizardPnl.getViewModel().set('atEnd', true);
        }
        else {
            wizardPnl.getViewModel().set('atEnd', false);
            wizardPnl.getViewModel().set('atBeginning', false);
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
    viewApplicationRecommendationLogs:function(btn) {
        this.fireEvent('viewApplicationRecommendationLogs', btn);
    },
    reloadParentGridOnChange: function (combo) {
        var grid = combo.up('grid'),
            store = grid.getStore();
        store.load();
    },
    showEditPvWinFrm: function (item) {
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
    showAddPvWinFrm: function (btn) {
        var me = this,
            mainTabPnl = Ext.ComponentQuery.query("#contentPanel")[0],
            activeTab = mainTabPnl.getActiveTab(),
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            pv_id = activeTab.down('hiddenfield[name=pv_id]').getValue(),
            adr_type = activeTab.down('combo[name=adr_type_id]'),
            is_other_drugs_used = btn.up('grid').is_other_drugs_used;//1 when called from other drug used grid

        if(is_other_drugs_used){
            child.down('hiddenfield[name=is_other_drugs_used]').setValue(is_other_drugs_used);
        }
       //pass parameters
       if(child.down('hiddenfield[name=application_code]')){
            child.down('hiddenfield[name=application_code]').setValue(application_code);
       }
       if(child.down('hiddenfield[name=pv_id]')){
            child.down('hiddenfield[name=pv_id]').setValue(pv_id);
       }
       if(child.down('combo[name=adr_type_id]') && adr_type ) {
            child.down('combo[name=adr_type_id]').setValue(adr_type.getValue());
       }
       
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
       
    },
    doCreatePvWin: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form_xtype = btn.up('form'),
            win = form_xtype.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID);

        //for variations calls add flag
        var is_variation = form_xtype.is_variation
        var frm = form_xtype.getForm();
            
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {
                    table_name: table,
                    is_variation: is_variation,
                    _token: token
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
                        
                        if(form_xtype.xtype == 'pvSuspectedDrugFrm'){
                            callerTab = Ext.ComponentQuery.query("#pvDetailsPnlId")[0];
                            if(callerTab){
                                grid = callerTab.getActiveTab();
                                if(grid.getStore()){
                                    grid.getStore().reload();
                                }
                            }
                        }
                        else{
                            store.removeAll();
                            store.load();
                        }
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
    },
    funcActiveOtherPvInformationTab: function ( tabPanel, newCard, oldCard, eOpts )  {
        this.fireEvent('funcActiveOtherPvInformationTab', tabPanel);
    },
    notifyReporter: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            final_recommendation = record.get('final_recommendation'),
            response_id = record.get('response_id'),
            response = record.get('response'),
            subject = record.get('subject'),
            form = Ext.widget(item.childXtype),
            store = btn.up('grid').getStore();

        //form reponse 
        if(response){
            responseFld = form.down('htmleditor[name=response]');
            responseFld.setValue(response);
            responseFld.setReadOnly(true);

            subjectfld = form.down('textfield[name=subject]');
            subjectfld.setValue(subject);
            subjectfld.setReadOnly(true);

            form.down('hiddenfield[name=id]').setValue(response_id);
            form.down('button[action=send]').text = 'Already Shared';
            form.down('button[action=send]').handler = '';
            form.down('button[action=send]').ui = 'gray';
        }else{
            form.down('htmleditor[name=response]').setValue(final_recommendation);
        }
        form.down('hiddenfield[name=application_code]').setValue(application_code);

        funcShowCustomizableWindow('Notification to Reporter', '60%', form, 'customizablewindow', item);
    }, 
    publishReport: function(item){
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            store = btn.up('grid').getStore();

         Ext.MessageBox.confirm('Confirm', 'Are you sure the report is ready for publishing ?', function (btn) {
            if (btn === 'yes') {
                Ext.getBody().mask('Publishing Report...');
                Ext.Ajax.request({
                    url: 'pv/publishReport',
                    params: {
                        application_code: application_code,
                        _token: token
                    },
                    headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'Accept': 'application/json'
                        },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText);
                        toastr.success(resp.message, 'Success Response');
                        store.removeAll();
                        store.load();
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            } else {
                toastr.warning('Operation has been cancelled', 'Cancelled');
            }
        });
    },
    showRecommendationWin:function(btn) {
        var button = btn.up('button'),
            grid = button.up('grid'),
            form = Ext.widget('recommendationfrm'),
            frm = form.getForm(),
            record = button.getWidgetRecord(),
            application_code = record.get('application_code'),
            stage_category_id = record.get('stage_category_id'),
            module_id = record.get('module_id');
      
        form.loadRecord(record);
        form.down('hiddenfield[name=application_code]').setValue(application_code);
        form.down('hiddenfield[name=stage_category_id]').setValue(stage_category_id);
        form.down('hiddenfield[name=module_id]').setValue(module_id);
        
        funcShowCustomizableWindow('Recommendation Form', '50%', form, 'customizablewindow', btn);
        
    },
    exportADR: function(btn){
        var grid = btn.up('grid'),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            store = grid.getStore(),
            selected= [];
        
        if (!sm.hasSelection()) {
            toastr.warning('Please select at least one report!!', 'Warning Response');
            return false;
        }
        else{
            Ext.each(selected_records, function (item) {
                selected.push(item.data.application_code);
            });
            var url = 'pv/exportAdrReport?selected=' + encodeURIComponent(JSON.stringify(selected));
            print_report(url);
        }
        
    },
    showExcelImportFrm: function(btn){
        this.fireEvent('showExcelImportFrm', btn);
    }

});