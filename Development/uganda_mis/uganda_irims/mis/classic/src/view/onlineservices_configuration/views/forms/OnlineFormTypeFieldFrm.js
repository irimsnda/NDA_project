Ext.define('Admin.view.administration.views.forms.OnlineFormTypeFieldFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlineformTypeFieldFrm',
    controller: 'onlineservicesconfVctr',
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
        value: 'wb_form_fields',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'wb_app_formsdefination',
        allowBlank: true
    },{
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
        xtype: 'combo',
        fieldLabel: 'Field',
        margin: '0 20 20 0',
        name: 'form_field_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'onlineservices/getOnlineFormsParams',
                        extraParams: {
                            table_name: 'wb_form_fields'
                        }
                    }
                },
                isLoad: true
            }
           
        }
        
    },{
        xtype: 'combo',
        fieldLabel: 'Name',
        margin: '0 20 20 0',
        name: 'app_formsdefination_id',
        valueField: 'id',
        displayField: 'form_name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'onlineservices/getOnlineFormsParams',
                        extraParams: {
                            table_name: 'wb_app_formsdefination'
                        }
                    }
                },
                isLoad: true
            }
           
        }
        
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
        fieldLabel: 'Is Mandatory',
        margin: '0 20 20 0',
        name: 'is_mandatory',
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
        fieldLabel: 'Is Read Only',
        margin: '0 20 20 0',
        name: 'is_readOnly',
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
        fieldLabel: 'Is Hidden',
        margin: '0 20 20 0',
        name: 'is_hidden',
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
        fieldLabel: 'Is Enabled',
        margin: '0 20 20 0',
        name: 'is_enabled',
        allowBlank: true
    },{
        xtype: 'textfield',
        fieldLabel: 'Default Value',
        margin: '0 20 20 0',
        name: 'default_value',
        allowBlank: true
    },{
        xtype: 'numberfield',
        fieldLabel: 'Order No',
        margin: '0 20 20 0',
        name: 'order_no',
        allowBlank: true
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'wb_formfields_definations',
                    storeID: 'FormTypeFieldsStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});