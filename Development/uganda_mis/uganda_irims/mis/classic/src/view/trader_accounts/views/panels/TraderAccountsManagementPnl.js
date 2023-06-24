Ext.define('Admin.view.trader_accounts.views.panels.TraderAccountsManagementPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'traderAccountsManagementPnl',
    title: 'Trader Account Information',
    userCls: 'big-100 small-100',
    margin: '2 0 2 0',
    layout: {
        type: 'fit'
    },
    items: [
        {
            xtype: 'traderAccountsManagementGrid'
        }
    ]
});