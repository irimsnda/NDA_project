Ext.define('Admin.view.summaryreport.application.form.ReportDocumentsPnl', {
	extend: 'Ext.TabPanel',
	xtype: 'reportDocumentsPnl',
	margin: 2,
	height: 500,
	layout: 'fit',
    controller: 'registrationreportviewctr',
    layout: 'fit',
    items: [{
    	xtype: 'systemGeneratedReportsFrm',
    	title: 'System Generated Reports'

    },
    {
    	xtype: 'applicationDocUploadsGrid',
    	title: 'Uploaded Documents'
    }]
});