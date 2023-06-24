/**
 * Created by Kip on 10/29/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.forms.WorkflowSubmissionsReceivingFrm', {
    extend: 'Admin.view.workflowmanagement.views.forms.WorkflowSubmissionsGenericFrm',
    xtype: 'workflowsubmissionsreceivingfrm',
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
    },{
        xtype: 'hiddenfield',
		allowBlank: true,
        name: 'is_manager_submission'
    }, {
        xtype: 'hiddenfield',
        name: 'workflowaction_type_id'
    },{
        xtype: 'hiddenfield',
        name: 'non_mainpanel_close'
    }, {
        xtype: 'hiddenfield',
        name: 'curr_stage_id'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name'
    }, {
        xtype: 'hiddenfield',
        name: 'application_status_id'
    }, {
        xtype: 'hiddenfield',
        name: 'has_queries'
    }, {
        xtype: 'hiddenfield',
        name: 'is_dataammendment_request'
    },{
        xtype: 'hiddenfield',
        name: 'is_external_usersubmission'
    }, {
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
        items: [{
                xtype: 'combo',
                fieldLabel: 'Recommendation',
                name: 'recommendation_id',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                forceSelection: true,
                hidden: true,
                allowBlank: true,
                store: 'submissionrecommendationsstr'
            },
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
                            has_queries = form.down('hiddenfield[name=has_queries]').getValue(),
                            application_status_id = form.down('hiddenfield[name=application_status_id]').getValue(),
                            param;
                        if (application_status_id == 8 || application_status_id === 8) {
                            param = {
                                stage_id: curr_stage,
                                application_status_id: application_status_id,
                                has_queries: has_queries,
                                is_submission: 1
                            };
                        } else {
                            param = {stage_id: curr_stage, has_queries: has_queries, is_submission: 1};
                        }
                        store.removeAll();
                        store.load({params: param});
                    },
                    change: 'setReceivingWorkFlowNextStageDetails'
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

                        var thisStore = cmb.getStore(),
                            record = thisStore.getById(newVal),
                            needs_responsible_user = 1,
                            is_external_usersubmission = 0,
                            form = cmb.up('form'),
                            responsible_users = form.down('combo[name=responsible_user]'),
                            store = responsible_users.store;
                        responsible_users.reset();
                        if (record && record != null) {
                            console.log(record);
                            needs_responsible_user = record.get('needs_responsible_user');
                        }
                       
                        is_external_usersubmission = form.down('hiddenfield[name=is_external_usersubmission]').getValue();
                        if(is_external_usersubmission != 1){
                            if (needs_responsible_user == 2 || needs_responsible_user === 2) {
                                responsible_users.setVisible(false);
                                responsible_users.allowBlank = true;
                                responsible_users.validate();
                            } else {
                                responsible_users.setVisible(true);
                                responsible_users.allowBlank = false;
                                responsible_users.validate();
                                store.removeAll();
                                store.load({params: {next_stage: newVal}});
                            }
                        }
                    }
                }
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
            },{
				xtype: 'datefield',
				fieldLabel:'Expected Start Date',
				name:'expected_start_date',
				format:'Y-m-d',allowBlank: true,
				hidden: true
			},{
				xtype: 'datefield',
				fieldLabel:'Expected End Date',
                name:'expected_end_date',
                format:'Y-m-d',allowBlank: true,
				hidden: true
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

            },{
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
    ],
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
                    ui: 'soft-purple',
                    action_url: 'workflow/handleApplicationSubmission'
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
    ]
});