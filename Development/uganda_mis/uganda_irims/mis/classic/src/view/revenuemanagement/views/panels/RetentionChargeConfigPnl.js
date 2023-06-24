Ext.define('Admin.view.revenuemanagement.views.panel.RetentionChargeConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'retentionchargeconfigPnl',
    title: 'Retention Charges',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'retentionchargeconfigGrid'
        }
    ]
});
