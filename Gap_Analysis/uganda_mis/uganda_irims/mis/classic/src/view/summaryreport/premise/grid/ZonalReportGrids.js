Ext.define('Admin.view.summaryreport.premise.grid.ZonalReportGrids',{
	extend: 'Ext.grid.Panel',
	xtype: 'zonalReportGrids',
	width: '100%',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'premisezonalreportstr',
                groupField: 'zone_name',
                proxy: {
                    url: 'summaryreport/getPremiseZonalGridReports'
                }
            },
            isLoad: true
        }
           
    },
	columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module',
        name: 'sub_module',
        text: 'Sub Module',
        flex: 1,
        tbCls: 'wrap',
       	summaryRenderer: function(){
	            return '<b>Grand Total:</b>';
	        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        name: 'section_name',
        text: 'Section',
        flex: 1,
        tbCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'business_category_type',
        name: 'business_category_type',
        text: 'Business Type Category',
        flex: 1,
        tbCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'small_scale',
        name: 'small_scale',
        text: 'Small Scale Business',
        flex: 1,
        tbCls: 'wrap',
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
          },
		},{
        xtype: 'gridcolumn',
        dataIndex: 'medium_scale',
        name: 'medium_scale',
        text: 'Medium Scale Business',
        flex: 1,
        tbCls: 'wrap',
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
          },
		},{
        xtype: 'gridcolumn',
        dataIndex: 'large_scale',
        name: 'large_scale',
        text: 'Large Scale Business',
        flex: 1,
        tbCls: 'wrap',
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
          },
		},{
        xtype: 'gridcolumn',
        dataIndex: 'total',
        name: 'total',
        text: 'Total Applications',
        flex: 1,
        tbCls: 'wrap',
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
          },
		}
    ],
    features: [{ftype:'groupingsummary',startCollapsed: true}],
    bbar: [{
        xtype: 'exportbtn',
        text: 'Print(Grid Summary)'
    },{
            xtype:'button',
            ui: 'soft-green',
            iconCls: 'x-fa fa-file',
            text: 'Print(Summary)',
            handler: 'printPremiseZonalSummaryReport'
        },{
        xtype: 'pagingtoolbar',
        width: '50%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function() {
        		var grid=this.up('grid'),
        			pnl=grid.up('panel'),
        			filter=pnl.down('form'),
        		       sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
			           business_type_category_id = filter.down('combo[name=business_type_category_id]').getValue(),
			           section_id = filter.down('combo[name=section_id]').getValue(),
			           zone_id = filter.down('combo[name=zone_id]').getValue(),
			           received_opt = filter.down('combo[name=received_opt]').getValue(),
			           evaluation_opt = filter.down('combo[name=evaluation_opt]').getValue(),
			           from_date = filter.down('datefield[name=from_date]').getValue(),
			           to_date = filter.down('textfield[name=to_date]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                        sub_module_id:sub_module_id,
                        section_id: section_id,
                        zone_id:zone_id,
                        from_date: from_date,
                        received_opt: received_opt,
                        evaluation_opt: evaluation_opt,
                        to_date: to_date,
                        business_type_category_id: business_type_category_id

                }
                
        	},
        
        
     },
     '->'
     ,{
        xtype: 'button',
        text: 'Export Detailed Report',
        ui: 'soft-green',
        iconCls: 'x-fa fa-file',
        handler: 'exportPremiseZoneRegReport'
    }
    ]

    });