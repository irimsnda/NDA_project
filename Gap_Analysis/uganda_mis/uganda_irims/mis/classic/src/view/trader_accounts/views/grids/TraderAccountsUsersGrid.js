Ext.define('Admin.view.trader_accounts.views.panels.TraderAccountsUsersGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'traderAccountsUsersGrid',
    autoScroll: true,
    autoHeight: true,
    height: 250,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    controller: 'traderaccountsvctr',
    scroll: true,
    autoHeight: true,
    width: '100%',
    requires: [
        'Ext.button.Button',
        'Ext.menu.Menu',
        'Ext.toolbar.Paging',
        'Admin.view.plugins.Searching',
        'Ext.grid.*'
    ],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                storeId: 'traderUsersAccountsManagementStr',
                proxy: {
                    url: 'tradermanagement/gettraderUsersAccountsManagementDetails'
                }
            },
            isLoad: true
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add User',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'traderaccountsuserfrm',
        winTitle: 'Account Users',
        winWidth: '40%',
        handler: 'funcAddAccountUserdetails',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    columns: [
    {
        header: 'Email Address',
        dataIndex: 'email',
        flex: 1
    }, {
        header: 'Account No',
        dataIndex: 'identification_no',
        flex: 1
    }, {
        header: 'TelePhone No',
        dataIndex: 'telephone_no',
        flex: 1
    }, {
        header: 'Created On',
        dataIndex: 'created_on',
        flex: 1
    }, {
        header: 'Status',
        dataIndex: 'status_name',
        flex: 1
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    childXtype: 'traderaccountsuserfrm',
                    winTitle: 'Edit Account Users',
                    winWidth: '40%',
                    handler: 'funcEditAccountUserdetails',
                    stores: '[]'
                }]
            }
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Trader Information',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        store: '',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(btn) {
            var store = this.getStore(),
                grid = this.up('grid'),
                trader_id = grid.down('hiddenfield[name=trader_id]').getValue();
  
            store.getProxy().extraParams = {
                         trader_id:trader_id
                 }
         },
        
    },{
        xtype:'hiddenfield',
        name:'trader_id'
    }]
});