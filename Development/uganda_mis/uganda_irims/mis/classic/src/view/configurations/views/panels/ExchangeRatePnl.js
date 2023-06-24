Ext.define('Admin.view.configurations.views.panels.ExchangeRatePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'exchangeRatePnl',
    title: 'Exchange Rates',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'exchangeRateGrid'
        }
    ],

});
