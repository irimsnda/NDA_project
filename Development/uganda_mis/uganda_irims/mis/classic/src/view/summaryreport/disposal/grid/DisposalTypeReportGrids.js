Ext.define('Admin.view.summaryreport.product.grid.DisposalTypeReportGrids',{
	extend: 'Ext.grid.Panel',
	xtype: 'disposalTypeReportGrids',
	width: '100%',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'disposaltypereportstr',
                groupField: 'disposal_type',
                proxy: {
                    url: 'summaryreport/getDisposalTypeGridReports'
                }
            },
            isLoad: true
        }
           
    },
	columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'product_type',
        name: 'product_type',
        text: 'product Type',
        width: 150,
        tbCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'weight',
        name: 'weight',
        text: 'Weight',
        width: 150,
        tbCls: 'wrap',
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
         }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'packaging_unit',
        name: 'packaging_unit',
        text: 'Packaging Unit',
        width: 150,
        tbCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'market_value',
        name: 'market_value',
        text: 'Market Value',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'currency',
        name: 'currency',
        text: 'Currency',
        flex: 1
		},{
        xtype: 'gridcolumn',
        dataIndex: 'converted_market_value',
        name: 'converted_market_value',
        text: 'Converted Market Value',
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
          },
        flex: 1
        }
    ],
    features: [{
        ftype:'groupingsummary',
        startCollapsed: true,
        groupHeaderTpl: 'Disposal-Type: {[values.rows[0].data.disposal_type]} [{rows.length} {[values.rows.length > 1 ? "Applications" : "Application"]}]',
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
			           disposal_type = filter.down('combo[name=disposal_type]').getValue(),
			           product_type = filter.down('combo[name=product_type]').getValue(),			           received_opt = filter.down('combo[name=received_opt]').getValue(),
			           evaluation_opt = filter.down('combo[name=evaluation_opt]').getValue(),
			           from_date = filter.down('datefield[name=from_date]').getValue(),
			           to_date = filter.down('textfield[name=to_date]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                        product_type: product_type,
                        disposal_type:disposal_type,
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