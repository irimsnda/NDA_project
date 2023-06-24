Ext.define('Admin.view.trader_accounts.views.panels.TraderAppSyncronizationStatusPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'traderappsyncronizationstatus',
    title: 'Trader Applications Syncronization Status',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'traderappsyncronizationstatusGrid'
        }
    ]
});
