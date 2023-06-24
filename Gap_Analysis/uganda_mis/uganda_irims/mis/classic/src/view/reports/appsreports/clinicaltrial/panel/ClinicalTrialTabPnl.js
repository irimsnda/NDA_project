Ext.define('Admin.view.reports.appsreport.clinicaltrialreportreport.panel.ClinicalTrialTabPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'clinicaltrialtabpnl',
	margin: 2,
    controller: 'productreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
    	xtype: 'clinicaltrialtabularrepresentationgrid',
    	title: 'Tabular Representation'
    },{
    	xtype: 'clinicaltrialgraphicalrepresentationgraph',
    	title: 'Graphical Representation'
    }],
});