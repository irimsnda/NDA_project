Ext.define('Admin.view.trader_accounts.views.panels.TraderAuthorisationGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'traderauthorisationgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    scroll: true,
    autoHeight: true,
    width: '100%',
    requires: [
        'Ext.button.Button',
        'Ext.menu.Menu',
        'Ext.toolbar.Paging',
        'Admin.view.plugins.Searching',
        'Ext.grid.*'
    ],features:[{
        ftype: 'searching',
        minChars: 4,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
           
            config: {
                pageSize: 100, remoteFilter: true,
                storeId: 'traderauthorisationgridstr',
                proxy: {
                    url: 'tradermanagement/gettraderAccountsManagementDetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
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
                    text: 'Authorisation Setup',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'View/Set-Up Authorisation',
                    action: 'edit',
                    panelWidget: 'authorisationsetuppnl',
                    handler: 'showEditTraderAuthorisation',
                    stores: '[]'
                }]
            }
        }
    },
    {
        header: 'Trader Name',
        dataIndex: 'name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        header: 'Account No',
        dataIndex: 'identification_no',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        header: 'TIN No',
        dataIndex: 'tin_no',
        flex: 1
    }, {
        header: 'Contact Person',
        dataIndex: 'contact_person',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        header: 'Email Address',
        dataIndex: 'email',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        header: 'Country',
        dataIndex: 'country_name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        header: 'Region',
        dataIndex: 'region_name',
        flex: 1
    }, {
        header: 'Physical Address',
        dataIndex: 'physical_address',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        header: 'Account Status',
        dataIndex: 'account_status',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }],
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    export_title: 'Trader Information',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }]
});