/**
 * Created by Kip on 3/15/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.LabResultsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'surveillancevctr',
    xtype: 'labresultsabstractgrid',
    autoScroll: true,
    autoHeight: true,
    headers: false,
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
    export_title: 'Lab Results',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'test_parameter',
                text: 'Test Parameter',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'description',
                text: 'Method',
                flex: 1,
                hidden: true
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'specifications',
                text: 'Specifications',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'results',
                text: 'Results',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'recommendation',
                text: 'Recommendation',
                flex: 1
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
