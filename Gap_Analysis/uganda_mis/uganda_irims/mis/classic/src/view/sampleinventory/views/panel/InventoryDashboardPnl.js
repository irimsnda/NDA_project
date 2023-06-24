Ext.define('Admin.view.sampleinventory.views.panel.InventoryDashboardPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'inventoryDashboard',
    title: 'Inventory Dashboard',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'inventoryDashboardGrid'
        }
    ]
});
