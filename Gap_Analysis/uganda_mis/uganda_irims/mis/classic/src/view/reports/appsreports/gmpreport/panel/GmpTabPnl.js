Ext.define('Admin.view.reports.appsreport.gmpreport.panel.GmpTabPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'gmptabpnl',
	margin: 2,
    controller: 'productreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
    	xtype: 'gmptabularrepresentationgrid',
    	title: 'Tabular Representation'
    },{
    	xtype: 'gmpgraphicalrepresentationgraph',
    	title: 'Graphical Representation'
    }],
});