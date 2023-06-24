/**
 * Created by Kip on 9/17/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.forms.ApplicationStatusesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationstatusesfrm',
    autoScroll: true,
    controller: 'workflowmanagementvctr',
    layout: 'form',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'wf_workflow_statuses',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Name',
        margin: '0 20 20 0',
        name: 'name'
    }, {
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                {
                    text: 'Back',
                    iconCls: 'x-fa fa-backward',
                    action: 'back',
                    containerType: 'form',
                    containerPnlXtype: 'applicationstatusespnl',
                    hiddenCompXtype: 'applicationstatusesgrid',
                    ui: 'soft-purple',
                    handler: 'workflowBackToDashboard'
                },'->', {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'wf_workflow_statuses',
                    storeID: 'applicationstatusesstr',
                    containerPnlXtype: 'applicationstatusespnl',
                    hiddenCompXtype: 'applicationstatusesgrid',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'workflow/saveWorkflowCommonData',
                    handler: 'doCreateWorkflowParam'
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