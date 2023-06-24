Ext.define('Admin.view.summaryreport.revenue.view.DailyFinanceTrans', {
	extend: 'Ext.panel.Panel',
	xtype: 'dailyfinancetrans',
	margin: 2,
	layout: 'fit',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
    items: [{
    	   xtype: 'dailyFinanceTransGrid'
    }],


});