Ext.define('Admin.view.reports.appsreport.controlleddrugsreport.panel.ApprovalCertificateTabPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'approvalcertificatetabpnl',
	margin: 2,
    controller: 'productreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
    	xtype: 'approvalcertificatetabularrepresentationgrid',
    	title: 'Tabular Representation'
    },{
    	xtype: 'approvalcertificategraphicalrepresentationgraph',
    	title: 'Graphical Representation'
    }],
});