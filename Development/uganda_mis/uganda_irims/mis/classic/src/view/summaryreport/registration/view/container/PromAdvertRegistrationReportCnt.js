Ext.define('Admin.view.summaryreport.application.view.container.PromAdvertRegistrationReportCnt', {
	extend: 'Ext.panel.Panel',
	xtype: 'promadvert_reg_report',
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
	 		value: 14
	 	},{
			xtype: 'tabpanel',
		     items: [{
		     		xtype: 'promadvertregistrationageAnalysisGrid',
		     		title: 'Age Analysis Report'
		     },{
	     		xtype: 'reportDocumentsPnl',
	     		title: 'Application documents Reports'
	     	}],
    }],
});