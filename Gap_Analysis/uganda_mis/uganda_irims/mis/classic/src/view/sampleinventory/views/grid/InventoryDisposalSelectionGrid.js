
Ext.define('Admin.view.sampleinventory.views.grid.InventoryDisposalSelectionGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'inventoryDisposalSelectionGrid',
    cls: 'dashboard-todo-list',
    controller: 'sampleinventoryvctr',
    autoScroll: true,
    itemId: 'inventoryDisposalSelectionGrid',
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
         getRowClass: function (record, rowIndex, rowParams, store) {
            var remaining_quantity = record.get('remaining_quantity');
            if (remaining_quantity == 0 || remaining_quantity === 0) {
                return 'invalid-row';
            }
        }
    },
    export_title: 'inventoryDashboardGrid',



    plugins: [
        {
            ptype: 'gridexporter'
        },
        {
            ptype: 'filterfield'
        },
        {
        ptype: 'cellediting',
        clicksToEdit: 1
    }
    ],
    selType: 'cellmodel',
    

    tbar: [{
        xtype: 'button',
        text: 'Add Item',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        handler: 'showDisposalSelectionList',
        stores: '[]'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'disposalinventorySelectionStr',
                proxy: {
                    url: 'sampleinventory/getDisposalItems',
                }
            },
            isLoad: true
        },
         //itemdblclick: 'receivedsamplegridDbclick'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',
        width: 70
    },{
        xtype: 'gridcolumn',
        dataIndex: 'item_type',
        text: 'Item Type',
        width: 150,wrap: true,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'item_type_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_sampleitem_types'
                                    }   
                                }
                            },
                            isLoad: true,
                        },
                        change: function(combo) {
                            var grid = this.up('grid'),
                                store = grid.getStore();
                                store.reload();
                        },          
                 }
                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'item_reference_no',
        text: 'Item reference No',
        width: 150,wrap: true,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        width: 150,wrap: true,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'application_type',
        text: 'Application Types',
        width: 150,wrap: true,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'module_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'modules'
                                    }   
                                }
                            },
                            isLoad: true,
                        },
                        change: function(combo) {
                            var grid = this.up('grid'),
                                store = grid.getStore();
                                store.reload();
                        },          
                 }
                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'disposal_quantity',
        text: 'Quantity to Dispose',
        width: 150,wrap: true,
        editor: {
            xtype: 'numberfield',
            name: 'quantity',
         //   maxValue: '{remaining_quantity}'
        },
    },{
        xtype: 'gridcolumn',
        dataIndex: 'remaining_quantity',
        text: 'Quantity Remaining',
        width: 150,wrap: true,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'quantity_units',
        text: 'Quantity Units',
        width: 150,wrap: true,
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Remove',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Remove from selection',
                    action: 'remove',
                    handler: 'RemoveInventoryItemSelection',
                    stores: '[]'
                }
                ]
            }
        }
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function(btn) {
            var grid = this.up('grid'),
                panel = grid.up('panel'),
                code = panel.down('hiddenfield[name = active_application_code]').getValue()
                store = grid.getStore();

        store.getProxy().extraParams = {
            active_application_code:code
        }
            
        },
    }]
});
