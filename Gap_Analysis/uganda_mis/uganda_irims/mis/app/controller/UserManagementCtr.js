/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.controller.UserManagementCtr', {
    extend: 'Ext.app.Controller',
    stores: [
        'Admin.store.usermanagement.UserManagementGridAbstractStore',
        'Admin.store.usermanagement.UserManagementComboAbstractStore',
        'Admin.store.usermanagement.UsersStr',
        'Admin.store.usermanagement.PassResetOptionsStr'
    ],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }],

        control: {
            '#draggroupgrid_paging': {
                refresh: 'refreshUsersDragGroupsGrid',
                checkParams: 'checkDragGroupsParams'
            },
            '#dragrolegrid_paging': {
                refresh: 'refreshUsersDragDropGrids'
            },
            '#dropgroupgrid_paging': {
                refresh: 'refreshUsersDragDropGrids'
            },
            '#droprolegrid_paging': {
                refresh: 'refreshUsersDragDropGrids'
            },
            'passresetoptionsfrm button[action=reset_pwd_proceed]': {
                click: 'onPwdResetOptionProceed'
            },
            'userresetpwdfrm button[action=update_password]': {
                click: 'updateUserPassword'
            },
            'signatureuploadfrm button[name=upload_sign_btn]': {
                click: 'uploadSignatureFile'
            }
        }

    },

    /**
     * Called when the view is created
     */
    init: function () {

    },

    listen: {
        controller: {
            '*': {
                setUserGridsStore: 'setUserGridsStore',
                setUserCombosStore: 'setUserCombosStore'
            }
        }
    },

    setUserGridsStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.usermanagement.UserManagementGridAbstractStore', config);
        me.setStore(store);
        toolbar.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    setUserCombosStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.usermanagement.UserManagementComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    refreshUsersDragDropGrids: function (me) {
        var store = me.getStore(),
            mainTabPnl = this.getMainTabPanel(),
            active_tab = mainTabPnl.getActiveTab();
            if(active_tab.down('hiddenfield[name=active_user_id]')){
                active_user_id = active_tab.down('hiddenfield[name=active_user_id]').getValue();
                store.getProxy().extraParams = {
                    user_id: active_user_id
                };
            }else{
               api_user_id = active_tab.down('hiddenfield[name=api_user_id]').getValue(); 
               store.getProxy().extraParams = {
                    user_id: api_user_id
                };
            }
        
    },

    refreshUsersDragGroupsGrid: function (me) {
        var store = me.getStore(),
            mainTabPnl = this.getMainTabPanel(),
            active_tab = mainTabPnl.getActiveTab(),
            basicFrm = active_tab.down('userbasicinfofrm'),
            department_id = basicFrm.down('combo[name=department_id]').getValue(),
            zone_id = basicFrm.down('combo[name=zone_id]').getValue(),
            active_user_id = active_tab.down('hiddenfield[name=active_user_id]').getValue();
        store.getProxy().extraParams = {
            user_id: active_user_id,
            department_id: department_id,
            zone_id: zone_id
        };
    },

//api 

    refreshApiUsersDragGroupsGrid: function (me) {
        var store = me.getStore(),
            mainTabPnl = this.getMainTabPanel(),
            active_tab = mainTabPnl.getActiveTab(),
            basicFrm = active_tab.down('apiuserbasicinfofrm'),
            department_id = basicFrm.down('combo[name=department_id]').getValue(),
            zone_id = basicFrm.down('combo[name=zone_id]').getValue(),
            active_user_id = active_tab.down('hiddenfield[name=api_user_id]').getValue();
        store.getProxy().extraParams = {
            user_id: active_user_id,
            department_id: department_id,
            zone_id: zone_id
        };
    },

    checkDragGroupsParams: function (me) {1

        var store = me.getStore(),
            mainTabPnl = this.getMainTabPanel(),
            active_tab = mainTabPnl.getActiveTab(),
            basicFrm = active_tab.down('userbasicinfofrm'),
            department_id = basicFrm.down('combo[name=department_id]').getValue(),
            zone_id = basicFrm.down('combo[name=zone_id]').getValue();
        if (department_id && zone_id) {
            store.load();
        } else {
            toastr.warning('Select department and zone!!', 'Warning Response');
            return false;
        }
    },
   checkApiDragGroupsParams: function (me) {1

        var store = me.getStore(),
            mainTabPnl = this.getMainTabPanel(),
            active_tab = mainTabPnl.getActiveTab(),
            basicFrm = active_tab.down('apiuserbasicinfofrm'),
            department_id = basicFrm.down('combo[name=department_id]').getValue(),
            zone_id = basicFrm.down('combo[name=zone_id]').getValue();
        if (department_id && zone_id) {
            store.load();
        } else {
            toastr.warning('Select department and zone!!', 'Warning Response');
            return false;
        }
    },
    onPwdResetOptionProceed: function (btn) {
        var me = this,
            form = btn.up('form'),
            win1 = form.up('window'),
            option = form.down('combo[name=reset_option]').getValue(),
            user_id = form.down('hiddenfield[name=user_id]').getValue();
        if (option == 1 || option === 1) {
            me.resetUserPasswordToDefault(user_id, win1);
        } else {
            var form2 = Ext.widget('userresetpwdfrm');
            form2.down('hiddenfield[name=user_id]').setValue(user_id);
            win1.close();
            funcShowCustomizableWindow('Password Change Request', '30%', form2, 'customizablewindow');
        }
    },

    resetUserPasswordToDefault: function (user_id, win) {
        var mask = new Ext.LoadMask({
            msg: 'Please wait...',
            target: win
        });
        Ext.MessageBox.confirm('Confirm', 'This will reset user\'s credentials to default settings. Do you really want to perform this action?', function (btn) {
            if (btn === 'yes') {
                mask.show();
                Ext.Ajax.request({
                    url: 'usermanagement/resetUserPassword',
                    params: {
                        id: user_id
                    },
                    headers: {
                        'Authorization':'Bearer '+access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message,
                            success = resp.success;
                        mask.hide();
                        win.close();
                        if (success == true || success === true) {
                            toastr.success(message, 'Success Response');
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message,
                            success = resp.success;
                        toastr.error(message, 'Failure Response');
                        mask.hide();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        mask.hide();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },

    updateUserPassword: function (btn) {
        var win = btn.up('window'),
            form = win.down('form'),
            user_id = form.down('hiddenfield[name=user_id]').getValue(),
            new_pwd = form.down('textfield[name=new_password]').getValue(),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        Ext.MessageBox.confirm('Confirm', 'Are you sure to change your password?', function (btn) {
            if (btn === 'yes') {
                mask.show();
                Ext.Ajax.request({
                    url: 'usermanagement/updateUserPassword',
                    params: {
                        id: user_id,
                        new_pwd: new_pwd
                    },
                    headers: {
                        'Authorization':'Bearer '+access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message,
                            success = resp.success;
                        mask.hide();
                        win.close();
                        if (success == true || success === true) {
                            toastr.success(message, 'Success Response');
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message,
                            success = resp.success;
                        toastr.error(message, 'Failure Response');
                        mask.hide();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        mask.hide();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },

    uploadSignatureFile: function (btn) {
        var me = this,
            isWin = btn.isWin,
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm();
        frm.submit({
            url: 'usermanagement/uploadUserSignature',
            waitMsg: 'Uploading...',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    message = response.message,
                    success = response.success;
                if (success == true || success === true) {
                    toastr.success(message, 'Success Response');
                    win.close();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    message = response.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    }

});