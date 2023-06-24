Ext.define('Admin.view.reports.appsreport.importexportreport.form.DetailedImportExportReportFiltersFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'detailedimportexportreportfrm',
	margin: 2,
	height: 500,
	layout: 'fit',
	referenceHolder: true,
	reference: 'ReportDetailedExportWin',
    controller: 'productreportctr',
    layout: 'border',
    items: [{
            xtype: 'textfield',
            name: 'section_id',
            hidden: true
        },{
    		xtype: 'textfield',
    		name: 'permit_type',
    		hidden: true
    	},{
            xtype: 'textfield',
            name: 'module_name',
            value: 'importexport',
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
            name: 'grid',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'action_url',
            value: 'importExportDetailedReportPreview',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'controlleddrugs_action_url',
            value: 'certificateApprovalDetailedReportPreview',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'process_class',
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
               module: 'importexport',
		       iconCls: 'x-fa fa-cloud-upload', 
		       handler: 'func_exportImportExportDetailedReport'
		          
	        }
           ]
     }],
     listeners: {
     	afterRender: 'fun_loadExportImportExportWinStoreReload'
     }

    });