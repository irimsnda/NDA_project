Ext.define('Admin.view.commoninterfaces.grids.InventorySampleProductSelectionCmnGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'inventorysampleproductselectioncmngrid',
    controller: 'sampleinventoryvctr',
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
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigCombosStore',
            config: {
                pageSize: 1000,
                proxy: {
                     //url: 'productregistration/getRegisteredProductsAppsDetails'
                    url: 'sampleinventory/getSampledProductList'
                }
            },
            isLoad: true
        },
    itemdblclick: 'loadProductDetails'
    },
        columns: [
            {
                xtype: 'gridcolumn',
                dataIndex: 'application_code',
                text: 'Application Code',
                hidden: true,
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'sample_id',
                text: 'Sample Id',
                hidden: true,
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'brand_name',
                text: 'Brand Name',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'common_name',
                text: 'Common Name',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'section_name',
                text: 'Section Name',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'classification_name',
                text: 'Classification',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'reference_no',
                text: 'Reference No',
                flex: 1
            }
        ]
});
