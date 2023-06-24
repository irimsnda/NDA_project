Ext.define('Admin.view.managementdashboard.views.panels.ServiceTypePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'servicetype',
    title: 'Service Type',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'servicetypeGrid'
        }
    ]
});