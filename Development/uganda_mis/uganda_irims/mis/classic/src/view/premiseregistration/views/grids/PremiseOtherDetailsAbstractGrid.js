/**
 * Created by Kip on 3/20/2019.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremiseOtherDetailsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'premiseotherdetailsabstractgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    config: {
        isWin: 0,
        isOnline: 0
    },
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
    export_title: 'Premise Other Details',
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'premiseotherdetailsstr',
                proxy: {
                    url: 'premiseregistration/getPremiseOtherDetails'
                }
            },
            isLoad: true
        }
    },
    initComponent: function () {
        var defaultColumns = [{
            xtype: 'gridcolumn',
            dataIndex: 'business_type',
            text: 'Business Type',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'business_type_detail',
            text: 'Business Type Details',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'product_category',
            text: 'Product Category',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'product_category',
            text: 'Product Sub Category',
            flex: 1
        }];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }

});
