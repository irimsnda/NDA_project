Ext.define('Admin.view.managementdashboard.views.panels.ApplicationDashboardReportPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'applicationDasboardReportPnl',
    padding: '2 0 0 0',
    tbar:[{
        xtype: 'managementdashboardfilterFrm',
        title: 'Filters'
    }],
    width: '100%',
    height: Ext.Element.getViewportHeight()-60,
    items:[{
    	xtype: 'productApplicationRepresentationPnl',
    	title: 'Product Report'
    },
    {
    	xtype: 'dashboardRegistrationReportFrm',
    	title: 'Registration Report'
    },
    {
    	xtype: 'revenueApplicationRepresentationPnl',
    	title: 'revenue report'

    }]
});