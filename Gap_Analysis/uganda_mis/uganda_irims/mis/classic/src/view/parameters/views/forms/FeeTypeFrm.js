Ext.define('Admin.view.parameters.views.forms.FeeTypeFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.feetypefrm',
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
        fieldLabel: 'GL Code',
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'gl_code'
    }],
    action_url: 'parameters/feetype',
    store: 'feetypesstr',
    buttons: [{
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'back',
        grid: 'feetypesgrid',
        form: 'feetypefrm',
        handler: 'paramBackToGrid',
        ui: 'soft-purple'
    }, '->', {
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'save',
        grid: 'feetypesgrid',
        form: 'feetypeFrm',
        formBind: true,
        handler: 'doSaveFeeType',
        store: 'feetypesstr',
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