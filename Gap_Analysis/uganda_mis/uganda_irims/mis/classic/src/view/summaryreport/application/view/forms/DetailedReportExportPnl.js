Ext.define('Admin.view.summaryreport.application.form.DetailedReportExport', {
	extend: 'Ext.form.Panel',
	xtype: 'detailedReportExport',
	margin: 2,
	height: 500,
	layout: 'fit',
	referenceHolder: true,
	reference: 'ReportDetailedExportWin',
    controller: 'reportviewctr',
    layout: 'border',
    items: [{
    		xtype: 'textfield',
    		name: 'section_id',
    		hidden: true
    	},{
            xtype: 'textfield',
            name: 'Classification',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'regDetails',
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
    		name: 'zone_id',
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
    		name: 'receivedOpt',
    		hidden: true
    	},{
    		xtype: 'textfield',
    		name: 'approvalOpt',
    		hidden: true
    	},{
            xtype: 'textfield',
            name: 'grid',
            hidden: true
        }
    	],
     dockedItems: [{
     	xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        dock: 'bottom',
        items: [{
        	   text: 'Export Detailed Report(Include above Filters)',
		       ui: 'soft-purple',
		       name: 'filtered',
		       iconCls: 'x-fa fa-cloud-upload', 
		       handler: 'func_exportSummaryReport',
		       xFileName: '',
               xspreadsheet:'',
               xPrintFunc: '',
               xheading:''
        },
	        '->',
	        {
	        	
		       text: 'Export Detailed Report',
		       ui: 'soft-purple',
		       name: 'detailed',
		       iconCls: 'x-fa fa-cloud-upload', 
		       handler: 'func_exportSummaryReport',
		       xFileName: '',
               xspreadsheet:'',
               xPrintFunc: '',
               xheading:''
	                    
	        }
           ]
     }],
     listeners: {
     	afterRender: 'fun_loadExportWinStoreReload'
     }

    });