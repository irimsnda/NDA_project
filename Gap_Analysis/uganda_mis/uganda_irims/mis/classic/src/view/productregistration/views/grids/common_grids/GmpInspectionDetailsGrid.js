
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.GmpInspectionDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'gmpInspectionDetailsGrid',
    itemId: 'gmpInspectionDetailsGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 450,
    tbar: [{
        text: 'Doublic Click to select'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'gmpInspectionApplicationsDetailsStr',
                proxy: {
                    url: 'productregistration/onLoadgmpInspectionApplicationsDetails',
                    
                }
            },
            isLoad: true
        }
    },
    export_title: 'GMP Manufacturing Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                store = grid.store;

              product_id = grid.down('hiddenfield[name=product_id]').getValue();
              store.getProxy().extraParams = {
                product_id: product_id
            };
        }
    },{
        xtype: 'hiddenfield',
        name: 'product_id'
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_name',
        text: 'Manufacturer Site Name',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'country_name',
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
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'gmp_certificate_no',
        text: 'GMP Certificate No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'gmp_application_reference',
        text: 'GMP Application Reference No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'registration_status',
        text: 'GMP Registration Status',
        flex: 1
    }]
});

