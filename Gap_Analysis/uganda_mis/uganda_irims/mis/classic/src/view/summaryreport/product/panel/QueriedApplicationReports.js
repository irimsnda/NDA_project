Ext.define('Admin.view.summaryreport.product.panel.QueriedApplicationReports', {
	extend: 'Ext.panel.Panel',
	xtype: 'queriedapplicationreports',
	margin: 2,
	layout: 'border',
    controller: 'registrationreportviewctr',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
  	items: [{
 		xtype: 'queriedapplicationreportsfilterfrm',
 		title: 'Report Filters',
 		region: 'north',
 		margin: 2,
 		collapsible:true,
        collapsed: true
 	},{
 		xtype: 'queriedapplicationreportsgrid',
 		title: 'Queried Applications Report',
 		region: 'center'
	}]
});