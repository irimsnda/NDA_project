/**
 * Created by Kip on 11/27/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.forms.RevenueRequestSubmissionsFrm', {
     extend: 'Admin.view.workflowmanagement.views.forms.WorkflowSubmissionsGenericFrm',
    xtype: 'revenuerequestsubmissionsfrm',
    autoScroll: true,
    controller: 'workflowmanagementvctr',
    layout: 'form',
    frame: true,
    controller: 'workflowmanagementvctr',
    layout: 'form',
    frame: true,
    fieldDefaults: {
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    },
    config: {
        applicationSelectionMode: 'selected'
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'workflowaction_type_id'
    },{
        xtype: 'hiddenfield',
        name: 'is_external_usersubmission'
    },{
        xtype: 'hiddenfield',
        name: 'currency_id'
    },{
        xtype: 'hiddenfield',
        name: 'credit_note_amount'
    },{
        xtype: 'hiddenfield',
        name: 'exchange_rate'
    },{
        xtype: 'hiddenfield',
        name: 'reason_for_request'
    },{
        xtype: 'hiddenfield',
        name: 'reason_for_cancellation'
    },{
        xtype: 'hiddenfield',
        name: 'invoice_id'
    },{
        xtype: 'hiddenfield',
        name: 'receipt_id'
    },{
        xtype: 'hiddenfield',
        name: 'module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'reference_no'
    },{
        xtype: 'hiddenfield',
        name: 'tracking_no'
    },  {
        xtype: 'hiddenfield',
        name: 'application_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    },{
        xtype: 'hiddenfield',
        name: 'active_application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'process_id'
    },  {
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
        xtype: 'fieldset',
        layout: 'form',
        style: 'background:white;padding:0',
        collapsible: true,
        collapsed: true,
        title: 'Current Info',
        items: [ {
                xtype: 'textfield',
                readOnly: true,
                fieldLabel: 'Current Stage',
                name: 'current_stage_name',
                allowBlank: true
            }, {
                xtype: 'textfield',
                readOnly: true,
                hidden: true,
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
                            curr_stage = form.down('hiddenfield[name=curr_stage_id]').getValue();
                            store.removeAll();
                            store.load({
                                params: {
                                    stage_id: curr_stage,
                                    is_submission: 1
                                }
                            });
                    },
                    change: 'setWorkFlowNextStageDetails'
                }
            }, {
                xtype: 'combo',
                fieldLabel: 'Next Stage',
                store: 'revprocesssubmissionnextstagesstr',
                name: 'next_stage',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                forceSelection: true,
                listeners: {
                    afterrender: function (cmb) {
                        var form = cmb.up('form'),
                            curr_stage_id = form.down('hiddenfield[name=curr_stage_id]').getValue(),
                            store = cmb.store;
                        store.removeAll();
                        store.load({params: {curr_stage_id: curr_stage_id}});
                    },
                    change: function (cmb, newVal) {
                        var thisStore = cmb.getStore(),
                            record = thisStore.getById(newVal),
                            needs_responsible_user = 1,
                            form = cmb.up('form'),
                            responsible_users = form.down('combo[name=responsible_user]'),
                            store = responsible_users.store;
                        responsible_users.reset();
                        if (record && record != null) {
                            needs_responsible_user = record.get('needs_responsible_user');
                        }
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
                forceSelection: true,
                anyMatch: true
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
                    action_url: 'workflow/handleRevenueRequestApplicationSubmission'//'workflow/submitApplication'
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
