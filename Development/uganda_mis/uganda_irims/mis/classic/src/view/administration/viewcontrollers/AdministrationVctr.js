/**
 * Created by Kip on 7/2/2018.
 */
Ext.define('Admin.view.administration.viewcontrollers.AdministrationVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.administrationvctr',

    setAdminGridsStore: function (obj, options) {
        this.fireEvent('setAdminGridsStore', obj, options);
    },

    setAdminCombosStore: function (obj, options) {
        this.fireEvent('setAdminCombosStore', obj, options);
    },

    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },

    showSimpleAdminModuleGridForm: function (btn) {
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

    showAddAdminParamWinFrm: function (btn) {
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

        //for group records popup
        if(btn.passedGroup == 1){
            var  grid = btn.up('grid'),
                 tabPnl = grid.up('tabpanel'),
                 group_id = tabPnl.down('hiddenfield[name=active_group_id]').getValue();
            child.down('hiddenfield[name=group_id]').setValue(group_id);
        }
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

    showSimpleAdminModuleTreeForm: function (btn) {//this applies to tree panels
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            formWidget = btn.form,
            grid = btn.up('treepanel'),
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

    showEditAdminParamGridFrm: function (item) {
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

    showFormFields: function (item) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            record = btn.getWidgetRecord(),
            form_id = record.get('id'),
            childWidget = item.childWidget,
            childObject = Ext.widget(childWidget),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        childObject.down('hiddenfield[name=form_id]').setValue(form_id);
        parentPanel.setTitle(record.get('name') + ' Fields');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }

        grid.hide();
        parentPanel.add(childObject);
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

    showAddFormFieldWinFrm: function (btn) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            grid = btn.up('grid'),
            form_id = grid.down('hiddenfield[name=form_id]').getValue(),
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        child.down('hiddenfield[name=form_id]').setValue(form_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

    showEditAdminParamWinFrm: function (item) {
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
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

    showGroupAllDetails: function (item) {
        var me = this,
            tabPnl = Ext.widget('groupdetailstabpanel'),
            btn = item.up('button'),
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            record = btn.getWidgetRecord(),
            group_id = record.get('id'),
            group_name = record.get('name');
        parentPanel.setTitle(group_name);
        tabPnl.down('hiddenfield[name=active_group_id]').setValue(group_id);
        grid.hide();
        parentPanel.add(tabPnl);
    },

    backFromGroupAllDetails: function (btn) {
        var tabPnl = btn.up('tabpanel'),
            parentPanel = tabPnl.up('panel'),
            grid = parentPanel.down('grid');
        parentPanel.setTitle('System User Groups');
        parentPanel.remove(tabPnl, true);
        grid.show();
    },

    showEditAdminParamTreeFrm: function (item) {//for tree panels
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('treepanel'),
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

    adminBackToDashboard: function (btn) {
        var currentPnl = btn.up('form'),
            containerPnlXtype = btn.containerPnlXtype,
            hiddenCompXtype = btn.hiddenCompXtype,
            containerPnl = btn.up(containerPnlXtype),
            grid = containerPnl.down(hiddenCompXtype);
        containerPnl.remove(currentPnl, true);
        grid.show();
    },

    backToFormsGrid: function (btn) {
        var currentPnl = btn.up(btn.currentPnlXtype),
            containerPnlXtype = btn.containerPnlXtype,
            hiddenCompXtype = btn.hiddenCompXtype,
            containerPnl = btn.up(containerPnlXtype),
            grid = containerPnl.down(hiddenCompXtype);
        containerPnl.setTitle('System Key Forms');
        containerPnl.remove(currentPnl, true);
        grid.show();
    },

    adminBackToDashboardFromAccessRoles: function (btn) {
        var currentPnl = btn.up('groupaccessrolespnl'),
            containerPnlXtype = btn.containerPnlXtype,
            hiddenCompXtype = btn.hiddenCompXtype,
            containerPnl = btn.up(containerPnlXtype),
            grid = containerPnl.down(hiddenCompXtype);
        containerPnl.remove(currentPnl, true);
        grid.show();
    },

    adminBackToTree: function (btn) {
        var me = this,
            form = btn.up('form'),
            containerPnlID = btn.containerPnlID,
            containerPnl = form.up('#' + containerPnlID),
            grid = containerPnl.down('treepanel');
        containerPnl.remove(form, true);
        grid.show();
    },

    showHideParent: function (combo, newVal, oldVal) {
        var me = this,
            selectedVal = newVal,
            form = combo.up('form'),
            childField = form.down('combo[name=child_id]'),
            parentField = form.down('combo[name=parent_id]');
        if (selectedVal == 1) {
            //show parent only
            parentField.setFieldLabel('Parent');
            childField.setVisible(false);
            parentField.setVisible(true);
        } else if (selectedVal == 2) {
            //show parent and child
            parentField.setFieldLabel('GrandParent');
            childField.setVisible(true);
            parentField.setVisible(true);
        } else {
            //hide both parent and child
            childField.setVisible(false);
            parentField.setVisible(false);
        }
    },

    filterChildMenus: function (combo, oldVal, newVal) {
        var me = this,
            selectedVal = newVal,
            form = combo.up('form'),
            childField = form.down('combo[name=child_id]'),
            parentField = form.down('combo[name=parent_id]'),
            levelField = form.down('combo[name=level]'),
            level_value = levelField.getValue();
        if (level_value > 1) {
            var store = childField.getStore(),
                parent_id = parentField.getValue();
            store.removeAll();
            store.load({params: {parent_id: parent_id}});
        }
    },

    doCreateAdminParam: function (btn) {
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
                        me.adminBackToDashboard(btn);
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

    doCreateAdminParamWin: function (btn) {
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
                waitMsg: 'Saving Parameter Details...',
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

    doDeleteAdminWidgetParam: function (item) {
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

    onRolesGroupGridItemClick: function (grid, record) {
        var me = this,
            accessRolesPanel = grid.up('systemaccessroles'),
            rolesPanel = accessRolesPanel.down('#rolesPanel'),
            rolesTreeStr = rolesPanel.down('systemrolestreegrid').getStore(),
            viewmodel = accessRolesPanel.getViewModel(),
            group_id = record.get('id'),
            name = record.get('name');
        viewmodel.set('currentGroup', group_id);
        rolesTreeStr.getProxy().extraParams = {
            user_group: group_id
        };
        rolesTreeStr.removeAll();
        rolesTreeStr.load();
        rolesPanel.setTitle('[<small>Group:</small> ' + name + '] Access Roles');
    },

    beforeRolesEdit: function (editor, context, eOpts) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {

        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            context.cancel = true;
        }
    },

    toggleSaveBtn: function (editor, e, eOpts) {
        var rolesTree = e.grid,
            saveBtn = rolesTree.down('button[name=saveRolesBtn]');
        saveBtn.setDisabled(false);
    },

    refreshSystemAccessRoles: function (btn) {
        var containerPnl = btn.up('panel'),
            menuRolesPanel = containerPnl.down('systemrolestreegrid'),
            processRolesPanel = containerPnl.down('menuprocessesrolesgrid'),
            viewmodel = containerPnl.getViewModel(),
            data = viewmodel.data,
            current_user_group = data.currentGroup,
            current_menu_id = data.currentMenuId,
            menuTreeStr = menuRolesPanel.store,//Ext.getStore('rolesTreeStr');
            processTreeStr = processRolesPanel.store;

        menuTreeStr.getProxy().setExtraParams({user_group: current_user_group});
        menuTreeStr.removeAll();
        menuTreeStr.load();
        processTreeStr.getProxy().setExtraParams({
            user_group: current_user_group,
            menu_id: current_menu_id
        });
        processTreeStr.removeAll();
        processTreeStr.load();
    },

    updateSystemAccessRoles: function (btn) {
        btn.setLoading(true);
        var me = this,
            containerPnl = btn.up('panel'),
            menuRolesPanel = containerPnl.down('systemrolestreegrid'),
            processRolesPanel = containerPnl.down('menuprocessesrolesgrid'),
            viewmodel = containerPnl.getViewModel(),
            data = viewmodel.data,
            current_user_group = data.currentGroup,
            current_menu_id = data.currentMenuId,
            menuTreeStr = menuRolesPanel.store,//Ext.getStore('rolesTreeStr');
            processTreeStr = processRolesPanel.store;
        var menuPermissions = [],
            menuLevels = [],
            menus = [],
            processPermissions = [],
            processLevels = [],
            processes = [];
        //for menus
        for (var i = 0; i < menuTreeStr.data.items.length; i++) {
            var record = menuTreeStr.data.items [i];
            if (record.dirty) {
                var permission_id = record.get('permission_id'),
                    level_id = record.get('level_id'),
                    menu_id = record.get('menu_id');
                menuPermissions.push(permission_id);
                menuLevels.push(level_id);
                menus.push(menu_id);
            }
        }
        //for non menus
        for (var j = 0; j < processTreeStr.data.items.length; j++) {
            var record2 = processTreeStr.data.items [j];
            if (record2.dirty) {
                var processPermission_id = record2.get('permission_id'),
                    processLevel_id = record2.get('level_id'),
                    process_id = record2.get('process_id');
                processPermissions.push(processPermission_id);
                processLevels.push(processLevel_id);
                processes.push(process_id);
            }
        }
        Ext.Ajax.request({
            url: 'administration/updateSystemAccessRoles',
            params: {
                menuPermission_id: menuPermissions.join(','),
                menuLevel_id: menuLevels.join(','),
                menu_id: menus.join(','),
                processPermission_id: processPermissions.join(','),
                processLevel_id: processLevels.join(','),
                process_id: processes.join(','),
                group_id: current_user_group
            },
            headers: {
                'Authorization':'Bearer '+access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success || success == true || success === true || success == '1') {
                    toastr.success(message, 'Success Response');
                    //btn.setDisabled(true);
                    Ext.Function.defer(function () {
                        menuTreeStr.getProxy().setExtraParams({user_group: current_user_group});
                        menuTreeStr.removeAll();
                        menuTreeStr.load();
                        processTreeStr.getProxy().setExtraParams({
                            user_group: current_user_group,
                            menu_id: current_menu_id
                        });
                        processTreeStr.removeAll();
                        processTreeStr.load();
                    }, 250);
                } else {
                    toastr.warning(message, 'Warning Response');
                }
                btn.setLoading(false);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                btn.setLoading(false);
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    updateSystemNavigationAccessRoles: function (btn) {
        btn.setLoading(true);
        var me = this,
            treePnl = btn.up('treepanel'),
            tabPnl = treePnl.up('tabpanel'),
            group_id = tabPnl.down('hiddenfield[name=active_group_id]').getValue(),
            menuTreeStr = treePnl.store,//Ext.getStore('rolesTreeStr');
            menuPermissions = [],
            menuLevels = [],
            menus = [];
        //for menus
        for (var i = 0; i < menuTreeStr.data.items.length; i++) {
            var record = menuTreeStr.data.items [i];
            if (record.dirty) {
                var permission_id = record.get('permission_id'),
                    level_id = record.get('level_id'),
                    menu_id = record.get('menu_id');
                menuPermissions.push(permission_id);
                menuLevels.push(level_id);
                menus.push(menu_id);
            }
        }
        Ext.Ajax.request({
            url: 'administration/updateSystemNavigationAccessRoles',
            params: {
                menuPermission_id: menuPermissions.join(','),
                menuLevel_id: menuLevels.join(','),
                menu_id: menus.join(','),
                group_id: group_id
            },
            headers: {
                'Authorization':'Bearer '+access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success || success == true || success === true || success == '1') {
                    toastr.success(message, 'Success Response');
                    //btn.setDisabled(true);
                    Ext.Function.defer(function () {
                        menuTreeStr.removeAll();
                        menuTreeStr.load();
                    }, 250);
                } else {
                    toastr.warning(message, 'Warning Response');
                }
                btn.setLoading(false);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                btn.setLoading(false);
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    updateSystemPermissionsAccessRoles: function (btn) {
        btn.setLoading(true);
        var me = this,
            grid = btn.up('grid'),
            tabPnl = grid.up('tabpanel'),
            group_id = tabPnl.down('hiddenfield[name=active_group_id]').getValue(),
            processTreeStr = grid.store;
        var processPermissions = [],
            processLevels = [],
            processes = [];
        //for non menus
        for (var j = 0; j < processTreeStr.data.items.length; j++) {
            var record2 = processTreeStr.data.items [j];
            if (record2.dirty) {
                var processPermission_id = record2.get('permission_id'),
                    processLevel_id = record2.get('level_id'),
                    process_id = record2.get('process_id');
                processPermissions.push(processPermission_id);
                processLevels.push(processLevel_id);
                processes.push(process_id);
            }
        }
        Ext.Ajax.request({
            url: 'administration/updateSystemPermissionAccessRoles',
            params: {
                processPermission_id: processPermissions.join(','),
                processLevel_id: processLevels.join(','),
                process_id: processes.join(','),
                group_id: group_id
            },
            headers: {
                'Authorization':'Bearer '+access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success || success == true || success === true || success == '1') {
                    toastr.success(message, 'Success Response');
                    //btn.setDisabled(true);
                    Ext.Function.defer(function () {
                        processTreeStr.removeAll();
                        processTreeStr.load();
                    }, 250);
                } else {
                    toastr.warning(message, 'Warning Response');
                }
                btn.setLoading(false);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                btn.setLoading(false);
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    resetAccessRoles: function (btn) {
        var me = this,
            rolesTree = btn.up('treepanel'),
            rolesTreeStr = rolesTree.store,
            accessRolesPanel = rolesTree.up('systemaccessroles'),
            viewmodel = accessRolesPanel.getViewModel(),
            data = viewmodel.data,
            current_user_group = data.currentGroup;
        rolesTreeStr.getProxy().setExtraParams({user_group: current_user_group});
        rolesTreeStr.removeAll();
        rolesTreeStr.load();
    },

    onMenuItemTreeItemDblClick: function (treePnl, record) {
        var menu_id = record.get('menu_id'),
            menu_name = record.get('menu_name'),
            rolesPnl = treePnl.up('groupaccessrolespnl'),
            nonMenuPnl = rolesPnl.down('menuprocessesrolesgrid'),
            nonMenuConPnl = rolesPnl.down('#nonMenuItemsId'),
            nonMenuRolesStore = nonMenuPnl.getStore(),//Ext.getStore('nonmenuitemsrolestreestr'),
            viewmodel = rolesPnl.getViewModel(),
            data = viewmodel.data,
            current_user_group = data.currentGroup;
        viewmodel.set('currentMenuId', menu_id);
        nonMenuConPnl.setTitle(menu_name + ": Processes");
        nonMenuRolesStore.getProxy().extraParams = {
            menu_id: menu_id,
            user_group: current_user_group
        };
        nonMenuRolesStore.removeAll();
        nonMenuRolesStore.load();
    },

    onNavigationSelectionChange: function (sm, records) {
        var menu_id = records[0].get('id'),
            menu_name = records[0].get('name'),
            grid = sm.view.grid,
            parentPnl = grid.up('menuprocessespnl'),
            processesGrid = parentPnl.down('menuprocessesgrid'),
            store = processesGrid.getStore();
        processesGrid.down('hiddenfield[name=menu_id]').setValue(menu_id);
        processesGrid.down('displayfield[name=menu_display]').setValue(menu_name + ' Processes');
        store.removeAll();
        store.load();
    },

    showAddMenuProcessWin: function (btn) {
        var grid = btn.up('grid'),
            menu_id = grid.down('hiddenfield[name=menu_id]').getValue(),
            menu_name = grid.down('displayfield[name=menu_display]').getValue();
        if (!menu_id) {
            toastr.warning('Select the menu item first!!', 'Warning Response');
            return false;
        }
        var form = Ext.widget('menuprocessesfrm');
        form.down('hiddenfield[name=menu_id]').setValue(menu_id);
        funcShowCustomizableWindow(menu_name, '30%', form, 'customizablewindow');
    },

    showMenuWorkflowStageLink: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            menu_id = record.get('id'),
            workflow_id = record.get('workflow_id'),
            menu_name = record.get('name'),
            form = Ext.widget('menusstagesfrm');

        Ext.getBody().mask('Please wait...');
        Ext.Ajax.request({
            url: 'workflow/getMenuWorkflowLinkages',
            method: 'GET',
            params: {
                menu_id: menu_id,
                workflow_id: workflow_id
            },
            headers: {
                'Authorization':'Bearer '+access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                if (success == true || success === true) {
                    var results = resp.results,
                        model = Ext.create('Ext.data.Model', results);
                    form.loadRecord(model);
      
                    funcShowCustomizableWindow(menu_name, '40%', form, 'customizablewindow');
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
    },

    showMenuWorkFlowsLink: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            menu_id = record.get('id'),
            menu_name = record.get('name'),
            form = Ext.widget('menusworkflowsfrm');
        Ext.getBody().mask('Please wait...');
        Ext.Ajax.request({
            url: 'workflow/getMenuWorkFlowsLinkages',
            method: 'GET',
            params: {
                menu_id: menu_id
            },
            headers: {
                'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                if (success == true || success === true) {
                    var results = resp.results,
                        model = Ext.create('Ext.data.Model', results);
                    form.loadRecord(model);
                    funcShowCustomizableWindow(menu_name, '40%', form, 'customizablewindow');
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
    },

    filterWorkflowStages: function (cmb, newVal) {
        var form = cmb.up('form'),
            stages_cmbo = form.down('combo[name=workflow_stages]'),
            stages_str = stages_cmbo.store;
        //stages_cmbo.reset();
        stages_str.removeAll();
        stages_str.load({params: {workflow_id: newVal}});
    },

    deleteMenuWorkflowLinkage: function (btn) {
        var form = btn.up('form'),
            win = form.up('window'),
            menu_id = form.down('hiddenfield[name=menu_id]').getValue(),
            store = Ext.getStore('systemmenusstr'),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        Ext.MessageBox.confirm('Delete', 'Are you sure to perform this action ?', function (button) {
            if (button === 'yes') {
                mask.show();
                Ext.Ajax.request({
                    url: 'workflow/deleteMenuWorkflowLinkage',
                    params: {
                        menu_id: menu_id
                    },
                    headers: {
                        'Authorization':'Bearer '+access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        mask.hide();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message,
                            success = resp.success;
                        if (success == true || success === true) {
                            toastr.success(message, 'Success Response');
                            store.removeAll();
                            store.load();
                            win.close();
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
                        toastr.error('Error deleting data: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },

    deleteMenuWorkFlowsLinkage: function (btn) {
        var form = btn.up('form'),
            win = form.up('window'),
            menu_id = form.down('hiddenfield[name=menu_id]').getValue(),
            store = Ext.getStore('systemmenusstr'),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        Ext.MessageBox.confirm('Delete', 'Are you sure to perform this action ?', function (button) {
            if (button === 'yes') {
                mask.show();
                Ext.Ajax.request({
                    url: 'workflow/deleteMenuWorkFlowsLinkage',
                    params: {
                        menu_id: menu_id
                    },
                    headers: {
                        'Authorization':'Bearer '+access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        mask.hide();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message,
                            success = resp.success;
                        if (success == true || success === true) {
                            toastr.success(message, 'Success Response');
                            store.load();
                            win.close();
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
                        toastr.error('Error deleting data: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },

    removeSelectedUsersFromGroup: function (button) {
        var me = this,
            grid = button.up('grid'),
            tabPnl = grid.up('tabpanel'),
            group_id = tabPnl.down('hiddenfield[name=active_group_id]').getValue(),
            store = grid.getStore(),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected = [];
        if (!sm.hasSelection()) {
            toastr.warning('No record selected. Please select a record(s) to remove!!', 'Warning Response');
            return;
        }
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to remove selected user(s)?', function (btn) {
            if (btn === 'yes') {
                Ext.getBody().mask('Please wait...');
                Ext.each(selected_records, function (item) {
                    selected.push(item.data.id);
                });
                Ext.Ajax.request({
                    url: 'administration/removeSelectedUsersFromGroup',
                    params: {
                        group_id: group_id,
                        selected: JSON.stringify(selected)
                    },
                    headers: {
                        'Authorization':'Bearer '+access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success || success == true || success === true) {
                            sm.deselectAll();
                            toastr.success(message, 'Success Response!!');
                            store.load();
                        } else {
                            toastr.error(message, 'Failure Response!!');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        toastr.warning(message, 'Failure Response!!');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },

    printReport: function (btn) {
        var url = '/reports/generateReport';
        print_report(base_url + url);
    },

    sysncUserGroup: function(btn) {
        var userGrid = btn.up('grid'),
            store = userGrid.getStore(),
            store2 = Ext.getStore('usersstr'),
            win = userGrid.up('window'),
            sm =userGrid.getSelectionModel(),
            group_id = userGrid.down('hiddenfield[name=group_id]').getValue(),
            selected = [];

        if (sm.hasSelection()) {
           var row = sm.getSelection();

           Ext.each(row, function(ob){
                 selected.push(ob.get('id'));
            });


             Ext.Ajax.request({
                    url: 'administration/addSelectedUsersFromGroup',
                    params: {
                        selected: JSON.stringify(selected),
                        group_id: group_id
                    },
                    headers: {
                        'Authorization':'Bearer '+access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success || success == true || success === true) {
                            sm.deselectAll();
                            toastr.success(message, 'Success Response!!');
                            store.load();
                            store2.reload();
                            win.close();
                        } else {
                            toastr.error(message, 'Failure Response!!');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        toastr.warning(message, 'Failure Response!!');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });

        }else{
            toastr.warning('Please select atleast one user', 'No selection');
        }
    
        
    },
    loadWorkflowstages: function(sel, record, index, eOpts) {
        var grid = this.up('grid'),
            tabPnl = grid.up('tabpanel'),
            group_id = tabPnl.down('hiddenfield[name=active_group_id]').getValue(),
            store = Ext.getStore('syncworkflowstagesgridstr');

        store.load({params:{'workflow_id':record.get('id'),'group_id':group_id}});
    
        
    },
    syncGrouptoWorkflow:function(btn) {
        var grid = btn.up('grid'),
            store = grid.getStore(),
            sm =grid.getSelectionModel(),
            tabPnl = grid.up('tabpanel'),
            group_id = tabPnl.down('hiddenfield[name=active_group_id]').getValue(),
            workflow_id = grid.down('hiddenfield[name=workflow_id]').getValue(),
            selected = [];

        if (sm.hasSelection()) {
           var row = sm.getSelection();

           Ext.each(row, function(ob){
                 selected.push(ob.get('stage_id'));
            });


             Ext.Ajax.request({
                    url: 'administration/mapGroupToStage',
                    method: 'POST',
                    params: {
                        selected: JSON.stringify(selected),
                        group_id: group_id,
                        workflow_id:workflow_id
                    },
                    headers: {
                        'Authorization':'Bearer '+access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success || success == true || success === true) {
                            sm.deselectAll();
                            toastr.success(message, 'Success Response!!');
                            store.load();
                        } else {
                            toastr.error(message, 'Failure Response!!');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        toastr.warning(message, 'Failure Response!!');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });

        }else{
            toastr.warning('Please select atleast one user', 'No selection');
        }
    
        
    },
    syncApplicationAssignmentSetup: function (btn) {
        var grid = btn.up('grid'),
            store = grid.getStore(),
            sm =grid.getSelectionModel(),
            tabPnl = grid.up('tabpanel'),
            group_id = grid.down('hiddenfield[name=group_id]').getValue(),
            selected = [];

        //if (sm.hasSelection()) {
        if (true) {
           var row = sm.getSelection();

           Ext.each(row, function(ob){
                 selected.push(ob.get('process_id'));
            });


             Ext.Ajax.request({
                    url: 'administration/mapApplicationAssignmentSetup',
                    method: 'POST',
                    params: {
                        selected: JSON.stringify(selected),
                        group_id: group_id
                    },
                    headers: {
                        'Authorization':'Bearer '+access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success || success == true || success === true) {
                            sm.deselectAll();
                            toastr.success(message, 'Success Response!!');
                            store.load();
                        } else {
                            toastr.error(message, 'Failure Response!!');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        toastr.warning(message, 'Failure Response!!');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });

        }else{
            toastr.warning('Please select atleast one process', 'No selection');
        }
    },
  //  loadParameterConfig: function(chk, newVal, oldVal, eopts) {
  //      var form = chk.up('form'),
  //          id = form.down('hiddenfield[name=id]').getValue();
          
       
  //      if(newVal == 1){
  //           Ext.getBody().mask('loading.....');
  //           Ext.Ajax.request({
  //                   url: 'administration/checkParamMenuDefination',
  //                   method: 'GET',
  //                   params: {
  //                       menu_id: id
  //                   },
  //                   headers: {
  //                       'Authorization':'Bearer '+access_token,
  //                       'X-CSRF-Token': token
  //                   },
  //                   success: function (response) {
  //                       var resp = Ext.JSON.decode(response.responseText),
  //                           success = resp.success,
  //                           message = resp.message;
  //                       if (success || success == true || success === true) {
  //                           Ext.getBody().unmask();
  //                            if(resp.is_defined){
  //                              var btn = Ext.create('Ext.Button', {
  //                                 iconCls: 'fa fa-cog',
  //                                 action: 'view',
  //                                 name: 'config_btn',
  //                                 text: 'View Parameter Config',
  //                                 handler: 'setConfigForm'
  //                               }); 
  //                              form.add(btn); 
  //                          }else{
  //                             var btn = Ext.create('Ext.Button', {
  //                                 text: 'Configure Parameter',
  //                                 iconCls: 'fa fa-cog',
  //                                 action: 'add',
  //                                 name: 'config_btn',
  //                                 handler: 'setConfigForm' 
  //                               });
  //                               form.add(btn);   
  //                          }
  //                       } else {
  //                            Ext.getBody().unmask();
  //                           toastr.error(message, 'Failure Response!!');
  //                       }
  //                   },
  //                   failure: function (response) {
  //                       var resp = Ext.JSON.decode(response.responseText),
  //                           success = resp.success,
  //                           message = resp.message;
  //                       toastr.warning(message, 'Failure Response!!');
  //                        Ext.getBody().unmask();
  //                   },
  //                   error: function (jqXHR, textStatus, errorThrown) {
  //                       toastr.error('Error: ' + errorThrown, 'Error Response');
  //                        Ext.getBody().unmask();
  //                   }
  //               });
  //      }else{
  //          var btn = form.down('button[name=config_btn]');
  //          btn.destroy();
  //      }
  //  },
  //  setConfigForm:function(btn) {
   
  //   var form = btn.up('form'),
  //       menu_id = form.down('hiddenfield[name=id]').getValue(),
  //       button = form.down('button[action=save]'),
  //       edit = 0,
  //       me = this;   
  //   //set view type for params
  //   form.down('textfield[name=viewType]').setValue('parameterView');
  //   form.down('textfield[name=routeId]').setValue('parameterView');
    


  //   if(btn.action == 'view'){
  //       edit = 1;
  //       Ext.getBody().mask('Loading...');
  //       Ext.Ajax.request({
  //                   url: 'administration/getParameterConfig',
  //                   method: 'GET',
  //                   params: {
  //                       menu_id: menu_id
  //                   },
  //                   headers: {
  //                       'Authorization':'Bearer '+access_token,
  //                       'X-CSRF-Token': token
  //                   },
  //                   success: function (response) {
  //                       Ext.getBody().unmask();
  //                       var resp = Ext.JSON.decode(response.responseText),
  //                           success = resp.success,
  //                           message = resp.message;
  //                           results = resp.results;
  //                       if (success || success == true || success === true) {
  //                          var form = Ext.widget('parameterformfieldsfrm');
  //                          var menu_id =resp.menu_id;
  //                          if(menu_id != 0){
  //                              form.down('hiddenfield[name=menu_id]').setValue(menu_id);
  //                              form.down('numberfield[name=no_joins]').setValue(resp.no_joins);
  //                              form.down('textfield[name=param_title]').setValue(results['param_title']);
  //                              form.down('textfield[name=param_name]').setValue(results['param_name']);
  //                              form.down('textfield[name=table_name]').setValue(results['table_name']);
  //                              var btn = form.down('button[name = add_tables]');
  //                              me.addTableJoinsDefination(btn);
                              
  //                              model = Ext.create('Ext.data.Model', results);
  //                              form.loadRecord(model);
  //                              funcShowCustomizableWindow("Config Parameter", '80%', form, 'customizablewindow');

  //                          }
  //                       } else {
  //                           toastr.error(message, 'Failure Response!!');
  //                       }
  //                   },
  //                   failure: function (response) {
  //                       Ext.getBody().unmask();
  //                       var resp = Ext.JSON.decode(response.responseText),
  //                           success = resp.success,
  //                           message = resp.message;
  //                       toastr.warning(message, 'Failure Response!!');
  //                   },
  //                   error: function (jqXHR, textStatus, errorThrown) {
  //                       Ext.getBody().unmask();
  //                       toastr.error('Error: ' + errorThrown, 'Error Response');
  //                   }
  //               });
  //       }
       
  //      this.saveMenuItem(button, edit);
  //  },
  //  addTableJoinsDefination: function(btn) {
  //      var form = btn.up('form'),
  //          fieldset = form.down('fieldset[name=joins_fs]'),
  //          no_field = form.down('numberfield[name=no_joins]'),
  //          no = no_field.getValue(),
  //          save_btn = form.down('button[action=save]'),
  //          joins_fieldsets = form.down('fieldset[name=joins_fieldsets]'),
  //          frm = form.getForm();
      
  //     if(frm.isValid()){
          
  //           no_field.setReadOnly(true);
  //          btn.setDisabled(true);
       
  //       for (var i = no-1; i >= 0; i--) {
  //           var join_type_id = 'join_type_id'+i,
  //               join_table_name = 'join_table_name'+i,
  //               join_column_name = 'join_column_name'+i,
  //               join_disp_column_name = 'join_disp_column_name'+i,
  //               param_column_name = 'param_column_name'+i;

  //           var fieldset = Ext.create('Ext.form.FieldSet' , {
  //               layout: 'column',
  //               title: 'Join table',
  //               name: 'joins_definations',
  //               defaults: {
  //                   labelAlign: 'top',
  //                   margin: '0 20 0 0'
  //               },
  //               items :[{
  //                       xtype: 'combobox',
  //                       queryMode: 'local',
  //                       fieldLabel: 'Join Type',
  //                       displayField: 'name',
  //                       valueField: 'id',
  //                       name: join_type_id+'',
  //                       columnWidth: 0.2,
  //                       listeners:
  //                        {
  //                            beforerender: {
  //                               fn: 'setAdminCombosStore',
  //                               config: {
  //                                   pageSize: 10000,
  //                                   proxy: {
  //                                       url: 'commonparam/getCommonParamFromTable',
  //                                   extraParams:{
  //                                           table_name: 'par_join_types'
  //                                       }
  //                                   }
  //                               },
  //                               isLoad: true
  //                           }
                             
  //                        }
                
  //                     },{
  //                       xtype: 'combobox',
  //                       queryMode: 'local',
  //                       fieldLabel: 'Join Table',
  //                       displayField: 'table_name',
  //                       valueField: 'table_name',
  //                       name: join_table_name+'',
  //                       columnWidth: 0.25,
  //                       listeners:
  //                        {
  //                            beforerender: {
  //                               fn: 'setAdminCombosStore',
  //                               config: {
  //                                   pageSize: 10000,
  //                                   proxy: {
  //                                       url: 'audittrail/getTableslist'
  //                                   }
  //                               },
  //                               isLoad: true
  //                           },
  //                           change: function(combo, newVal, oldVal, eOpts) {
                               
  //                               var form = combo.up('fieldset'),
  //                                   join_column_nameStr = form.down("combo[action=column_name]").getStore();
  //                                   join_column_dispStr = form.down("combo[action=disp_column_name]").getStore();

  //                               join_column_nameStr.removeAll();
  //                               join_column_nameStr.load({params:{'table_name':newVal}});
  //                               join_column_dispStr.removeAll();
  //                               join_column_dispStr.load({params:{'table_name':newVal}});

  //                               //main table
  //                               var main_form = combo.up('form'),
  //                                   param_table = main_form.down('combo[name=table_name]').getValue(),
  //                                   param_column_Str = form.down('combo[action=param_column_name]').getStore();
                                    
  //                                param_column_Str.removeAll();
  //                                param_column_Str.load({params:{'table_name':param_table}});


  //                           },
                             
  //                        }
                
  //                     },{
  //                       xtype: 'combobox',
  //                       queryMode: 'local',
  //                       fieldLabel: 'Join Column',
  //                       displayField: 'column_name',
  //                       valueField: 'column_name',
  //                       action: 'column_name',
  //                       name: join_column_name+'',
  //                       columnWidth: 0.2,
  //                       listeners:
  //                        {
  //                            beforerender: {
  //                               fn: 'setAdminCombosStore',
  //                               config: {
  //                                   pageSize: 10000,
  //                                   proxy: {
  //                                       url: 'administration/getTablescolumns'
  //                                   }
  //                               },
  //                               isLoad: false
  //                           }   
                             
  //                        }
                
  //                     },{
  //                       xtype: 'combobox',
  //                       queryMode: 'local',
  //                       fieldLabel: 'Display Column',
  //                       displayField: 'column_name',
  //                       valueField: 'column_name',
  //                       action: 'disp_column_name',
  //                       name: join_disp_column_name+'',
  //                       columnWidth: 0.2,
  //                       listeners:
  //                        {
  //                            beforerender: {
  //                               fn: 'setAdminCombosStore',
  //                               config: {
  //                                   pageSize: 10000,
  //                                   proxy: {
  //                                       url: 'administration/getTablescolumns'
  //                                   }
  //                               },
  //                               isLoad: false
  //                           }   
                             
  //                        }
                
  //                     },{
  //                       xtype: 'combobox',
  //                       queryMode: 'local',
  //                       fieldLabel: 'Param Column',
  //                       displayField: 'column_name',
  //                       valueField: 'column_name',
  //                       action: 'param_column_name',
  //                       name: param_column_name+'',
  //                       columnWidth: 0.2,
  //                       listeners:
  //                        {
  //                            beforerender: {
  //                               fn: 'setAdminCombosStore',
  //                               config: {
  //                                   pageSize: 10000,
  //                                   proxy: {
  //                                       url: 'administration/getTablescolumns'
  //                                   }
  //                               },
  //                               isLoad: false
  //                           },
  //                           afterRender: function(me,eopts) {
  //                               var form = me.up('form'),
  //                                   param_table = form.down('combo[name=table_name]').getValue()
  //                                   store = me.getStore();
  //                               store.removeAll();
  //                               store.load({params:{table_name:param_table}});
  //                           }, 
                             
  //                        }
                
  //                     },{
  //                         xtype: 'textfield',
  //                         name: 'table_label'+i,
  //                         fieldLabel: 'Label',
  //                         columnWidth: 0.15
  //                     }]
  //           });
  //       joins_fieldsets.add(fieldset);
  //       }
  //      }else{
  //         toastr.warning("Please Fill all the Initial Parameter Details", 'Failure Response!!'); 
  //      }
                              

  //  },
  saveMenuItem: function(btn) {
      var me = this,
            action_url = btn.action_url,
            menu_form = btn.up('form'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = menu_form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Saving Menu First...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        store.removeAll();
                        store.load();

                        // if(edit == 0){
                        //      var form = Ext.widget('parameterformfieldsfrm');
                        //      var menu_id =response.record_id;
                        //        if(menu_id != 0){
                        //            form.down('hiddenfield[name=menu_id]').setValue(menu_id);

                        //            funcShowCustomizableWindow("Config Parameter", '80%', form, 'customizablewindow');  
                        //            }
                        //         else{
                        //             toastr.error("Failed to get Menu", 'Failure Response');
                        //         }

                        //   }else{
                        //       menu_form.down('hiddenfield[name=id]').setValue(menu_id);
                        //   }
                         me.adminBackToDashboard(btn);
                      
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
  // saveParameterConfig: function(btn) {
  //     var form =  Ext.ComponentQuery.query("#systemmenusfrmId")[0],
  //         me = this,
  //         save_btn = form.down('button[action=save]'); 
  //     me.adminBackToDashboard(save_btn);
  //     me.doCreateAdminParamWin(btn);
  // },
  // removeTableJoinsDefination: function(btn) {
  //     var fieldset = btn.up('fieldset'),
  //         no = fieldset.down('numberfield[name=no_joins]').getValue(),
  //         form = fieldset.up('form');
      
  //            form.down('fieldset[name=joins_fieldsets]').removeAll();
       
      
  //     form.down('numberfield[name=no_joins]').setReadOnly(false);
  //     form.down('button[name=add_tables]').setDisabled(false);
  // },

});