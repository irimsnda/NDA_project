Ext.define('Admin.view.sampleinventory.views.configurations.panel.InventoryStoreSectionsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'inventorystoresections',
    title: 'Inventory Store Sections',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'inventorystoresectionsGrid'
        }
    ]
});
