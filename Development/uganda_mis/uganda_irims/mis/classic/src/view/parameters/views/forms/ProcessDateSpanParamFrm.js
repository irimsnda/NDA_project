Ext.define('Admin.view.parameters.views.forms.ProcessDateSpanParamFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.processDateSpanParamFrm',
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
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'par_processdatespan_defination',
        allowBlank: true
    },
    {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id'
    },{
        xtype: 'textfield',
        value: token,
        name: '_token',
        hidden: true
     },{
        xtype: 'textfield',
        fieldLabel: 'Name',
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'name'
    },{
        xtype: 'textfield',
        fieldLabel: 'Description',
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'description'
    },{
        xtype: 'checkboxfield',
        name: 'is_enabled',
        fieldLabel: 'Is enabled',
        inputValue: '1',
        uncheckedValue: '0',

    }
    ],
    action_url: 'parameters/processDateSpan',
    store: 'processDateSpanParamStr',
    buttons: [{
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'back',
        grid: 'processDateSpanParamGrid',
        form: 'processDateSpanParamFrm',
        handler: 'paramBackToGrid',
        ui: 'soft-purple'
    }, '->', {
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        action: 'save',
        table_name: 'par_processdatespan_defination',
        storeID: 'processDateSpanParamStr',
        formBind: true,width: 150,
        height: 35,
        padding: '5 5 5 5',
        ui: 'soft-purple',
        action_url: 'configurations/saveConfigCommonData',
        handler: 'doCreateConfigParamWin'

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