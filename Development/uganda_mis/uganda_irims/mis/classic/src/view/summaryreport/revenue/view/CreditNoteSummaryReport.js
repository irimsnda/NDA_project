Ext.define('Admin.view.summaryreport.revenue.view.CreditNoteSummaryReport', {
	extend: 'Ext.panel.Panel',
	xtype: 'creditnotesummaryreport',
	margin: 2,
	layout: 'fit',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
    items: [{
        xtype: 'creditnotesummaryreportpnl'
    }],


});