Ext.define('Admin.view.sampleinventory.views.configurations.form.ItemTypeFormConfigFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'itemtypeformconfigFrm',
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
        value: 'par_itemtype_formconfig',
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
        xtype: 'combo',
        fieldLabel: 'Sample Item Type',
        margin: '0 20 20 0',
        name: 'sample_item_type_id',
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
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_sampleitem_types'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'Xtype',
        margin: '0 20 20 0',
        name: 'xtype',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'field Label',
        margin: '0 20 20 0',
        name: 'field_label',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'field Name',
        margin: '0 20 20 0',
        name: 'field_name',
        allowBlank: false
    },{
        xtype: 'textfield',
        emptyText: 'For combobox xtypes',
        fieldLabel: 'Combo Source Table Name',
        margin: '0 20 20 0',
        value: '',
        name: 'combo_table_name',
        allowBlank: true
    },{
        xtype: 'numberfield',
        fieldLabel: 'Order No',
        margin: '0 20 20 0',
        name: 'order_no',
        allowBlank: false
    },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
        fieldLabel: 'Is Required',
        margin: '0 20 20 0',
        name: 'is_required',
        allowBlank: true
    },{
        xtype: 'checkbox',
        uncheckedValue: 0,
        inputValue: 1,
        fieldLabel: 'Is Editable',
        margin: '0 20 20 0',
        name: 'is_editable',
        allowBlank: true
    },{
        xtype: 'checkbox',
        uncheckedValue: 0,
        inputValue: 1,
        fieldLabel: 'Is Enabled',
        margin: '0 20 20 0',
        name: 'is_enabled',
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
                    table_name: 'par_itemtype_formconfig',
                    storeID: 'itemtypeformconfigStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});