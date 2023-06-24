Ext.define('Admin.view.configurations.views.panels.NotificationCategoryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'notification_category',
    title: 'Notification Category',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'notificationCategoryGrid'
        }
    ]
});
