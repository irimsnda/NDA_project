Ext.define('Admin.view.configurations.views.panels.DepartmentalNotificationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'departmental_notifications',
    title: 'Departmental Notifications',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'departmentalNotificationsGrid'
        }
    ]
});
