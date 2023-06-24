Ext.define('Admin.view.summaryreport.application.view.container.ClinicalTrialRegistrationReportCnt', {
	extend: 'Ext.panel.Panel',
	xtype: 'clinicaltrial_reg_report',
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
	 		value: 7
	 	},{
			xtype: 'tabpanel',
		     items: [{
		     		xtype: 'clinicaltrialregistrationageAnalysisGrid',
		     		title: 'Age Analysis Report'
		     },{
	     		xtype: 'reportDocumentsPnl',
	     		title: 'Application documents Reports'
	     	}],
    }],


});