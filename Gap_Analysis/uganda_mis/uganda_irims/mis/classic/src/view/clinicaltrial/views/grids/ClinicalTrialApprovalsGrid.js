/**
 * Created by Kip on 1/26/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialApprovalsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'clinicaltrialvctr',
    xtype: 'clinicaltrialapprovalsgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
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
                    table_name: 'tra_clinical_trial_applications',
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',
                {
                    text: 'Export Recommendation',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-file-excel-o',
                    menu:{
                        xtype: 'menu',
                        items:[
                            {
                                text: 'TC Recommendation',
                                iconCls: 'x-fa fa-arrow-right'
                            },
                            {
                                text: 'Approval Recommendation',
                                iconCls: 'x-fa fa-arrow-right'
                            }
                        ]
                    }
                },
                {
                    xtype: 'button',
                    text: 'View/Upload Meeting Documents',
                    iconCls: 'x-fa fa-upload',
                    ui: 'soft-purple',
                    name: 'save_btn',
                    reference_table_name: 'tc_meeting_details',
                    table_name: 'tc_meeting_uploaddocuments',
                    handler: 'funcUploadTCMeetingtechnicalDocuments',
                    document_type_id: 4,
                    childXtype:'unstructureddocumentuploadsgrid',
                    winTitle: 'Technical Meeting Documents Upload',
                    winWidth: '80%',
                    toaster: 0
                },
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    storeID: 'foodpremiseregistrationstr',
                    table_name: 'tra_premises_applications',
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
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'clinicaltrialapprovalsstr',
                proxy: {
                    url: 'clinicaltrial/getClinicalTrialApplicationsAtApproval'
                }
            },
            isLoad: false
        },
        select: function (sel, record, index, eOpts) {
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
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'study_title',
        text: 'Study Title',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'date_received',
        hidden: true,
        text: 'Date Received',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tc_recomm',
        text: 'TC Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'comments',
        text: 'TC Comments',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'recommendation',
        text: 'Approval Recommendation',
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
                items: [
                    {
                        text: 'Approval Recommendation',
                        iconCls: 'x-fa fa-chevron-circle-up',
                        handler: 'getApplicationApprovalDetails',
                        approvalfrm: 'clinicaltrialapprovalrecommfrm',
                        stores: '["clinicalapprovaldecisionsstr"]',
                        table_name: 'tra_clinical_trial_applications'
                    }, {
                        text: 'Reports',
                        iconCls: 'x-fa fa-exchange',
                        menu: {
                            xtype: 'menu',
                            items: [
                                {
                                    text: 'Assessment Report',
                                    iconCls: 'x-fa fa-clipboard',
                                    action: 'inspection_report',
                                    handler: 'printManagersReport',
                                    report_type: 'Inspection Report'
                                },
                                {
                                    text: 'Audit Report',
                                    iconCls: 'x-fa fa-clipboard',
                                    action: 'inspection_report',
                                    handler: 'printManagersReport',
                                    report_type: 'Evaluation Report'
                                }
                            ]
                        }
                    }, {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showClinicalTrialApplicationMoreDetails'
                    }, {
                        text: 'Clinical Trial Certificate',
                        iconCls: 'x-fa fa-certificate',
                        handler: 'printClinicalTrialCertificate',
                        name: 'certificate'
                    },
                    {
                        text: 'Rejection Letter',
                        iconCls: 'x-fa fa-file-text-o',
                        handler: '',
                        name: 'rejection'
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
                    }
                ]
            }
        },onWidgetAttach: function (col, widget, rec) {
            var status_id = rec.get('application_status_id');
            if (status_id === 6 || status_id == 6) {//Approved
                widget.down('menu menuitem[name=rejection]').setVisible(false);
                widget.down('menu menuitem[name=certificate]').setVisible(true);
            } else {//Rejected
                widget.down('menu menuitem[name=rejection]').setVisible(true);
                widget.down('menu menuitem[name=certificate]').setVisible(false);
            }
        }
     }]
});