Ext.define('Admin.view.summaryreport.application.form.DetailedPromAdvertRegistrationReportExportFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'detailedPromAdvertRegistrationReportExportFrm',
	margin: 2,
	height: 500,
	layout: 'fit',
	referenceHolder: true,
	reference: 'ReportDetailedExportWin',
    controller: 'registrationreportviewctr',
    module: 'promadvert',
    layout: 'border',
    items: [{
    		xtype: 'textfield',
    		name: 'section_id',
    		hidden: true
    	},{
            xtype: 'textfield',
            name: 'directorate_id',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'classification_process',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'module_name',
            value: 'promadvert',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'classification_id',
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
    		name: 'evaluation_opt',
    		hidden: true
    	},{
            xtype: 'textfield',
            name: 'received_opt',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'grid',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'action_url',
            value: 'exportPromAdvertDefinedColumns',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'zone_id',
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
               module: 'promAdvert',
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