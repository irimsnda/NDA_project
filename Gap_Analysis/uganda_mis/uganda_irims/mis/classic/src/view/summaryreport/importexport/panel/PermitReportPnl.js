Ext.define('Admin.view.summaryreport.importexport.panel.PermitReportPnl', {
	extend: 'Ext.panel.Panel',
	xtype: 'permit_type_report',
	margin: 2,
	layout: 'border',
    controller: 'registrationreportviewctr',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
  	items: [{
 		xtype: 'permitReportFiltersFrm',
 		title: 'Permit Report Filters',
 		region: 'north',
 		margin: 2,
 		collapsible:true,
        collapsed: true
 	},{
 		xtype: 'permitReportGrids',
 		title: 'Permit Type Report',
 		region: 'center'
	}]
});