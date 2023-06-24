Ext.define('Admin.view.commoninterfaces.grids.SampleAnalysisTestResultsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'sampleanalysistestresultsgrid',
    itemId: 'sampleanalysistestresultsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    storeID: 'sampleanalysistestresultssstr',
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
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 20
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
                storeId: 'sampleanalysistestresultssstr',
                proxy: {
                    url: 'sampleanalysis/getsampleanalysistestAnalysisResults',
                }
            },
            isLoad: true
        }
    },
    export_title: ' Analysis Test Results',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('sampleanalysistestresultsgrid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'test_parameter',
        text: 'Sample Test Parameter',
        flex: 1,
    }, {
        header : 'Test Method(s)',
        dataIndex: 'test_methods',
        text: 'Sample Test Analysis Method',
        flex: 1,
    },{
        header : 'Specifications',
        dataIndex : 'specifications',
        tdCls : 'wrap-text',
        flex : 0.5,

    }, {
        header : 'Results',
        dataIndex : 'results',
        tdCls : 'wrap-text',
        flex : 0.5
    }, {
        header : 'Analyst Remarks/Recommendation',
        tdCls : 'wrap-text',
        dataIndex : 'recommendation',
        flex : 0.3

    } ]
});
