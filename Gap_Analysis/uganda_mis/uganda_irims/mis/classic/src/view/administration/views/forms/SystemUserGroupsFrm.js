/**
 * Created by Kip on 7/11/2018.
 */
Ext.define('Admin.view.administration.views.forms.SystemUserGroupsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'systemusergroupsfrm',
    autoScroll: true,
    controller: 'administrationvctr',
    layout: 'form',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'par_groups',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Name',
        margin: '0 20 20 0',
        name: 'name'
    },{
        xtype: 'combo',
        fieldLabel: 'User Category',
        forceSelection: true,
        columnWidth: 0.25,
        allowBlank: false,
        queryMode: 'local',
        margin: '0 20 0 0',
        name: 'user_category_id',
        displayField: 'name',
        valueField: 'id',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_user_categories'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmb, newVal,oldvalue,eopts) {
                var form = cmb.up('form'),
                    externalCat=form.down('combo[name=externaluser_category_id]'),
                    ints=form.down('textfield[name=institution]');
                if(newVal==2){
                      externalCat.setVisible(true);
                      ints.setVisible(true);
                  }else{
                      externalCat.setVisible(false);
                      ints.setVisible(false);
                 }
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'External User Category',
        forceSelection: true,
        columnWidth: 0.25,
        allowBlank: true,
        hidden: true,
        queryMode: 'local',
        margin: '0 20 0 0',
        name: 'externaluser_category_id',
        displayField: 'name',
        valueField: 'id',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_externaluser_categories'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textfield',
        name: 'institution',
        hidden: true,
        fieldLabel: 'Institution',
        allowBlank: true
    },

    {
        xtype: 'combo',
        fieldLabel: 'System Dashboard',
        forceSelection: true,
        columnWidth: 0.25,
        allowBlank: true,
        queryMode: 'local',
        margin: '0 20 0 0',
        name: 'system_dashboard_id',
        displayField: 'name',
        valueField: 'id',
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    storeId: 'systemdashboardsgridstr',
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams:{
                            table_name: 'par_system_dashboards'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        store: 'confirmationstr',
        name: 'is_super_group',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        allowBlank: true,
        forceSelection: true,
        fieldLabel: 'Is Super Group',
        hidden: Admin.global.GlobalVars.checkForProcessVisibility('is_super_group')
    }, {
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    text: 'Back',
                    iconCls: 'x-fa fa-backward',
                    action: 'back',
                    containerType: 'form',
                    containerPnlID: 'SystemUserGroupsDashboard',
                    containerPnlXtype: 'systemusergroupspnl',
                    hiddenCompXtype: 'systemusergroupsgrid',
                    ui: 'soft-purple',
                    handler: 'adminBackToDashboard'
                }, '->', {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'menus',
                    storeID: 'systemusergroupsstr',
                    containerPnlID: 'SystemUserGroupsDashboard',
                    containerPnlXtype: 'systemusergroupspnl',
                    hiddenCompXtype: 'systemusergroupsgrid',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'administration/saveAdminCommonData',
                    handler: 'doCreateAdminParam'
                }, {
                    text: 'Reset',
                    iconCls: 'x-fa fa-close',
                    ui: 'soft-purple',
                    handler: function (btn) {
                        btn.up('form').getForm().reset();
                    }
                }
            ]
        }
    ]
});