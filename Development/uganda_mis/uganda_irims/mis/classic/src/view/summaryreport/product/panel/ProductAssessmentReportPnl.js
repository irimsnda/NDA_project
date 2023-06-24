Ext.define('Admin.view.summaryreport.premise.panel.ProductAssessmentReportPnl', {
	extend: 'Ext.panel.Panel',
	xtype: 'product_assessment_report',
	margin: 2,
	layout: 'border',
    controller: 'registrationreportviewctr',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
  	items: [{
 		xtype: 'assessmentReportFiltersFrm',
 		title: 'Product Assesment Report Filters',
 		region: 'north',
 		margin: 2,
 		collapsible:true,
        collapsed: true
 	},{
 		xtype: 'productAssessmentReportGrids',
 		title: 'Product Assesment Report',
 		region: 'center'
	}]
});