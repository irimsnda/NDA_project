Ext.define('Admin.view.summaryreport.revenue.view.RevenueSummaryReport', {
	extend: 'Ext.panel.Panel',
	xtype: 'revenuesummaryreports',
	margin: 2,
	layout: 'fit',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
    items: [{
    	   xtype: 'revenueSummaryReportPnl'
    }],


});