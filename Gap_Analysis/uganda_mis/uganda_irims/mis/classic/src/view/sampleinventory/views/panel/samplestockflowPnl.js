Ext.define('Admin.view.sampleinventory.views.grid.samplestockflowPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'samplestockflowPnl',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    controller: 'sampleinventoryvctr',
    //height: Ext.Element.getViewportHeight() - 118,
    width: '100%',


items: [{
		xtype: 'grid',
		title: 'Item Stock Inflow',
		autoHeight: true,
    	width: '100%',
	    viewConfig: {
	        deferEmptyText: false,
	        emptyText: 'Nothing to display'
	    },
	    export_title: 'issuedinventoryGrid',
	    bbar: [
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
	    listeners: {
	        beforerender: {
	            fn: 'setConfigGridsStore',
	            config: {
	                pageSize: 100,
	                storeId: 'inflowInventoryStr',
	                enablePaging: true,
	                remoteFilter: true,
	                proxy: {
	                    url: 'sampleinventory/getStockInflowInventory',
	                }
	            },
	            isLoad: true
	        }
	    },
	    columns: [{
	        xtype: 'gridcolumn',
	        dataIndex: 'id',
	        text: 'Ref ID',
	        width: 70
	    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'item_reference_no',
	        text: 'Item reference No',
	        flex: 1,
	        filter: {
	            xtype: 'textfield'
	        }
	    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'reference_no',
	        text: 'Reference No',
	        flex: 1,
	        filter: {
	            xtype: 'textfield'
	        }
	    },
	    {
	        xtype: 'gridcolumn',
	        dataIndex: 'received_by',
	        text: 'Received By',
	        flex: 1,
	        filter: {
	                    xtype: 'textfield'
	            }
	    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'recieved_on',
	        text: 'Received On',
	        flex: 1,
	        filter: {
	                    xtype: 'textfield'
	            }
	    },
	    {
	        xtype: 'gridcolumn',
	        dataIndex: 'batch_no',
	        text: 'Batch No',
	        flex: 1,
	    },
	    {
	        xtype: 'gridcolumn',
	        dataIndex: 'file_no',
	        text: 'File No',
	        flex: 1,
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'quantity',
	        text: 'Quantity',
	        flex: 1,
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'store_name',
	        text: 'Store Name',
	        flex: 1,
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'store_section',
	        text: 'Store Section',
	        flex: 1,
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'section_level',
	        text: 'Section Level',
	        flex: 1,
	    }],
	    bbar: [{
	        xtype: 'pagingtoolbar',
	        width: '100%',
	        displayInfo: true,
	        displayMsg: 'Showing {0} - {1} out of {2}',
	        emptyMsg: 'No Records',
	        beforeLoad: function() {
	                var grid=this.up('grid'),
	                	tab = grid.up('panel'),
	                	panel = tab.up('panel'),
	                    item_reference_no = panel.down('textfield[name=item_reference_no]').getValue();

	                 var store=grid.getStore();
	                 store.getProxy().extraParams = {
	                        item_reference_no: item_reference_no

	                }
	                
	            },
	    }]
    },{
		xtype: 'grid',
		title: 'Item Stock Outflow',
		autoHeight: true,
    	width: '100%',
	    viewConfig: {
	        deferEmptyText: false,
	        emptyText: 'Nothing to display'
	    },
	    export_title: 'outflowinventoryGrid',
	    bbar: [
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

	    listeners: {
	        beforerender: {
	            fn: 'setConfigGridsStore',
	            config: {
	                pageSize: 100,
	                storeId: 'issuedInventoryStr',
	                enablePaging: true,
	                remoteFilter: true,
	                proxy: {
	                    url: 'sampleinventory/getStockOutflowInventory',
	                }
	            },
	            isLoad: true
	        }
	    },
	     columns: [{
	        xtype: 'gridcolumn',
	        dataIndex: 'id',
	        text: 'Ref ID',
	        width: 70
	    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'item_reference_no',
	        text: 'Item reference No',
	        flex: 1,
	        filter: {
	            xtype: 'textfield'
	        }
	    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'reference_no',
	        text: 'Reference No',
	        flex: 1,
	        filter: {
	            xtype: 'textfield'
	        }
	    },
	    {
	        xtype: 'gridcolumn',
	        dataIndex: 'issued_by',
	        text: 'Issued By',
	        flex: 1,
	        filter: {
	                    xtype: 'textfield'
	            }
	    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'issued_to',
	        text: 'Issued To',
	        flex: 1,
	        filter: {
	                    xtype: 'textfield'
	            }
	    },
	    {
	        xtype: 'datecolumn',
	        dataIndex: 'created_on',
	        format: 'Y-m-d',
	        text: 'Issued On',
	        flex: 1,
	    },
	    {
	        xtype: 'gridcolumn',
	        dataIndex: 'quantity_issued',
	        text: 'Quantity Issued',
	        flex: 1,
	    }],
	    bbar: [{
	        xtype: 'pagingtoolbar',
	        width: '100%',
	        displayInfo: true,
	        displayMsg: 'Showing {0} - {1} out of {2}',
	        emptyMsg: 'No Records',
	        beforeLoad: function() {
	                var grid=this.up('grid'),
	                	tab = grid.up('panel'),
	                	panel = tab.up('panel'),
	                    item_reference_no = panel.down('textfield[name=item_reference_no]').getValue();

	                 var store=grid.getStore();
	                 store.getProxy().extraParams = {
	                        item_reference_no: item_reference_no

	                }
	                
	            },
	    }]
	}]
});
