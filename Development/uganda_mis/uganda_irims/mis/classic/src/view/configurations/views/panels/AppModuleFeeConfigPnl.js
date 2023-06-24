Ext.define('Admin.view.configurations.views.panels.AppModuleFeeConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'appModuleFeeConfigPnl',
    title: 'Module Fee Configurations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'appModuleFeeConfigGrid'
        }
    ],

});
