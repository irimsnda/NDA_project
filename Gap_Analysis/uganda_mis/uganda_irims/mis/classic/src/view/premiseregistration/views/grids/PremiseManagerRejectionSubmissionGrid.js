/**
 * Created by Softclans on 11/4/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremiseManagerRejectionSubmissionGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ManagerQueryAbstractGrid',
    controller: 'premiseregistrationvctr',
    xtype: 'premisemanagerrejectionsubmissiongrid',
    autoScroll: true,
    autoHeight: true,
    is_manager_query: 1,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        enableTextSelection: true,
        getRowClass: function (record, rowIndex, rowParams, store) {
            var rejection_submission_id = record.get('rejection_submission_id');
            if (rejection_submission_id < 1) {
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
                    storeID: 'commonuseregistrationstr',
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
                    url: 'premiseregistration/getManagerApplicationsGeneric'
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
        beforeselect: function (sel, record, index, eOpts) {
            var reinspection_submission = record.get('rejection_submission_id');
            if (reinspection_submission > 0) {
                return true;
            } else {
                toastr.warning('Please enter the Rejection Details before submission', 'Warning Response');
               
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
    }, 
        {
            xtype: 'gridcolumn',
            dataIndex: 'application_status',
            text: 'Status',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'tc_recomm',
            text: 'TC Recommendation',
            flex: 1
        },
        {
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
                            text: 'Preview/Add Rejection Details',
                            iconCls: 'x-fa fa-cubes',
                            handler: 'showRejectionDetailsRequestswin'
                        },
                        {
                            text: 'Checklists',
                            iconCls: 'x-fa fa-check-square',
                            hidden: true,
                            handler: 'showApplicationChecklists'
                        },
                        {
                            text: 'Inspection Details',
                            iconCls: 'x-fa fa-exchange',
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        text: 'Inspection uploaded Documents',
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
                        },  {
                            text: 'All Application Documents',
                            iconCls: 'x-fa fa-file',
                            tooltip: 'Application Documents',
                            action: 'edit',
                            childXtype: '',
                            winTitle: 'Application Documents',
                            winWidth: '40%',
                            isReadOnly: 1,
                            
                            document_type_id: '',
                            handler: 'showAllplicationPreviousUploadedDocs'
                        },
                        {
                            text: 'Preview Details',
                            iconCls: 'x-fa fa-bars',
                            appDetailsReadOnly: 1,
                            handler: 'showPremApplicationMoreDetails'
                        }
                    ]
                }
            }
        }]
});
