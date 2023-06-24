Ext.define('Admin.view.surveillance.views.grids.GroupSampleAnalysisDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'groupsampleanalysisdetailsgrid',
    itemId: 'groupsampleanalysisdetailsgrid',
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
    tbar: [ {
        xtype: 'button',
        text: 'Sample Test Requests',
        name: 'sample_test_requests',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        winWidth: '35%',
        stores: '[]',
        handler: 'funcAddSampleTestAnalysisrequest',
        bind: {
            hidden: '{isReadOnly}'
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
                storeId: 'groupsampleanalysisdetailsgridstr',
                proxy: {
                    url: 'sampleanalysis/getgroupsampleanalysisdetails',
                }
            },
            isLoad: true
        }
    },
    export_title: 'Application Sample Analysis Requests',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('groupsampleanalysisdetailsgrid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
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
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1,
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Sample Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'request_by',
        text: 'Requested By',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'requested_on',
        text: 'Requested On',
        flex: 1
    },   {
        xtype: 'gridcolumn',
        dataIndex: 'received_on',
        text: 'Received On',
        flex: 1
    },   {
        xtype: 'gridcolumn',
        dataIndex: 'sample_analysis_status',
        text: 'Sample Analysis Status',
        flex: 1
    },{
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
                    text: 'Edit & Preview',
                    iconCls: 'x-fa fa-edit',
                    handler: 'editSsampleanalysistestrequests',
                    name: 'editpreview'
                },  {
                    text: 'Print Sample Summary Report',
                    iconCls: 'x-fa fa-print',
                    winWidth: '70%',
                    handler: 'printSampleSummaryReport',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    }
                },  {
                    text: 'Print Sample Request Review',
                    iconCls: 'x-fa fa-print',
                    winWidth: '70%',
                    handler: 'printSampleTestRequestReview',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    }
                }, {
                    text: 'Sample Analysis Tests Results',
                    iconCls: 'x-fa fa-bars',
                    winWidth: '35%',
                    winTitle: 'Sample test Analysis Results',
                    handler: 'viewsampleanalysistestResults',
                    stores: '[]',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    }

                },{
                    text: 'Print Sample certificate',
                    iconCls: 'x-fa fa-print',
                    winWidth: '70%',
                    handler: 'printSampleCertificate',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    }
                },{
                    text: 'Archive Sample Request',
                    iconCls: 'x-fa fa-archive',
                    storeId: 'previousDocumentsUploads',
                    winWidth: '70%',
                    handler: 'previewPreviousUploadedDocument',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    }
                }]
            }
        },onWidgetAttach: function (col, widget, rec) {
            var status = rec.get('tracking_status_id');
            if (status>1) {
                widget.down('menu menuitem[name=editpreview]').setVisible(false);
            }else{
                widget.down('menu menuitem[name=editpreview]').setVisible(true);
            }
        }
    }]
});
