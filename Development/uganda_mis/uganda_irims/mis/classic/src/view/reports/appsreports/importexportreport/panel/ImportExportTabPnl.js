Ext.define('Admin.view.reports.appsreport.importexportreport.panel.ImportExportTabPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'importexporttabpnl',
	margin: 2,
    controller: 'productreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
    	xtype: 'importexporttabularrepresentationgrid',
    	title: 'Tabular Representation'
    },{
    	xtype: 'importexportgraphicalrepresentationgraph',
    	title: 'Graphical Representation'
    }],
});