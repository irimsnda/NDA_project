Ext.define('Admin.view.trader_accounts.views.dashboard.TraderAccountsManagement', {
    extend: 'Ext.container.Container',
    xtype: 'traderAccountsManagement',
    layout: 'responsivecolumn',
    controller: 'traderaccountsvctr',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout: {
        type: 'fit'
    },
    items: [
        {
            xtype: 'traderAccountsManagementPnl'
        }
    ]
});