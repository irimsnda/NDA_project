Ext.define('Admin.view.trader_accounts.views.panels.TraderAppSyncPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'traderappsync',
    title: 'Traders Application Sync Requests',
    userCls: 'big-100 small-100',
    margin: '2 0 2 0',
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'traderappsyncrequestgrid'
        }
    ]
});