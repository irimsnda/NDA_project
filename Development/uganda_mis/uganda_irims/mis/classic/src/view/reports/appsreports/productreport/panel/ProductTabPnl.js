Ext.define('Admin.view.reports.appsreport.productreport.panel.ProductTabPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'producttabpnl',
	margin: 2,
    controller: 'productreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
    	xtype: 'producttabularrepresentationgrid',
    	title: 'Tabular Representation'
    },{
    	xtype: 'productgraphicalrepresentationgraph',
    	title: 'Graphical Representation'
    }],
});