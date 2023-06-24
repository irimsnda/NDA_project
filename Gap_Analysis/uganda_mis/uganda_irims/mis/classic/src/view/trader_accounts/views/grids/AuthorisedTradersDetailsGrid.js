Ext.define('Admin.view.trader_accounts.views.panels.AuthorisedTradersDetailsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'authorisedtradersdetailsgrid',
    autoScroll: true,
    autoHeight: true,
    controller: 'traderaccountsvctr',
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
    ],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100, remoteFilter: true,
                storeId: 'authorisedtradersdetailsgridStr',
                proxy: {
                    url: 'tradermanagement/getAuthorisedTradersDetailsinformation'
                }
            },
            isLoad: true
        },
    },
    tbar:[{
            text:'Add Trader Authorisation',
            iconCls:'x-fa fa-plus',
            margin:5,ui: 'soft-purple',
            childXtype: 'authorisedtradersdetailsfrm',
            winTitle:' Authorisation',
            winWidth: '40%',
            handler:'funcAuthorisedtradersdetails'
    }],
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
                    text: 'Product Authorisation',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'View/Set-Up Product Authorisation',
                    action: 'edit',
                    winTitle:'Product Authorisation',
                    winWidth: '70%',
                    panelWidget: 'productauthorisationgrid',
                    handler: 'showEditTraderProductsAuthorisation',
                    stores: '[]'
                }]
            }
        }
    },
    {
        header: 'Trader Name',
        dataIndex: 'name',
        flex: 1
    }, {
        header: 'Account No',
        dataIndex: 'identification_no',
        flex: 1
    },  {
        header: 'Email Address',
        dataIndex: 'email',
        flex: 1
    }, {
        header: 'Country',
        dataIndex: 'country_name',
        flex: 1
    }, {
        header: 'Region',
        dataIndex: 'region_name',
        flex: 1
    }, {
        header: 'Physical Address',
        dataIndex: 'physical_address',
        flex: 1
    }, {
        header: 'Authorised From',
        dataIndex: 'authorised_from',
        flex: 1
    }, {
        header: 'Authorised To',
        dataIndex: 'authorised_to',
        flex: 1
    }, {
        header: 'Authorisation Status',
        dataIndex: 'authorisation_status',
        flex: 1
    },{
        header: 'Effected On',
        dataIndex: 'effected_on',
        flex: 1
    },{
        header: 'Effected By',
        dataIndex: 'effected_by',
        flex: 1
    }],
    features:[{
        ftype:'searching'
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
        emptyMsg: 'No Records',
        beforeLoad:function(){
            this.up('grid').fireEvent('refresh', this);
        }
    }]
});