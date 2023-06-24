
Ext.define('Admin.view.drugshopregistration.views.grids.NearestPremiseGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'nearestpremisegrid',
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
        text: 'Add Nearest Premise',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        childXtype: 'drugshopnearestpremiseFrm',
        winWidth: '40%',
        handler: 'showAddNearestPremiseForm'
    }, {
        xtype: 'hiddenfield',
        name: 'premise_id'
    },  {
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
    export_title: 'Nearest Premises Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                premise_id = grid.down('hiddenfield[name=premise_id]').getValue();
            store.getProxy().extraParams = {
                premise_id: premise_id
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
                storeId: 'nearestpremisestr',
                proxy: {
                    url: 'premiseregistration/getNearestPremise'
                }
            },
            isLoad: true
        },
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'street',
        text: 'Street/Road',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'distance',
        text: 'Distance(Km)',
        flex: 1
    }, {
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
