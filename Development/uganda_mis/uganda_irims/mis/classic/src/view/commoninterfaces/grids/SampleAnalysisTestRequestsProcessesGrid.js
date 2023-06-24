Ext.define('Admin.view.commoninterfaces.grids.SampleAnalysisTestRequestsProcessesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'sampleanalysistestrequestsprocessesgrid',
    itemId: 'sampleanalysistestrequestsprocessesgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    storeID: 'sampleanalysistestrequestsprocessesstr',
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
        xtype:'hiddenfield',
        name:'labreference_no' 
    },'->',{
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
                storeId: 'sampleanalysistestrequestsprocessesstr',
                proxy: {
                    url: 'sampleanalysis/getSampleanalysistestrequestsprocesses',
                }
            },
            isLoad: true
        }
    },
    export_title: 'Application Sample Analysis Requests Process',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('sampleanalysistestrequestsprocessesgrid').fireEvent('refresh', this);
        }
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'laboratory_reference_no',
        text: 'Laboratory Reference No',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'laboratory_no',
        text: 'Laboratory No',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Sample Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'submitted_on',
        text: 'Date Received',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'date_released',
        text: 'Date Released',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'current_stage',
        text: 'Current Process',
        flex: 1
    },   {
        xtype: 'gridcolumn',
        dataIndex: 'is_done',
        text: 'Is Active',
        flex: 0.3,
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return 'Is Done';
            }else{
                metaData.tdStyle = 'color:white;background-color:red';
                return "is-Active";
            }
        }
    }]
});
