Ext.define('Admin.view.parameters.views.forms.costs.CostCategoryFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.costcategoryfrm',
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
            xtype: 'textfield',
            fieldLabel: 'Name',
            allowBlank: false,
            margin: '0 20 20 0',
            name: 'name',
            columnWidth: 1
        }]
        
     },{
        xtype: 'fieldcontainer',
        layout: 'column',
        items:[{
        xtype: 'combobox',
        columnWidth: 1,
        fieldLabel: 'Section',
        forceSelection: true,
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'section_id',
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
                            table_name: 'par_sections'
                        }
                    }
                },
                isLoad: true
            }
           
         }
     }]
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        items:[{
        xtype: 'combobox',
        columnWidth: 1,
        fieldLabel: 'Fee Type',
        forceSelection: true,
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'fee_type_id',
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
                            table_name: 'par_fee_types'
                        }
                    }
                },
                isLoad: true
            },
           
           
         }
     }]
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        items:[{
        
            xtype: 'textarea',
            fieldLabel: 'Description',
            margin: '0 20 20 0',
            name: 'description',
            allowBlank: true,
            columnWidth: 1
        
    },{
        xtype: 'checkbox',
        name: 'is_enabled',
        inputValue: '1',
        uncheckedValue: '0',
        columnWidth: 1,
        fieldLabel: 'Is Enabled'
    }]
    }],
    action_url: 'parameters/costcategory',
    store: 'costcategoriesstr',
    locations: 'costcategoriesgrid',
    buttons: [{
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'back',
        grid: 'costcategoriesgrid',
        form: 'costcategoryfrm',
        handler: 'paramBackToGrid',
        ui: 'soft-purple'
    }, '->', {
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'save',
        grid: 'costcategoriesgrid',
        form: 'costcategoryFrm',
        formBind: true,
        table_name: 'par_cost_categories',
        handler: 'doSaveRecord',
        storeID: 'costcategoriesstr',
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