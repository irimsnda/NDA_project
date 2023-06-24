Ext.define('Admin.view.configurations.views.forms.CertificateConditionsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'certificateconditionsfrm',
    controller: 'configurationsvctr',
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
        value: 'par_certificate_conditions',
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
        fieldLabel: 'Condition Name:',
        margin: '0 20 20 0',
        name: 'name',
        allowBlank: false
    }, {
            xtype: 'textarea',
            fieldLabel: 'Description:',
            margin: '0 20 20 0',
            name: 'description',
            allowBlank: true
        },{
        xtype:'checkbox',
        inputValue:1,
        name: 'is_enabled',
        fieldLabel: 'Is Active Certifcate Condition'
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
                    table_name: 'par_certificate_conditions',
                    storeID: 'certificateconditionsstr',
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