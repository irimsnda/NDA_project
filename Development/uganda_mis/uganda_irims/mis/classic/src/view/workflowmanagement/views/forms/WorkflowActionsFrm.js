/**
 * Created by Kip on 9/12/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.forms.WorkflowActionsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'workflowactionsfrm',
    autoScroll: true,
    controller: 'workflowmanagementvctr',
    layout: 'column',
    bodyPadding: 8,
    frame: true,
    height: Ext.Element.getViewportHeight() - 280,
    defaults: {
        labelWidth: 130,
        allowBlank: false,
        columnWidth: 0.5,
        margin: 5,
        labelStyle: 'font-weight:bold'
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'wf_workflow_actions',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        name: 'stage_id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Name',
        name: 'name'
    }, {
        xtype: 'combo',
        name: 'action_type_id',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        fieldLabel: 'Action Type',
        value: 1,
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'WorkflowActionType'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmb, newVal) {
                var form = cmb.up('form'),
                    recommTable = form.down('combo[name=recommendation_table]');
                if (newVal == 6 || newVal === 6) {
                    recommTable.allowBlank = false;
                    recommTable.validate();
                    recommTable.setVisible(true);
                } else {
                    recommTable.reset();
                    recommTable.allowBlank = true;
                    recommTable.validate();
                    recommTable.setVisible(false);
                }
            }
        }
    }, {
        xtype: 'combo',
        name: 'recommendation_table',
        valueField: 'name',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: true,
        hidden: true,
        fieldLabel: 'Recommendation Table Name',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'RecommTable'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        name: 'is_to_portal',
        store: 'confirmationstr',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        fieldLabel: 'To Portal?',
        value: 2
    }, {
        xtype: 'combo',
        name: 'needs_directive',
        store: 'confirmationstr',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        fieldLabel: 'Needs Directive?',
        value: 2,
        listeners: {
            change: function (cmb, newVal) {
                var form = cmb.up('form'),
                    directiveCategory = form.down('combo[name=directive_category]');
                if (newVal == 1 || newVal === 1) {
                    directiveCategory.allowBlank = false;
                    directiveCategory.validate();
                    directiveCategory.setVisible(true);
                } else {
                    directiveCategory.allowBlank = true;
                    directiveCategory.validate();
                    directiveCategory.setVisible(false);
                }
            }
        }
    }, {
        xtype: 'combo',
        name: 'directive_category',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: true,
        hidden: true,
        fieldLabel: 'Directive Category',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        extraParams: {
                            model_name: 'ReturnDirectiveCategory'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        name: 'is_external_usersubmission',
        store: 'confirmationstr',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        fieldLabel: 'Is External Assessor/User Submission?',
        value: 2
    }, {
        xtype: 'combo',
        name: 'is_checklist_tied',
        store: 'confirmationstr',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        fieldLabel: 'Tied to Checklist?',
        value: 2,
        listeners: {
            change: function (cmb, newVal) {
                var form = cmb.up('form'),
                    checklistCategory = form.down('combo[name=checklist_category_id]');
                if (newVal == 1 || newVal === 1) {
                    checklistCategory.allowBlank = false;
                    checklistCategory.validate();
                    checklistCategory.setVisible(true);
                } else {
                    checklistCategory.reset();
                    checklistCategory.allowBlank = true;
                    checklistCategory.validate();
                    checklistCategory.setVisible(false);
                }
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Checklist Category',
        name: 'checklist_category_id',
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        //forceSelection: true,
        queryMode: 'local',
        hidden: true,
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'ChecklistCategory'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        name: 'is_status_tied',
        store: 'confirmationstr',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        fieldLabel: 'Tied to Status?',
        value: 2,
        listeners: {
            change: function (cmb, newVal) {
                var form = cmb.up('form'),
                    appStatus = form.down('combo[name=application_status_id]');
                if (newVal == 1 || newVal === 1) {
                    appStatus.allowBlank = false;
                    appStatus.validate();
                    appStatus.setVisible(true);
                } else {
                    appStatus.reset();
                    appStatus.allowBlank = true;
                    appStatus.validate();
                    appStatus.setVisible(false);
                }
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Application Status',
        name: 'application_status_id',
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        //forceSelection: true,
        queryMode: 'local',
        hidden: true,
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getApplicationStatuses'
                    }
                },
                isLoad: true
            },
           /* afterrender: function () {
                var store = this.store,
                    form = this.up('form'),
                    tabPnl = form.up('tabpanel'),
                    workflow_id = tabPnl.down('workflowstagesfrm').down('hiddenfield[name=workflow_id]').getValue();
                store.removeAll();
                store.load({params: {workflow_id: workflow_id}});
            }
            */
        }
    }, {
        xtype: 'combo',
        name: 'query_raised_submission',
        store: 'confirmationstr',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        fieldLabel: 'Is Query Raised Submission?',
        value: 2
    },{
        xtype: 'combo',
        name: 'has_technicalmeeting_notification',
        store: 'confirmationstr',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        fieldLabel: 'Has Technical Meeting Notification?',
        value: 2,
        listeners: {
            change: function (cbo, newVal) {
                var form = cbo.up('form'),
                    emailCbo = form.down('combo[name=technicalmeetinemail_msg_id]');
                if (newVal == 1 || newVal === 1) {
					emailCbo.reset();
                    emailCbo.allowBlank = false;
                    emailCbo.validate();
                    emailCbo.setVisible(true);
                } else {
                    emailCbo.reset();
                    emailCbo.allowBlank = true;
                    emailCbo.validate();
                    emailCbo.setVisible(false);
                }
            }
        }
    },{
        xtype: 'combo',
        name: 'technicalmeetinemail_msg_id',
        valueField: 'id',
        displayField: 'description',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: true,
        hidden: true,
        anyMatch: true,
        fieldLabel: 'Techncial Meeting Email Message',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                     proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'email_messages_templates'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'combo',
        name: 'has_preminsp_notification',
        store: 'confirmationstr',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        fieldLabel: 'Has Premises Inspection Notification?',
        value: 2,
        listeners: {
            change: function (cbo, newVal) {
                var form = cbo.up('form'),
                    emailCbo = form.down('combo[name=preminspmail_msg_id]');
                if (newVal == 1 || newVal === 1) {
					emailCbo.reset();
                    emailCbo.allowBlank = false;
                    emailCbo.validate();
                    emailCbo.setVisible(true);
                } else {
                    emailCbo.reset();
                    emailCbo.allowBlank = true;
                    emailCbo.validate();
                    emailCbo.setVisible(false);
                }
            }
        }
    },{
        xtype: 'combo',
        name: 'preminspmail_msg_id',
        valueField: 'id',
        displayField: 'description',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: true,
        hidden: true,
        anyMatch: true,
        fieldLabel: 'Premises Inspection Notification Message',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                     proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'email_messages_templates'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
		xtype: 'combo',
        store: 'confirmationstr',
		valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        value: 2,
        fieldLabel: 'Tied toTrader  Email Notification',
        name: 'has_email_notification',
        listeners: {
            change: function (cbo, newVal) {
                var form = cbo.up('form'),
                    emailCbo = form.down('combo[name=email_message_id]');
                if (newVal == 1 || newVal === 1) {
					emailCbo.reset();
                    emailCbo.allowBlank = false;
                    emailCbo.validate();
                    emailCbo.setVisible(true);
                } else {
                    emailCbo.reset();
                    emailCbo.allowBlank = true;
                    emailCbo.validate();
                    emailCbo.setVisible(false);
                }
            }
        }
    }, {
        xtype: 'combo',
        name: 'email_message_id',
        valueField: 'id',
        displayField: 'description',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: true,
        hidden: true,
        anyMatch: true,
        fieldLabel: 'Email Message',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                     proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'email_messages_templates'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
		xtype: 'combo',
        store: 'confirmationstr',
		valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        value: 2,
        fieldLabel: 'Tied to Process Defination',
        name: 'has_process_defination',
        listeners: {
            change: function (cbo, newVal) {
                var form = cbo.up('form'),
                    processCbo = form.down('combo[name=appprocess_defination_id]');
                if (newVal == 1 || newVal === 1) {
					processCbo.reset();
                    processCbo.allowBlank = false;
                    processCbo.validate();
                    processCbo.setVisible(true);
                } else {
                    processCbo.reset();
                    processCbo.allowBlank = true;
                    processCbo.validate();
                    processCbo.setVisible(false);
                }
            }
        }
    }, {
        xtype: 'combo',
        name: 'appprocess_defination_id',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: true,
        hidden: true,
        anyMatch: true,
        fieldLabel: 'Process Defination',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                     proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_appprocess_definations'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
		xtype: 'combo',
        store: 'confirmationstr',
		valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        value: 2,
        fieldLabel: 'Has Application Date Defination',
        name: 'has_appdate_defination',
        listeners: {
            change: function (cbo, newVal) {
                var form = cbo.up('form'),
                    appdateCbo = form.down('combo[name=appdate_defination_id]');
                if (newVal == 1 || newVal === 1) {
					appdateCbo.reset();
                    appdateCbo.allowBlank = false;
                    appdateCbo.validate();
                    appdateCbo.setVisible(true);
                } else {
                    appdateCbo.reset();
                    appdateCbo.allowBlank = true;
                    appdateCbo.validate();
                    appdateCbo.setVisible(false);
                }
            }
        }
    }, {
        xtype: 'combo',
        name: 'appdate_defination_id',
        valueField: 'id',
        displayField: 'description',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: true,
        hidden: true,
        anyMatch: true,
        fieldLabel: 'App Date Defination',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                     proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_appprocess_definations'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'checkbox',
        fieldLabel: 'Approval Submission',
        name: 'is_approval_submission',
        inputValue: 1,
        labelWidth: 160,
        uncheckedValue: 0,
        columnWidth: 0.25
    }, {
        xtype: 'checkbox',
        fieldLabel: 'Is Inspection Submission',
        name: 'is_inspection_submission',
        inputValue: 1,
        labelWidth: 160,
        uncheckedValue: 0,
        columnWidth: 0.25
    }, {
        xtype: 'checkbox',
        fieldLabel: 'Keep Prev Status',
        name: 'keep_status',
        inputValue: 1,
        uncheckedValue: 0,
        columnWidth: 0.25
    },{
        xtype: 'checkbox',
        fieldLabel: 'Generate Ref No',
        name: 'generate_refno',
        inputValue: 1,
        uncheckedValue: 0,
        columnWidth: 0.25
    },{
        xtype: 'checkbox',
        fieldLabel: 'Update Portal Status',
        name: 'update_portal_status',
        labelWidth: 145,
        inputValue: 1,
        uncheckedValue: 0,
        columnWidth: 0.25,
        listeners: {
            change: function (checkbx, newVal) {
                var form = checkbx.up('form'),
                    portalStatus = form.down('combo[name=portal_status_id]');
                if (checkbx.checked) {
                    portalStatus.allowBlank = false;
                    portalStatus.validate();
                    portalStatus.setVisible(true);
                } else {
                    portalStatus.reset();
                    portalStatus.allowBlank = true;
                    portalStatus.validate();
                    portalStatus.setVisible(false);
                }
            }
        }
    }, {
        xtype: 'combo',
        name: 'portal_status_id',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: true,
        hidden: true,
        columnWidth: 0.75,
        anyMatch: true,
        fieldLabel: 'Portal Status',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getPortalApplicationStatuses'
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'textarea',
        fieldLabel: 'Description',
        name: 'description',
        hidden: true,
        allowBlank: true
    },{
        xtype: 'combo',
        name: 'is_declarationstatus_tied',
        store: 'confirmationstr',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        fieldLabel: 'Tied to Permit Declaration Status Update?',
        value: 2,
        listeners: {
            change: function (cmb, newVal) {
                var form = cmb.up('form'),
                    appStatus = form.down('combo[name=permitsubmission_status_id]');
                if (newVal == 1 || newVal === 1) {
                    appStatus.allowBlank = false;
                    appStatus.validate();
                    appStatus.setVisible(true);
                } else {
                    appStatus.reset();
                    appStatus.allowBlank = true;
                    appStatus.validate();
                    appStatus.setVisible(false);
                }
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Permit Submission Status',
        name: 'permitsubmission_status_id',
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        //forceSelection: true,
        queryMode: 'local',
        hidden: true,
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                     proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_teswspermitsubmission_statuses'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
		xtype: 'combo',
        store: 'confirmationstr',
		valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        value: 2,
        fieldLabel: 'Has Multi Stage Assignment',
        name: 'has_multistage_assignment',
        listeners: {
            change: function (cbo, newVal) {
                var form = cbo.up('form'),
                    screening_assignmentcbo = form.down('combo[name=has_screening_assignment]');
                     inspectionsche_assignmentcbo = form.down('combo[name=has_inspectionsche_assignment]');
                     firstassessment_assignmentcbo = form.down('combo[name=has_firstassessment_assignment]');
                     secondassessment_assignmentcbo = form.down('combo[name=has_secondassessment_assignment]');
                    assessreportreview_assignmentcbo = form.down('combo[name=has_assessreportreview_assignment]');
                    has_premises_validationcbo = form.down('combo[name=has_premises_validation]');

                    
                if (newVal == 1 || newVal === 1) {
                    screening_assignmentcbo.setVisible(true);
                    inspectionsche_assignmentcbo.setVisible(true);
                    firstassessment_assignmentcbo.setVisible(true);
                    secondassessment_assignmentcbo.setVisible(true);
                    assessreportreview_assignmentcbo.setVisible(true);
                    has_premises_validationcbo.setVisible(true);
                } else {
                    screening_assignmentcbo.setVisible(false);
                    inspectionsche_assignmentcbo.setVisible(false);
                  
                    firstassessment_assignmentcbo.setVisible(false);
                    secondassessment_assignmentcbo.setVisible(false);
                    assessreportreview_assignmentcbo.setVisible(false);
                    has_premises_validationcbo.setVisible(false);
                }
            }
        }
    },{
		xtype: 'combo',
        store: 'confirmationstr',
		valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        value: 2,
        allowBlank: true,
        fieldLabel: 'Has Screening Assignment',
        hidden: true,
        name: 'has_screening_assignment'
    },{
		xtype: 'combo',
        store: 'confirmationstr',
		valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        value: 2,
        allowBlank: true,
        fieldLabel: 'Has Inspection Inspection Assignment',
        hidden: true,
        name: 'has_inspectionsche_assignment'
        
    },{
		xtype: 'combo',
        store: 'confirmationstr',
		valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        value: 2,
        allowBlank: true,
        fieldLabel: 'Has 1st Assessment Assignment',
        hidden: true,
        name: 'has_firstassessment_assignment'
        
    },{
		xtype: 'combo',
        store: 'confirmationstr',
		valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        value: 2,
        fieldLabel: 'Has 2nd Assessment Assignment',
        hidden: true,
        allowBlank: true,
        name: 'has_secondassessment_assignment'
        
    },{
		xtype: 'combo',
        store: 'confirmationstr',
		valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        value: 2,
        fieldLabel: 'Has Assessment/Inspection Report Review Assignment',
        hidden: true,
        allowBlank: true,
        name: 'has_assessreportreview_assignment'
    },{
		xtype: 'combo',
        store: 'confirmationstr',
		valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        value: 2,
        fieldLabel: 'Has Premises Validation Processes',
        hidden: true,
        allowBlank: true,
        name: 'has_premises_validation'
    }],
    dockedItems: [{
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    text: 'Back',
                    iconCls: 'x-fa fa-backward',
                    action: 'back',
                    ui: 'soft-purple',
                    handler: 'backToWorkflowActionsWinGrid'
                }, '->', {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'wf_workflow_actions',
                    storeID: 'workflowactionsstr',
                    containerPnlXtype: 'workflowactionspnl',
                    hiddenCompXtype: 'workflowactionsgrid',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'workflow/saveWorkflowCommonData',
                    handler: 'saveWorkflowActionDetails'
                }, {
                    text: 'Reset',
                    iconCls: 'x-fa fa-close',
                    ui: 'soft-purple',
                    handler: function (btn) {
                        btn.up('form').getForm().reset();
                    }
                }
            ]
        }
    ]
});