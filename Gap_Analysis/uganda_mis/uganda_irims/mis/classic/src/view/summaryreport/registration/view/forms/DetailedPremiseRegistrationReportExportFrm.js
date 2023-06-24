Ext.define('Admin.view.summaryreport.application.form.DetailedPremiseRegistrationReportExportFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'detailedPremiseRegistrationReportExportFrm',
	margin: 2,
	height: 500,
	layout: 'fit',
	referenceHolder: true,
	reference: 'ReportDetailedExportWin',
    module: 'premise',
    controller: 'registrationreportviewctr',
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
            name: 'premise_type',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'classification_process',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'module_name',
            value: 'premise',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'business_scale',
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
    		name: 'business_type',
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
            value: 'exportPremiseDefinedColumns',
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
        items: [ '->',
	        {
	        	
		       text: 'Export Detailed Report',
		       ui: 'soft-purple',
               module:'premise',
		       name: 'detailed',
		       iconCls: 'x-fa fa-cloud-upload', 
		       handler: 'func_exportSummaryReport',
		       xFileName: 'Premise Summary Report',
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