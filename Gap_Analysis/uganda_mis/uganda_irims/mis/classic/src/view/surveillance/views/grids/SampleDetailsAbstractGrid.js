/**
 * Created by Kip on 3/13/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.SampleDetailsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'surveillancevctr',
    xtype: 'sampledetailsabstractgrid',
    autoScroll: true,
    autoHeight: true,
    headers: false,
    autoSizeHeaders: true,
    autoSizeColumns: true,
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
    export_title: 'Pms samples',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Section: {[values.rows[0].data.section_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    initComponent: function () {
        var defaultColumns = [{
            xtype: 'gridcolumn',
            dataIndex: 'sample_refno',
            text: 'Sample Reference No',
            width: 200
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'sample_name',
            text: 'Sample Name',
            width: 100,
            tdCls: 'wrap-text'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'certificate_no',
            text: 'Registration No',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'sample_code',
            text: 'Sample Code',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'dosage_form',
            text: 'Dosage Form',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'product_form',
            text: 'Product Form',
            hidden: true,
            width: 100
        },{
            xtype: 'gridcolumn',
            dataIndex: 'device_type',
            text: 'Device Type',
            hidden: true,
            width: 100
        },{
            xtype: 'gridcolumn',
            dataIndex: 'common_name',
            text: 'Common Name',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'date_collected',
            text: 'Collection Date',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'class',
            text: 'Classification',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'packaging_size',
            text: 'Packaging Size',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'packaging_unit',
            text: 'Packaging Units',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'collected_samples',
            text: 'Number of Collected Samples',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'batch_no',
            text: 'Batch No',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'manufacturer',
            text: 'Manufacturer',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'manufacturing_date',
            text: 'Manufacturing Date',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'expiry_date',
            text: 'Expiry Date',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'storage',
            text: 'Product Storage',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'collectionsite_storage_condition',
            text: 'Collection Site Storage Condition',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'seal_condition',
            text: 'Seal Pack Condition',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'shelf_life',
            text: 'Shelf Life',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'shelf_lifeafter_opening',
            text: 'Shelf life after opening',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'sampling_reason',
            text: 'Reason for Sampling',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'collector',
            text: 'Sample Collector',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'sample_type',
            text: 'Sample Application Type',
            width: 100
        }];
        this.columns = (this.columns).concat(defaultColumns);
        this.callParent(arguments);
    }
});
