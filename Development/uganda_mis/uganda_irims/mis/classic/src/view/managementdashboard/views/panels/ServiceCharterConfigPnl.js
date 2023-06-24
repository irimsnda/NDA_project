Ext.define('Admin.view.managementdashboard.views.panels.ServiceCharterConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'servicecharterconfig',
    title: 'Service Charter Config',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'servicecharterconfigGrid'
        }
    ]
});