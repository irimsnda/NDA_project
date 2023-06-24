/**
 * Created by Kip on 11/27/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.forms.OnlineSubmissionsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlinesubmissionsfrm',
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
        name: 'gmp_type_id'
    }, {
        xtype: 'hiddenfield',
        name: 'curr_stage_id'
    }, {
        xtype: 'hiddenfield',
        name: 'is_manager_query'
    }, {
        xtype: 'hiddenfield',
        name: 'status_type_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_status_id'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name'
    }, {
        xtype: 'hiddenfield',
        name: 'has_queries'
    }, {
        xtype: 'fieldset',
        layout: 'form',
        style: 'background:white;padding:0',
        defaults: {
            allowBlank: false
        },
        items: [
            {
                xtype: 'textfield',
                readOnly: true,
                fieldLabel: 'Process',
                name: 'process_name',
                allowBlank: true
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
				allowBlank: true,
				
                queryMode: 'local',
                value: user_id,
                forceSelection: true
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
    },{
        xtype: 'fieldset',
        style: 'background:white;padding:0',
        defaults: {
            allowBlank: false, 
            columnWidth: 0.48,
            margin: 5, 
            labelAlign: 'top'
        },
        layout: 'column',
        collapsible: true,
        title: 'Other Submission Details',
        items: [{
                xtype: 'combo',
                fieldLabel: 'Screening Stage',
                readOnly: true, hidden: true,
                store: 'submissionnextstagesstr',
                name: 'screening_stage_id',
                valueField: 'id',
                allowBlank: true,
                displayField: 'name',
                queryMode: 'local',
                forceSelection: true,
                listeners: {
                    change: function (cmb, newVal) {
                        var thisStore = cmb.getStore(),
                            form = cmb.up('form'),
                            responsible_users = form.down('combo[name=screening_respuser_id]');
                            store = responsible_users.store;
                            store.removeAll();
                            store.load({params: {next_stage: newVal}});
                    }
                }
        }, {
            xtype: 'combo',
            fieldLabel: 'Screening Responsible User',
            name: 'screening_respuser_id',
            valueField: 'id', allowBlank: true,
            displayField: 'name',
            queryMode: 'local', hidden: true,
            forceSelection: true,
            anyMatch: true,
            listeners: {
                beforerender: {
                    fn: 'setWorkflowCombosStore',
                    config: {
                        proxy: {
                            type: 'ajax',
                            url: 'workflow/getSubmissionResponsibleUsers',
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            },
                            reader: {
                                type: 'json',
                                idProperty: 'id',
                                rootProperty: 'results',
                                messageProperty: 'msg'
                            },
                            extraParams: {}
                        },
                    },
                    isLoad: false
                }
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Inspection Scheduling Stage',
            readOnly: true,
            
            store: 'submissionnextstagesstr',
            name: 'inspection_schedulingstage_id',
            valueField: 'id', allowBlank: true,
            displayField: 'name', hidden: true,
            queryMode: 'local',
            forceSelection: true,
            listeners: {
                change: function (cmb, newVal) {
                    var thisStore = cmb.getStore(),
                        form = cmb.up('form'),
                        responsible_users = form.down('combo[name=inspectionscheduling_respuser_id]');
                        store = responsible_users.store;
                        store.removeAll();
                        store.load({params: {next_stage: newVal}});
                }
            }
        }, {
            xtype: 'combo',
            fieldLabel: 'Inspection scheduling Responsible User',
            name: 'inspectionscheduling_respuser_id',
            valueField: 'id', allowBlank: true,
            displayField: 'name',
            queryMode: 'local', hidden: true,
            forceSelection: true,
            anyMatch: true,
            listeners: {
                beforerender: {
                    fn: 'setWorkflowCombosStore',
                    config: {
                        proxy: {
                            type: 'ajax',
                            url: 'workflow/getSubmissionResponsibleUsers',
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            },
                            reader: {
                                type: 'json',
                                idProperty: 'id',
                                rootProperty: 'results',
                                messageProperty: 'msg'
                            },
                            extraParams: {}
                        },
                    },
                    isLoad: false
                }
            }
        }, {
            xtype: 'combo',
            fieldLabel: 'Inspection Stage',
            readOnly: true, allowBlank: true,
            store: 'submissionnextstagesstr',
            name: 'inspection_stage_id',
            valueField: 'id', hidden: true,
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            listeners: {
                change: function (cmb, newVal) {
                    var thisStore = cmb.getStore(),
                        form = cmb.up('form'),
                        responsible_users = form.down('combo[name=inspection_respuser_id]');
                        store = responsible_users.store;
                        store.removeAll();
                        store.load({params: {next_stage: newVal}});
                }
            }
        }, {
            xtype: 'combo',
            fieldLabel: 'Inspection Responsible User',
            name: 'inspection_respuser_id',
            valueField: 'id', allowBlank: true,
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            anyMatch: true, hidden: true,
             listeners: {
                beforerender: {
                    fn: 'setWorkflowCombosStore',
                    config: {
                        proxy: {
                            type: 'ajax',
                            url: 'workflow/getSubmissionResponsibleUsers',
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            },
                            reader: {
                                type: 'json',
                                idProperty: 'id',
                                rootProperty: 'results',
                                messageProperty: 'msg'
                            },
                            extraParams: {}
                        },
                    },
                    isLoad: false
                }
            }
        }, {
            xtype: 'combo',
            fieldLabel: '1st Assessment Stage',
            readOnly: true, allowBlank: true,
            store: 'submissionnextstagesstr',
            name: 'firstassessment_stage_id',
            valueField: 'id', hidden: true,
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            listeners: {
                change: function (cmb, newVal) {
                    var thisStore = cmb.getStore(),
                        form = cmb.up('form'),
                        responsible_users = form.down('combo[name=firstassessment_respuser_id]');
                        store = responsible_users.store;
                        store.removeAll();
                        store.load({params: {next_stage: newVal}});
                }
            }
        }, {
            xtype: 'combo',
            fieldLabel: '1st Assessment Responsible User',
            name: 'firstassessment_respuser_id', allowBlank: true,
            hidden: true,
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            anyMatch: true,
            listeners: {
                beforerender: {
                    fn: 'setWorkflowCombosStore',
                    config: {
                        proxy: {
                            type: 'ajax',
                            url: 'workflow/getSubmissionResponsibleUsers',
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            },
                            reader: {
                                type: 'json',
                                idProperty: 'id',
                                rootProperty: 'results',
                                messageProperty: 'msg'
                            },
                            extraParams: {}
                        },
                    },
                    isLoad: false
                }
            }
        },   {
            xtype: 'combo',
            fieldLabel: '2nd Assessment Stage',
            readOnly: true, allowBlank: true,
            store: 'submissionnextstagesstr',
            name: 'secondassessment_stage_id',
            valueField: 'id', hidden: true,
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            listeners: {
                change: function (cmb, newVal) {
                    var thisStore = cmb.getStore(),
                        form = cmb.up('form'),
                        responsible_users = form.down('combo[name=secondassessment_respuser_id]');
                        store = responsible_users.store;
                        store.removeAll();
                        store.load({params: {next_stage: newVal}});
                }
            }
            
        }, {
            xtype: 'combo',
            fieldLabel: '2nd Assessment Responsible User',
            name: 'secondassessment_respuser_id', allowBlank: true,
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local', hidden: true,
            forceSelection: true,
            anyMatch: true,
            listeners: {
                beforerender: {
                    fn: 'setWorkflowCombosStore',
                    config: {
                        proxy: {
                            type: 'ajax',
                            url: 'workflow/getSubmissionResponsibleUsers',
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            },
                            reader: {
                                type: 'json',
                                idProperty: 'id',
                                rootProperty: 'results',
                                messageProperty: 'msg'
                            },
                            extraParams: {}
                        },
                    },
                    isLoad: false
                }
            }
        },  {
            xtype: 'combo',
            fieldLabel: 'Assessment Report Review Stage',
            readOnly: true, allowBlank: true,
            store: 'submissionnextstagesstr',
            name: 'assessmentreport_reviewstage_id',
            valueField: 'id', hidden: true,
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            listeners: {
                change: function (cmb, newVal) {
                    var thisStore = cmb.getStore(),
                        form = cmb.up('form'),
                        responsible_users = form.down('combo[name=assessmentreportreview_respuser_id]');
                        store = responsible_users.store;
                        store.removeAll();
                        store.load({params: {next_stage: newVal}});
                }
            }
        }, {
            xtype: 'combo',
            fieldLabel: 'Assessment Report Review Responsible User',
            name: 'assessmentreportreview_respuser_id', allowBlank: true,
            hidden: true,
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            anyMatch: true, 
            listeners: {
                beforerender: {
                    fn: 'setWorkflowCombosStore',
                    config: {
                        proxy: {
                            type: 'ajax',
                            url: 'workflow/getSubmissionResponsibleUsers',
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            },
                            reader: {
                                type: 'json',
                                idProperty: 'id',
                                rootProperty: 'results',
                                messageProperty: 'msg'
                            },
                            extraParams: {}
                        },
                    },
                    isLoad: false
                }
            }
        }]
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
                    action_url: 'workflow/receiveOnlineApplicationDetails'
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