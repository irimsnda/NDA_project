Ext.define('Admin.view.reports.appsreport.productreport.form.DetailedProductReportFiltersFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'detailedproductreportfrm',
	margin: 2,
	height: 500,
	layout: 'fit',
	referenceHolder: true,
	reference: 'ReportDetailedExportWin',
    controller: 'productreportctr',
    module: 'product',
    layout: 'border',
    items: [{
    		xtype: 'textfield',
    		name: 'section_id',
    		hidden: true
    	},{
            xtype: 'textfield',
            name: 'module_name',
            value: 'product',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'classification_category',
            hidden: true
        },{
    		xtype: 'textfield',
    		name: 'xstore',
    		hidden: true
    	},{
    		xtype: 'textfield',
    		name: 'sub_module_id',
    		hidden: true
    	},{
    		xtype: 'textfield',
    		name: 'prodclass_category',
    		hidden: true
    	},
        {
            xtype: 'textfield',
            name: 'process_class',
            hidden: true
        },{
    		xtype: 'datefield',
    		format: 'Y-m-d',
    		name: 'to_date',
    		hidden: true
    	},{
    		xtype: 'datefield',
    		format: 'Y-m-d',
    		name: 'from_date',
    		hidden: true
    	},{
            xtype: 'textfield',
            name: 'grid',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'action_url',
            value: 'productDetailedReportPreview',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'product_origin_id',
            hidden: true
        }
    	],
     dockedItems: [{
     	xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        dock: 'bottom',
        items: [
	        '->',
	        {
	        	
		       text: 'Export Detailed Report',
		       ui: 'soft-purple',
		       name: 'detailed',
               module: 'product',
		       iconCls: 'x-fa fa-cloud-upload', 
		       handler: 'exportProductDetailedReport'
		       
	                    
	        }
           ]
     }],
     listeners: {
     	afterRender: 'loadExportProductWinStoreReload'
     }

    });