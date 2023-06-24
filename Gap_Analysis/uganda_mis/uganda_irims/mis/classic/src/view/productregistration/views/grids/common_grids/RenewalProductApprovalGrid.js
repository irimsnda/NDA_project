/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.RenewalProductApprovalGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'renewalproductapprovalgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    table_name: 'tra_product_applications',
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    storeID: 'foodproductregistrationstr',
                    table_name: 'tra_product_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'productApprovalTCMeetingStr',
                proxy: {
                    url: 'productregistration/getProductApprovalApplicationsNonTc'//getClinicalTrialManagerMeetingApplications
                }
            },
            isLoad: false
        }, select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
            }
        },
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('recommendation_id');
            if (recommendation_id > 0) {
                return true;
            } else {
                return false;
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        }
    }, selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
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
        dataIndex: 'classification_name',
        text: 'Class Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'evaluator_recommendation',
        text: 'Evaluator Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'manager_reviewrecommendation',
        text: 'Manager Review Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'dg_recommendation',
        text: 'Approval Recommendation',
        flex: 1
    },{
        xtype: 'widgetcolumn',
        text: 'Print',
        widht: 150,
        widget: {
            xtype: 'button',
            iconCls: 'x-fa fa-certificate',
            ui: 'soft-green',
            name: 'certificate',
            text: 'Registration Certificate',
            tooltip: 'Print Registration Certificate',
            backend_function: 'generateProductRegCertificate',
            handler: 'newGenerateProductRegCertificate'
        }
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
                    text: 'DG Recommendation',
                    iconCls: 'x-fa fa-chevron-circle-up',
                    approval_frm: 'productApprovalRecommFrm',
                    handler: 'getApplicationApprovalDetails',
                    vwcontroller: 'productregistrationvctr',
                    stores: '["productApprovalDecisionsStr"]',
                    table_name: 'tra_product_applications'
                }, {
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
                                winTitle: 'Auditors uploaded Documents',
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
                                winTitle: '2nd Assessments Comments',
                                winWidth: '60%',
                                handler: 'showProductPreviousComments',
                                stores: '[]',
                                target_stage: 9,
                                isWin: 1
                            }
                        ]
                    }
                },{
                    text: 'Preview Product Regitration Certificate',
                    iconCls: 'x-fa fa-certificate',
                    handler: '',
                    name: 'certificate',
                    backend_function: 'generateProductRegCertificate',
                    handler: 'generateProductRegCertificate'
                },  {
                    text: 'Application Documents',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Application Documents',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Application Documents',
                    winWidth: '40%',
                    isReadOnly: 1,

                    document_type_id: '',
                    handler: 'showPreviousUploadedDocs'
                }]
            }
        }
    }]
});
