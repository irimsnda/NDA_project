Ext.define('Admin.view.configurations.views.panels.ExpiryNotificationDaySpanPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'expirynotificationdayspan',
    title: 'Expiry Notification Span Setup',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'expirynotificationdayspanGrid'
        }
    ]
});
