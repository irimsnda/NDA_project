/**
 * Created by Kip on 11/8/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.TraderPersonnelGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'traderpersonnelgrid',
    autoScroll: true,
    autoHeight: true,
    height: 450,
    frame: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    config:{
        moreDetails: 0
    },
    tbar: [{
        xtype: 'button',
        text: 'Add Personnel',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        childXtype: 'personnelbasicinfofrm',
        winWidth: '40%',
        handler: 'showAddTraderPersonnelForm'
        /*handler: function (btn) {
            var grid = btn.up('grid'),
                win = grid.up('window'),
                tabPnl = win.down('tabpanel');
            win.remove(grid, true);
            tabPnl.show();
        }*/
    }, {
        xtype: 'hiddenfield',
        name: 'trader_id'
    }, {
        xtype: 'hiddenfield',
        name: 'personnel_type'
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'displayfield',
        value: 'Double click to select',
        fieldStyle: {
            'color': 'green'
        }
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Trader Personnel Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                trader_id = grid.down('hiddenfield[name=trader_id]').getValue();
            store.getProxy().extraParams = {
                trader_id: trader_id
            };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'traderpersonnelstr',
                proxy: {
                    url: 'premiseregistration/getTraderPersonnel'
                }
            },
            isLoad: true
        },
        /*   itemdblclick: function (view, record) {
               var grid = view.grid,
                   win = grid.up('window'),
                   tabPnl = win.down('tabpanel'),
                   store=Ext.getStore('trapersonnelqualificationsstr'),
                   basicFrm = tabPnl.down('personnelbasicinfofrm');
               store.load();
               basicFrm.loadRecord(record);
               win.remove(grid, true);
               tabPnl.show();
           }*/
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'contact_name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'contact_telephone_no',
        text: 'Telephone No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'contact_email_address',
        text: 'Email address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'registration_no',
        text: 'Registration No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'registration_date',
        text: 'Registration Date',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'qualification',
        text: 'Qualification',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'country',
        text: 'Country',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'region',
        text: 'Region',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'district',
        text: 'District',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'contact_postal_address',
        hidden:true,
        text: 'Postal Address',
        flex: 1
    }, {
        xtype: 'widgetcolumn',
        text: 'Options',
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
                    handler: 'showEditPremiseRegParamWinFrm',
                    winWidth: '40%',
                    stores: '[]',
                    childXtype: 'personnelbasicinfofrm',
                    winTitle: 'Premise Personnel'
                }
                ]
            }
        }
    }
    ]
});
