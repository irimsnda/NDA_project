Ext.define('Admin.view.trader_accounts.views.panels.TraderAppSyncRequestGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'traderappsyncrequestgrid',
    autoScroll: true,
    autoHeight: true,
    itemId: 'traderappsyncrequestgridID',
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
                pageSize: 100,
                storeId: 'traderapprequestsyncStr',
                proxy: {
                    url: 'tradermanagement/gettraderSyncApplicationsRequestCounters'
                }
            },
            isLoad: true
        }
    },
    columns: [
    {
        header: 'id',
        dataIndex: 'id',
        hidden: true,
        flex: 1
    },
    {
        header: 'Trader',
        dataIndex: 'trader_name',
        flex: 1
    }, {
        header: 'Total Applications Requests',
        dataIndex: 'total_request',
        flex: 1
    }, {
        header: 'Applications Pending Merge',
        dataIndex: 'total_pending_merge',
        flex: 1
    }, {
        header: 'Merged Applications',
        dataIndex: 'total_merged',
        flex: 1
    }, {
        header: 'Unprocessed Applications',
        dataIndex: 'total_rejected',
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
                    text: 'View Applications',
                    iconCls: 'x-fa fa-merge',
                    tooltip: 'View Applications',
                    action: 'view',
                    childXtype: 'traderappsyncgrid',
                    winTitle: 'Trader Applications Synchronization',
                    winWidth: '70%',
                    handler: 'showMergeGridFrm',
                    stores: '[]'
                } 
                ]
            }
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Traders Synchronized Applications',
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
        emptyMsg: 'No Records'
    }]
});