/**
 * Created by Kip on 2/19/2019.
 */
Ext.define('Admin.view.configurations.views.forms.EmailTemplatesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'emailtemplatesfrm',
    autoScroll: true,
    controller: 'configurationsvctr',
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
        value: 'email_messages_templates',
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
    },{
        xtype: 'textfield',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: false
    }, {
        xtype: 'textfield',
        fieldLabel: 'Subject',
        margin: '0 20 20 0',
        name: 'subject',
        allowBlank: false
    }, {
        xtype: 'htmleditor',
        fieldLabel: 'Body',
        margin: '0 20 20 0',
        name: 'body',
        allowBlank: false,
        width: 600,
        height: 250
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                '->', {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'email_messages_templates',
                    storeID: 'emailtemplatesstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
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