Ext.define('Admin.view.configurations.views.panels.LicensingFeeConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'licensingfeeconfigpnl',
    title: 'Licensing Fee Configurations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'licensingfeeconfiggrid'
        }
    ],

});
