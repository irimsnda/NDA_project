
Ext.define('Admin.view.usermanagement.views.forms.TaskReassignmentFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'taskreassingmentfrm',
    autoScroll: true,
    controller: 'usermanagementvctr',
    layout: 'form',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'workflow_stage_id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'application_code',
        allowBlank: true
    },  {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'module_id',
        margin: '0 20 20 0',
        name: 'module_id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'submission_id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'combo',
        fieldLabel: 'Responsible User',
        forceSelection: true,
        columnWidth: 0.25,
        allowBlank: false,
        queryMode: 'local',
        margin: '0 20 0 0',
        name: 'responsible_user_id',
        displayField: 'name',
        valueField: 'id',
        listeners: {
           beforerender: {
                    fn: 'setOrgConfigCombosStore',
                   config: {
                        pageSize: 100,
                        proxy: {
                        url: 'workflow/getSubmissionResponsibleUsers'
                       }
                    },
                    isLoad: false
                },
            afterRender: 'func_loadResponsibleUsers'
        }
    },{
        xtype: 'textarea',
        fieldLabel: 'Reason For Reassignment',
        margin: '0 20 20 0',
        name: 'reassignment_reason',
        allowBlank: true
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
            '->', {
                    text: 'Reassign',
                    iconCls: 'x-fa fa-save',
                    handler: 'func_reassignTask',
                    storeID: 'taskreassignmentStr',
                    formBind: true
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