Ext.define('Admin.view.sampleinventory.views.configurations.panel.InventoryStoresPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'inventorystores',
    title: 'Inventory Stores',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'inventorystoresGrid'
        }
    ]
});
