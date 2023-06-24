Ext.define('Admin.view.sampleinventory.views.panel.IssuingInventoryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'issuinginventory',
    preventHeader: true,
    itemId: 'issuinginventoryId',
    controller: 'sampleinventoryvctr',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'border'
    },
    tbar:[{
        xtype: 'button',
        iconCls: 'x-fa fa-print',
        text: 'Print Issue',
        name: 'print_btn',
        tooltip: 'Print',
        margin: '5 5 5 5',
        childXtype: 'inventoryDashboardGrid',
        winTitle: 'issuing Sample',
        winWidth: '50%',
        stores:[],
        handler: 'receivedsamplegridsearch',
    },{
        xtype: 'button',
        iconCls: 'x-fa fa-copy',
        text: 'Issue Items',
        name: 'issue_btn',
        tooltip: 'Issue Item',
        margin: '5 5 5 5',
        childXtype: 'issueinventoryRequestFrm',
        winTitle: 'Issue Details',
        winWidth: '90%',
        stores:[],
        handler: 'LoadIssueInventorygrid',
    }],
    items: [
      {
        xtype: 'form',
        title: 'Stock Details',
        margin: '5 5 5 5',
        region: 'north',
        collapsible: true,
        layout: 'column',
        defaults: {
            columnWidth: 0.25,
            margin: '5 5 0 0',
            readOnly: true
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Item Reference No',
            name: 'item_reference_no',
        },{
            xtype: 'textfield',
            fieldLabel: 'Application Reference No',
            name: 'reference_no',
        },{
            xtype: 'textfield',
            fieldLabel: 'Item Type',
            name: 'item_type',
        },{
            xtype: 'textfield',
            fieldLabel: 'Quantity Received',
            name: 'quantity_received',
        },{
            xtype: 'textfield',
            fieldLabel: 'Current Stock',
            name: 'remaining_quantity',
        }],
    },{
        xtype: 'samplestockflowPnl',
        region: 'center'
    }
    ]
});