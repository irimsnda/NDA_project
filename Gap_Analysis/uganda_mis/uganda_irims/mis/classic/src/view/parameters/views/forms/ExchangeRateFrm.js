Ext.define('Admin.view.parameters.views.forms.ExchangeRateFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.exchangeratefrm',
    frame: false,
    bodyPadding: 10,
    controller: 'parametervctr',
    require : [
        'Ext.form.field.VTypes'
    ],
    layout: {
        type: 'column'
    },
    defaults: {
        labelAlign: 'top',
        labelStyle: {
            'font-weight': 'bold'
        },
        labelCls: '',
        allowBlank: false,
        columnWidth: 1
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
        xtype: 'fieldcontainer',
        layout: 'column',
        items:[{
            xtype: 'combobox',
            forceSelection: true,
            fieldLabel: 'Currency',
            store: {
                type: 'currenciesstr',
                pageSize: 0,
                autoLoad:true,
            },
            displayField: 'name',
            valueField: 'id',
            allowBlank: false,
            margin: '0 20 20 0',
            name: 'currency',
            columnWidth: 0.9
        },{
            xtype: 'button',
            text: 'add',
            width: '50px',
            iconCls: 'x-fa fa-plus',
            columnWidth: 0.082,
            form: 'currencyfrm',
            title: 'Add Currency',
            handler: 'showAddFormWin'
        }]
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        items:[{
            xtype: 'textfield',
            fieldLabel: 'Rate',
            allowBlank: true,
            margin: '0 20 20 0',
            name: 'exchange_rate',
            columnWidth: 1
        }]
    }, {
        xtype: 'fieldcontainer',
        layout: 'column',
        items: [{
            xtype: 'textarea',
            fieldLabel: 'Description',
            margin: '0 20 20 0',
            name: 'description',
            allowBlank: true,
            columnWidth: 1
        }]
    }],
    action_url: 'parameters/exchangerate',
    store: 'exchangeratesstr',
    buttons: [{
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'back',
        grid: 'exchangeratesgrid',
        form: 'exchangeratefrm',
        handler: 'paramBackToGrid',
        ui: 'soft-purple'
    }, '->', {
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'save',
        grid: 'exchangeratesgrid',
        form: 'exchangerateFrm',
        formBind: true,
        handler: 'doSaveExchangeRate',
        store: 'exchangeratesstr',
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