Ext.define('Admin.view.sampleinventory.views.panel.IssuedInventoryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'issuedinventory',
    title: 'Issued Inventory',
    controller: 'sampleinventoryvctr',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'border'
    },
    tbar:[{
        xtype: 'button',
        iconCls: 'x-fa fa-copy',
        text: 'Issue Items',
        name: 'issue_btn',
        tooltip: 'Issue item',
        margin: '5 0 5 5',
        childXtype: 'inventoryDashboardGrid',
        winTitle: 'Available Stock',
        winWidth: '90%',
        stores:[],
        handler: 'receivedsamplegridsearch',
    },{
        xtype: 'button',
        iconCls: 'x-fa fa-copy',
        text: 'Issue Requested Items',
        name: 'issue_req_btn',
        tooltip: 'Issue a requested item',
        margin: '5 0 5 5',
        childXtype: 'requestedinventoryItemGrid',
        winTitle: 'Requested Items',
        winWidth: '90%',
        stores:[],
        handler: 'receivedsamplegridsearch',
    }],
    items: [
      {
        xtype: 'panel',
        title: 'Issued Items',
        margin: '5 5 5 5',
        region: 'center',
        layout: 'fit',
        items: [{
            xtype: 'issuedinventoryGrid'
        }],
    }
    ]
});
