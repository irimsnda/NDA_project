/**
 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialManagerAssessmentGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ClinicalTrialManagersAbstractGrid',
    xtype: 'clinicaltrialmanagerassessmentgrid',

    listeners: {
        beforerender: {
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'clinicaltrialmanagerassessmentstr',
                proxy: {
                    url: 'clinicaltrial/getClinicalTrialManagerApplicationsGeneric'
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
                        hidden: true,
                        handler: 'showApplicationQueries'
                    },
                    {
                        text: 'Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Application Documents',
                        winWidth: '40%',
                        isReadOnly: 1,
                        document_type_id: '',
                        handler: 'showPreviousUploadedDocs'
                    }, {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showClinicalTrialApplicationMoreDetails'
                    },{
                        text: 'View Screening Checklists & Recommendation',
                        iconCls: 'x-fa fa-check-square',
                        handler: 'showApplicationChecklists'
                    }
                ]
            }
        }
    }]
});