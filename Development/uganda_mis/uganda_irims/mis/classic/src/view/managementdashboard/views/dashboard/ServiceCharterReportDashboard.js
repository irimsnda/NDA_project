Ext.define('Admin.view.managementdashboard.views.dashboard.ServiceCharterReportDashboard', {
    extend: 'Ext.container.Container',
    xtype: 'servicecharterreportdashboard',
    padding: '2 0 0 0',
    layout: {
        type: 'fit'
    },
    controller: 'managementdashboardVctr',
    width: '100%',
    items: [{
            xtype: 'servicecharterreportgrid'
    }]
});
