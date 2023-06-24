/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.PremiInspImpExtPermitsProductsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'premiinspimpextpermitsproductsgrid',
    itemId: 'premiinspimpextpermitsproductsgrid',
    
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
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
  
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Impor/Export Permits Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){
            this.up('premiinspimpextpermitsproductsgrid').fireEvent('refresh', this);
        }
        
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'summary',
        dock: 'bottom'
    }],
    listeners: {
        beforerender: {
            fn: 'setRegGridsStore',
            config: {
                pageSize: 200,
                storeId: 'premiinspimpextpermitsproductsstr',
                remoteFilter: true,
                groupField:'sub_module',
                    proxy: {
                        url: 'importexportpermits/getImportexportpermitsproductsDetails',
                        
                    }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand Name/Device Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        text: 'Certificate No',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_category',
        text: 'Product Category',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'device_type',
        text: 'Device Type',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'quantity',
        text: 'Quantity',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'packaging_units',
        text: 'Packaging Units',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'total_weight',
        text: 'Total Weight Units',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'currency_name',
        text: 'Currency Name',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'unit_price',
        text: 'Total Value',
        flex: 1,
        summaryType: 'sum',
        renderer: function (val, meta, record) {
            return Ext.util.Format.number(val, '0,000.00');
        },
        summaryRenderer: function (val) {
            val = Ext.util.Format.number(val, '0,000.00');
        }
    }]
});
