
/**
 * Created by Softclans.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremiseReviewTCMeetingGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'premiseReviewTCMeetingGrid',//productReviewTCMeetingGrid
    table_name: 'tra_premises_applications',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'premiseReviewTCMeetingStr',
                proxy: {
                    url: 'premiseregistration/getPremiseTcReviewMeetingApplications'//getClinicalTrialManagerMeetingApplications
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
            var recommendation_id = record.get('recomm_id');
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
    tbar: [{
        text: 'Batch ILTC Recommendation'  
        
    },{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        text: 'Premise Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region/Province Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'District Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        text: 'Email Address',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'evaluator_recommendation',
        text: 'Inspection Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tc_recomm',
        text: 'ILTC Recommendation',
        flex: 1
    },{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'Preview License/Letter',
            iconCls: 'x-fa fa-certificate',
            backend_function: 'printPremiseRegistrationCertificate',
            handler: 'printColumnPremiseCertificate'
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
                    text: 'ILTC Recommendation',
                    iconCls: 'x-fa fa-retweet',
                    handler: 'showTcRecommendation',
                    childXtype: 'premisestcrecommendationpnl',
                    winTitle: 'ILTC Recommendation',
                    winWidth: '70%',
                    stores: '["tcrecommendationdecisionsstr"]'
                },{
                    text: 'Preview Application Details',
                    iconCls: 'x-fa fa-eye',
                    tooltip: 'Preview Record',
                    appDetailsReadOnly: 1,
                    handler: 'showPremApplicationMoreDetails'
                },{
                        text: 'Inspection',
                        iconCls: 'x-fa fa-exchange',
                        menu: {
                            xtype: 'menu',
                            items: [
                                {
                                    text: 'Report',
                                    iconCls: 'x-fa fa-clipboard',
                                    action: 'inspection_report',
                                    handler: 'printManagersReport',
                                    report_type: 'Inspection Report'
                                },
                                {
                                    text: 'Documents',
                                    iconCls: 'x-fa fa-upload',
                                    childXtype: 'premregappprevdocuploadsgenericgrid',
                                    winTitle: 'Inspection uploaded Documents',
                                    winWidth: '80%',
                                    handler: 'showPreviousUploadedDocs',
                                    target_stage: 'inspection'
                                },
                                {
                                    text: 'Comments',
                                    iconCls: 'x-fa fa-weixin',
                                    childXtype: 'applicationprevcommentsgrid',
                                    winTitle: 'Inspection Comments',
                                    winWidth: '60%',
                                    handler: 'showPreviousComments',
                                    stores: '[]',
                                    comment_type_id: 1,
                                    target_stage: 'inspection',
                                    isWin: 1
                                },
                                {
                                    text: 'Inspection Details',
                                    iconCls: 'x-fa fa-bars',
                                    childXtype: 'inspectiondetailstabpnl',
                                    winTitle: 'Inspection Details',
                                    winWidth: '60%',
                                    name: 'inspection_details',
                                    stores: '[]',
                                    isReadOnly: 1,
                                    handler: 'showInspectionDetails'
                                }
                            ]
                        }
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
                }
                ]
            }
        }
    }]
});