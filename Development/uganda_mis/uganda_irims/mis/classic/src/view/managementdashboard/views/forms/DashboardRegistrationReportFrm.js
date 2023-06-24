Ext.define('Admin.view.managementdashboard.views.panels.DashboardRegistrationReportFrm', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboardRegistrationReportFrm',
    padding: '5 5 5 5',
    width: '100%',
    scrollable: true,
    controller: 'managementdashboardVctr',
    layout: {
        type: 'hbox',
        width: '100%'
    },
    items:[{
    	xtype: 'applicationProductRepresentationPnl',
    	title: 'Product Registration',
        flex: 1,
    },
    {
    	xtype: 'applicationPremiseRepresentationPnl',
        flex: 1,
    	title: 'Premise Registration'
    },
    {
    	xtype: 'applicationGmpRepresentationPnl',
        flex: 1,
    	title: 'GMP Registration'

    },
    {
        xtype: 'applicationImportExportRepresentationPnl',
        flex: 1,
        title: 'ImportExport Registration'
    },
    {
        xtype: 'applicationClinicalTrialRepresentationPnl',
        flex: 1,
        title: 'Clinical Trial Registration'

    }]
});