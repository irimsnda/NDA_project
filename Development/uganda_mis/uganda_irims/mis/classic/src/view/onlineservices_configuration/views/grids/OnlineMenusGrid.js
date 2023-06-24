/**
 * Created by Kip on 7/9/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.grids.OnlineMenusGrid', {
    extend: 'Ext.tree.Panel',
    xtype: 'onlinemenusgrid',
    store: 'onlinemenusstr',
    useArrows: true,
    columnLines: true,
    rootVisible: false,
    height: Ext.Element.getViewportHeight() - 118,
    width: '100%',
	 tbar: [{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'onlinemenusfrm',
        winTitle: 'Online Menus',
        winWidth: '40%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'onlinemenusstr',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    listeners: {
        afterrender: function () {
            var store = this.store;
            store.removeAll();
            store.load();
        }
    },
    columns: [{
            xtype: 'treecolumn',
            text: 'Name',
            flex: 2,
            sortable: true,
            dataIndex: 'name'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'router_link',
            text: 'Route Link',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'iconCls',
            text: 'Icon',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'level',
            text: 'Level',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'order_no',
            text: 'Order No',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            text: 'Navigation Type',
            flex: 1,
            sortable: true,
            dataIndex: 'navigation_type'
        },{
            text: 'Options',
            xtype: 'widgetcolumn',
            width: 90,
            widget: {
                textAlign: 'left',
                xtype: 'splitbutton',
                ui: 'gray',
                width: 75,
                iconCls: 'x-fa fa-th-list',
                menu: {
                    xtype: 'menu',
                    items: [{
						text: 'Edit',
						iconCls: 'x-fa fa-edit',
						tooltip: 'Edit Record',
						action: 'edit',
						childXtype: 'onlinemenusfrm', 
						winTitle: 'Online Portal Menus',
						winWidth: '40%',
						handler: 'showEditConfigParamWinFrm',
						stores: '[]'
					}, {
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'wb_navigation_items',
                        storeID: 'onlinemenusstr',
                        action_url: 'onlineservices/deleteSystemMenuItem',  
                        action: 'actual_delete',
                        handler: 'doDeleteConfigWidgetParam',
                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                    }]
                }
            }
        }]
});
