Ext.define('Admin.view.summaryreport.premise.grid.PremiseInspectionReportGrid',{
	extend: 'Ext.grid.Panel',
	xtype: 'premiseInspectionReportGrid',
	width: '100%',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'premiseinspectionreportstr',
                groupField: 'inspection_type',
                proxy: {
                    url: 'summaryreport/getPremiseInspectionGridReports'
                }
            },
            isLoad: true
        }
           
    },
	columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        name: 'section_name',
        text: 'Section',
        width: 150,
        tbCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'registered',
        name: 'registered',
        text: 'Registered',
        width: 150,
        tbCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'unregistered',
        name: 'unregistered',
        text: 'Unregistered',
        width: 150,
        tbCls: 'wrap',
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
          },
		},{
        xtype: 'gridcolumn',
        dataIndex: 'total',
        name: 'total',
        text: 'Total',
        width: 150,
        tbCls: 'wrap',
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
          },
		},{
        xtype: 'gridcolumn',
        dataIndex: 'percentage',
        name: 'percentage',
        text: 'Percentage',
        width: 150,
        tbCls: 'wrap',
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
          },
		}
    ],
    features: [{ftype:'groupingsummary',startCollapsed: true}],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function() {
        		var grid=this.up('grid'),
        			pnl=grid.up('panel'),
        			filter=pnl.down('form'),
			           section_id = filter.down('combo[name=section_id]').getValue(),
			           received_opt = filter.down('combo[name=received_opt]').getValue(),
			           evaluation_opt = filter.down('combo[name=evaluation_opt]').getValue(),
			           from_date = filter.down('datefield[name=from_date]').getValue(),
			           to_date = filter.down('textfield[name=to_date]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                        section_id: section_id,
                        from_date: from_date,
                        received_opt: received_opt,
                        evaluation_opt: evaluation_opt,
                        to_date: to_date

                }
                
        	},
        
        
     },
     '->'
     ,{
        xtype: 'exportbtn',
        text: 'Print(Summary)'
    }
    ]

    });