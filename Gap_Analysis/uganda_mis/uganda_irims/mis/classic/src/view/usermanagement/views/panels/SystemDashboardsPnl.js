
Ext.define('Admin.view.usermanagement.views.panels.SystemDashboardsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'systemdashboardspnl',
    title: 'System Dashboard',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'systemdashboardsgrid'
        }
    ]
});
