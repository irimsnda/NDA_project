Ext.define('Admin.view.configurations.views.panels.GmpFeeConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpfeeconfigpnl',
    title: 'GMP Fee Configurations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'gmpfeeconfiggrid'
        }
    ],

});
