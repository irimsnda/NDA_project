Ext.define('Admin.view.configurations.views.panels.DirectorateNotificationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'directorate_notifications',
    title: 'Directorate Notifications',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'directorateNotificationsGrid'
        }
    ]
});
