/**
 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ProgressReportManagerEvaluationGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ClinicalTrialManagersAbstractGrid',
    xtype: 'progressreportmanagerevaluationgrid',

    listeners: {
        beforerender: {
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'clinicaltrialmanagerassessmentstr',
                proxy: {
                    url: 'clinicaltrial/getstrProgressReportingManagerApplicationsGeneric'
                }
            },
            isLoad: true
        }
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],
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
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    table_name: 'tra_clinical_trial_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reporting_start_date',
        text: 'Reporting Start Date',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reporting_end_date',
        text: 'Reporting End Date',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'actualstudy_date',
        text: 'Actual Study Start Date',
        flex: 1
    },  {
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
                        text: 'Print Confidential Agreement',
                        iconCls: 'x-fa fa-cubes',
                        handler: 'showApplicationQueries'
                    },
                    {
                        text: 'Print Assessment Request',
                        iconCls: 'x-fa fa-check-square',
                        handler: 'showApplicationChecklists'
                    },
                    {
                        text: 'External Assessor',
                        iconCls: 'x-fa fa-exchange',
                        handler: 'showAddExternalAssessor'
                    },
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showClinicalTrialApplicationMoreDetails'
                    }
                ]
            }
        }
    }]
});