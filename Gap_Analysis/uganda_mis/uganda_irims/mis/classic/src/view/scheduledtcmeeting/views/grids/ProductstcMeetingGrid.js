
/**
 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductstcMeetingGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productstcmeetinggrid',
    controller:'productregistrationvctr',
    height: 400,
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'productReviewTCMeetingStr',
                proxy: {
                    url: 'productregistration/getProductTcReviewMeetingApplications'//getClinicalTrialManagerMeetingApplications
                }
            },
            isLoad: true
        }
    }, selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],bbar:[{
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        table_name: 'tra_product_applications',
        width: '50%',
        strict_mode: 0,
        doRefresh: function () {
            var store = this.getStore();
            store.removeAll();
            store.load();
        },
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    },
    '->', {
        xtype: 'button',
        text: 'Uploaded Meeting Documents',
        iconCls: 'x-fa fa-upload',
        ui: 'soft-purple',
        name: 'save_btn', isReadOnly: 1,
        reference_table_name: 'tc_meeting_details',
        table_name: 'tc_meeting_uploaddocuments',
        handler: 'funcUploadTCMeetingtechnicalDocuments',
        document_type_id: 4,
        childXtype:'unstructureddocumentuploadsgrid',
        winTitle: 'Technical Meeting Documents Upload',
        winWidth: '80%',
        toaster: 0
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
        dataIndex: 'auditor_recommendation',
        text: 'Auditor Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tc_recomm',
        text: 'TC Recommendation',
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
                    text: 'Preview Application Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Preview Record',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Product Information',
                    winWidth: '40%',
                    isReadOnly: 1,
                    handler: 'editpreviewProductInformation'
                },  {
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
                                handler: 'funcPrevAuditReportUpload'
                            },
                            {
                                text: 'Documents',
                                iconCls: 'x-fa fa-upload',
                                childXtype: 'applicationprevdocuploadsgrid',
                                winTitle: 'Auditors uploaded Documents',
                                winWidth: '60%',
                                handler: 'showPreviousUploadedDocs',
                                stores: '[]',
                                target_stage: 9,
                                isWin: 1
                            },
                            {
                                text: 'Comments',
                                iconCls: 'x-fa fa-weixin',
                                childXtype: 'evaluationcommentspnl',
                                winTitle: 'Auditors Comments',
                                winWidth: '60%',
                                handler: 'showPreviousComments',
                                stores: '[]',
                                target_stage: 9,
                                isWin: 1
                            }
                        ]
                    }
                }, {
                    text: 'Application Documents',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Application Documents',
                    action: 'edit',
                    document_previewpnl: 'applicationprevdocuploadsgrid',
                    winTitle: 'Application Documents',
                    winWidth: '40%',
                    isReadOnly: 1,
                    handler: 'funcPrevGridApplicationDocuments'
                }
                ]
            }
        }
    }]
});