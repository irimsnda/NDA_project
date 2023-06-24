
Ext.define('Admin.view.sampleinventory.views.grid.IssuedInventoryGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'issuedinventoryGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    export_title: 'issuedinventoryGrid',

    tbar: [
    {
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
                storeId: 'issuedInventoryStr',
                enablePaging: true,
                remoteFilter: true,
                proxy: {
                    url: 'sampleinventory/getIssuedSampleInventory',
                }
            },
            isLoad: true
        },
         //itemdblclick: 'issueInventoryDBClick'
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
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'issued_to',
        text: 'Issued To',
        width: 150,wrap: true,
        filter: {
                    xtype: 'textfield'
            }
    },
    {
        xtype: 'datecolumn',
        dataIndex: 'created_on',
        format: 'Y-m-d',
        text: 'Issued On',
        width: 150,wrap: true,
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'quantity_issued',
        text: 'Quantity Issued',
        width: 150,wrap: true,
    },
    {
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
                    text: 'Print Details',
                    iconCls: 'x-fa fa-repeat',
                    table_name: 'par_inventorystore_sections',
                    storeID: 'issueInventoryStr',
                    action_url: 'configurations/softDeleteConfigRecord',
                    action: 'soft_delete',
                    //handler: 'doDeleteConfigWidgetParam'
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
                      // item_status_id = grid.down('combo[name=item_status_id]').getValue(),                      
                       //issued_by = grid.down('combo[name=issued_by]').getValue();

                 var store=grid.getStore();
                 store.getProxy().extraParams = {
                        item_type: item_type,
                        module_id:module_id,
                        //item_status_id: item_status_id,
                        //issued_by: issued_by

              }
                
           },

        
        
    }]
});
