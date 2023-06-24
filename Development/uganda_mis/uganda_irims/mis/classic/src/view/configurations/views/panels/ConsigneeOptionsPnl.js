
Ext.define('Admin.view.configurations.views.panels.ConsigneeOptionsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'consigneeoptionspnl',
    title: 'Consignee Options',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    padding: 2,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'consigneeoptionsgrid'
        }
    ]
});
