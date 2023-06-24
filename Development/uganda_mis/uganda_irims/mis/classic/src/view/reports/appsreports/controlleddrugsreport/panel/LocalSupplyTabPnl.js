Ext.define('Admin.view.reports.appsreport.controlleddrugsreport.panel.LocalSupplyTabPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'localsupplytabpnl',
	margin: 2,
    controller: 'productreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
    	xtype: 'localsupplytabularrepresentationgrid',
    	title: 'Tabular Representation'
    },{
    	xtype: 'localsupplygraphicalrepresentationgraph',
    	title: 'Graphical Representation'
    }],
});