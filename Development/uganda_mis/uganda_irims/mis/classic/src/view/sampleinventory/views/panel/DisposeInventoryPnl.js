Ext.define('Admin.view.sampleinventory.views.panel.DisposeInventoryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'disposeinventory',
    title: 'Disposed Inventory',
    controller: 'sampleinventoryvctr',
    itemId: 'disposeinventory',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'border'
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 18
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },{
            xtype: 'hiddenfield',
            name: 'sub_module_id',
            value: 56
        },
        {
            xtype: 'tabpanel',
            region: 'center',
            itemId: 'diposalDashboardtabpanel',
            items: [{
                xtype: 'disposalInventorycnt',
                bind: {
                         title: '{pnl_title}'
                        },
            },{
                xtype: 'newdisposalrequestGrid',
                title: 'New Requests'
            },{
                xtype: 'disposedinventoryItemsGrid',
                title: 'Disposed Inventory'
            }],
            
        },{
            xtype: 'disposeinventorytbr',
            region: 'south',
            collapsible: true,
            collapsed: false,
            titleCollapse: true
        }
    ]
});
