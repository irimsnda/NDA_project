Ext.define('Admin.view.parameters.views.forms.AgeAnalysisDaysSpanParamFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ageAnalysisDaysSpanParamFrm',
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
        value: 'par_ageanalysisdays_span',
        allowBlank: true
    },
    {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id'
    }, {
        xtype: 'textfield',
        value: token,
        name: '_token',
        hidden: true
     },{
        xtype: 'combo',
        fieldLabel: 'Module',
        labelAlign : 'top',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        allowBlank: false,
        name: 'module_id',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }, 
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
               config: {
                    pageSize: 100,
                    proxy: {
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'modules'
                    }
                   }
                },
                isLoad: true
            }
            }
           
    },{
        xtype: 'numberfield',
        fieldLabel: 'Minimum Days',
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'min_days'
    },{
        xtype: 'numberfield',
        fieldLabel: 'Maximum Days',
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'max_days'
    },
    {
        xtype: 'numberfield',
        fieldLabel: 'Order No',
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'order_no'
    },
    {
        xtype: 'checkboxfield',
        name: 'is_enabled',
        fieldLabel: 'Is enabled',
        inputValue: '1',
        uncheckedValue: '0',

    }
    ],
    action_url: 'parameters/ageAnalysisDaysSpan',
    store: 'ageAnalysisDaysSpanParamStr',
    buttons: [{
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'back',
        grid: 'ageAnalysisDaysSpanParamGrid',
        form: 'ageAnalysisDaysSpanParamFrm',
        handler: 'paramBackToGrid',
        ui: 'soft-purple'
    }, '->', {
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        action: 'save',
        table_name: 'par_ageanalysisdays_span',
        storeID: 'ageAnalysisDaysSpanParamStr',
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