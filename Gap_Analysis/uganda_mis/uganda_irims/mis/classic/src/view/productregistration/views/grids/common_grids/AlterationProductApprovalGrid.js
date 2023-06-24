/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.AlterationProductApprovalGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'alterationproductapprovalgrid',
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
    tbar:[{
        text:'Batch Approval Recommendation',
            name:'batch_approval_recommendation',
            disabled: true,
            table_name: 'tra_product_applications',
            stores: '["productApprovalDecisionsStr"]',
            handler:'getBatchApplicationApprovalDetails',
            approval_frm: 'batchproductapprovalrecommfrm',
            iconCls: 'x-fa fa-chevron-circle-up',
            margin: 5
  }],
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
                    
                    gridXtype:'alterationproductapprovalgrid',
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
            isLoad: true
        }, select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                
                grid.down('button[name=submit_selected]').setDisabled(false);
                
                grid.down('button[name=batch_approval_recommendation]').setDisabled(false);
            }
        },
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('recommendation_id');
            if (recommendation_id > 0) {
               // return true;
            } else {
                //return false;
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
                
                grid.down('button[name=batch_approval_recommendation]').setDisabled(true);
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
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand_Name',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Common Name',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'classification_name',
        text: 'Class Name',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'evaluator_recommendation',
        text: 'Evaluator Recommendation',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'manager_reviewrecommendation',
        text: 'Manager Review Recommendation',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'dg_recommendation',
        text: 'Approval Recommendation',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        text: 'Certificate No',
        width: 150
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
                    text: 'Approval Recommendation',
                    iconCls: 'x-fa fa-chevron-circle-up',
                    approval_frm: 'productApprovalRecommFrm',
                    handler: 'getApplicationApprovalDetails',
                    vwcontroller: 'productregistrationvctr',
                    stores: '[]',
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
                    text: 'Evaluation',
                    iconCls: 'x-fa fa-exchange',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                text: 'Evaluation Reports/Upload',
                                iconCls: 'x-fa fa-file',
                                tooltip: 'Evaluation Reports/Upload',
                                winTitle: 'Evaluation Reports/Upload',
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
                                winTitle: 'Evaluation Reports/Upload',
                                handler: 'showPreviousUploadedDocs',
                                stores: '[]',
                                target_stage: 17,
                                isWin: 1
                            },
                            {
                                text: 'Comments',
                                iconCls: 'x-fa fa-weixin',
                                childXtype: 'evaluationcommentspnl',
                                winTitle: 'Inspection Comments',
                                winWidth: '60%',
                                handler: 'showPreviousComments',
                                stores: '[]',
                                target_stage: 17,
                                isWin: 1
                            }
                        ]
                    }
                }, {
                    text: 'Audit Report',
                    iconCls: 'x-fa fa-exchange',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                text: 'Audit Reports/Upload',
                                iconCls: 'x-fa fa-file',
                                tooltip: 'Audit Reports/Upload',
                                action: 'edit',
                                childXtype: '',
                                winTitle: 'Audit report',
                                winWidth: '40%',
                                isReadOnly: 1,
                                document_type_id: 9,
                                winTitle: 'Audit Reports/Upload',
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
                                winTitle: 'Audit Reports/Upload',
                                isWin: 1
                            },
                            {
                                text: 'Comments',
                                iconCls: 'x-fa fa-weixin',
                                childXtype: 'evaluationcommentspnl',
                                winTitle: 'Auditors Comments',
                                winWidth: '60%',
                                handler: 'showProductPreviousComments',
                                stores: '[]',
                                target_stage: 9,
                                isWin: 1
                            }
                        ]
                    }
                },  {
                    text: 'Preview Product Regitration Certificate',
                    iconCls: 'x-fa fa-certificate',
                    handler: '',
                    name: 'certificate',
                    backend_function: 'generateProductRegCertificate',
                    handler: 'generateProductRegCertificate'
                }, {
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
                }, {
                    text: 'Preview Application Queries',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Preview Record',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Preview Application Queries',
                    winWidth: '40%',
                    isReadOnly: 1,
                    handler: 'previewproductApplicationQueries'
                },{
                    xtype: 'button',
                    text: 'Return Back Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-green',
                    storeID: 'productApprovalTCMeetingStr',
                    table_name: 'tra_product_applications',
                    action: 'process_returnsubmission_btn',
                    winWidth: '50%',
                    toaster: 0
                }]
            }
        }
    }]
});
