Ext.define('Admin.view.parameters.views.forms.TransactionTypeFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.transactiontypefrm',
    frame: false,
    bodyPadding: 10,
    controller: 'parametervctr',
    require : [
        'Ext.form.field.VTypes'
    ],
    layout: {
        type: 'form'
    },
    defaults: {
        labelAlign: 'top',
        labelStyle: {
            'font-weight': 'bold'
        },
        labelCls: '',
        allowBlank: false
    },
    fieldDefaults: {
        xtype: 'textfield',
        cls: ''
    },
    items: [{
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id'
    }, {
        xtype: 'textfield',
        value: token,
        name: '_token',
        hidden: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Name',
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'name'
    },{
        xtype: 'textfield',
        fieldLabel: 'Code',
        allowBlank: false,
        margin: '0 20 20 0',
        name: 't_code'
    },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'description'
    }, {
        xtype: 'combobox',
        fieldLabel: 'Type (Dr/Cr)',
        store: {
            type: 't_typesstr',
            autoLoad:true,
        },
        displayField: 'name',
        valueField: 'name',
        allowBlank: true,
        margin: '0 20 20 0',
        name: 't_type'
    }, {
        xtype: 'combobox',
        fieldLabel: 'Output',
        store: {
            type: 'outputsstr',
            autoLoad:true,
        },
        displayField: 'name',
        valueField: 'name',
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'output'
    }, {
        xtype: 'checkboxfield',
        fieldLabel: 'System Invoice',
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'system_invoice'
    }, {
        xtype: 'checkboxfield',
        fieldLabel: 'System Receipt',
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'system_receipt'
    }],
    action_url: 'parameters/transactiontype',
    store: 'transactiontypesstr',
    buttons: [{
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'back',
        grid: 'transactiontypesgrid',
        form: 'transactiontypefrm',
        handler: 'paramBackToGrid',
        ui: 'soft-purple'
    }, '->', {
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'save',
        grid: 'transactiontypesgrid',
        form: 'transactiontypeFrm',
        formBind: true,
        handler: 'doSaveTransactionType',
        store: 'transactiontypesstr',
        ui: 'soft-purple'
    }, {
        text: 'Reset',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-close',
        width: 15,
        height: 35,
        padding: '5 5 5 5',
        handler: function (btn) {
            btn.up('form').getForm().reset();
        }
    }]
});