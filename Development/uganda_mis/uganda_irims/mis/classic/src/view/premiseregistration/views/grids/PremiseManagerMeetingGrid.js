
/**
 * Created by Softclans.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremiseManagerMeetingGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'premiseManagerMeetingGrid',//productManagerMeetingGrid
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeID:'premiseManagerMeetingStr',
                proxy: {
                    url: 'premiseregistration/getPremiseRegistrationMeetingApplications'//getProductRegistrationMeetingApplications
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
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Application No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        text: 'Premise Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region Name',
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
        text: 'Inspection Recommendation',
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
                    handler: 'showPreviousUploadedDocs'
                }, {
                    xtype: 'button',
                    text: 'Return Back Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-green',
                    storeID: 'premiseManagerMeetingStr',
                    table_name: 'tra_premise_applications',
                    action: 'process_returnsubmission_btn',
                    winWidth: '50%',
                    toaster: 0
                }]
            }
        }
    }],

});