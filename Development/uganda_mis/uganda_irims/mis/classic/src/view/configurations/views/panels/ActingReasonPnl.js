Ext.define('Admin.view.configurations.views.panels.ActingReasonPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'actingreason',
    title: 'Acting Reason',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'actingreasongrid'
        }
    ]
});
