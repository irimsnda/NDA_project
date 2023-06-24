/**
 * Created by Kip on 9/11/2018.
 */
Ext.define('Admin.view.workflowmanagement.viewcontrollers.WorkflowManagementVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workflowmanagementvctr',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    setWorkflowGridsStore: function (obj, options) {
        this.fireEvent('setWorkflowGridsStore', obj, options);
    },

    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },

    setAdminGridsStore: function (obj, options) {
        this.fireEvent('setAdminGridsStore', obj, options);
    },

    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
    funcAddExternalUsers: function (btn) {
        var childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            form = Ext.widget(childXtype);

        funcShowCustomizableWindow(winTitle, '50%', form, 'customizablewindow');

    },

    showSimpleWorkflowModuleGridForm: function (btn) {
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

    showWorkflowModuleAddWin: function (btn) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            formWidget = btn.form,
            title = btn.winTitle,
            width = btn.winWidth,
            form = Ext.widget(formWidget),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(title, width, form, 'customizablewindow');
        /*} else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }*/
    },

    workflowBackToDashboard: function (btn) {
        var currentPnl = btn.up('form'),
            containerPnlXtype = btn.containerPnlXtype,
            hiddenCompXtype = btn.hiddenCompXtype,
            containerPnl = btn.up(containerPnlXtype),
            grid = containerPnl.down(hiddenCompXtype);
        containerPnl.remove(currentPnl);
        grid.show();
    },

    workflowsMenuItemBackToDashboard: function (btn) {
        var currentPnl = btn.up('workflowcontainerpnl'),
            containerPnlXtype = btn.containerPnlXtype,
            hiddenCompXtype = btn.hiddenCompXtype,
            containerPnl = btn.up(containerPnlXtype),
            grid = containerPnl.down(hiddenCompXtype);
        containerPnl.remove(currentPnl);
        grid.show();
    },

    doCreateWorkflowParam: function (btn) {
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
                        me.workflowBackToDashboard(btn);
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

    doCreateWorkflowParamWin: function (btn) {
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
                        store.removeAll();
                        store.load();
                        //me.workflowBackToDashboard(btn);
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

    saveWorkflowStageDetails: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {model: table},
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        var record_id = response.record_id;
                        form.down('hiddenfield[name=id]').setValue(record_id);
                        store.removeAll();
                        store.load();
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

    saveWorkflowActionDetails: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            tabPnl = form.up('tabpanel'),
            activeTab = tabPnl.getActiveTab(),
            grid = activeTab.down('grid'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {model: table},
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        activeTab.remove(form);
                        grid.show();
                        store.removeAll();
                        store.load();
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

    showEditWorkflowParamGridFrm: function (item) {//for tree panels
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

    showWorkflowEditWin: function (item) {
        // if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            formWidget = item.form,
            width = item.winWidth,
            winTitle = item.winTitle,
            record = btn.getWidgetRecord(),
            form = Ext.widget(formWidget),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, width, form, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

    doDeleteWorkflowWidgetParam: function (item) {
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

    showWorkFlowDetailsPanel: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            workflow_id = record.get('id'),
            workflow_name = record.get('name'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            grid = btn.up('grid'),
            panel = grid.up('panel'),
            containerPnl = Ext.widget('workflowcontainerpnl');
        containerPnl.down('displayfield[name=workflow_name]').setValue(workflow_name);
        containerPnl.down('hiddenfield[name=active_workflow_id]').setValue(workflow_id);
        containerPnl.down('hiddenfield[name=module_id]').setValue(module_id);
        containerPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        grid.hide();
        panel.add(containerPnl);
    },

    onPrevCardClick: function (btn) {
        var wizardPnl = btn.up('directorateSectionsDocDefinationWizardfrm'),
            motherPnl = wizardPnl.up('workflowcontainerpnl');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');
    },

    onNextCardClick: function (btn) {
        var wizardPnl = btn.up('directorateSectionsDocDefinationWizardfrm'),
            motherPnl = wizardPnl.up('workflowcontainerpnl');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },
    navigate: function (button, panel, direction) {
        var layout = panel.getLayout(),
            progress = this.lookupReference('progress'),
            model = panel.up('workflowcontainerpnl').getViewModel(),
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
            model.set('atBeginning', true);
        }

        // wizard is 3 steps. Disable next at end.
        if (activeIndex === 2) {
            model.set('atEnd', true);
        }
    },

    quickNavigation: function (btn) {
        var step = btn.step,
            formPnl = btn.up('workflowwizardfrm'),
            motherPnl = formPnl.up('workflowcontainerpnl');

        var active_user_id = formPnl.down('hiddenfield[name=active_workflow_id]').getValue();

        if (active_user_id == '') {
            // toastr.warning('Record not saved!!', 'Warning Response');
        }
        if (step == 2) {
            motherPnl.getViewModel().set('atEnd', true);
        } else {
            motherPnl.getViewModel().set('atEnd', false);
        }
        if (step == 2) {
            //check if its an edit
            // this.prepareContactDetails();
        }
        if (step == 0) {
            motherPnl.getViewModel().set('atBeginning', true);
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
        }


        formPnl.getLayout().setActiveItem(step);
        var layout = formPnl.getLayout(),
            progress = formPnl.down('#progress_tbar'),
            model = motherPnl.getViewModel(),
            progressItems = progress.items.items,
            item = null,
            i = 0,
            activeItem = layout.getActiveItem(),
            activeIndex = formPnl.items.indexOf(activeItem);

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

    //START GENERIC
    onPrevCardClickGeneric: function (btn) {
        var wizardPnl = btn.up('workflowwizardfrmgeneric'),
            motherPnl = wizardPnl.up('workflowcontainerpnlgeneric');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigateGeneric(btn, wizardPnl, 'prev');
    },

    onNextCardClickGeneric: function (btn) {
        var wizardPnl = btn.up('workflowwizardfrmgeneric'),
            motherPnl = wizardPnl.up('workflowcontainerpnlgeneric');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigateGeneric(btn, wizardPnl, 'next');
    },

    navigateGeneric: function (button, panel, direction) {
        var layout = panel.getLayout(),
            progress = this.lookupReference('progress'),
            model = panel.up('workflowcontainerpnlgeneric').getViewModel(),
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
            model.set('atBeginning', true);
        }

        // wizard is 3 steps. Disable next at end.
        if (activeIndex === 2) {
            model.set('atEnd', true);
        }
    },

    quickNavigationGeneric: function (btn) {
        var step = btn.step,
            formPnl = btn.up('workflowwizardfrmgeneric'),
            motherPnl = formPnl.up('workflowcontainerpnlgeneric');

        if (step == 2) {
            motherPnl.getViewModel().set('atEnd', true);
        } else {
            motherPnl.getViewModel().set('atEnd', false);
        }
        if (step == 2) {
            //check if its an edit
            // this.prepareContactDetails();
        }
        if (step == 0) {
            motherPnl.getViewModel().set('atBeginning', true);
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
        }


        formPnl.getLayout().setActiveItem(step);
        var layout = formPnl.getLayout(),
            progress = formPnl.down('#progress_tbar'),
            model = motherPnl.getViewModel(),
            progressItems = progress.items.items,
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
    //END GENERIC

    showAddWorkFlowStageForm: function (btn) {
        var tabPnl = Ext.widget('workflowstagestabpnl'),
            grid = btn.up('grid'),
            grid_store = grid.getStore(),
            record_count = grid_store.getTotalCount(),
            form = tabPnl.down('workflowstagesfrm'),
            wizardFrm = btn.up('workflowwizardfrm'),
            workflow_id = wizardFrm.down('hiddenfield[name=active_workflow_id]').getValue(),
            module_id = wizardFrm.down('hiddenfield[name=module_id]').getValue();
        form.down('hiddenfield[name=workflow_id]').setValue(workflow_id);
        form.down('numberfield[name=order_no]').setValue(record_count + 1);
        form.down('hiddenfield[name=module_id]').setValue(module_id);
        funcShowCustomizableWindow('WorkFlow Stage', '60%', tabPnl, 'customizablewindow');
    },

    showEditWorkFlowStageForm: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            wizardPnl = grid.up('workflowwizardfrm'),
            module_id = wizardPnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = wizardPnl.down('hiddenfield[name=sub_module_id]').getValue(),
            record = btn.getWidgetRecord(),
            tabPnl = Ext.widget('workflowstagestabpnl'),
            form = tabPnl.down('workflowstagesfrm');
        form.loadRecord(record);
        form.down('hiddenfield[name=module_id]').setValue(module_id);
        form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        funcShowCustomizableWindow('WorkFlow Stage', '60%', tabPnl, 'customizablewindow');
    },

    showAddWorkflowActionForm: function (btn) {
        var grid = btn.up('grid'),
            tabPnl = grid.up('tabpanel'),
            activeTab = tabPnl.getActiveTab(),
            stageFrm = tabPnl.down('workflowstagesfrm'),
            stage_id = stageFrm.down('hiddenfield[name=id]').getValue(),
            form = Ext.widget('workflowactionsfrm');
        form.down('hiddenfield[name=stage_id]').setValue(stage_id);
        grid.hide();
        activeTab.add(form);
    },

    showAddWorkflowTransition: function (btn) {
        var form = Ext.widget('workflowtransitionsfrm'),
            grid = btn.up('grid'),
            wizardFrm = grid.up('workflowwizardfrm'),
            workflow_id = wizardFrm.down('hiddenfield[name=active_workflow_id]').getValue();
        form.down('hiddenfield[name=workflow_id]').setValue(workflow_id);
        funcShowCustomizableWindow('WorkFlow Transition', '45%', form, 'customizablewindow');
    },

    showEditWorkflowActionForm: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            tabPnl = grid.up('tabpanel'),
            activeTab = tabPnl.getActiveTab(),
            form = Ext.widget('workflowactionsfrm');
        form.loadRecord(record);
        grid.hide();
        activeTab.add(form);
    },

    backToWorkflowActionsWinGrid: function (btn) {
        var form = btn.up('form'),
            tabPnl = form.up('tabpanel'),
            activeTab = tabPnl.getActiveTab(),
            grid = activeTab.down('grid');
        activeTab.remove(form, true);
        grid.show();
    },

    addWorkflowId: function (cmbo) {
        var store = cmbo.store,
            form = cmbo.up('form'),
            workflow_id = form.down('hiddenfield[name=workflow_id]').getValue();
        store.getProxy().extraParams = {
            workflow_id: workflow_id
        };
    },

    addWorkflowStageId: function (cmbo, newVal) {
        var form = cmbo.up('form'),
            actionsCmbo = form.down('combo[name=action_id]'),
            actionsCmboStr = actionsCmbo.getStore();
        actionsCmboStr.removeAll();
        actionsCmboStr.load({params: {stage_id: newVal}});
    },

    showProcessApplicablePartsConfig: function (item) {
        var btn = item.up('button'),
            pnlXtype = item.pnlXtype,
            grid = btn.up('grid'),
            dash_panel = grid.up('tfdaprocessespnl'),
            record = btn.getWidgetRecord(),
            process_id = record.get('id'),
            workflow_id = record.get('workflow_id'),
            process_name = record.get('name'),
            panel = Ext.widget(pnlXtype);
        panel.down('hiddenfield[name=process_id]').setValue(process_id);
        panel.down('hiddenfield[name=workflow_id]').setValue(workflow_id);
        dash_panel.setTitle('PROCESS: ' + process_name);
        grid.hide();
        dash_panel.add(panel);
    },

    showProcessFormsConfig: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            dash_panel = grid.up('tfdaprocessespnl'),
            record = btn.getWidgetRecord(),
            process_id = record.get('id'),
            module_id = record.get('module_id'),
            process_name = record.get('name'),
            panel = Ext.widget('processformconfigpnl');
        panel.down('hiddenfield[name=process_id]').setValue(process_id);
        panel.down('hiddenfield[name=module_id]').setValue(module_id);
        dash_panel.setTitle('PROCESS: ' + process_name);
        grid.hide();
        dash_panel.add(panel);
    },

    backToProcessesHome: function (btn) {
        var panel = btn.up('panel'),
            dash_panel = panel.up('tfdaprocessespnl'),
            dash_grid = dash_panel.down('grid');
        dash_panel.setTitle('Processes');
        dash_panel.remove(panel, true);
        dash_grid.show();
    },

    onProcessStageClick: function (view, record, item, index, e, eOpts) {
        var mainPnl = view.up('processchecklistconfigpnl'),
            stage_id = record.get('id'),
            stage_name = record.get('name'),
            process_id = mainPnl.down('hiddenfield[name=process_id]').getValue(),
            checklistsGrid = mainPnl.down('processworkflowstagechecklistsgrid'),
            store = checklistsGrid.getStore();
        mainPnl.down('hiddenfield[name=stage_id]').setValue(stage_id);
        checklistsGrid.setTitle('Applicable Checklist Categories - ' + stage_name + ' Stage');
        store.removeAll();
        store.load({params: {process_id: process_id, workflow_stage: stage_id}});
    },

    onProcessFormClick: function (view, record, item, index, e, eOpts) {
        var mainPnl = view.up('processformconfigpnl'),
            form_id = record.get('id'),
            form_name = record.get('name'),
            process_id = mainPnl.down('hiddenfield[name=process_id]').getValue(),
            fieldsGrid = mainPnl.down('processformfieldsgrid'),
            store = fieldsGrid.getStore();
        mainPnl.down('hiddenfield[name=form_id]').setValue(form_id);
        fieldsGrid.setTitle(form_name + ' Fields');
        store.removeAll();
        store.load({params: {process_id: process_id, form_id: form_id}});
    },

    syncProcessApplicableChecklists: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainPnl = btn.up('processchecklistconfigpnl'),
            process_id = mainPnl.down('hiddenfield[name=process_id]').getValue(),
            stage_id = mainPnl.down('hiddenfield[name=stage_id]').getValue(),
            checklistsGrid = mainPnl.down('processworkflowstagechecklistsgrid'),
            store = checklistsGrid.getStore(),
            sm = checklistsGrid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected = [];
        Ext.each(selected_records, function (item) {
            selected.push(item.data.id);
        });
        Ext.Ajax.request({
            url: 'workflow/syncProcessApplicableChecklistCategories',
            params: {
                selected: JSON.stringify(selected),
                process_id: process_id,
                stage_id: stage_id,
                _token: token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success || success == true || success === true) {
                    toastr.success(message, 'Success Response!!');
                    store.load();
                } else {
                    toastr.error(message, 'Failure Response!!');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.warning(message, 'Failure Response!!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    syncProcessApplicableDocumentTypes: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainPnl = btn.up('processdocumentsconfigpnl'),
            process_id = mainPnl.down('hiddenfield[name=process_id]').getValue(),
            stage_id = mainPnl.down('hiddenfield[name=stage_id]').getValue(),
            checklistsGrid = mainPnl.down('processworkflowstagedocumentsgrid'),
            store = checklistsGrid.getStore(),
            sm = checklistsGrid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected = [];
        Ext.each(selected_records, function (item) {
            selected.push(item.data.id);
        });
        Ext.Ajax.request({
            url: 'workflow/syncProcessApplicableDocumentTypes',
            params: {
                selected: JSON.stringify(selected),
                process_id: process_id,
                stage_id: stage_id,
                _token: token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success || success == true || success === true) {
                    toastr.success(message, 'Success Response!!');
                    store.load();
                } else {
                    toastr.error(message, 'Failure Response!!');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.warning(message, 'Failure Response!!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    syncProcessAmendableParts: function (btn) {
        var mainPnl = btn.up('processformconfigpnl'),
            process_id = mainPnl.down('hiddenfield[name=process_id]').getValue(),
            //form_id = mainPnl.down('hiddenfield[name=form_id]').getValue(),
            fieldsGrid = mainPnl.down('processformfieldsgrid'),
            form_id = fieldsGrid.down('hiddenfield[name=form_id]').getValue(),
            otherPartsGrid = mainPnl.down('processotherpartsgrid'),
            store = fieldsGrid.getStore(),
            store2 = otherPartsGrid.getStore(),
            sm = fieldsGrid.getSelectionModel(),
            sm2 = otherPartsGrid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected_records2 = sm2.getSelection(),
            selected = [],
            selected_parts = [];
        /*if (!sm.hasSelection() && !sm2.hasSelection()) {
            toastr.warning('No record selected!!', 'Warning Response');
            return;
        }*/
        Ext.getBody().mask('Please wait...');
        Ext.each(selected_records, function (item) {
            selected.push(item.data.id);
        });
        Ext.each(selected_records2, function (item) {
            selected_parts.push(item.data.id);
        });
        Ext.Ajax.request({
            url: 'workflow/syncProcessAmendableParts',
            params: {
                selected: JSON.stringify(selected),
                selected_parts: JSON.stringify(selected_parts),
                process_id: process_id,
                form_id: form_id
            },
            headers: {
                'X-CSRF-Token': token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success || success == true || success === true) {
                    toastr.success(message, 'Success Response!!');
                    store.load();
                    store2.load();
                } else {
                    toastr.error(message, 'Failure Response!!');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.warning(message, 'Failure Response!!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    syncWorkflowStageResponsibleGroups: function (btn) {
        var grid = btn.up('grid'),
            tabPnl = grid.up('tabpanel'),
            form = tabPnl.down('workflowstagesfrm'),
            stage_id = form.down('hiddenfield[name=id]').getValue(),
            store = grid.getStore(),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected = [],
            mask = new Ext.LoadMask(
                {
                    target: grid,
                    msg: 'Please wait...'
                }
            );
        Ext.each(selected_records, function (item) {
            selected.push(item.data.id);
        });
        mask.show();
        Ext.Ajax.request({
            url: 'workflow/syncWorkflowStageResponsibleGroups',
            params: {
                selected: JSON.stringify(selected),
                stage_id: stage_id,
                _token: token
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success || success == true || success === true) {
                    toastr.success(message, 'Success Response!!');
                    store.load();
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

    setWorkFlowNextStageDetails: function (cmb, newVal) {
        
        var form = cmb.up('form'),
            store = cmb.getStore(),
            record = store.getById(newVal),
            isToPortal = record.get('is_to_portal'),
            needs_directive = record.get('needs_directive'),
            directive_category = record.get('directive_category'),
            action_type_id =  record.get('action_type_id'),
            has_multistage_assignment =  record.get('has_multistage_assignment'),

            has_screening_assignment =  record.get('has_screening_assignment'),
            has_inspectionsche_assignment =  record.get('has_inspectionsche_assignment'),
            has_firstassessment_assignment =  record.get('has_firstassessment_assignment'),
            has_secondassessment_assignment =  record.get('has_secondassessment_assignment'),
            has_assessreportreview_assignment =  record.get('has_assessreportreview_assignment'),
            has_premises_validation =  record.get('has_premises_validation'),

            
            is_external_usersubmission = record.get('is_external_usersubmission'),
            is_inspection_submission = record.get('is_inspection_submission'),
            curr_stage = form.down('hiddenfield[name=curr_stage_id]').getValue(),
            next_stage = form.down('combo[name=next_stage]'),
            directiveFld = form.down('combo[name=directive_id]'),
            directiveStore = directiveFld.getStore(),

            application_code = form.down('hiddenfield[name=application_code]').getValue();
            application_id = form.down('hiddenfield[name=application_id]').getValue();

            responsibleUserFld = form.down('combo[name=responsible_user]');
            screening_assignmentcbo = form.down('combo[name=screening_stage_id]');
            inspectionsche_assignmentcbo = form.down('combo[name=inspection_schedulingstage_id]');
            firstassessment_assignmentcbo = form.down('combo[name=firstassessment_stage_id]');
            secondassessment_assignmentcbo = form.down('combo[name=secondassessment_stage_id]');
            assessreportreview_assignmentcbo = form.down('combo[name=assessmentreport_reviewstage_id]');
            premisesvalidation_assignmentcbo = form.down('combo[name=premisesvalidation_assignment_id]');

            has_premises_validation
            if(has_multistage_assignment == 1){
                if(has_screening_assignment ==1){
                    screening_assignmentcbo.setVisible(true);
                    form.down('combo[name=screening_respuser_id]').setVisible(true);
                }
                if(has_inspectionsche_assignment ==1){
                    inspectionsche_assignmentcbo.setVisible(true);
                    form.down('combo[name=inspectionscheduling_respuser_id]').setVisible(true);
                }if(has_firstassessment_assignment ==1){
                    firstassessment_assignmentcbo.setVisible(true);
                    form.down('combo[name=firstassessment_respuser_id]').setVisible(true);
                }if(has_secondassessment_assignment ==1){
                    secondassessment_assignmentcbo.setVisible(true);
                    form.down('combo[name=secondassessment_respuser_id]').setVisible(true);
                }if(has_assessreportreview_assignment ==1){
//assessreportreview_assignmentcbo.setVisible(true);
                   // form.down('combo[name=assessmentreportreview_respuser_id]').setVisible(true);
                }
                
                //for duo submissions on premises 
                if(has_premises_validation ==1){
                    premisesvalidation_assignmentcbo.setVisible(true);
                    form.down('combo[name=premisesvalidation_respuser_id]').setVisible(true);
                }
            }
            else{
                screening_assignmentcbo.setVisible(false);
                inspectionsche_assignmentcbo.setVisible(false);
                firstassessment_assignmentcbo.setVisible(false);
                secondassessment_assignmentcbo.setVisible(false);
                assessreportreview_assignmentcbo.setVisible(false);
                form.down('combo[name=screening_respuser_id]').setVisible(false);
                form.down('combo[name=inspectionscheduling_respuser_id]').setVisible(false);
                form.down('combo[name=firstassessment_respuser_id]').setVisible(false);
                form.down('combo[name=secondassessment_respuser_id]').setVisible(false);
                form.down('combo[name=assessmentreportreview_respuser_id]').setVisible(false);
            }
        /*mask = new Ext.LoadMask({
            target: form,
            msg: 'Please wait...'
        });*/
        next_stage.reset();
        
        if ((needs_directive) && (needs_directive == 1 || needs_directive === 1)) {
            directiveFld.allowBlank = false;
            directiveFld.validate();
            directiveFld.setVisible(true);
            directiveStore.removeAll();
            directiveStore.load({params: {category_id: directive_category}});
        } else {
            directiveFld.allowBlank = true;
            directiveFld.validate();
            directiveFld.setVisible(false);
        }
        if(is_external_usersubmission == 1){
            form.down('combo[name=external_user_id]').setVisible(true);
            form.down('combo[name=external_user_id]').allowBlank = false;

            form.down('combo[name=responsible_user]').setVisible(false);
            form.down('combo[name=responsible_user]').allowBlank = true;
        }
        else{
            if ((isToPortal) && (isToPortal == 1 || isToPortal === 1)) {
                responsibleUserFld.allowBlank = true;
                responsibleUserFld.validate();
                responsibleUserFld.reset();
                responsibleUserFld.setVisible(false);
    
            } else {
                responsibleUserFld.allowBlank = false;
                responsibleUserFld.validate();
                responsibleUserFld.setVisible(true);
            }
        }
       
        form.down('hiddenfield[name=workflowaction_type_id]').setValue(action_type_id);
        form.down('hiddenfield[name=is_external_usersubmission]').setValue(is_external_usersubmission);
       
        if(form.down('hiddenfield[name=is_inspection_submission]')){
            form.down('hiddenfield[name=is_inspection_submission]').setValue(is_inspection_submission);
        }
        if ((newVal) && newVal > 0) {
            next_stage.setLoading(true);
            //mask.show();
            Ext.Ajax.request({
                method: 'GET',
                url: 'workflow/getSubmissionNextStageDetails',
                params: {
                    current_stage: curr_stage,
                    application_code:application_code,
                    application_id:application_id,
                    action: newVal
                },
                success: function (response) {
                    next_stage.setLoading(false);
                    //mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        success = resp.success,
                        message = resp.message,
                        results = resp.results;
                    if (results) {
                        next_stage.setValue(results.nextstage_id);
                        form.down('combo[name=responsible_user]').setValue(results.responsible_user_id);
                        
                        if(has_multistage_assignment == 1){
                            screening_assignmentcbo.setValue(results.screening_stage_id);
                            inspectionsche_assignmentcbo.setValue(results.inspection_schedulingstage_id);
                            firstassessment_assignmentcbo.setValue(results.firstassessment_stage_id);
                            secondassessment_assignmentcbo.setValue(results.secondassessment_stage_id);
                           // assessreportreview_assignmentcbo.setValue(results.assessmentreport_reviewstage_id);
                            //set the users next stage 
                        }
                        
                    }
                },
                failure: function (response) {
                    next_stage.setLoading(false);
                    //mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    next_stage.setLoading(false);
                    //mask.hide();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        }
    },

    setReceivingWorkFlowNextStageDetails: function (cmb, newVal) {
        var form = cmb.up('form'),
            store = cmb.getStore(),
            record = store.getById(newVal),
            isToPortal = record.get('is_to_portal'),
            curr_stage = form.down('hiddenfield[name=curr_stage_id]').getValue(),
            next_stage = form.down('combo[name=next_stage]'),
            responsibleUserFld = form.down('combo[name=responsible_user]'),
            remarksFld = form.down('textarea[name=remarks]'),
            mask = new Ext.LoadMask({
                target: form,
                msg: 'Please wait...'
            });
        mask.show();
        next_stage.reset();
        if ((isToPortal) && (isToPortal == 1 || isToPortal === 1)) {
            responsibleUserFld.allowBlank = true;
            responsibleUserFld.validate();
            remarksFld.allowBlank = false;
            remarksFld.validate();
            responsibleUserFld.reset();
            responsibleUserFld.setVisible(false);
        } else {
            responsibleUserFld.allowBlank = false;
            responsibleUserFld.validate();
            remarksFld.allowBlank = true;
            remarksFld.validate();
            responsibleUserFld.setVisible(true);
        }
        Ext.Ajax.request({
            method: 'GET',
            url: 'workflow/getSubmissionNextStageDetails',
            params: {
                current_stage: curr_stage,
                action: newVal
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    results = resp.results;
                if (results) {
                    next_stage.setValue(results.nextstage_id);
                    //toastr.success(message, 'Success Response');
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
    },

    setManagerQueryWorkFlowNextStageDetails: function (cmb, newVal) {
        var form = cmb.up('form'),
            store = cmb.getStore(),
            record = store.getById(newVal),
            isToPortal = record.get('is_to_portal'),
            is_external_usersubmission = record.get('is_external_usersubmission'),
            needs_directive = record.get('needs_directive'),
            directive_category = record.get('directive_category'),
            curr_stage = form.down('hiddenfield[name=curr_stage_id]').getValue(),
            next_stage = form.down('combo[name=next_stage]'),
            responsibleUserFld = form.down('combo[name=responsible_user]'),
            directiveFld = form.down('combo[name=directive_id]'),
            directiveStore = directiveFld.getStore(),
            mask = new Ext.LoadMask({
                target: form,
                msg: 'Please wait...'
            });
        mask.show();
        next_stage.reset();
        if ((isToPortal) && (isToPortal == 1 || isToPortal === 1)) {
            responsibleUserFld.allowBlank = true;
            responsibleUserFld.validate();
            responsibleUserFld.reset();
            responsibleUserFld.setVisible(false);
            
        } else {
            responsibleUserFld.allowBlank = false;
            responsibleUserFld.validate();
            responsibleUserFld.setVisible(true);
            if(is_external_usersubmission == 1){
                form.down('combo[name=external_user_id]').setVisible(true);
                form.down('combo[name=responsible_user]').setVisible(false);
                form.down('combo[name=responsible_user]').setValue('');
    
            }
            else{
                form.down('combo[name=external_user_id]').setVisible(false);
                form.down('combo[name=responsible_user]').setVisible(true);
                form.down('combo[name=external_user_id]').setValue('');
    
            }
        }
        if ((needs_directive) && (needs_directive == 1 || needs_directive === 1)) {
            directiveFld.allowBlank = false;
            directiveFld.validate();
            directiveFld.setVisible(true);
            directiveStore.removeAll();
            directiveStore.load({params: {category_id: directive_category}});
        } else {
            directiveFld.allowBlank = true;
            directiveFld.validate();
            directiveFld.setVisible(false);
        }
       
        
        Ext.Ajax.request({
            method: 'GET',
            url: 'workflow/getSubmissionNextStageDetails',
            params: {
                current_stage: curr_stage,
                action: newVal
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    results = resp.results;
                if (results) {
                    next_stage.setValue(results.nextstage_id);
                    //toastr.success(message, 'Success Response');
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
    },

    showWorkFlowAssociatedMenus: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            workflow_id = record.get('id'),
            workflow_name = record.get('name'),
            grid = Ext.widget('workflowassociatedmenusgrid');
        grid.down('hiddenfield[name=workflow_id]').setValue(workflow_id);
        grid.down('displayfield[name=workflow_display]').setValue(workflow_name);
        funcShowCustomizableWindow('Workflow Associated Menus', '50%', grid, 'customizablewindow');
    }

});