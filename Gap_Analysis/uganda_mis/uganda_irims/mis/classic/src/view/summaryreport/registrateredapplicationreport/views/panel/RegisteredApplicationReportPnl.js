Ext.define('Admin.view.summaryreport.registeredapplicationreport.views.panel.RegisteredApplicationReportPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'registeredApplicationReportPnl',
	margin: 2,
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
  	items: [{
 		xtype: 'registeredapplicationcountergrid',
 		title: 'Registration Counter',
 	},{
 		xtype: 'registeredApplicationsGrid',
 		title: 'Registered Applications'
	}]
});