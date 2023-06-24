Ext.define('Admin.view.summaryreport.product.grid.PermitReportGrids',{
	extend: 'Ext.grid.Panel',
	xtype: 'permitReportGrids',
	width: '100%',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'permitreportstr',
                groupField: 'category_name',
                proxy: {
                    url: 'summaryreport/getImportExportPermitGridReports'
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
        summaryRenderer: function(value){
             return "<b>Summary Total: <b>";
          },
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module_name',
        name: 'sub_module_name',
        text: 'Sub Module',
        width: 150,
        tbCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'received_applications',
        name: 'received_applications',
        text: 'Received',
        summaryType: 'sum',
        flex: 1,
        summaryRenderer: function(value){
             return(value);
          },
    },{
        xtype: 'gridcolumn',
        dataIndex: 'approved_applications',
        name: 'approved_applications',
        text: 'Approved Applications',
        summaryType: 'sum',
        flex: 1,
        summaryRenderer: function(value){
             return(value);
          },
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inspected_applications',
        name: 'inspected_applications',
        text: 'Inspected',
        summaryType: 'sum',
        flex: 1,
        summaryRenderer: function(value){
             return(value);
          },
	}
    ],
    features: [{
        ftype:'groupingsummary',
        startCollapsed: true,
        groupHeaderTpl: 'Disposal-Type: {[values.rows[0].data.category_name]} [{rows.length} {[values.rows.length > 1 ? "Applications" : "Application"]}]',
    }],
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
			           category_type = filter.down('combo[name=category_type]').getValue(),
                       section_id = filter.down('combo[name=section_id]').getValue(),                      received_opt = filter.down('combo[name=received_opt]').getValue(),
			           sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),			           received_opt = filter.down('combo[name=received_opt]').getValue(),
			           evaluation_opt = filter.down('combo[name=evaluation_opt]').getValue(),
			           from_date = filter.down('datefield[name=from_date]').getValue(),
			           to_date = filter.down('textfield[name=to_date]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                        category_type: category_type,
                        section_id:section_id,
                        sub_module_id:sub_module_id,
                        from_date: from_date,
                        received_opt: received_opt,
                        evaluation_opt: evaluation_opt,
                        to_date: to_date

                }
                
        	},

        
        
    },'->',{
        xtype: 'exportbtn',
        text: 'Print(Summary)'
    }]

    });