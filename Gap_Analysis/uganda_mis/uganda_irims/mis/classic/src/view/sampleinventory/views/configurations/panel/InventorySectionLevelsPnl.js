Ext.define('Admin.view.sampleinventory.views.configurations.panel.InventorySectionLevelsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'inventorysectionlevels',
    title: 'Inventory Sections Levels',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'inventorysectionlevelsGrid'
        }
    ]
});
