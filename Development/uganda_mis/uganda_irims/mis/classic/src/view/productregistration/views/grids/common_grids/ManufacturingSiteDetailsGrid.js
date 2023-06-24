
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ManufacturingSiteDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'manufacturingSiteDetailsGrid',
    itemId: 'manufacturingSiteDetailsGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 450,
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
    listeners:{
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'manufacturingSiteDetailsStr',
                proxy: {
                   url: 'productregistration/onLoadManufacturingSitesDetails',
                }
            },
            isLoad: true
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'manufacturingSiteDetailsFrm',
        winTitle: 'Manufacturing Site details',
        winWidth: '40%',
        handler: 'funcSearchProducSitetManufacturerfrm',
        stores: '[]'
    }, {
        text: 'Doubleclick to select Manufacturer'
    }, {
        xtype: 'exportbtn'
    },{
        xtype:'hiddenfield',
        name:'manufacturer_id'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Manufacturer',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                store = grid.store;

              manufacturer_id = grid.down('hiddenfield[name=manufacturer_id]').getValue();
              store.getProxy().extraParams = {
                manufacturer_id: manufacturer_id
            };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'manufacturing_site',
        text: 'Manufacturing Site Name',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_namecountry',
        text: 'Country',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        text: 'Email Address',
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
                    childXtype: 'manufacturingSiteDetailsFrm',
                    winTitle: 'Manufacturing Site Manufacturer',
                    winWidth: '40%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }]
            }
        }
    }]
});
