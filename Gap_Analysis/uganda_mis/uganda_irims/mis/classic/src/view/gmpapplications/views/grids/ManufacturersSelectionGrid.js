/**
 * Created by Kip on 5/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ManufacturersSelectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gmpapplicationsvctr',
    xtype: 'manufacturersselectiongrid',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    height: 550,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [
        {
            xtype: 'button',
            text: 'Add Manufacturer',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',
            handler: 'showAddManufacturerWinFrm',
            childXtype: 'manufacturingDetailsFrm',
            winTitle: 'Manufacturer',
            storeID: 'manufacturersselectionstr',
            winWidth: '60%',
            stores: '[]'
        },
        {
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'displayfield',
            value: 'Double click to select!!',
            fieldStyle: {
                'color': 'green'
            }
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    plugins: [{
        ptype: 'filterfield'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                remoteFilter: true,
                storeId: 'manufacturersselectionstr',
                proxy: {
                    url: 'productregistration/onLoadManufacturingSitesDetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_name',
        text: 'Manufacturer (Corporate) Name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        text: 'Manufacturer Email',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Corporate Address',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'country_name',
        text: 'Country',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'contact_person',
        text: 'Contact Person',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'website',
        text: 'Website',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }
    ]
});
