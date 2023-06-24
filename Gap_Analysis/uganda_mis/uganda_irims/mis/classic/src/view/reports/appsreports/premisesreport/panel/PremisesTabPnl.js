Ext.define('Admin.view.reports.appsreport.premisesreport.panel.PremisesTabPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'premisestabpnl',
	margin: 2,
    controller: 'productreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
    	xtype: 'premisestabularrepresentationgrid',
    	title: 'Tabular Representation'
    },{
    	xtype: 'premisegraphicalrepresentationgraph',
    	title: 'Graphical Representation'
    }],
});