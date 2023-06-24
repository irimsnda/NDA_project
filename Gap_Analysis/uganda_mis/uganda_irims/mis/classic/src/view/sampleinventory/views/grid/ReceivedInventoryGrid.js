
Ext.define('Admin.view.sampleinventory.views.grid.ReceivedInventoryGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'receivedinventoryGrid',
    cls: 'dashboard-todo-list',
    controller: 'sampleinventoryvctr',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    export_title: 'InventoryStoreSections',

    tbar: [{
        xtype: 'button',
        text: 'Add New Item',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'receiveinventoryFrm',
        winTitle: 'New Sample Inventory',
        winWidth: '70%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],

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
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'receiveInventoryStr',
                enablePaging: true,
                remoteFilter: true,
                proxy: {
                    url: 'sampleinventory/getReceivedSampleInventory',
                }
            },
            isLoad: true
        },
        
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
    },{
        xtype: 'gridcolumn',
        dataIndex: 'batch_no',
        text: 'Batch No',
        width: 150,wrap: true,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'file_no',
        text: 'File No',
        width: 150,wrap: true,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'store_name',
        text: 'Store',
        width: 150,wrap: true,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'store_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_inventory_stores'
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
        dataIndex: 'store_section_name',
        text: 'Store Section',
        width: 150,wrap: true,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'store_section_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_inventorystore_sections'
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
        dataIndex: 'section_level_name',
        text: 'Section Level Name',
        width: 150,wrap: true,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'section_level_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_inventorysection_levels'
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
        dataIndex: 'item_status_name',
        text: 'Item Status',
        width: 150,wrap: true,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'item_status_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_sample_statuses'
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
        xtype: 'datecolumn',
        dataIndex: 'created_on',
        text: 'Received On',
        format: 'Y-m-d',
        width: 150,wrap: true,
        filter: {
            xtype: 'datefield',
            format: 'Y-m-d'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'received_by',
        text: 'Received By',
        width: 150,wrap: true,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'received_by',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'usermanagement/getUserList', 
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
        dataIndex: 'submitted_by',
        text: 'Submitted By',
        width: 150,wrap: true,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'quantity',
        text: 'Quantity',
        width: 150,wrap: true,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'unit_name',
        text: 'Units',
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
                    text: 'Delete',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Delete Record',
                    table_name: 'tra_inventory_inflows',
                    storeID: 'receiveInventoryStr',
                    action_url: 'configurations/undoConfigSoftDeletes',
                    action: 'delete',
                    handler: 'doDeleteInvemtoryItem',
                    stores: '[]'
                },
                {
                    text: 'Merge to Application',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'par_inventorystore_sections',
                    storeID: 'receiveInventoryStr',
                    action_url: 'configurations/undoConfigSoftDeletes',
                    action: 'enable',
                    disabled: true,
                    handler: 'doDeleteConfigWidgetParam'
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
                       module_id = grid.down('combo[name=module_id]').getValue(),                      
                       received_by = grid.down('combo[name=received_by]').getValue(),
                       store_id = grid.down('combo[name=store_id]').getValue(),
                       item_status_id = grid.down('combo[name=item_status_id]').getValue(),
                       store_section_id = grid.down('combo[name=store_section_id]').getValue(),
                       section_level_id = grid.down('combo[name=section_level_id]').getValue();

                 var store=grid.getStore();
                 store.getProxy().extraParams = {
                        item_type: item_type,
                        module_id:module_id,
                        received_by: received_by,
                        store_id: store_id,
                        item_status_id:item_status_id,
                        store_section_id: store_section_id,
                        section_level_id: section_level_id

                }
                
            },

        
        
    }]
});
