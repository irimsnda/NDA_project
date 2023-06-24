Ext.define('Admin.view.summaryreport.application.view.container.PremiseReportCnt', {
	extend: 'Ext.form.Panel',
	xtype: 'premise_report',
	margin: 2,
	layout: 'fit',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
    items: [{
    	xtype: 'tabpanel',
	     	items: [{
	     		xtype: 'premise_reportPnl',
	     		title: 'Summary Report'
	     	},{
	     		xtype: 'revenueReportPnl',
	     		title: 'Revenue Report'
	     	},{
	     		xtype: 'reportDocumentsPnl',
	     		title: 'Application documents Reports'
	     	}
	     	// ,{
	     	// 	xtype: 'ageAnalysisGrid',
	     	// 	title: 'Age Analysis Report'
	     	// }
	     	//,{
	     	// 	xtype: 'panel',
	     	// 	title: 'Performance Report'
	     	// }
	     	],
    }],


});