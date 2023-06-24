Ext.define('Admin.view.summaryreport.product.grid.ProductAssessmentReportGrids',{
	extend: 'Ext.grid.Panel',
	xtype: 'productAssessmentReportGrids',
	width: '100%',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'productassessmentreportstr',
                groupField: 'assessment_procedure',
                proxy: {
                    url: 'summaryreport/getProductAssessmentGridReports'
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
        width: 150,
        tbCls: 'wrap',
       	summaryRenderer: function(){
	            return '<b>Grand Total:</b>';
	        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        name: 'section_name',
        text: 'Section',
        width: 150,
        tbCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'classification_name',
        name: 'classification_name',
        text: 'Classification',
        width: 150,
        tbCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'assessment_procedure',
        name: 'assessment_procedure',
        text: 'Assesment Procedure',
        hidden: true,
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'received_applications',
        name: 'received_applications',
        text: 'Received Applications',
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
          },
        flex: 1
		},{
        xtype: 'gridcolumn',
        dataIndex: 'queried_applications',
        name: 'queried_applications',
        text: 'Queried Applications',
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
          },
        flex: 1
		},{
        xtype: 'gridcolumn',
        dataIndex: 'total',
        name: 'total',
        text: 'Total Applications',
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
          },
        flex: 1
		}
    ],
    features: [{ftype:'groupingsummary',startCollapsed: true}],
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
			           assessment_procedures = filter.down('combo[name=assessment_procedures]').getValue(),
			           section_id = filter.down('combo[name=section_id]').getValue(),
			           classification_id = filter.down('combo[name=classification_id]').getValue(),
			           received_opt = filter.down('combo[name=received_opt]').getValue(),
			           evaluation_opt = filter.down('combo[name=evaluation_opt]').getValue(),
			           from_date = filter.down('datefield[name=from_date]').getValue(),
			           to_date = filter.down('textfield[name=to_date]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                        sub_module_id:sub_module_id,
                        section_id: section_id,
                        classification_id:classification_id,
                        from_date: from_date,
                        received_opt: received_opt,
                        evaluation_opt: evaluation_opt,
                        to_date: to_date,
                        assessment_procedures: assessment_procedures

                }
                
        	},

        
        
    },'->'
     ,{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
        fieldLabel: 'Group By Classification',
        margin: '0 20 0 0',
        name: 'grouper',
        listeners: {
            change: 'func_grouper'
        }
     },{
        xtype: 'exportbtn',
        text: 'Print(Summary)'
    }]

    });