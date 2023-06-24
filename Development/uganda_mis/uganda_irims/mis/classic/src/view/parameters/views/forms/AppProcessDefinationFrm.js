Ext.define('Admin.view.parameters.views.forms.AppProcessDefinationFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.appProcessDefinationFrm',
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
        value: 'par_appprocess_definations',
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
        fieldLabel: 'Code',
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'code'
    },{
        xtype: 'combobox',
        fieldLabel: 'Date Option',
        forceSelection: true,
        allowBlank: false,
        margin: '0 20 20 0',
        columnWidth: 1,
        name: 'date_option_id',
        queryMode: 'local',
        displayField: 'name',
        valueField: 'id',
        listeners:
         {
             afterrender: {//getConfigParamFromTable
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_appprocess_definations'
                        }
                    }
                },
                isLoad: true
            }
           
         }
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
    action_url: 'parameters/appProcessDefination',
    store: 'appProcessDefinationStr',
    buttons: [{
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'back',
        grid: 'appProcessDefinationGrid',
        form: 'appProcessDefinationFrm',
        handler: 'paramBackToGrid',
        ui: 'soft-purple'
    }, '->', {
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        action: 'save',
        table_name: 'par_appprocess_definations',
        storeID: 'appProcessDefinationStr',
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