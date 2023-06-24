/**
 * Created by Kip on 3/21/2019.
 */
Ext.define('Admin.view.workflowmanagement.views.forms.WorkflowSubmissionsPmsSamplesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'workflowsubmissionspmssamplesfrm',
    autoScroll: true,
    controller: 'workflowmanagementvctr',
    layout: 'form',
    frame: true,
    fieldDefaults: {
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                '->', {
                    text: 'Submit Application',
                    iconCls: 'x-fa fa-check-square',
                    name: 'app_submission_btn',
                    action: 'submit',
                    formBind: true,
                    noTabClose: 1,
                    ui: 'soft-purple',
                    action_url: 'workflow/handleApplicationSubmission'
                    //action_url: 'workflow/handleManagersApplicationSubmissions'
                }, {
                    text: 'Close',
                    iconCls: 'x-fa fa-close',
                    ui: 'soft-purple',
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }
            ]
        }
    ],
    items: [{
        xtype: 'hiddenfield',
        name: 'application_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'process_id'
    }, {
        xtype: 'hiddenfield',
        name: 'module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: 'curr_stage_id'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name'
    }, {
        xtype: 'hiddenfield',
        name: 'application_status_id'
    },{
        xtype: 'hiddenfield',
        name: 'workflowaction_type_id'
    },{
        xtype: 'hiddenfield',
        name: 'non_mainpanel_close'
    }, {
        xtype: 'hiddenfield',
        name: 'recommendation_id'
    }, {
        xtype: 'hiddenfield',
        name: 'analysis_type_id'
    }, {
        xtype: 'hiddenfield',
        name: 'has_queries'
    },{
        xtype: 'hiddenfield',
        name: 'is_dataammendment_request'
    },{
        xtype: 'hiddenfield',
        name: 'is_external_usersubmission'
    },  {
        xtype: 'fieldset',
        layout: 'form',
        style: 'background:white;padding:0',
        collapsible: true,
        collapsed: true,
        title: 'Current Info',
        items: [
            {
                xtype: 'textfield',
                readOnly: true,
                fieldLabel: 'Process',
                name: 'process_name',
                allowBlank: true
            }, {
                xtype: 'textfield',
                readOnly: true,
                fieldLabel: 'Current Stage',
                name: 'current_stage_name',
                allowBlank: true
            }, {
                xtype: 'textfield',
                readOnly: true,
                fieldLabel: 'Application Status',
                name: 'application_status',
                allowBlank: true
            }
        ]
    }, {
        xtype: 'fieldset',
        layout: 'form',
        style: 'background:white;padding:0',
        defaults: {
            allowBlank: false
        },
        items: [
            {
                xtype: 'combo',
                fieldLabel: 'Action',
                name: 'action',
                store: 'submissionstageactionsstr',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                forceSelection: true,
                listeners: {
                    afterrender: function () {
                        var store = this.store,
                            form = this.up('form'),
                            curr_stage = form.down('hiddenfield[name=curr_stage_id]').getValue(),
                            recommendation_id = form.down('hiddenfield[name=recommendation_id]').getValue(),
                            analysis_type_id = form.down('hiddenfield[name=analysis_type_id]').getValue(),
                            param;
                        if (recommendation_id) {
                            param = {
                                stage_id: curr_stage,
                                pms_analysis_type_id: analysis_type_id,
                                pms_recommendation_id: recommendation_id,
                                is_submission: 1
                            };
                        } else {
                            param = {stage_id: curr_stage};
                        }
                        store.removeAll();
                        store.load({params: param});
                    },
                    change: 'setWorkFlowNextStageDetails'
                }
            }, {
                xtype: 'combo',
                fieldLabel: 'Next Stage',
                readOnly: true,
                store: 'submissionnextstagesstr',
                name: 'next_stage',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                forceSelection: true,
                listeners: {
                    afterrender: function (cmb) {
                        var form = cmb.up('form'),
                            process_id = form.down('hiddenfield[name=process_id]').getValue(),
                            store = cmb.store;
                        store.removeAll();
                        store.load({params: {process_id: process_id}});
                    },
                    change: function (cmb, newVal) {
                        var form = cmb.up('form'),
                            responsible_users = form.down('combo[name=responsible_user]'),
                            store = responsible_users.store;
                        store.removeAll();
                        store.load({params: {next_stage: newVal}});
                    }
                }
            }, {
                xtype: 'combo',
                fieldLabel: 'Directive',
                name: 'directive_id',
                store: 'applicationreturnoptionsstr',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                forceSelection: true,
                allowBlank: true,
                hidden: true
            }, {
                xtype: 'combo',
                fieldLabel: 'Status',
                readOnly: true,
                allowBlank: true,
                name: 'status',
                hidden: true
            }, {
                xtype: 'combo',
                fieldLabel: 'Responsible User',
                name: 'responsible_user',
                store: 'submissionresponsibleusersstr',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                forceSelection: true
            }, {
                xtype: 'combo',
                name: 'external_user_id',
                allowBlank: true,hidden: true,
                fieldLabel: 'Select External User',
                queryMode: 'local',
                valueField: 'id',
                displayField: 'fullnames', columnWidth: 0.7,
                listeners: {
                    afterrender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 10000,
                            storeId: 'externalusersstr',
                            proxy: {
                                url: 'usermanagement/getExternalSystemUsers'
                            }
                        },
                        isLoad: true
                    }
                }

            }, {
                xtype: 'combo',
                fieldLabel: 'Urgency',
                name: 'urgency',
                store: 'submissionsurgenciesstr',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                forceSelection: true,
                value: 1,
                listeners: {
                    beforerender: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    }
                }
            }, {
                xtype: 'textarea',
                name: 'remarks',
                fieldLabel: 'Remarks',
                allowBlank: true
            }
        ]
    }
    ]
});