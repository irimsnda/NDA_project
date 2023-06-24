Ext.define('Admin.view.frontoffice.enquiries.forms.EnquiriesTaskAssignmentFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'enquiriesTaskAssignmentFrm',
    controller: 'enquiriesCtr',
    autoScroll: true,
    layout: 'form',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'submission_id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'application_code',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'module_id',
        margin: '0 20 20 0',
        name: 'module_id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    },{
        xtype: 'displayfield',
        name: 'reference_no',
        labelAlign: 'left',
        margin: '0 20 20 0',
        fieldLabel: 'Application ',
        value: '****',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '12px',
            'margin-top': '-2px'
        }
    },{
        xtype: 'combo',
        fieldLabel: 'On Workflow',
        name: 'workflow_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: false,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'wf_workflows'
                        }
                    }
                },
                isLoad: true
            },
            change: function(combo, newVal, oldVal) {
                var form = combo.up('form'),
                    store = form.down('combo[name=current_stage]').getStore();
                store.removeAll();
                store.load({params:{'workflow_id': newVal}});
            },
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'To Stage',
        name: 'current_stage',
        valueField: 'id',
        displayField: 'name',
        forceSelection: false,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getWorkflowStages',
                    }
                },
                isLoad: false
            },
           change: function(combo, newVal, oldVal, eopts) {
               var form = combo.up('form'),
                   store = form.down('combo[name=to_user]').getStore();
               store.removeAll();
               store.load({params:{next_stage:newVal}});
           },
        }
    },{
        xtype: 'combo',
        fieldLabel: 'ASSIGN TO',
        name: 'to_user',
        valueField: 'id',
        displayField: 'name',
        forceSelection: false,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getSubmissionResponsibleUsers'
                    }
                },
                isLoad: false
            },
           
        }
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    storeID: 'applicationResubmissionStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'openoffice/assignUsertoEnquiryApplication',
                    handler: 'submitApplicationAssignment'
                }
            ]
        }
    ]
});