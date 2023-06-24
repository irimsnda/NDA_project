Ext.define('Admin.view.summaryreport.premise.panel.DisposalTypeReportPnl', {
	extend: 'Ext.panel.Panel',
	xtype: 'disposal_type_report',
	margin: 2,
	layout: 'border',
    controller: 'registrationreportviewctr',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
  	items: [{
 		xtype: 'disposaltypeReportFiltersFrm',
 		title: 'Disposal Type Report Filters',
 		region: 'north',
 		margin: 2,
 		collapsible:true,
        collapsed: true
 	},{
 		xtype: 'disposalTypeReportGrids',
 		title: 'Disposal Type Report',
 		region: 'center'
	}]
});