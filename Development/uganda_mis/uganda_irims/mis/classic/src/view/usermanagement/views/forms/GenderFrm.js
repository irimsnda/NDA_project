/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.usermanagement.views.forms.GenderFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'genderfrm',
    autoScroll: true,
    controller: 'usermanagementvctr',
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
        value: 'par_gender',
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
                    containerPnlID: 'GenderDashboard',
                    containerPnlXtype: 'genderpnl',
                    hiddenCompXtype: 'gendergrid',
                    ui: 'soft-purple',
                    handler: 'userBackToDashboard',
                    containerType: 'form'
                },'->', {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'par_titles',
                    storeID: 'genderstr',
                    containerPnlID: 'GenderDashboard',
                    containerPnlXtype: 'genderpnl',
                    hiddenCompXtype: 'gendergrid',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'usermanagement/saveUserCommonData',
                    handler: 'doCreateUserParam',
                    containerType: 'form'
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