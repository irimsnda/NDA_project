Ext.define('Admin.view.trader_accounts.views.panels.TraderEmailNotificationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'traderemailnotification',
    title: 'Trader Email Notification',
    userCls: 'big-100 small-100',
    margin: '2 0 2 0',
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'traderemailnotificationgrid'
        }
    ]
});