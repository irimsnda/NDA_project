Ext.define('Admin.view.summaryreport.application.view.container.ImportExportRegistrationReportCnt', {
	extend: 'Ext.panel.Panel',
	xtype: 'importexport_reg_report',
	margin: 2,
	layout: 'fit',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
    items: [{
	 		xtype: 'hiddenfield',
	 		name: 'module_id',
	 		value: 4
	 	},{
			xtype: 'tabpanel',
		     items: [{
		     		xtype: 'importexportregistrationageAnalysisGrid',
		     		title: 'Age Analysis Report'
		     },{
	     		xtype: 'reportDocumentsPnl',
	     		title: 'Application documents Reports'
	     	}],
    }],


});