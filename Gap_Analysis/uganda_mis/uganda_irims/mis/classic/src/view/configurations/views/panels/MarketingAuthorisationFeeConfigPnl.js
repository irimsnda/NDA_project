Ext.define('Admin.view.configurations.views.panels.MarketingAuthorisationFeeConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'marketingauthorisationfeeconfigpnl',
    title: 'Marketing Authorisation Fee Configurations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'marketingauthorisationfeeconfiggrid'
        }
    ],

});
