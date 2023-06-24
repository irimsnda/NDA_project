Ext.define('Admin.view.reports.appsreport.disposalreport.panel.DisposalTabPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'disposaltabpnl',
	margin: 2,
    controller: 'productreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
    	xtype: 'disposaltabularrepresentationgrid',
    	title: 'Tabular Representation'
    },{
    	xtype: 'disposalgraphicalrepresentationgraph',
    	title: 'Graphical Representation'
    }],
});