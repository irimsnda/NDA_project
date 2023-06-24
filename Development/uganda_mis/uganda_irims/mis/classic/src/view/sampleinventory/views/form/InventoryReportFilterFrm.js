Ext.define('Admin.view.sampleinventory.views.form.InventoryReportFilterFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'inventoryReportFilterFrm',
    controller: 'sampleinventoryvctr',
    autoScroll: true,
    layout: 'hbox',
    frame: true,
    itemId: 'inventoryReportFilterFrm',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    items: [
    {
        xtype: 'combo',
        fieldLabel: 'Inventory Type',
        margin: '0 20 20 0',
        name: 'inventory_type_id',
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
        margin: '0 20 20 0',
        name: 'reference',
        fieldLabel: 'Reference No',
        allowBlank: true
    },
    {
        xtype: 'combo',
        fieldLabel: 'Date Option',
        margin: '0 20 20 0',
        name: 'date_opt',
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
                            table_name: 'par_appprocess_definations',
                            filters: JSON.stringify({'date_option_id':11})
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },
    {
        xtype: 'datefield',
        fieldLabel: 'Date From',
        allowBlank: false,
        width: 150,
        margin: '0 20 20 0',
        labelAlign : 'top',
        name: 'from_date', 
        maxValue: new Date()// limited to the current date or prior
    }, {
        xtype: 'datefield',
        fieldLabel: 'Date To',
        width: 150,
        margin: '0 20 20 0',
        allowBlank: false,
        labelAlign : 'top',
        name: 'to_date',
        maxValue: new Date()
    },
     { 
        xtype: 'button',
        text: 'Search Filter',
        margin: '30 0 0 10',
        name: 'filter_inventoryReport',
        ui: 'soft-green',
        iconCls: 'fa fa-search',
        handler: 'func_filterInventoryReport',
        formBind: true,
    }
    ]
});