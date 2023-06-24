Ext.define('Admin.view.summaryreport.application.view.container.ProductRegistrationReportCnt', {
	extend: 'Ext.panel.Panel',
	xtype: 'product_reg_report',
	margin: 2,
	layout: 'fit',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
    items: [
		 {
	 		xtype: 'hiddenfield',
	 		name: 'module_id',
	 		value: 1
	 	},{
			xtype: 'tabpanel',
		    items: [{
		     	xtype: 'productregistrationageAnalysisGrid',
		     	title: 'Age Analysis Report'
		     },{
	     		xtype: 'reportDocumentsPnl',
	     		title: 'Application documents Reports'
	     	}],
    }],


});