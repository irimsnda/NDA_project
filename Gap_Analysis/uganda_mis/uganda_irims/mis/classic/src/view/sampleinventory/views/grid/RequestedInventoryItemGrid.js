
Ext.define('Admin.view.sampleinventory.views.grid.RequestedInventoryItemGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'requestedinventoryItemGrid',
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
    export_title: 'requestedinventoryItemGrid',



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
                storeId: 'requestedinventoryItemStr',
                enablePaging: true,
                remoteFilter: true,
                proxy: {
                    url: 'sampleinventory/getrequestedItems',
                }
            },
            isLoad: true
        },
         itemdblclick: 'issuerequestedItemgridDbclick'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'inventory_id',
        text: 'inventory_id',
        hidden: true,
        width: 70
    },{
        xtype: 'gridcolumn',
        dataIndex: 'issue_reason_id',
        text: 'issue_reason_id',
        width: 70,
        hidden: true
    },{
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
        dataIndex: 'quantity',
        text: 'Quantity Requested',
        width: 150,wrap: true,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'requested_by',
        text: 'Requested By',
        width: 150,wrap: true,
    },{
        xtype: 'datecolumn',
        dataIndex: 'requested_on',
        format: 'Y-m-d',
        text: 'Requested On',
        width: 150,wrap: true,
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
