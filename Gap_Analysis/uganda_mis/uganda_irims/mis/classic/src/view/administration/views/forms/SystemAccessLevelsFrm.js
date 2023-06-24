/**
 * Created by Kip on 7/10/2018.
 */
Ext.define('Admin.view.administration.views.forms.SystemAccessLevelsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'systemaccesslevelsfrm',
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
        value: 'par_accesslevels',
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
    }, {
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
                {
                    text: 'Back',
                    iconCls: 'x-fa fa-backward',
                    action: 'back',
                    containerType: 'form',
                    containerPnlID: 'SystemAccessLevelsDashboard',
                    containerPnlXtype: 'systemaccesslevelspnl',
                    hiddenCompXtype: 'systemaccesslevelsgrid',
                    ui: 'soft-purple',
                    handler: 'adminBackToDashboard'
                },'->', {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'par_accesslevels',
                    storeID: 'systemaccesslevelsstr',
                    containerPnlID: 'SystemAccessLevelsDashboard',
                    containerPnlXtype: 'systemaccesslevelspnl',
                    hiddenCompXtype: 'systemaccesslevelsgrid',
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