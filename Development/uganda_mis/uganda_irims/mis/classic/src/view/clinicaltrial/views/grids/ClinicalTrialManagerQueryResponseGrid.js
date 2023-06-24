/**
 * Created by Kip on 6/29/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialManagerQueryResponseGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ClinicalTrialManagersAbstractGrid',
    xtype: 'clinicaltrialmanagerqueryresponsegrid',
    is_manager_query: 0,
    is_manager_query_response: 1,
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
        }
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],selModel: {
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
                    width: '60%',
                    strict_mode: 0,
                    doRefresh: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    },
                    beforeLoad: function () {
                       var grid = this.up('grid'),
                        panel = grid.up('panel'),
                        wrapper = panel.up('panel'),
                        wfStage = wrapper.down('hiddenfield[name=workflow_stage_id]').getValue(),
                        moduleID = wrapper.down('hiddenfield[name=module_id]').getValue(),
                        store = this.getStore();
                        store.getProxy().extraParams = {
                            'table_name' : 'tra_clinical_trial_applications',
                            'module_id': moduleID,
                            'workflow_stage_id':wfStage
                        };
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
                        handler: 'showApplicationQueries',
                        childXtype: 'applicationunstructuredqueriesgrid'
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