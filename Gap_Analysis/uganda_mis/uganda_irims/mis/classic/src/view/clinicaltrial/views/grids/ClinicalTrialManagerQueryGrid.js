/**
 * Created by Kip on 6/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialManagerQueryGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'clinicaltrialmanagerquerygrid',
    is_manager_query: 1,
    listeners: {
        beforerender: {
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'clinicaltrial/getClinicalTrialManagerApplicationsGeneric'
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
    },selModel: {
        selType: 'checkboxmodel'
    },

    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],
    dockedItems: [{
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
                    width: '60%',
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
                '->',
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    disabled: true,
                    name: 'submit_selected',
                    gridXtype: 'clinicaltrialmanagerquerygrid',
                    table_name: 'tra_clinical_trial_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%',
                    toaster: 0
                }
            ]
        }
    ],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'study_title',
        text: 'Study Title',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'date_received',
        text: 'Date Received',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sponsor',
        text: 'Sponsor',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'investigator',
        text: 'Investigator',
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
                        text: 'Queries/Responses',
                        iconCls: 'x-fa fa-cubes',
                        handler: 'showApplicationQueries'
                    },
                    {
                        text: 'Checklists',
                        iconCls: 'x-fa fa-check-square',
                        handler: 'showApplicationChecklists'
                    },
                    {
                        text: 'Assessment Report',
                        iconCls: 'x-fa fa-exchange',
                        handler: 'printManagersReport',
                        report_type: 'manager_evaluation'
                    },
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showClinicalTrialApplicationMoreDetails'
                    },
                    {
                        text: 'Compare Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'compareClinicalTrialApplicationDetails'
                    }
                ]
            }
        }
    }]
});