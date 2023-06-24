/**
 * Created by Kip on 11/1/2018.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.CtrGcpInspectionsApplicationsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'clinicaltrialvctr',
    xtype: 'ctrgcpinspectionsapplicationsgrid',
    itemId:'ctrgcpinspectionschedulegrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    appDetailsReadOnly:1,
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
                    width: '60%',
                    table_name: 'tra_clinical_trial_applications',
                    managerInspection: 1,
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',{
                    xtype: 'button',
                    text: 'Print Inspection(s) Details',
                    iconCls: 'x-fa fa-print',
                    ui: 'soft-green',
                    name: 'print_incpectionschedule',
                    toaster: 0,
                    action: 'print_incpectionschedule',
                    winWidth: '50%'
                },{
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-green',
                    name: 'submit_selected',
                    disabled: true,
                    toaster: 0,
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],  tbar:[{
            xtype: 'displayfield',
            value: 'Double click to enter inspection details!!',
            fieldStyle: {
                'color':'green'
            }
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
                storeId: 'ctrgcpinspectionschedulegridstr',
                groupField: 'study_site',
                proxy: {
                    url: 'clinicaltrial/getClinicalTrialCtrgcpInspectionDetails'
                }
            },
            isLoad: true
        },  select: function (sel, record, index, eOpts) {
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
            }else{
                return false;
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        },
        itemdblclick: 'showGCPInspectionDetailsWizard'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Application Ref No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'permit_no',
        text: 'Authorization Number',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'study_title',
        text: 'Study Title',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'protocol_no',
        text: 'Protocol No',
        flex: 1,
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'version_no',
        text: 'Version No',
        flex: 1,
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'study_sites',
        text: 'Study Sites',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inspection_recommendation',
        text: 'inspection_recommendation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inspection_type',
        text: 'Inspection Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'actual_start_date',
        text: 'Inspection Start Date',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'actual_end_date',
        text: 'Inspection End Date',
        flex: 1
    },{
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
                        text: 'Preview Clinical Trial Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'previewClinicalTrialApplicationOnGridDetails'
                    }
                ]
            }
        }
    }]
});
