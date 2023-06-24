/**
 * Created by Softclans on 4/2/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.ProductSelectionCmnGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productselectioncmngrid',
    controller: 'commoninterfacesVctr',
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
        mode: 'remote'
    }],
    listeners: {
        beforerender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 1000,
                proxy: {
                    url: 'productregistration/getRegisteredProductsAppsDetails'
                }
            },
            isLoad: true
        }
    },
    initComponent: function () {
        var defaultColumns = [
            {
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
                dataIndex: 'dosage_form',
                text: 'Dosage Form',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'classification_name',
                text: 'Classification',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'end_date',
                hidden: true,
                text: 'Packaging Material & Seal',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'end_date',
                text: 'Packaging Unit',
                hidden: true,
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'shelf_life',
                text: 'Shelf Life',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'storage_condition',
                text: 'Storage Conditions',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'storage_condition',
                text: 'Storage Conditions',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'manufacturing_site',
                text: 'Manufacturing Site',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'man_siteaddress',
                text: 'Manufacturing Site Address',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'reference_no',
                text: 'Reference No',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'certificate_no',
                text: 'MA Number',
                flex: 1
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
