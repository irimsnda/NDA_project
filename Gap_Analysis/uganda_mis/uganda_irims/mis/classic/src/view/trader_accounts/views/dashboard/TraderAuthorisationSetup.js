Ext.define('Admin.view.trader_accounts.views.dashboard.TraderAuthorisationSetup', {
    extend: 'Ext.container.Container',
    xtype: 'traderauthorisationsetup',
    layout: 'responsivecolumn',
    controller: 'traderaccountsvctr',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout: {
        type: 'fit'
    },
    items: [
        {
            xtype: 'traderauthorisationsetuppnl'
        }
    ]
});