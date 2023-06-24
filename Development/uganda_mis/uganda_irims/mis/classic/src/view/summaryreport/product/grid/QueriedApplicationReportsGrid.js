Ext.define('Admin.view.summaryreport.product.grid.QueriedApplicationReportsGrid',{
	extend: 'Ext.grid.Panel',
	xtype: 'queriedapplicationreportsgrid',
	width: '100%',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'queriedapplicationreportsstr',
                groupField: 'brand_name',
                remoteFilter: true,
                proxy: {
                    url: 'summaryreport/getQueriedApplicationReports'
                }
            },
            isLoad: false
        }
    },plugins: [{
        ptype: 'filterfield'
    }],
	columns: [{
        xtype: 'widgetcolumn',
        text: 'Print',
        widht: 150,
        widget: {
            xtype: 'button',
            iconCls: 'x-fa fa-report',
            ui: 'soft-green',
            text: 'Query letter',
            name: 'query Letter',
            tooltip: 'Print Application Query letter',
            handler: 'generateProductApplicationQueryLetter'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        name: 'tracking_no',
        text: 'Tracking Number',
        width: 150,
        tbCls: 'wrap',
        filter: {
            xtype: 'textfield',
        }   
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        name: 'reference_no',
        text: 'Reference No',
        width: 150,
        tbCls: 'wrap',
        filter: {
            xtype: 'textfield',
        }   
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module',
        name: 'sub_module',
        text: 'Sub Module',
        width: 150,
        tbCls: 'wrap',
       	
    },{
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        name: 'section_name',
        text: 'Section',
        width: 150,
        tbCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        name: 'brand_name',
        text: 'Brand Name',
        width: 150,
        tbCls: 'wrap',filter: {
            xtype: 'textfield',
        }    
    },{
        xtype: 'gridcolumn',
        dataIndex: 'generic_name',
        name: 'generic_name',
        text: 'Generic Name',
        width: 150,
        tbCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        name: 'applicant_name',
        text: 'Applicant Name',
        width: 150,
        tbCls: 'wrap',filter: {
            xtype: 'textfield',
        }    
    },{
        xtype: 'gridcolumn',
        dataIndex: 'queried_on',
        name: 'Queried On',
        text: 'Queried On',
        width: 150,
        tbCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'queried_byname',
        name: 'queried_byname',
        text: 'Query Raised By',
        width: 150,
        tbCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'responded_on',
        name: 'Responded On',
        text: 'Query Response on',
        width: 150,
        tbCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'query_status',
        name: 'query_status',
        text: 'Query status',
        width: 150,
        tbCls: 'wrap',
    }
    ],
    features: [{ftype:'groupingsummary',startCollapsed: false}],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '70%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function() {
        		var grid=this.up('grid'),
        			pnl=grid.up('panel'),
        			filter=pnl.down('form'),
        		       sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
			           section_id = filter.down('combo[name=section_id]').getValue(),
			           queriedfrom_date = filter.down('datefield[name=queriedfrom_date]').getValue(),
			           queriedto_date = filter.down('textfield[name=queriedto_date]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                        sub_module_id:sub_module_id,
                        section_id: section_id,
                        queriedto_date: queriedto_date,
                        queriedfrom_date: queriedfrom_date
                }
                
        	},

        
        
    }
     ]

    });