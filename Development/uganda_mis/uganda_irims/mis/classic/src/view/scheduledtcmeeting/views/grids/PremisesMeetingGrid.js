
/**
 * Created by Softclans.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremisesMeetingGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'premisesmeetinggrid',//productManagerMeetingGrid
    height: 400,
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
        }
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
        table_name: 'tra_premises_applications',
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
                }]
            }
        }
    }],

});