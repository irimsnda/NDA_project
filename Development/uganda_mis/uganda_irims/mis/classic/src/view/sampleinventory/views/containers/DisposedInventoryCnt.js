Ext.define('Admin.view.sampleinventory.views.containers.DisposedInventoryCnt', {
    extend: 'Ext.panel.Panel',
    xtype: 'disposalInventorycnt',
    layout: 'fit',
    itemId: 'disposalInventorycnt',
    viewModel: 'sampleinventoryvm',
    items: [
        {
            xtype: 'disposeinventoryGrid',
        }
    ]
});