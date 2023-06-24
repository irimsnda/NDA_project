/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.premiseregistration.viewcontrollers.PremiseRegistrationVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.premiseregistrationvctr',

    /**
     * Called when the view is created
     */
    init: function () {

    },
    showAddTcMeetingParticipants: function (btn) {
        this.fireEvent('showAddTcMeetingParticipants', btn);
       
    }, showGeneralAppAppQueries:function(btn){
        this.fireEvent('showGeneralAppAppQueries', btn);

    },
    setPremiseRegGridsStore: function (obj, options) {
        this.fireEvent('setPremiseRegGridsStore', obj, options);
    },
    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },

    setPremiseRegCombosStore: function (obj, options) {
        this.fireEvent('setPremiseRegCombosStore', obj, options);
    },

    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
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
    },showPreviousNonGridPanelUploadedDocs: function (item) {
        this.fireEvent('showPreviousNonGridPanelUploadedDocs', item);
    },
    showUploadEvaluationDocuments: function (item) {
        this.fireEvent('showUploadEvaluationDocuments', item);
    },
    
    setConfigCombosStoreWithSectionFilter: function (obj, options) {
        this.fireEvent('setConfigCombosStoreWithSectionFilter', obj, options);
    },  saveSampleSubmissionRemarks:function(btn){

        this.fireEvent('saveSampleSubmissionRemarks', btn);
        

    },
    showEditGmpInspectionLineDetails: function (item) {
        var me = this,
            btn = item.up('button'),
            is_recommendation = item.is_recommendation,
            recommendation_type = item.recommendation_type,
            record = btn.getWidgetRecord(),
            grid = btn.up('grid'),
            mainTabPanel = grid.up('#contentPanel'),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            childXtype = item.childXtype,
            title = item.winTitle,
            winWidth = item.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length,
            productLineStr = childObject.down('combo[name=product_line_id]').getStore(),
            productLineCategoryStr = childObject.down('combo[name=category_id]').getStore();
        
        productLineStr.removeAll();
        productLineStr.load({params: {section_id: section_id}});
        productLineCategoryStr.removeAll();
        productLineCategoryStr.load({params: {section_id: section_id}});
       
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        console.log(record);
        childObject.loadRecord(record);
        funcShowCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },
    funcAddPremisesApplicationParamter:function(btn){
        var form = btn.up('form'),
            childXtype = btn.childXtype,
            section_id = btn.section_id,
            table_name = btn.table_name,
            childXtype = Ext.widget(childXtype);
            if(childXtype.down('hiddenfield[name=section_id]')){
                childXtype.down('hiddenfield[name=section_id]').setValue(section_id);
            }

            funcShowCustomizableWindow('Parameter', '55%', childXtype, 'customizablewindow');
            
    },setConfigCombosSectionfilterStore: function (obj, options) {

        this.fireEvent('setConfigCombosStoreWithSectionFilter', obj, options);
    },
    doCreateGmpApplicationParamWin: function (btn) {
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
    },doDeleteGmpApplicationWidgetParam: function (item) {
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

    exportMeetingDetails: function(btn) {
        var grid=btn.up('grid'),
            panel=grid.up('panel'),
            meetingfrm=panel.down('productMeetingDetailsFrm'),
            meeting_id=meetingfrm.down('hiddenfield[name=id]').getValue();
          Ext.getBody().mask('Exporting Please wait...');

        Ext.Ajax.request({
                    url: 'premiseregistration/ExportMeetingReport',
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
    
        
    }, funcUploadTCMeetingtechnicalDocuments:function(btn){
        
        this.fireEvent('funcUploadTCMeetingtechnicalDocuments', btn);
        
    }, funcActiveInspectionTabChanges: function (tab) {

        this.fireEvent('funcActiveInspectionTabChanges', tab);

    },
    funcUploadInspectionConceptDocuments:function(btn){
        
        this.fireEvent('funcUploadInspectionConceptDocuments', btn);
        
    },
    showTcRecommendation: function (item) {
        this.fireEvent('showTcRecommendationUploads', item);
    },
    doCreatePremiseRegParamWin: function (btn) {
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
                        if (storeID) {
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
    },  showAddProductUnstructuredQueriesWin: function (btn) {
  
        var me = this,
        childXtype = btn.childXtype,
        winTitle = btn.winTitle,
        winWidth = btn.winWidth,
        isWin = btn.isWin,
        child = Ext.widget(childXtype),
        mainTabPnl = btn.up('#contentPanel'),
        containerPnl = mainTabPnl.getActiveTab(),
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
    child.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
    
    child.down('displayfield[name=tracking_no]').setValue(tracking_no);
    child.down('displayfield[name=reference_no]').setValue(reference_no);


    },
    doSaveInspectionRecommendationDetails: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            mainTabPnl = btn.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            form = btn.up('form'),
            win = form.up('window'),
            tab_panel = activeTab.down('#preminspectionuploaddetailstab'),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            premise_id = activeTab.down('hiddenfield[name=premise_id]').getValue(),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {
                    model: table,
                    application_code:application_code,
                    premise_id:premise_id
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
                        tab_panel.setActiveItem(1);
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
    saveLegalityofStockprdRemarks: function (btn) {
        var me = this,
            url = btn.action_url,
            isCloseWin = btn.isCloseWin,
            form = btn.up('form'),
            win = form.up('window'),
            storeID = btn.storeID,
            application_id = win.down('hiddenfield[name=application_id]').getValue(),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {application_id: application_id},
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
                        if(storeID != ''){
                            store = Ext.getStore(storeID);
                            store.removeAll();
                            store.load();
                           
                        }
                        if(isCloseWin){
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

    
    showAddTraderPersonnelForm: function (btn) {
        var grid = btn.up('grid'),
            trader_id = grid.down('hiddenfield[name=trader_id]').getValue(),
            width = btn.winWidth,
            childObject = Ext.widget(btn.childXtype);

        childObject.down('hiddenfield[name=trader_id]').setValue(trader_id);
        //childObject.down('button[action=link_personnel]').setDisabled(true);
        funcShowCustomizableWindow('Premise Personnel', width, childObject, 'customizablewindow');
    },

    savePremisePersonnelBasicInfo: function (btn) {
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
                success: function (frm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message,
                        record_id = response.record_id;
                    if (success == true || success === true) {
                        form.down('hiddenfield[name=id]').setValue(record_id);
                        toastr.success(message, "Success Response");
                        store.load();
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },

    savePremisePersonnelLinkageDetails: function (btn) {
        var me = this,
            url = btn.action_url,
            form = btn.up('form'),
            win = form.up('window'),
            basicInfoFrm = win.down('form'),
            personnel_id = basicInfoFrm.down('hiddenfield[name=id]').getValue(),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                //params: {personnel_id: personnel_id},
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        store.load();
                        toastr.success(message, "Success Response");
                        win.close();
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

    reloadParentGridOnChange: function (combo) {
        var grid = combo.up('grid'),
            store = grid.getStore();
        store.load();
    },

    showPremiseRegWorkflow: function (btn) {
        var application_type = btn.app_type,
            wrapper_xtype = btn.wrapper_xtype;
        this.fireEvent('showApplicationWorkflow', application_type, wrapper_xtype);
    },

    showNewPremiseRegistration: function (btn) {
        var application_type = btn.app_type,
            wrapper_xtype = btn.wrapper_xtype;
        this.fireEvent('newPremiseRegistration', application_type, wrapper_xtype);
    },
    showNewPremiseInspectionSchedule: function (btn) {
        var application_type = btn.app_type,
            wrapper_xtype = btn.wrapper_xtype;
        this.fireEvent('showNewPremiseInspectionSchedule', application_type, wrapper_xtype);
    },
    
    //Receiving Wizard starts
    onPrevCardClick: function (btn) {
        var wizardPnl = btn.up('foodnewreceivingwizard'),
            motherPnl = wizardPnl.up('foodreceiving');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');
    },

    onNextCardClick: function (btn) {
        var wizardPnl = btn.up('foodnewreceivingwizard'),
            motherPnl = wizardPnl.up('foodreceiving');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },

    navigate: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            motherPnl = wizardPanel.up('foodreceiving'),
            //motherPnl = wizardPanel.up('panel'),
            application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
            model = motherPnl.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
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
            wizardPanel.down('button[name=save_btn]').setDisabled(true);
            model.set('atBeginning', true);
        } else {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        }
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
        }
        if (activeIndex === 3) {
            wizardPanel.down('button[name=save_screening_btn]').setVisible(true);
            model.set('atEnd', true);
        } else {
            wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            model.set('atEnd', false);
        }
    },

    quickNavigation: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('foodnewreceivingwizard'),
            motherPnl = wizardPnl.up('foodreceiving'),
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
        } else {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', false);
        }
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
        }
        if (step == 3) {
            wizardPnl.down('button[name=save_screening_btn]').setVisible(true);
            motherPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
            motherPnl.getViewModel().set('atEnd', false);
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
    //Receiving Wizard ends

    //Online Receiving Wizard starts
    //New,Renewal
    onPrevCardClickOnline: function (btn) {
        var wizardPnl = btn.up('panel[name=wizardPanel]'),//btn.up('newpremiseonlinepreviewwizard'),
            motherPnl = wizardPnl.up('panel[name=motherPanel]');//wizardPnl.up('newpremiseonlinepreviewpnl');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigateOnline(btn, wizardPnl, 'prev');
    },

    onNextCardClickOnline: function (btn) {
        var wizardPnl = btn.up('panel[name=wizardPanel]'),//btn.up('newpremiseonlinepreviewwizard'),
            motherPnl = wizardPnl.up('panel[name=motherPanel]');//wizardPnl.up('newpremiseonlinepreviewpnl');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigateOnline(btn, wizardPnl, 'next');
    },

    navigateOnline: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            motherPnl = wizardPanel.up('panel[name=motherPanel]'),//wizardPanel.up('newpremiseonlinepreviewpnl'),
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
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
        if (activeIndex === 3) {
            wizardPanel.down('button[name=save_screening_btn]').setDisabled(false);
                
            model.set('atEnd', true);
        } else {
            wizardPanel.down('button[name=save_screening_btn]').setDisabled(true);

            
            model.set('atEnd', false);
        }
    },

    quickNavigationOnline: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('panel[name=wizardPanel]'),//btn.up('newpremiseonlinepreviewwizard'),
            motherPnl = wizardPnl.up('panel[name=motherPanel]'),//wizardPnl.up('newpremiseonlinepreviewpnl'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            //wizardPnl.down('button[name=save_btn]').setDisabled(true);
            motherPnl.getViewModel().set('atBeginning', true);
        } else {
            //wizardPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', false);
        }
        if (step === 3) {
            wizardPnl.down('button[name=save_screening_btn]').setDisabled(false);
            
            motherPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.down('button[name=save_screening_btn]').setDisabled(true);
            motherPnl.getViewModel().set('atEnd', false);
                   
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
    //Withdrawal,Alteration
    onPrevCardClickOnlineCancelAlt: function (btn) {
        var wizardPnl = btn.up('panel[name=wizardPanel]'),
            motherPnl = wizardPnl.up('panel[name=motherPanel]');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigateOnlineCancelAlt(btn, wizardPnl, 'prev');
    },

    onNextCardClickOnlineCancelAlt: function (btn) {
        var wizardPnl = btn.up('panel[name=wizardPanel]'),
            motherPnl = wizardPnl.up('panel[name=motherPanel]');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigateOnlineCancelAlt(btn, wizardPnl, 'next');
    },

    navigateOnlineCancelAlt: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            motherPnl = wizardPanel.up('panel[name=motherPanel]'),
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
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
        if (activeIndex === 3) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },

    quickNavigationOnlineCancelAlt: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('panel[name=wizardPanel]'),
            motherPnl = wizardPnl.up('panel[name=motherPanel]'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            //wizardPnl.down('button[name=save_btn]').setDisabled(true);
            motherPnl.getViewModel().set('atBeginning', true);
        } else {
            //wizardPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', false);
        }
        if (step === 3) {
            motherPnl.getViewModel().set('atEnd', true);
        } else {
            motherPnl.getViewModel().set('atEnd', false);
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
    //Online Receiving Wizard ends

    //Approvals wizard starts
    quickNavigationApproval: function (btn) {
        var step = btn.step,
            panel = btn.up('panel'),
            progress = panel.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0 || step === 0) {
            panel.getViewModel().set('atBeginningApproval', true);
        } else {
            panel.getViewModel().set('atBeginningApproval', false);
        }
        if (step == 7 || step === 7) {
            panel.getViewModel().set('atEndApproval', true);
        } else {
            panel.getViewModel().set('atEndApproval', false);
        }
        panel.getLayout().setActiveItem(step);
        var layout = panel.getLayout(),
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

    onNextClickApproval: function (button) {
        //This is where you can handle any logic prior to moving to the next card
        var panel = button.up('panel');
        panel.getViewModel().set('atBeginningApproval', false);
        this.navigateApproval(button, panel, 'next');
    },

    onPreviousClickApproval: function (button) {
        var panel = button.up('panel');
        panel.getViewModel().set('atEndApproval', false);
        this.navigateApproval(button, panel, 'prev');
    },

    navigateApproval: function (button, panel, direction) {
        var layout = panel.getLayout(),
            progress = this.lookupReference('progress'),
            model = panel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;

        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = panel.items.indexOf(activeItem);

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
            model.set('atBeginningApproval', true);
        }

        // wizard is 6 steps. Disable next at end.
        if (activeIndex === 7) {
            model.set('atEndApproval', true);
        }
    },
    //Approval wizard ends
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
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
        if (activeIndex === 1) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },
    //Application more details Wizard starts
    onPrevCardClickMoreDetails: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateMoreDetails(btn, wizardPnl, 'prev');
    },

    onNextCardClickMoreDetails: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateMoreDetails(btn, wizardPnl, 'next');
    },

    navigateMoreDetails: function (button, wizardPanel, direction) {
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
            //wizardPanel.down('button[name=save_btn]').setDisabled(true);
            model.set('atBeginning', true);
        } else {
            //wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        }
        if (activeIndex === 1) {
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
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
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
    quickNavigationMoreDetails: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('panel'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            //wizardPnl.down('button[name=save_btn]').setDisabled(true);
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            //wizardPnl.down('button[name=save_btn]').setDisabled(false);
            wizardPnl.getViewModel().set('atBeginning', false);
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
    //Application more details Wizard ends

    //Alteration compare details Wizard starts
    onPrevCardClickCompareDetails: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateCompareDetails(btn, wizardPnl, 'prev');
    },

    onNextCardClickCompareDetails: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateCompareDetails(btn, wizardPnl, 'next');
    },

    navigateCompareDetails: function (button, wizardPanel, direction) {
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
            wizardPanel.down('button[name=save_btn]').setDisabled(true);
            model.set('atBeginning', true);
        } else {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        }
        if (activeIndex === 3) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },

    quickNavigationCompareDetails: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('panel'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            wizardPnl.down('button[name=save_btn]').setDisabled(true);
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
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
    //Alteration compare details Wizard ends

    showApplicantSelectionList: function (btn) {
        var childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    funcAddWinNewPremisesDetails: function (btn) {
        var childXtype = btn.childXtype,
            grid = btn.up('grid'),
            section_id = grid.down('hiddenfield[name=section_id]').getValue(),

            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype);
            childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    
    saveApplicationScreeningDetails: function (btn) {
        btn.setLoading(true);
        var wizardPnl = btn.up('foodnewreceivingwizard'),
            containerPnl = wizardPnl.up('foodreceiving'),
            application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
            screeningGrid = wizardPnl.down('foodpremscreeninggrid'),
            checklist_type = screeningGrid.down('combo[name=applicable_checklist]').getValue(),
            store = screeningGrid.getStore(),
            params = [];
        for (var i = 0; i < store.data.items.length; i++) {
            var record = store.data.items [i],
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
            url: 'premiseregistration/saveNewReceivingScreeningDetails',
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

    onViewPremiseApplication: function (view, record) {
        this.fireEvent('viewApplicationDetails', record);
    },

    onViewApprovalApplicationDetails: function (item) {
        var btn = item.up('button'),
            interfaceXtype = item.interfaceXtype,
            record = btn.getWidgetRecord();
        this.fireEvent('viewApplicationMoreDetails', record, interfaceXtype);
    },

    showAddPremiseRegParamWinFrm: function (btn) {
        // if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
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

    showEditPremiseRegParamWinFrm: function (item) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
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
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

    showEditPremiseOtherDetails: function (item) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            mainTabPnl = grid.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length,
            filter = "section_id:" + section_id,
            busTypesStr = form.down('combo[name=business_type_id]').getStore();
        if (sub_module_id == 2 || sub_module_id === 2) {
            if (!application_id) {
                toastr.warning('Please save application first!!', 'Warning Response');
                return false;
            }
        }
        busTypesStr.removeAll();
        busTypesStr.load({params: {filter: filter}});
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
    },

    showEditPremiseOtherDetailsWin: function (item) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            win = grid.up('window'),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            application_id = win.down('hiddenfield[name=application_id]').getValue(),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length,
            filter = "section_id:" + section_id,
            busTypesStr = form.down('combo[name=business_type_id]').getStore();
        if (sub_module_id == 2 || sub_module_id === 2) {
            if (!application_id) {
                toastr.warning('Please save application first!!', 'Warning Response');
                return false;
            }
        }
        busTypesStr.removeAll();
        busTypesStr.load({params: {filter: filter}});
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
    },

    showAddPremiseOtherDetailsWin: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            win = grid.up('window'),
            premise_id = win.down('hiddenfield[name=premise_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            application_id = win.down('hiddenfield[name=application_id]').getValue(),
            title = btn.winTitle,
            form = Ext.widget('premiseotherdetailsfrm'),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            filter = "section_id:" + section_id,
            busTypesStr = form.down('combo[name=business_type_id]').getStore();
        if (!application_id) {
            toastr.warning('Please save application first!!', 'Warning Response');
            return false;
        }
        form.down('hiddenfield[name=premise_id]').setValue(premise_id);
        busTypesStr.removeAll();
        busTypesStr.load({params: {filter: filter}});
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(title, '35%', form, 'customizablewindow');
    },

    doDeletePremiseRegWidgetParam: function (item) {
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

    doDeletePremiseOtherDetails: function (item) {
        //if (this.fireEvent('checkFullAccess')) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url,
            mainTabPnl = grid.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (sub_module_id == 2 || sub_module_id === 2) {
            if (!application_id) {
                toastr.warning('Please save application first!!', 'Warning Response');
                return false;
            }
        }
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
        /*  } else {
              toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
              return false;
          }*/
    },

    doDeletePremiseOtherDetailsWin: function (item) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            win = grid.up('window'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url,
            application_id = win.down('hiddenfield[name=application_id]').getValue();
            if(win.down('hiddenfield[name=sub_module_id]')){
                sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue();
                if (sub_module_id == 2 || sub_module_id === 2) {
                    if (!application_id) {
                        toastr.warning('Please save application first!!', 'Warning Response');
                        return false;
                    }
                }
            }
       
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
    },
    doDeleteNonAppPremiseOtherDetailsWin: function (item) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            win = grid.up('window'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
            
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
    },
	 doDeletePremiseInspectionOtherDetailsWin: function (item) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            win = grid.up('window'),
            record = btn.getWidgetRecord(),
            id = record.get('app_inspection_id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
            
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
    },
	

    previewUploadedDocument: function (item) {
        var btn = item.up('button'),
            download = item.download,
            record = btn.getWidgetRecord(),
            folder = record.get('server_folder'),
            initialName = record.get('initial_filename'),
            savedName = record.get('savedname'),
            url = 'premiseregistration/previewDoc?folder=' + folder + '&&initialname=' + initialName + '&&savedname=' + savedName + '&&download=' + download;
        if (download == 1 || download === 1) {
            download_report(url);
        } else {
            print_report(url);
        }
    },

    showApplicationQueriesWin: function (widgetColumn) {
        var record = widgetColumn.getWidgetRecord(),
            sourceGrid = widgetColumn.up('grid'),
            isReadOnly = sourceGrid.down('hiddenfield[name=isReadOnly]').getValue(),
            isAuditor = widgetColumn.isAuditor,
            grid = Ext.widget('applicationqueriesgrid'),
            checklist_item = record.get('name'),
            item_resp_id = record.get('item_resp_id'),
            pass_status = record.get('pass_status');
        if (record.dirty) {
            toastr.warning('Request rejected. There is unsaved information, make sure you save the changes by clicking on \'Save Screening Details\' before performing this action!!', 'Warning Response');
            return false;
        }
        if (!item_resp_id) {
            toastr.warning('Request rejected. No response captured yet!!', 'Warning Response');
            return false;
        }
        /* if (srsGrid.getStore().getModifiedRecords().length > 0) {
             toastr.warning('Request rejected. There is unsaved information, make sure you save the changes by clicking on \'Save Screening Details\' before performing this action!!', 'Warning Response');
             return false;
         }*/
        if (pass_status == 1 || pass_status === 1) {
            grid.down('button[name=add_query]').setVisible(false);
        }
        if (isAuditor == 1 || isAuditor === 1) {
            grid.down('button[name=add_query]').setVisible(false);
        }
        grid.down('hiddenfield[name=item_resp_id]').setValue(item_resp_id);
        grid.down('hiddenfield[name=pass_status]').setValue(pass_status);
        grid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        funcShowCustomizableWindow(checklist_item + ' - Queries', '85%', grid, 'customizablewindow');
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
            reload_base = btn.reload_base,
            action_url = btn.action_url,
            win = form.up('window'),
            store = win.down('grid').getStore(),
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
                        store.load();
                        me.backToApplicationQueriesGrid(btn);
                        if (reload_base == 1 || reload_base === 1) {
                            // Ext.getStore('foodpremscreeningstr').load();
                        }
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
    funcAddNewPremisesDetails: function (btn) {
        var me = this,
            form = btn.up('form'),
            storeId = btn.storeId,
            store = Ext.getStore(storeId);
            action_url = btn.action_url,
            win = form.up('window'),
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
                        store.load();
                        win.close();
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
    
    generateTempInvoiceData: function (btn) {
        var panel = btn.up('foodnewinvoicingpnl'),
            selection_grid = panel.down('invoicingcostelementsgrid'),
            summary_grid = panel.down('invoicingcostdetailsgrid'),
            summary_store = summary_grid.getStore(),
            sm = selection_grid.getSelectionModel(),
            records = sm.getSelection();
        if (!sm.hasSelection()) {
            toastr.warning('No cost elements selected. Please select at least one record!!', 'Warning Response');
            return;
        }
        summary_store.removeAll();
        summary_store.add(records);
    },

    addInvoiceCostElement: function (sel, record) {//deprecated
        var gridView = sel.view,
            panel = gridView.up('foodnewinvoicingpnl'),
            summary_grid = panel.down('invoicingcostdetailsgrid'),
            summary_store = summary_grid.getStore(),
            index = summary_store.indexOf(record);
        if (index < 0) {
            summary_store.add(record);
        }
    },

    clearTempInvoiceData: function (btn) {
        var panel = btn.up('foodnewinvoicingpnl'),
            selection_grid = panel.down('invoicingcostelementsgrid'),
            summary_grid = panel.down('invoicingcostdetailsgrid'),
            summary_store = summary_grid.getStore(),
            sm = selection_grid.getSelectionModel();
        sm.deselectAll();
        summary_store.removeAll();
    },

    showPremApplicationMoreDetailsOnDblClick: function (view, record) {
        Ext.getBody().mask('Please wait...');
        var ref_no = record.get('reference_no'),
            application_id = record.get('id'),
            application_code = record.get('application_code'),
            applicant_id = record.get('applicant_id'),
            premise_id = record.get('premise_id'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            isReadOnly = view.grid.appDetailsReadOnly,
            is_temporal = view.grid.is_temporal;
        this.fireEvent('applicationMoreDetails',application_code, application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal);
    },
    
    showPremisesInspectionDetailsWizard: function (view, record) {
        Ext.getBody().mask('Please wait...');
        var ref_no = record.get('reference_no'),
        app_inspection_id = record.get('app_inspection_id'),
        application_id = record.get('id'),
            applicant_id = record.get('applicant_id'),
            premise_id = record.get('premise_id'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            isReadOnly = view.grid.appDetailsReadOnly,
            is_temporal = view.grid.is_temporal;
        this.fireEvent('showPremisesInspectionDetailsWizard', application_id, app_inspection_id,premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal);
    },
    

    showPremApplicationMoreDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            ref_no = record.get('reference_no'),
            application_id = record.get('id'),
            application_code = record.get('application_code'),
            applicant_id = record.get('applicant_id'),
            premise_id = record.get('premise_id'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            isReadOnly = item.appDetailsReadOnly,
            is_temporal = item.is_temporal;
        this.fireEvent('applicationMoreDetails', application_code,application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal);
    },

    comparePremiseApplicationDetails: function (item) {
        var comparePanel = Ext.widget('premisecomparepanel'),
            portalPanel = comparePanel.down('premiseportalcomparepreviewpnl'),
            portalWizard = portalPanel.down('newpremiseonlinepreviewwizard'),
            misPanel = comparePanel.down('premisemiscomparepreviewpnl'),
            misWizard = misPanel.down('premiseappmoredetailswizard'),
            portalPersonnelDetailsGrid = portalPanel.down('premisepersonneldetailsgrid'),
            misPersonnelDetailsGrid = misPanel.down('premisepersonneldetailsgrid'),
            misBusinessDetailsGrid = misPanel.down('premiseotherdetailswingrid'),
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            portal_application_id = record.get('portal_id'),
            mis_application_id = record.get('id'),
            application_code = record.get('application_code'),
            ref_no = record.get('reference_no');
        portalPersonnelDetailsGrid.setIsWin(1);
        portalPersonnelDetailsGrid.setIsCompare(1);
        portalPersonnelDetailsGrid.setIsOnline(1);
        misPersonnelDetailsGrid.setIsWin(1);
        misPersonnelDetailsGrid.setIsCompare(1);
        portalPanel.down('hiddenfield[name=application_id]').setValue(portal_application_id);
        portalPanel.down('hiddenfield[name=application_code]').setValue(application_code);
        misPanel.down('hiddenfield[name=application_id]').setValue(mis_application_id);
        misPanel.down('hiddenfield[name=application_code]').setValue(application_code);
        portalPanel.down('applicantdetailsfrm').down('button[action=link_applicant]').setDisabled(true);
        misPanel.down('applicantdetailsfrm').down('button[action=link_applicant]').setDisabled(true);
        portalPersonnelDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        misPersonnelDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        misBusinessDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        portalWizard.down('button[step=2]').setHidden(true);
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

    showPreviousUploadedDocs: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            module_id = record.get('module_id'),
            application_code = record.get('application_code'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            static_stage = getPremiseRegModuleStaticStage(sub_module_id, section_id, item.target_stage);
        this.fireEvent('showPrevUploadedDocsWin', item, section_id, module_id, sub_module_id, static_stage, application_code);
    },

    showPreviousComments: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code');
        this.fireEvent('showApplicationCommentsWin', item, application_id, application_code);
    },

    showInspectionDetails: function (item) {
        var me = this,
            btn = item.up('button'),
            isReadOnly = item.isReadOnly,
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            childItem = Ext.widget(item.childXtype),
            form = childItem.down('form'),
            grid = childItem.down('grid');
        grid.setIsWin(1);
        grid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        form.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        
      
        if(form.down('button[name=btn_preminsprecommendation]')){
            form.down('button[name=btn_preminsprecommendation]').setDisabled(true);
        }
        form.setHeight(270);
        grid.setHeight(250);
        Ext.getBody().mask('Please wait...');
        Ext.Ajax.request({
            method: 'GET',
            url: 'premiseregistration/getInspectionDetails',
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
                    results = resp.results;
                if (success == true || success === true) {
                    if (results) {
                        var model = Ext.create('Ext.data.Model', results);
                        form.loadRecord(model);
                    }
                    funcShowCustomizableWindow(winTitle, winWidth, childItem, 'customizablewindow');
                    grid.getStore().load();
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

    saveEvaluationTemplate: function (btn) {
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
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                waitMsg: 'Please wait...',
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message,
                        record_id = response.record_id;
                    if (success == true || success === true) {
                        form.down('hiddenfield[name=id]').setValue(record_id);
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

    previewOnlineApplication: function (view, record) {
        var grid = view.grid,
            isRejection = grid.isRejection,
            isReadOnly = grid.isReadOnly,
            status_id = record.get('application_status_id'),
            status_type_id = record.get('status_type_id'),
            status_name = record.get('application_status'),
            tracking_no = record.get('tracking_no'),
            application_id = record.get('active_application_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            application_code = record.get('application_code'),
            application_status_id = record.get('application_status_id'),
            is_manager_query = record.get('is_manager_query'),
            onlinePanelXtype,
            wizardPnlXtype;
        if (sub_module_id == 3 || sub_module_id === 3) {//Alteration
            onlinePanelXtype = 'altpremiseonlinepreviewpnl';
            wizardPnlXtype = 'altpremiseonlinepreviewwizard'
        } else if (sub_module_id == 4 || sub_module_id === 4) {//Withdrawal
            onlinePanelXtype = 'cancelpremiseonlinepreviewpnl';
            wizardPnlXtype = 'cancelpremiseonlinepreviewwizard'
        } else if (sub_module_id == 2) {//New, Renewal
            onlinePanelXtype = 'renewalpremiseonlinepreviewpnl';
            wizardPnlXtype = 'renewalpremiseonlinepreviewwizard'
        }else {//New, Renewal
            onlinePanelXtype = 'newpremiseonlinepreviewpnl';
            wizardPnlXtype = 'newpremiseonlinepreviewwizard'
        }

        
        var onlinePanel = Ext.widget(onlinePanelXtype),
            wizardPnl = onlinePanel.down(wizardPnlXtype),
            docsGrid = onlinePanel.down('premregonlinedocuploadsgenericgrid'),
            premisePersonnelGrid = wizardPnl.down('premisepersonneldetailsgrid');
        if (status_id == 23 && isRejection != 1) {
            toastr.warning('Action not allowed for application in this status [' + status_name + '] ', 'Warning Response');
            return false;
        }
        if (isRejection == 1) {
            wizardPnl.down('button[name=prev_rejections]').setVisible(true);
            wizardPnl.down('button[name=actions]').setVisible(true);
            wizardPnl.down('button[name=submit_btn]').setVisible(false);
            wizardPnl.down('button[name=query_btn]').setVisible(false);
            wizardPnl.down('button[name=reject_btn]').setVisible(false);
        }
        /* if (is_manager_query == 1 || is_manager_query === 1) {
             wizardPnl.down('button[name=preview_queries_btn]').setVisible(true);
         }*/
        if (status_type_id == 2 || status_type_id === 2 || status_type_id == 3 || status_type_id === 3) {//pre checking and manager query response
            wizardPnl.down('button[name=preview_queries_btn]').setVisible(true);
        }
        docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
        docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
        docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
        onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
        onlinePanel.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
        onlinePanel.down('button[action=link_applicant]').setDisabled(true);
        onlinePanel.down('premisedetailsfrm').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        onlinePanel.down('hiddenfield[name=is_manager_query]').setValue(is_manager_query);
        onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
        premisePersonnelGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        premisePersonnelGrid.setIsWin(1);
        premisePersonnelGrid.setIsOnline(1);
        wizardPnl.down('premisecontactpersonfrm').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        funcShowCustomizableWindow(tracking_no, '80%', onlinePanel, 'customizablewindow');
    },

    onReceiveOnlineApplication: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord();
        this.fireEvent('viewOnlineApplicationDetails', record);
    },

    receiveOnlineApplicationDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var storeID = item.storeID,
            winWidth = item.winWidth,
            bttn = item.up('button'),
            record = bttn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            tracking_no = record.get('tracking_no'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            is_manager_query = record.get('is_manager_query'),
            status_type_id = record.get('status_type_id');
        showOnlineSubmissionWin(application_id, module_id, sub_module_id, section_id, 'onlinesubmissionsfrm', winWidth, storeID, tracking_no, status_type_id);
    },

    queryOnlineApplication: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            module_id = record.get('module_id'),
            tracking_no = record.get('tracking_no'),
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
        funcShowCustomizableWindow(tracking_no + ' - Queries', '55%', queriesGrid, 'customizablewindow');
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

    onAddOnlineQuery: function (btn) {
        var grid = btn.up('grid'),
            win = grid.up('window'),
            application_id = grid.down('hiddenfield[name=application_id]').getValue(),
            application_code = grid.down('hiddenfield[name=application_code]').getValue(),
            queriesFrm = Ext.widget('onlinequeriesfrm'),
            gridHeight = grid.getHeight();
        queriesFrm.down('hiddenfield[name=application_id]').setValue(application_id);
        queriesFrm.down('hiddenfield[name=application_code]').setValue(application_code);
        queriesFrm.setHeight(gridHeight);
        grid.hide();
        win.add(queriesFrm);
    },

    onEditOnlineQuery: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            win = grid.up('window'),
            queriesFrm = Ext.widget('onlinequeriesfrm'),
            gridHeight = grid.getHeight();
        queriesFrm.loadRecord(record);
        queriesFrm.setHeight(gridHeight);
        grid.hide();
        win.add(queriesFrm);
    },
    
    addIllegalProductsSTocks: function (btn) {
        var grid = btn.up('grid'),
            win = grid.up('window'),
            childXtype = btn.childXtype,
            application_id = grid.down('hiddenfield[name=application_id]').getValue(),
            childXtype = Ext.widget(childXtype);

            childXtype.down('hiddenfield[name=application_id]').setValue(application_id);
        
            childXtype.setHeight(450);
       
        funcShowCustomizableWindow('Illegal Stocks details(Product Details)', '65%', childXtype, 'customizablewindow');
    },
    onEditlegalityofstockprdDetails: function (grid,record) {
        var tockproductsfrm = Ext.widget('illegalitystockproductsfrm');
           
            tockproductsfrm.loadRecord(record);
            tockproductsfrm.setHeight(450);
       
        funcShowCustomizableWindow('Illegal Stocks details(Product Details)', '65%', tockproductsfrm, 'customizablewindow');
    },
    backToOnlineQueries: function (btn) {
        var queriesFrm = btn.up('form'),
            win = queriesFrm.up('window'),
            grid = win.down('grid');
        win.remove(queriesFrm, true);
        grid.show();
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

    submitRejectedOnlineApplication: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            action_url = 'submitRejectedOnlineApplication',
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            table_name = 'wb_premises_applications';
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

    submitManagerRejectedOnlineApplicationFrmBtn: function (btn) {
        var action_url = 'onlineApplicationManagerRejectionAction',
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            table_name = 'wb_premises_applications',
            application_status = btn.application_status;
        btn.fireEvent('onlineManagerRejectionApplicationSubmit', application_id, action_url, table_name, application_status);
    },

    getApplicationApprovalDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            is_update = item.is_update,
            isAlt = item.isAlt,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            table_name = item.table_name,
            form = Ext.widget('approvalrecommendationfrm'),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        form.setController('premiseregistrationvctr');
        if ((isAlt) && (isAlt == 1 || isAlt === 1)) {
            form.down('textfield[name=permit_no]').setVisible(false);
            form.down('datefield[name=expiry_date]').setVisible(false);
            form.down('datefield[name=expiry_date]').allowBlank = true;
            form.down('datefield[name=expiry_date]').validate();
            form.down('datefield[name=approval_date]').setVisible(false);
            form.down('datefield[name=approval_date]').allowBlank = true;
            form.down('datefield[name=approval_date]').validate();
        }
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
    getPremisesInspectionApplicationApprovalDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            is_update = item.is_update,
            isAlt = item.isAlt,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            table_name = item.table_name,
            form = Ext.widget('premisesinspapprovalrecommendationfrm'),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        form.setController('premiseregistrationvctr');
      
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        if (is_update > 0) {
            form.down('combo[name=approval_recommendation_id]').setReadOnly(true);
            form.down('datefield[name=approval_date]').setReadOnly(true);
            form.down('textarea[name=approval_remarks]').setReadOnly(true);
            form.down('button[name=save_recommendation]').setText('Update Recommendation');
        }
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        Ext.Ajax.request({
            method: 'GET',
            url: 'getInspectionApplicationApprovalDetails',
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
                    funcShowCustomizableWindow('Inspection Recommendation', '40%', form, 'customizablewindow');
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
    showApplicationQueries: function (item) {
        this.fireEvent('showApplicationQueries', item);
    },

    showApplicationChecklists: function (item) {
        this.fireEvent('showApplicationChecklists', item);
    },

    printPremiseCertificate: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code');
        this.fireEvent('generatePremiseCert', application_code);
    },
    printColumnPremiseCertificate: function (item) {
        var record = item.getWidgetRecord(),
            application_code = record.get('application_code');
        this.fireEvent('generatePremiseCert', application_code);
    },
    printPremisePermit: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code');
        this.fireEvent('generatePremisePermit', application_code);
    },
    printColumnPremisePermit: function (item) {
        var record = item.getWidgetRecord(),
            application_code = record.get('application_code');
        this.fireEvent('generatePremisePermit', application_code);
    },
    printManagersReport: function (item) {
        var report_type = item.report_type,
            action_url = base_url + '/premiseregistration/getManagersReports?report_type=' + report_type;
        print_report(action_url);
    },
   
    
    showAddPersonnelQualificationFrm1: function (btn) {
        var grid = btn.up('grid'),
            tabPnl = grid.up('tabpanel'),
            titleSuffix = btn.titleSuffix,
            winWidth = btn.winWidth,
            basicInfoFrm = tabPnl.down('personnelbasicinfofrm'),
            personnel_id = basicInfoFrm.down('hiddenfield[name=id]').getValue(),
            personnel_name = basicInfoFrm.down('textfield[name=name]').getValue(),
            childItem = Ext.widget(btn.childXtype);
        childItem.down('hiddenfield[name=personnel_id]').setValue(personnel_id);
        funcShowCustomizableWindow(personnel_name + ' - ' + titleSuffix, winWidth, childItem, 'customizablewindow');
    },

    showAddPersonnelQualificationFrm: function (btn) {
        var grid = btn.up('grid'),
            panel = grid.up('panel'),
            basicInfoFrm = panel.down('premisesuperintendentfrm'),
            titleSuffix = btn.titleSuffix,
            winWidth = btn.winWidth,
            personnel_id = basicInfoFrm.down('hiddenfield[name=id]').getValue(),
            personnel_name = basicInfoFrm.down('textfield[name=name]').getValue(),
            childItem = Ext.widget(btn.childXtype);
        if (!personnel_id) {
            toastr.warning('Please save Superintendent details first!!', 'Warning Response');
            return;
        }
        childItem.down('hiddenfield[name=personnel_id]').setValue(personnel_id);
        funcShowCustomizableWindow(personnel_name + ' - ' + titleSuffix, winWidth, childItem, 'customizablewindow');
    },

    showEditPremisePersonnelDetails: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid');
        grid.fireEvent('editPremisePersonnel', item);
    },

    showEditPremisePersonnelDetailsWin: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            win = grid.up('window'),
            isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
            record = btn.getWidgetRecord(),
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            childItem = Ext.widget(item.childXtype),
            basicInfoFrm = childItem.down('personnelbasicinfofrm'),
            linkageFrm = childItem.down('premisepersonneldetailsfrm'),
            qualificationsStore = Ext.getStore('trapersonnelqualificationsstr'),
            positionsStore = Ext.getStore('personnelpositionsstr'),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            application_id = win.down('hiddenfield[name=application_id]').getValue();
        if (sub_module_id == 2 || sub_module_id === 2) {
            if (!application_id) {
                toastr.warning('Please save application first!!', 'Warning Response');
                return false;
            }
        }
        basicInfoFrm.down('button[action=link_personnel]').setDisabled(true);
        qualificationsStore.removeAll();
        qualificationsStore.load();
        positionsStore.removeAll();
        positionsStore.load();
        basicInfoFrm.loadRecord(record);
        linkageFrm.loadRecord(record);
        basicInfoFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        childItem.down('personnelqualificationsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        childItem.down('premisepersonneldocsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        childItem.down('premisepersonneldetailsfrm').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        funcShowCustomizableWindow(winTitle, winWidth, childItem, 'customizablewindow');
    },

    showAddPremisePersonnelDetailsWin: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            win = grid.up('window'),
            premise_id = win.down('hiddenfield[name=premise_id]').getValue(),
            applicant_id = win.down('hiddenfield[name=applicant_id]').getValue(),
            application_id = win.down('hiddenfield[name=application_id]').getValue(),
            title = btn.winTitle,
            winWidth = btn.winWidth,
            personnelTabPnl = Ext.widget('personneldetailstabpnl'),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            qualificationsStore = Ext.getStore('trapersonnelqualificationsstr'),
            positionsStore = Ext.getStore('personnelpositionsstr');
        personnelTabPnl.down('button[action=link_personnel]').setDisabled(true);
        if (!application_id) {
            toastr.warning('Please save application first!!', 'Warning Response');
            return false;
        }
        personnelTabPnl.down('hiddenfield[name=premise_id]').setValue(premise_id);
        personnelTabPnl.down('hiddenfield[name=trader_id]').setValue(applicant_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        qualificationsStore.removeAll();
        qualificationsStore.load();
        positionsStore.removeAll();
        positionsStore.load();
        funcShowCustomizableWindow(title, winWidth, personnelTabPnl, 'customizablewindow');
    },

    showEditPersonnelQualificationFrm: function (item) {
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
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.down('combo[name=study_field_id]').setReadOnly(true);
        form.down('combo[name=qualification_id]').setReadOnly(true);
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

    showInspectorsList: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            mainTabPnl = grid.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            //pnl = grid.up('newpremisemanagerinspectionpanel'),
            inspection_id = activeTab.down('form').down('hiddenfield[name=id]').getValue(),
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childItem = Ext.widget(childXtype);
        if (!inspection_id) {
            toastr.warning('Please save inspection details first!!', 'Warning Response');
            return false;
        }
        childItem.down('hiddenfield[name=inspection_id]').setValue(inspection_id);
        funcShowCustomizableWindow(winTitle, winWidth, childItem, 'customizablewindow');
    },
    funcPrintPremisesInspectionSchedules: function (btn) {
        var  mainTabPnl = btn.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            inspection_id = activeTab.down('form').down('hiddenfield[name=id]').getValue();

            action_url = base_url + '/reports/printPremisesInspectionSchedules?inspection_id=' + inspection_id;
        print_report(action_url);
    },

    addInspectionInspectors: function (btn) {
        btn.setLoading(true);
        var grid = btn.up('grid'),
            inspection_id = grid.down('hiddenfield[name=inspection_id]').getValue(),
            store = Ext.getStore('inspectioninspectorsstr'),
            win = grid.up('window'),
            sm = grid.getSelectionModel(),
            records = sm.getSelection(),
            selected = [];
        Ext.each(records, function (record) {
            var id = record.get('id');
            if (id) {
                var obj = {inspector_id: id, inspection_id: inspection_id};
                selected.push(obj);
            }
        });
        Ext.Ajax.request({
            url: 'premiseregistration/saveInspectionInspectors',
            params: {
                selected: JSON.stringify(selected)
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
                    win.close();
                    store.load();
                    toastr.success(message, 'Success Response');
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

    removeInspectionInspectors: function (btn) {
        btn.setLoading(true);
        var grid = btn.up('grid'),
            store = Ext.getStore('inspectioninspectorsstr'),
            sm = grid.getSelectionModel(),
            records = sm.getSelection(),
            selected = [];
        Ext.each(records, function (record) {
            selected.push(record.get('id'));
        });
        Ext.Ajax.request({
            url: 'premiseregistration/removeInspectionInspectors',
            params: {
                selected: JSON.stringify(selected)
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
                    store.load();
                    toastr.success(message, 'Success Response');
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

    comparePremiseAlterationDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            ref_no = record.get('reference_no'),
            init_premise_id = record.get('init_premise_id'),
            premise_id = record.get('premise_id'),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            module_id = record.get('module_id'),
            childObject = Ext.widget('premisealterationcomparedetails'),
            variationRequestsGrid = childObject.down('premisevariationrequestsonlinegrid'),
            amendedFrm = childObject.down('amendedpremisedetailsfrm'),
            initialFrm = childObject.down('initialpremisedetailsfrm');
        amendedFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
        initialFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
        childObject.down('amendedpremisepersonneldetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        childObject.down('initialpremisepersonneldetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        childObject.down('amendedpremiseotherdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        childObject.down('initialpremiseotherdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        childObject.down('hiddenfield[name=active_application_id]').setValue(application_id);
        childObject.down('hiddenfield[name=active_application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=module_id]').setValue(module_id);
        variationRequestsGrid.setIsOnline(0);
        Ext.Ajax.request({
            url: 'premiseregistration/getPremiseComparisonDetails',
            params: {
                premise_id: premise_id,
                init_premise_id: init_premise_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    amendedDetails = resp.amendedDetails,
                    initialDetails = resp.initialDetails;
                if (success == true || success === true) {
                    var amendedModel = Ext.create('Ext.data.Model', amendedDetails),
                        initialModel = Ext.create('Ext.data.Model', initialDetails);
                    amendedFrm.loadRecord(amendedModel);
                    initialFrm.loadRecord(initialModel);
                    funcShowCustomizableWindow(ref_no, '85%', childObject, 'customizablewindow');
                    me.fireEvent('showAmendedFormFields', application_id, application_code, amendedFrm);
                    me.fireEvent('showAmendedFormFields', application_id, application_code, initialFrm);
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

    printReceipt: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            payment_id = record.get('id');
        this.fireEvent('printReceipt', payment_id);
    }, printColumnReceipt: function (item) {
        var record = item.getWidgetRecord(),
            payment_id = record.get('id');
        this.fireEvent('printReceipt', payment_id);
    },
    printInvoice: function (item) {
        this.fireEvent('printInvoice', item);
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

    showApplicationDismissalForm: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            ref_no = record.get('reference_no'),
            application_id = record.get('id'),
            application_code = record.get('application_code'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            workflow_stage_id = record.get('workflow_stage_id');
        this.fireEvent('showApplicationDismissalFormGeneric', ref_no, application_id, application_code, module_id, sub_module_id, section_id, workflow_stage_id);
    },funcFilterInspectedPPremisesEPermits:function(btn){
        var grid = btn.up('grid'),
            store = grid.store;
            store.load();

    },
    funcClearFilterInspectedPremisesPermits:function(btn){
        var grid = btn.up('grid'),
            form = btn.up('form'),
            store = grid.store;
            store.load();
            form.reset();
    },
    funcExportInspectedPremises:function(btn){
        var grid = btn.up('grid'),
             form = btn.up('form'),
             form_values = form.getValues(),
			 form_values = convert_object(form_values),
             filterfield = grid.getPlugin('filterfield');
             filter_array = Ext.pluck(filterfield.getgridFilters(grid), 'config');
             filter = Ext.JSON.encode(filter_array);
        var action_url = 'reports/funcExportInspectedpermits?type=1&filter=' + encodeURIComponent(filter) + form_values;
        print_report(action_url);
    },
    showDataCleanUpWindow: function(btn) {
        var container = Ext.ComponentQuery.query("#contentPanel")[0],
             activeTab = container.getActiveTab(), 
             wrapper = activeTab.down(btn.wrapper),
             child = Ext.widget(btn.childXtype);
           //  child.down('premisedetailsfrm').down('hiddenfield[name=isReadOnly]').setValue(0);

                wrapper.removeAll();
                wrapper.add(child);
    },
    showApplicationsSelectionList: function(btn) {
       var grid = Ext.widget(btn.childXtype),
           winTitle = btn.winTitle,
           winWidth = btn.winWidth;
           grid.addListener('itemdblclick', "loadPremiseApplication", this);
       funcShowCustomizableWindow(winTitle, winWidth, grid, 'customizablewindow');
    },
    loadPremiseApplication: function(view, record) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            activeTab = Ext.ComponentQuery.query("#editpremiseappId")[0],
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            premiseFrm = activeTab.down('premisedetailsfrm'),
            contactPersonFrm = activeTab.down('premisecontactpersonfrm'),
            premisepersonneldetailStore = activeTab.down('premisepersonneldetailsgrid').getStore(),
            premiseotherdetailStore = activeTab.down('premiseotherdetailsgrid').getStore(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            application_id = record.get('active_application_id'),
            process_id = record.get('process_id'),
            section_id = record.get('section_id'),
            module_id = record.get('module_id'),
            app_status_id = record.get('app_status_id'),
            sub_module_id = record.get('sub_module_id'),
            workflow_stage_id = record.get('workflow_stage_id');
        premiseFrm.down('hiddenfield[name=is_local]').setValue(1);
        activeTab.down('hiddenfield[name=process_id]').setValue(record.get('process_id'));
        activeTab.down('hiddenfield[name=workflow_stage_id]').setValue(record.get('workflow_stage_id'));
        activeTab.down('hiddenfield[name=active_application_id]').setValue(record.get('active_application_id'));
        activeTab.down('hiddenfield[name=active_application_code]').setValue(record.get('active_application_code'));
        activeTab.down('hiddenfield[name=application_status_id]').setValue(record.get('application_status_id'));
        activeTab.down('hiddenfield[name=module_id]').setValue(record.get('module_id'));
        activeTab.down('hiddenfield[name=sub_module_id]').setValue(record.get('sub_module_id'));
        activeTab.down('hiddenfield[name=section_id]').setValue(record.get('section_id'));
        activeTab.down('textfield[name=reference_no]').setValue(record.get('reference_no'));
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                section_id: section_id,
                module_id: module_id,
                sub_module_id: sub_module_id,
                workflow_stage: workflow_stage_id
            }
        });

        premisepersonneldetailStore.removeAll();
        premisepersonneldetailStore.load();
        premiseotherdetailStore.removeAll();
        premiseotherdetailStore.load();

        if (application_id) {
            //zone_fld.setReadOnly(true);
            //region_fld.setReadOnly(true);
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseReceivingStage',
                params: {
                    application_id: application_id
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
                        contactPersonDetails = resp.contactPersonDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            applicantFrm.loadRecord(model);
                            premiseFrm.loadRecord(model);
                        }
                        if (contactPersonDetails) {
                            var model1 = Ext.create('Ext.data.Model', contactPersonDetails);
                            console.log(contactPersonDetails);
                            contactPersonFrm.loadRecord(model1);
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
        var grid = Ext.ComponentQuery.query("#allpremiseappselectiongridId")[0],
            win = grid.up('window');
        win.close();

    },
    savePremiseEditAppBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            activeTab = Ext.ComponentQuery.query("#editpremiseappId")[0],
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
           // applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
          // applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            premiseDetailsForm = activeTab.down('premisedetailsfrm'),
            premiseDetailsFrm = premiseDetailsForm.getForm();
          
        if (premiseDetailsFrm.isValid()) {
            if (!contactPersonFrm.isValid()) {
                toastr.warning('Please provide details of contact person!!', 'Warning Response');
                return false;
            }
            premiseDetailsFrm.submit({
                url: 'premiseregistration/saveAppliationEditionBaseDetails',
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        record_id = resp.record_id,
                        tracking_no = resp.tracking_no,
                        application_code = resp.application_code,
                        premise_id = resp.premise_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            premiseDetailsForm.down('hiddenfield[name=premise_id]').setValue(premise_id);
                            activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                        closeActiveWindow();
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                    closeActiveWindow();
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
            return false;
        }
    },
    previewInspectionDetails:function(row_btn){
        var btn = row_btn.up('button'),
            record = btn.getWidgetRecord(),
            inspectionPreviewPnl = Ext.widget('premisesinspectionpreviewpnl'),
            inspectionFrm = inspectionPreviewPnl.down('form'),
            inspectorGrid = inspectionPreviewPnl.down('grid'),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            table_name = 'tra_premises_applications';
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremiseManagerInspectionStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: table_name
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            inspectionFrm.loadRecord(model);
                            inspectorGrid.getStore().load();
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function(response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
        });
        funcShowCustomizableWindow("Inspection Review", '60%', inspectionPreviewPnl, 'customizablewindow');
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
    showInspectionCAPApplicationQueries: function (item) {
        this.fireEvent('showInspectionCAPApplicationQueries', item);
    },
    showPremisesInspectionCAPApplicationQueries: function (btn) {
        this.fireEvent('showPremisesInspectionCAPApplicationQueries', btn);
    },
      
    
    showReinspectionRequestswin: function (item) {
        this.fireEvent('showReinspectionRequestswin', item);
    }, showRejectionDetailsRequestswin: function (item) {
        this.fireEvent('showRejectionDetailsRequestswin', item);
    }, showDataCleanUpWindow: function(btn) {
        var container = Ext.ComponentQuery.query("#contentPanel")[0],
             activeTab = container.getActiveTab(), 
             wrapper = activeTab.down(btn.wrapper),
             child = Ext.widget(btn.childXtype);
        wrapper.removeAll();
        wrapper.add(child);
    },




// Drugshop functions
    showNewDrugShopRegistration: function (btn) {
        var application_type = btn.app_type,
            wrapper_xtype = btn.wrapper_xtype;
        this.fireEvent('newDrugShopRegistration', application_type, wrapper_xtype);
    },


    showDrugShopApplicationMoreDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            ref_no = record.get('reference_no'),
            application_id = record.get('id'),
            application_code = record.get('application_code'),
            applicant_id = record.get('applicant_id'),
            premise_id = record.get('premise_id'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            isReadOnly = item.appDetailsReadOnly,
            is_temporal = item.is_temporal;
        this.fireEvent('showDrugShopApplicationMoreDetails', application_code,application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal);
    },

    showTraderSupervisorSelectionGrid: function (btn) {
        var form = btn.up('form'),
            tabpanel=form.up('panel'),             
            panel= tabpanel.up('panel'),
            activeTab=panel.up('panel'),   
            motherPnl=activeTab.up('panel');
            applicant_id = 0;
            var width = btn.winWidth,
           // moreDetails = form.getMoreDetails(),
           // personnel_type = form.down('hiddenfield[name=personnel_type]').getValue(),
            childItem = Ext.widget(btn.childXtype);
        //childItem.setMoreDetails(moreDetails);
        if(activeTab.down('hiddenfield[name=applicant_id]')){
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue();

        }
        childItem.down('hiddenfield[name=trader_id]').setValue(applicant_id);
        //childItem.down('hiddenfield[name=personnel_type]').setValue(personnel_type);
        childItem.addListener('itemdblclick', "onTraderSupervisorItemdblclick", this);
        funcShowCustomizableWindow('Personnel', width, childItem, 'customizablewindow');
    },

    onTraderSupervisorItemdblclick: function (view, record) {
        var grid = view.grid,
            win = grid.up('window'),
            form = Ext.ComponentQuery.query('#drugshopdetailsfrm')[0];
            form.down('textfield[name=supervisor_name]').setValue(record.get('supervisor_name'));
            form.down('textfield[name=supervisor_telephone_no]').setValue(record.get('supervisor_telephone_no'));
            form.down('textfield[name=supervisor_email_address]').setValue(record.get('supervisor_email_address'));
            form.down('textfield[name=supervisor_registration_no]').setValue(record.get('supervisor_registration_no'));
            form.down('datefield[name=supervisor_registration_date]').setValue(record.get('supervisor_registration_date'));
            form.down('combo[name=supervisor_qualification_id]').setValue(record.get('supervisor_qualification_id'));
            form.down('combo[name=supervisor_region_id]').setValue(record.get('supervisor_region_id'));
            form.down('combo[name=supervisor_country_id]').setValue(record.get('supervisor_country_id'));
            form.down('combo[name=supervisor_district_id]').setValue(record.get('supervisor_district_id'));
            win.close();
         

    },

    funcOtherLicenses:function(btn){
        var childXtype = btn.childXtype,
            child = Ext.widget(childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth;
            child.setHeight(500);
            funcShowCustomizableWindow('Other Registered Premises', '60%', child, 'customizablewindow'); 
    },

       showOtherPremiseSearch: function(btn) {
        var grid = Ext.widget(btn.childXtype),
        winWidth = btn.winWidth,
        winTitle= btn.winTitle;
        grid.addListener('itemdblclick', btn.handlerFn, this);
        funcShowCustomizableWindow(winTitle, winWidth, grid, 'customizablewindow');

    },

     loadSelectedAmmendmentPremise :function(view, record) {
            var grid = view.up('grid'),
            form=Ext.ComponentQuery.query('#premisepermitdetailsamendmentsfrm')[0];
            //form.loadRecord(record);
            form.down('textfield[name=name]').setValue(record.get('name'));
            form.down('hiddenfield[name=application_code]').setValue(record.get('application_code'));
            form.down('hiddenfield[name=premise_id]').setValue(record.get('premise_id'));
            form.down('textfield[name=permit_no]').setValue(record.get('permit_no'));
            form.down('datefield[name=approval_date]').setValue(record.get('approval_date'));
            form.down('datefield[name=approval_date]').setDisabled(false);
            form.down('datefield[name=expiry_date]').setValue(record.get('expiry_date'));
            form.down('datefield[name=expiry_date]').setDisabled(false);
          
          
        grid.up('window').close(); 
    },

      showAddNearestPremiseForm: function (btn) {
        var grid = btn.up('grid'),
            premise_id = grid.down('hiddenfield[name=premise_id]').getValue(),
            width = btn.winWidth,
            childObject = Ext.widget(btn.childXtype);

        childObject.down('hiddenfield[name=premise_id]').setValue(premise_id);
        //childObject.down('button[action=link_personnel]').setDisabled(true);
        funcShowCustomizableWindow('Nearest Premise', width, childObject, 'customizablewindow');
    },
});