
/**
 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductManagerMeetingGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productManagerMeetingGrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeID:'productManagerMeetingStr',
                proxy: {
                    url: 'productregistration/getProductRegistrationMeetingApplications'//getClinicalTrialManagerMeetingApplications
                }
            },
            isLoad: false
        },
        afterrender: function () {
            var grid = this,
                sm = grid.getSelectionModel();
            grid.store.on('load', function (store, records, options) {
                Ext.each(records, function (record) {
                    var rowIndex = store.indexOf(record);
                    if (record.data.meeting_id) {
                        sm.select(rowIndex, true);
                    }
                });
            });
        }
    },

    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand_Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Common Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'evaluator_recommendation',
        text: '1st Assessment Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'auditor_recommendation',
        text: '2nd Assessment Recommendation',
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
                items:  [{
                    text: 'Preview Application Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Preview Record',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Product Information',
                    winWidth: '40%',
                    isReadOnly: 1,
                    handler: 'editpreviewProductInformation'
                }, {
                    text: '1st Assessment',
                    iconCls: 'x-fa fa-exchange',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                text: '1st Assessment Reports/Upload',
                                iconCls: 'x-fa fa-file',
                                tooltip: '1st Assessment Reports/Upload',
                                winTitle: '1st Assessment Reports/Upload',
                                document_type_id: 8,
                                action: 'edit',
                                childXtype: '',
                                winTitle: 'Application Documents',
                                winWidth: '40%',
                                isReadOnly: 1,
                                handler: 'funcPrevEvaluationReportUpload'
                            },
                            {
                                text: 'Documents',
                                iconCls: 'x-fa fa-upload',
                                winWidth: '60%',
                                document_type_id: 8,
                                winTitle: '1st Assessment Reports/Upload',
                                handler: 'showPreviousUploadedDocs',
                                stores: '[]',
                                target_stage: 17,
                                isWin: 1
                            },
                            {
                                text: 'Comments',
                                iconCls: 'x-fa fa-weixin',
                                childXtype: 'evaluationcommentspnl',
                                winTitle: '1st Assessment Comments',
                                winWidth: '60%',
                                handler: 'showApplicationCommentsGeneric',
                                childXtype: 'applicationprevcommentsgrid',
                                winWidth: '60%',
                                comment_type_id: 2,
                                stores: '[]',
                                isWin: 1
                            }
                        ]
                    }
                }, {
                    text: '2nd Assessment Report',
                    iconCls: 'x-fa fa-exchange',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                text: '2nd Assessment Reports/Upload',
                                iconCls: 'x-fa fa-file',
                                tooltip: '2nd Assessment Reports/Upload',
                                action: 'edit',
                                childXtype: '',
                                winTitle: '2nd Assessment report',
                                winWidth: '40%',
                                isReadOnly: 1,
                                document_type_id: 9,
                                winTitle: '2nd Assessment Reports/Upload',
                                handler: 'funcPrevAuditReportUpload'
                            },
                            {
                                text: 'Documents',
                                iconCls: 'x-fa fa-upload',
                                winTitle: '2nd Assessments uploaded Documents',
                                winWidth: '60%',
                                handler: 'showPreviousUploadedDocs',
                                stores: '[]',
                                document_type_id: 9,
                                winTitle: '2nd Assessment Reports/Upload',
                                isWin: 1
                            },
                            {
                                text: 'Comments',
                                iconCls: 'x-fa fa-weixin',
                                childXtype: 'evaluationcommentspnl',
                                winTitle: '2nd Assessment Comments',
                                winWidth: '60%',
                                isReadOnly: 1,
                                handler: 'showApplicationCommentsGeneric',
                                childXtype: 'applicationprevcommentsgrid',
                                winWidth: '60%',
                                comment_type_id: 3,
                                stores: '[]',
                                isWin: 1
                            }
                        ]
                    }
                },{
                    text: 'Preview Application Queries',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Preview Record',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Preview Application Queries',
                    winWidth: '40%',
                    isReadOnly: 1,
                    handler: 'previewproductApplicationQueries'
                }, {
                    text: 'Application Documents',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Application Documents',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Application Documents',
                    winWidth: '40%',
                    isReadOnly: 1,
                    handler: 'funcPrevGridApplicationDocuments'
                }, {
                    xtype: 'button',
                    text: 'Return Back Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-green',
                    storeID: 'productManagerMeetingStr',
                    table_name: 'tra_product_applications',
                    action: 'process_returnsubmission_btn',
                    winWidth: '50%',
                    toaster: 0
                }]
            }
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ]

});