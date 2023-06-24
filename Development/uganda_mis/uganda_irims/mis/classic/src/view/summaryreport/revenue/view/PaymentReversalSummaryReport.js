Ext.define('Admin.view.summaryreport.revenue.view.PaymentReversalSummaryReport', {
	extend: 'Ext.panel.Panel',
	xtype: 'paymentreversalsummaryreport',
	margin: 2,
	layout: 'border',
    controller: 'revenueReportViewCtr',
    defaults: {
        
        scrollable: true
        },
    items: [{
      xtype:'revenueFilterFrm',
      region:'north',
      height: 150
    },{
    	   xtype: 'paymentreversalsummaryreportgrid',
           title: 'Payments Reversals ',
           region:'center',
    }],
});