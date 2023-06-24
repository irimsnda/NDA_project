
Ext.define('Admin.view.sampleinventory.views.toolbars.DisposeInventoryTbr', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'disposeinventorytbr',
    ui: 'footer',
    defaults: {
        //arrowAlign: 'bottom',
        ui: 'soft-green',
        iconAlign: 'top'
    },
    requires: [
        'Ext.ux.BoxReorderer'
    ],
    plugins: 'boxreorderer',
    overflowHandler: 'scroller',
    items: [
        {
            text: 'Home',
            iconCls: 'x-fa fa-home',
            handler: 'Backhome',
            name: 'disposedinventoryHomeBtn'
        },
        {
            text: 'New Disposal Request',
            iconCls: 'x-fa fa-plus-square',
            handler: 'initiateNewDisposalApplication'
        }
        
    ]
});