Ext.define('Admin.view.summaryreport.premise.panel.PremiseZonalReportPnl', {
	extend: 'Ext.panel.Panel',
	xtype: 'premise_zonal_report',
	margin: 2,
	layout: 'border',
    controller: 'registrationreportviewctr',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
  	items: [{
 		xtype: 'zonalReportFiltersFrm',
 		title: 'Premise Zonal Report',
 		region: 'north',
 		margin: 2,
 		collapsible:true,
        collapsed: true
 	},{
 		xtype: 'zonalReportGrids',
 		title: 'Premise Zonal Report',
 		region: 'center'
	}]
});