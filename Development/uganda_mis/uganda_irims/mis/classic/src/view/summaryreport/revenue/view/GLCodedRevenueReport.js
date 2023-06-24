Ext.define('Admin.view.summaryreport.revenue.view.GLCodedRevenueReport', {
	extend: 'Ext.panel.Panel',
	xtype: 'glcodedrevenuereport',
	margin: 2,
	layout: 'fit',
    defaults: {
        scrollable: true
        },
    items: [{
    	   xtype: 'gLCodedRevenueReportGrid'
    }],


});