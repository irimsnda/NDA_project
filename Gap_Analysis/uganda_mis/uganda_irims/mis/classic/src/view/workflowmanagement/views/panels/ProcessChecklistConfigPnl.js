/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.ProcessChecklistConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'processchecklistconfigpnl',
    controller: 'workflowmanagementvctr',
    viewModel: 'workflowmanagementvm',
    padding: '2 0 0 0',
    layout: {
        type: 'hbox'
        /* align: 'center',
         pack: 'center'*/
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'button',
                    text: 'Back',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-backward',
                    handler: 'backToProcessesHome'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Sync Changes',
                    iconCls: 'x-fa fa-save',
                    ui: 'soft-purple',
                    handler: 'syncProcessApplicableChecklists'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'hiddenfield',
            name: 'process_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'workflow_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'stage_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'config_type',
            value: 'checklists'
        },
        {
            xtype: 'processworkflowstagesgrid',
            flex: 1,
            margin: 3
        },
        {
            xtype: 'processworkflowstagechecklistsgrid',
            flex: 1,
            margin: 3
        }
    ]
});
