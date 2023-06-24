Ext.define('Admin.view.summaryreport.registration.view.container.PremiseRegistrationReportCnt', {
	extend: 'Ext.panel.Panel',
	xtype: 'premise_reg_report',
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
	 		value: 2
	 	},{
			xtype: 'tabpanel',
		     items: [{
		     		xtype: 'premiseregistrationageAnalysisGrid',
		     		title: 'Age Analysis Report'
		     },{
	     		xtype: 'reportDocumentsPnl',
	     		title: 'Application documents Reports'
	     	}],
    }],


});