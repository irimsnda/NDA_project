
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductApprovalTCMeetingGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productApprovalTCMeetingGrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'productApprovalTCMeetingStr',
                proxy: {
                    url: 'productregistration/getProductApprovalApplications'//getClinicalTrialManagerMeetingApplications
                }
            },
            isLoad: false
        }, select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
                
                //grid.down('button[name=batch_tc_recommendation]').setDisabled(false);
                grid.down('button[name=batch_approval_recommendation]').setDisabled(false);
            }
        },
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('recommendation_id');
            if (recommendation_id > 0) {
               // return true;
            } else {
             //   return false;
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
                //grid.down('button[name=batch_tc_recommendation]').setDisabled(true);
                grid.down('button[name=batch_approval_recommendation]').setDisabled(true);
            }
        }
    }, selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var recommendation_id = record.get('recommendation_id');
            if (recommendation_id > 0) {
                return 'valid-row';
            } else {
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
    tbar: [{
            text:'Batch Approval Recommendation',
            name:'batch_approval_recommendation',
            disabled: true,
            table_name: 'tra_product_applications',
            stores: '["productApprovalDecisionsStr"]',
            handler:'getBatchApplicationApprovalDetails',
            approval_frm: 'batchproductapprovalrecommfrm',
            iconCls: 'x-fa fa-chevron-circle-up',
            margin: 5
        
  },'->',{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],
    features:[{
        ftype: 'searching',
        minChars:2,
        mode:'local'
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
        xtype: 'gridcolumn',
        dataIndex: 'tc_recomm',
        text: 'TC Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'dg_recommendation',
        text: 'Approval Recommendation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        text: 'Certificate No',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'expiry_date',
        text: 'Expiry Date',
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
                items: [
                    {
                        text: 'Approval Recommendation',
                        iconCls: 'x-fa fa-chevron-circle-up',
                        approval_frm: 'productApprovalRecommFrm',
                        handler: 'getApplicationApprovalDetails',
                        vwcontroller: 'productregistrationvctr',
                        stores: '[]',
                        table_name: 'tra_product_applications'
                    },{
                        text: 'Peer Review Recommendation',
                        iconCls: 'x-fa fa-retweet',
                        handler: 'showTcRecommendation',
                        childXtype: 'productTcRecommendationFrm',
                        winTitle: 'TC Recommendation',
                        winWidth: '30%',
                        isReadOnly: true,
                        //hidden: true,
                        stores: '["tcrecommendationdecisionsstr"]'
                    }, {
                        text: 'Preview Product Regitration Certificate',
                        iconCls: 'x-fa fa-certificate',
                        handler: '',
                        name: 'certificate',
                        backend_function: 'generateProductRegCertificate',
                        handler: 'generateProductRegCertificate'
                    },  {
                        text: 'Reports',
                        iconCls: 'x-fa fa-exchange',
                        menu: {
                            xtype: 'menu',
                            items: [{
                                text: '1st Assessment  Reports/Upload',
                                iconCls: 'x-fa fa-file',
                                tooltip: '1st Assessment  Reports/Upload',
                                action: 'edit',
                                childXtype: '',
                                winTitle: 'Application Documents',
                                winWidth: '40%',
                                isReadOnly: 1,
                                handler: 'funcPrevEvaluationReportUpload'
                            }, {
                                text: '2nd Assessment  Reports/Upload',
                                iconCls: 'x-fa fa-file',
                                tooltip: '2nd Assessment  Reports/Upload',
                                action: 'edit',
                                childXtype: '',
                                winTitle: 'Audit report',
                                winWidth: '40%',
                                isReadOnly: 1,
                                handler: 'funcPrevAuditReportUpload'
                            }
                            ]
                        }
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
                        text: 'Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Application Documents',
                        winWidth: '40%',
                        isReadOnly: 1,
                        handler: 'funcPrevGridApplicationDocuments'
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
                    },{
                        text: 'Print Application Details',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Print Record',
                        action: 'edit',
                        childXtype: '',
                        hidden: true,
                        winTitle: 'Product Information',
                        winWidth: '40%',
                        handler: 'printpreviewProductInformation'
                    }, {
                        xtype: 'button',
                        text: 'Return Back Application(s)',
                        iconCls: 'x-fa fa-check',
                        ui: 'soft-green',
                        storeID: 'productApprovalTCMeetingStr',
                        table_name: 'tra_product_applications',
                        action: 'process_returnsubmission_btn',
                        winWidth: '50%',
                        toaster: 0
                    }
                ]
            }
        }
    }]
});