Ext.define('Admin.view.sampleinventory.views.panel.InventoryItemDetailsViewPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'inventoryitemDetailsViewPnl',
    preventHeader: true,
    itemId: 'inventoryitemDetailsViewPnl',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'border'
    },
    items: [
      {
        xtype: 'form',
        title: 'Item Details',
        margin: '5 5 5 5',
        region: 'north',
        collapsible: true,
        layout: 'column',
        defaults: {
            columnWidth: 0.5,
            margin: '5 5 0 0',
            readOnly: true
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Item Reference No',
            name: 'item_reference_no',
        },{
            xtype: 'textfield',
            fieldLabel: 'Item Type',
            name: 'item_type',
        }],
    },{
        xtype: 'samplestockflowPnl',
        region: 'center'
    }
    ]
});