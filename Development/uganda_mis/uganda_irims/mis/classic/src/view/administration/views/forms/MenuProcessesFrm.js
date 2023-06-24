/**
 * Created by Kip on 8/24/2018.
 */
Ext.define('Admin.view.administration.views.forms.MenuProcessesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'menuprocessesfrm',
    autoScroll: true,
    controller: 'administrationvctr',
    layout: 'form',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'par_menuitems_processes',
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
        fieldLabel: 'Permission Name',
        margin: '0 20 20 0',
        name: 'name',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Permission Identifier',
        margin: '0 20 20 0',
        name: 'identifier',
        allowBlank: false
    },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->', {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'par_menuitems_processes',
                    storeID: 'menuprocessesstr',
                    containerPnlID: 'MenuProcessesDashboard',
                    hiddenCompXtype: 'menuprocessesgrid',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'administration/saveAdminCommonData',
                    handler: 'doCreateAdminParamWin'
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