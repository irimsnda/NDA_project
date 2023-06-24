Ext.define('Admin.view.managementdashboard.views.dashboard.ApplicationDashboardReport', {
    extend: 'Ext.container.Container',
    xtype: 'applicationdashboardreport',
    padding: '2 0 0 0',
    layout: {
        type: 'fit'
    },
    controller: 'managementdashboardVctr',
    listeners: {
        afterRender: 'load_win'
    },
    width: '100%',
    items: [{
        xtype: 'button',
        text: 'Click To View Dashboard',
        iconCls: 'fa fa-eye',
        handler: 'load_win'
    }]
});
