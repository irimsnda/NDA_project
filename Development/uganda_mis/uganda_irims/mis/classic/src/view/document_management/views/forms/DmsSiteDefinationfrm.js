/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.forms.DmsSiteDefinationfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'dmssitedefinationfrm',
    controller: 'documentsManagementvctr',
    autoScroll: true,
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
        value: 'tra_dmsdocument_sites',
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
        fieldLabel: 'DMS Site Name',
        margin: '0 20 20 0',
        name: 'name'
    }, {
        xtype: 'textfield',
        fieldLabel: 'DMS Site ID',
        margin: '0 20 20 0',
        name: 'site_id'
    }, {
        xtype: 'textfield',
        fieldLabel: 'DMS Document Library Reference No',
        margin: '0 20 20 0',
        inputValue: 1,
        name: 'node_ref'
    },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    },{
        xtype: 'checkbox',
        fieldLabel: 'IS DMS Root Site',
        margin: '0 20 20 0',
        name: 'is_dmssite_root',
        allowBlank: true
    }],
    dockedItems:[{
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_dmsdocument_sites',
                    storeID: 'dmssitedefinationstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'documentmanagement/saveDMSSiteDefinationDetails',
                    handler: 'doCreateConfigParamWin'
                },{
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