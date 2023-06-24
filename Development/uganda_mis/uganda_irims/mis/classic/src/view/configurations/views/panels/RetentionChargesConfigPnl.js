Ext.define('Admin.view.configurations.views.panels.RetentionChargesConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'retentionChargesConfig',
    title: 'Retention Charges Config',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'retentionChargesConfigGrid'
        }
    ]
});
