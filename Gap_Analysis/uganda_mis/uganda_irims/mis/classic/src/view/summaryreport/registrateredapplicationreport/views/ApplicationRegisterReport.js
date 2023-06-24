Ext.define('Admin.view.summaryreport.registeredapplicationreport.views.ApplicationRegisterReport', {
	extend: 'Ext.panel.Panel',
	xtype: 'applicationRegisterReport',
	margin: 2,
	layout: 'border',
    controller: 'registeredapplicationreportviewctr',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
  	items: [{
 		xtype: 'registeredApplicationReportFiltersFrm',
 		title: 'Filters',
 		region: 'north',
 		margin: 2,
 		collapsible:true,
        collapsed: true
 	},{
 		xtype: 'registeredApplicationReportPnl',
 		region: 'center'
	}]
});