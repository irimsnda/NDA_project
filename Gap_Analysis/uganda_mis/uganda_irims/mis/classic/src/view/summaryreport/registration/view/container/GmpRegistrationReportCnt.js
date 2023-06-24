Ext.define('Admin.view.summaryreport.application.view.container.GmpRegistrationReportCnt', {
	extend: 'Ext.panel.Panel',
	xtype: 'gmp_reg_report',
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
	 		value: 3
	 	},{
			xtype: 'tabpanel',
		     items: [{
		     		xtype: 'gmpregistrationageAnalysisGrid',
		     		title: 'Age Analysis Report'
		     },{
	     		xtype: 'reportDocumentsPnl',
	     		title: 'Application documents Reports'
	     	}],
    }],


});