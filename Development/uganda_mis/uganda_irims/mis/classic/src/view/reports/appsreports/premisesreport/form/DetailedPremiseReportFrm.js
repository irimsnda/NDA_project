Ext.define('Admin.view.reports.appsreport.premisesreport.form.DetailedPremiseReportFiltersFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'detailedpremisereportfrm',
	margin: 2,
	height: 500,
	layout: 'fit',
	referenceHolder: true,
	reference: 'ReportDetailedExportWin',
    controller: 'productreportctr',
    module: 'premise',
    layout: 'border',
    items: [{
            xtype: 'textfield',
            name: 'section_id',
            hidden: true
        },{
    		xtype: 'textfield',
    		name: 'business_type_details',
    		hidden: true
    	},{
            xtype: 'textfield',
            name: 'module_name',
            value: 'premise',
            hidden: true
        },{
    		xtype: 'textfield',
    		name: 'xstore',
    		hidden: true
    	},{
    		xtype: 'textfield',
    		name: 'sub_module_id',
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
            value: 'premiseDetailedReportPreview',
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
               module: 'premise',
		       iconCls: 'x-fa fa-cloud-upload', 
		       handler: 'exportPremiseDetailedReport'
	                    
	        }
           ]
     }],
     listeners: {
     	afterRender: 'loadExportPremiseWinStoreReload'
     }

    });