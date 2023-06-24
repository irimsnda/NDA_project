Ext.define('Admin.view.trader_accounts.views.panels.TraderAccountsInfoPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'traderaccountsinfopnl',
    title: 'Trader Account Information',
    userCls: 'big-100 small-100',
    margin: '2 0 2 0',
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'traderaccountsinfogrid'
        }
    ]
});