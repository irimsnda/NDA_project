/**
 * Created by Kip on 11/13/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.ManagerReviewGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'managerreviewgrid',
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
                    table_name: 'tra_premises_applications',
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
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,

                proxy: {
                    url: 'premiseregistration/getManagerReviewApplications'
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
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
        text: 'Tracking Number',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Application No',
        flex: 1
    }, {
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
        dataIndex: 'inspect_recomm',
        text: 'Inspection Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'date_received',
        hidden: true,
        text: 'Date Received',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
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
                    },
                    {
                        text: 'Preview Premises Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        is_temporal: 0,
                        handler: 'showPremApplicationMoreDetails'
                    },
                    {
                        text: 'Dismiss/Cancel Application',
                        iconCls: 'x-fa fa-thumbs-down',
                        hidden: true,
                        handler: 'showApplicationDismissalForm'
                    }
                ]
            }
        }
    }]
});
