Ext.define('Admin.view.summaryreport.revenue.view.panel.RevenueSummaryReportPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'revenueSummaryReportPnl',
	margin: 2,
	layout: 'fit',
    controller: 'revenueReportViewCtr',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
    items: [,{
        xtype: 'revenueSummaryModulePnl',
        title: ' Revenue Summary Report'
         },{
            xtype: 'revenueSummaryDepartmentalPnl',
            hidden: true,
            title: 'Departmental Summary Revenue Report'
        }],


});