Ext.define('Admin.view.sampleinventory.views.panel.InventoryDisposalRequestDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'inventoryDisposalRequestDetailsPnl',
    layout: 'form',
    controller: 'sampleinventoryvctr',
    tbar: [{
    	xtype: 'hiddenfield',
    	name: 'application_code'
    }],
    items: [{
    	xtype: 'panel',
    	layout: 'column',
    	style: 'border: solid green 2px',
    	items: [{
    		xtype: 'displayfield',
    		name: 'requested_by',
    		columnWidth: 0.4,
            fieldLabel: 'Requested By',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px'
            }
    	   },{
            xtype: 'displayfield',
            name: 'disposal_date',
    		columnWidth: 0.4,
            fieldLabel: 'Disposal Date',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px'
            }
         },{
            xtype: 'displayfield',
            name: 'disposal_reason',
    		columnWidth: 0.4,
            fieldLabel: 'Disposal Reason',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px'
            }
         },{
            xtype: 'displayfield',
            name: 'disposal_method',
    		columnWidth: 0.4,
            fieldLabel: 'Disposal Method',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px'
            }
         },{
         	xtype: 'textarea',
         	readOnly: true,
    		columnWidth: 0.8,
    		name: 'comment',
    		fieldLabel: 'Comment'
         }],

    },{
    	xtype: 'grid',
    	//title: 'Disposal Items',
    	style: 'border: solid green 2px',
    	height: 250,
		listeners: {
		        beforerender: {
		            fn: 'setConfigGridsStore',
		            config: {
		                pageSize: 10000,
		                storeId: 'inventorydisposalapprovalitemsSstr',
		                proxy: {
		                    url: 'sampleinventory/getDisposalApprovalRequestsItems'//
		                }
		            },
		            isLoad: true
		        }, 
		    }, 
		   
		    columns: [{
		        xtype: 'gridcolumn',
		        dataIndex: 'item_reference_no',
		        text: 'Item Ref Number',
		        flex: 1
		    }, {
		        xtype: 'gridcolumn',
		        dataIndex: 'item_type',
		        text: 'Item Type',
		        flex: 1
		    }, {
		        xtype: 'gridcolumn',
		        dataIndex: 'application_type',
		        text: 'Application Type',
		        flex: 1
		    }, {
		        xtype: 'gridcolumn',
		        dataIndex: 'disposal_type',
		        text: 'Disposal Type',
		        flex: 1
		    },{
		        xtype: 'gridcolumn',
		        dataIndex: 'disposal_quantity',
		        text: 'Disposal Quantity',
		        flex: 1
		    }, {
		        xtype: 'gridcolumn',
		        dataIndex: 'quantity_units',
		        text: 'Quantity Units',
		        flex: 1
		    }, {
		        xtype: 'gridcolumn',
		        dataIndex: 'recommendation',
		        text: 'Approval Recommendation',
		        flex: 1
		    }],
		    bbar: [{
		        xtype: 'pagingtoolbar',
		        width: '100%',
		        displayInfo: true,
		        displayMsg: 'Showing {0} - {1} out of {2}',
		        emptyMsg: 'No Records',
		        beforeLoad: function() {
		                var grid=this.up('grid'),
		                	panel = grid.up('panel'),
		                	cont = panel.up('panel'),
		                	application_code = cont.down('hiddenfield[name = application_code]').getValue();

		                 var store=grid.getStore();

		                 store.getProxy().extraParams = {
		                        application_code: application_code

		                }
		                
		            },

		    }]
    
    	

   }],

});