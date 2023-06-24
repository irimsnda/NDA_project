
Ext.define('Admin.view.sampleinventory.views.grid.InventoryDashboardGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'inventoryDashboardGrid',
    cls: 'dashboard-todo-list',
    controller: 'sampleinventoryvctr',
    autoScroll: true,
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
        }
    ],

    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype:'grouping',
        startCollapsed: true
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'InventoryDashboardStr',
                enablePaging: true,
                remoteFilter: true,
                groupField: 'item_type',
                proxy: {
                    url: 'sampleinventory/getInventoryDashboard',
                }
            },
            isLoad: true
        },
         itemdblclick: 'receivedsamplegridDbclick'
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
        dataIndex: 'brand_name',
        text: 'Brand Name',
        width: 150,wrap: true,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Common Name',
        width: 150,wrap: true,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        text: 'Section',
        width: 150,wrap: true,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'classification_name',
        text: 'Classification',
        width: 150,wrap: true,
    }
   ,{
        xtype: 'gridcolumn',
        dataIndex: 'quantity_received',
        text: 'Quantity Received',
        width: 150,wrap: true,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'issued_quantity',
        text: 'Quantity Issued',
        width: 150,wrap: true,
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
                    text: 'Preview Details',
                    iconCls: 'x-fa fa-eye',
                    tooltip: 'View Details',
                    action: 'view',
                    childXtype: 'inventoryitemDetailsViewPnl',
                    winTitle: 'Inventory Details',
                    winWidth: '90%',
                    handler: 'showInventoryItemDetails',
                    stores: '[]'
                }, {
                    text: 'Print Details',
                    iconCls: 'x-fa fa-repeat',
                    table_name: 'par_inventorystore_sections',
                    storeID: 'receiveInventoryStr',
                    action_url: 'configurations/softDeleteConfigRecord',
                    action: 'soft_delete',
                    handler: 'showInventoryItemDetails'
                }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
           
        }
    }],
     bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function() {
                var grid=this.up('grid'),
                       item_type = grid.down('combo[name=item_type_id]').getValue(),
                       module_id = grid.down('combo[name=module_id]').getValue();

                 var store=grid.getStore();
                 store.getProxy().extraParams = {
                        item_type: item_type,
                        module_id:module_id,

                }
                
            },

        
        
    }]
});
