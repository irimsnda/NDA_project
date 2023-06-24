Ext.define('Admin.view.reports.appsreport.promotionadvertisementreport.panel.PromotionAdvertisementTabPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'promotionadvertisementtabpnl',
	margin: 2,
    controller: 'productreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
    	xtype: 'promotionadvertisementtabularrepresentationgrid',
    	title: 'Tabular Representation'
    },{
    	xtype: 'promotionadvertisementgraphicalrepresentationgraph',
    	title: 'Graphical Representation'
    }],
});