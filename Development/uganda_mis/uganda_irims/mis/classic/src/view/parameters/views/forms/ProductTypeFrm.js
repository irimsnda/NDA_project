Ext.define('Admin.view.parameters.views.forms.ProductTypeFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.producttypefrm',
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
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'code'
    },{
        xtype: 'combobox',
        fieldLabel: 'Cost SubCategory',
        forceSelection: true,
        allowBlank: true,
        margin: '0 20 20 0',
        columnWidth: 1,
        name: 'cost_subcategory_id',
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
                            table_name: 'par_cost_sub_categories'
                        }
                    }
                },
                isLoad: true
            }
           
         }
     },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'description'
    },
    {
        xtype: 'checkboxfield',
        name: 'is_enabled',
        fieldLabel: 'Is enabled',
        inputValue: '1',
        uncheckedValue: '0',

    }],
    action_url: 'parameters/producttype',
    store: 'producttypesstr',
    buttons: [{
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'back',
        grid: 'producttypesgrid',
        form: 'producttypefrm',
        handler: 'paramBackToGrid',
        ui: 'soft-purple'
    }, '->', {
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'save',
        grid: 'producttypesgrid',
        form: 'producttypeFrm',
        formBind: true,
        handler: 'doSaveRecord',
        table_name: 'par_product_types',
        storeID: 'producttypesstr',
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