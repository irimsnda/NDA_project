Ext.define('Admin.view.trader_accounts.views.panels.TraderAuthorisationSetupPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'traderauthorisationsetuppnl',
    title: 'Trader Authorisation ',
    userCls: 'big-100 small-100',
    margin: '2 0 2 0',
    layout: {
        type: 'fit'
    },
    items: [{
            xtype: 'traderauthorisationgrid',
           
    }]
});