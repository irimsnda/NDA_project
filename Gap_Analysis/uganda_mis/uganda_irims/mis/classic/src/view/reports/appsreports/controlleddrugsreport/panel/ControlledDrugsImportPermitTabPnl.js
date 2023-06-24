Ext.define('Admin.view.reports.appsreport.controlleddrugsreport.panel.ControlledDrugsImportPermitTabPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'controlleddrugsimportpermittabpnl',
	margin: 2,
    controller: 'productreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
    	xtype: 'importpermittabularrepresentationgrid',
    	title: 'Tabular Representation'
    },{
    	xtype: 'importpermitgraphicalrepresentationgraph',
    	title: 'Graphical Representation'
    }],
});