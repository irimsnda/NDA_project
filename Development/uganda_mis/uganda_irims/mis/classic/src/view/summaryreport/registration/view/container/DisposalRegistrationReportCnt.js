Ext.define('Admin.view.summaryreport.application.view.container.DisposalRegistrationReportCnt', {
	extend: 'Ext.panel.Panel',
	xtype: 'disposal_reg_report',
	margin: 2,
	layout: 'fit',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
    items: [
		 {
	 		xtype: 'hiddenfield',
	 		name: 'module_id',
	 		value: 15
	 	},{
			xtype: 'tabpanel',
		     items: [{
		     		xtype: 'disposalregistrationageAnalysisGrid',
		     		title: 'Age Analysis Report'
		     },{
	     		xtype: 'reportDocumentsPnl',
	     		title: 'Application documents Reports'
	     	}],
    }],


});