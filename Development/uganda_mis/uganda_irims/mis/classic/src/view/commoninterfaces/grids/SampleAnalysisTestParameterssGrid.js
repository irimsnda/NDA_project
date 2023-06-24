Ext.define('Admin.view.commoninterfaces.grids.SampleAnalysisTestParameterssGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'sampleanalysistestparameterssgrid',
    itemId: 'sampleanalysistestparameterssgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    storeID: 'sampleanalysistestrequestsstr',
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
        xtype: 'button',
        text: 'Test Parameter',
        name: 'sample_test_requests',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        winWidth: '70%',
        stores: '[]',
        childXtype:'testparameterssgrid',
        winTitle:'Analysis Test Parameters',
        handler: 'funcAddTestAnalysisParameter',
        bind: {
            hidden: '{isReadOnly}'  // negated
        }
    }, {
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
                storeId: 'sampleanalysistestrequestsstr',
                proxy: {
                    url: 'sampleanalysis/getsampleanalysistestParameters',
                }
            },
            isLoad: true
        }
    },
    export_title: ' Analysis Requests Parameters',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('sampleanalysistestparameterssgrid').fireEvent('refresh', this);
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
        text: 'Sample Test Parametere',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'pass_status',
        text: 'Test Review Pass Status',
        flex: 0.3,
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:green';
                
            }else{
                metaData.tdStyle = 'color:white;background-color:red';
                return "Not Reviewed Or Rejected";
            }
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'parameter_cost',
        text: 'Paramter Costs',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'test_review_response',
        text: 'Test Review Response',
        flex: 1
    }, {
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
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'sample_test_request',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    storeID: 'sampleanalysistestrequestsstr',
                    action_url: 'sampleanalysis/onDeleteLabSampleOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeleteSampleTestDetailsdetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }]
            }
        }
    }]
});
