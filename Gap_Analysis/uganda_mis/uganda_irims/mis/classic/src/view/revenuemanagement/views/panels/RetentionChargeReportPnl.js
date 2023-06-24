Ext.define('Admin.view.revenuemanagement.views.panel.RetentionChargeReportPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'retentionchargereport',
    title: 'Retention Report',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'retentionchargereportGrid'
        }
    ]
});
