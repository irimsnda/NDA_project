Ext.define('Admin.view.sampleinventory.views.panel.ReceivedInventoryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'receivedinventory',
    title: 'Received Inventory',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'receivedinventoryGrid'
        }
    ]
});
