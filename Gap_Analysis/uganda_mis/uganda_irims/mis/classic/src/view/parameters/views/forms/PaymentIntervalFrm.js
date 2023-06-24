Ext.define('Admin.view.parameters.views.forms.PaymentIntervalFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.paymentintervalfrm',
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
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'name'
    },{
        xtype: 'numberfield',
        fieldLabel: 'Duration',
        value: 0,
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'duration'
    },{
        xtype: 'numberfield',
        fieldLabel: 'Unit',
        value: 0,
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'unit'
    }, {
        xtype: 'checkboxfield',
        fieldLabel: 'Fixed',
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'fixed'
    },{
        xtype: 'textfield',
        fieldLabel: 'Fixed Entry Point',
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'fixed_entry_point'
    },{
        xtype: 'numberfield',
        fieldLabel: 'Notification Time Interval',
        value: 0,
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'notification_time_interval'
    },{
        xtype: 'numberfield',
        fieldLabel: 'Notification Time Interval Unit',
        value: 0,
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'notification_time_interval_unit'
    }],
    action_url: 'parameters/paymentinterval',
    store: 'paymentintervalsstr',
    buttons: [{
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'back',
        grid: 'paymentintervalsgrid',
        form: 'paymentintervalfrm',
        handler: 'paramBackToGrid',
        ui: 'soft-purple'
    }, '->', {
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'save',
        grid: 'paymentintervalsgrid',
        form: 'paymentintervalFrm',
        formBind: true,
        handler: 'doSavePaymentInterval',
        store: 'paymentintervalsstr',
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