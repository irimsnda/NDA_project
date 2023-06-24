Ext.define('Admin.view.configurations.views.forms.FormTypeFieldMappingFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'formTypeFieldMappingFrm',
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
        value: 'par_formtype_fields',
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
        xtype: 'hiddenfield',
        fieldLabel: 'Form Caregory',
        margin: '0 20 20 0',
        name: 'form_category_id',
        allowBlank: false
    },{
        xtype: 'combo',
        fieldLabel: 'Field',
        margin: '0 20 20 0',
        name: 'field_id',
        valueField: 'id',
        displayField: 'label',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_formfield_designs'
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
                    table_name: 'par_formtype_fields',
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