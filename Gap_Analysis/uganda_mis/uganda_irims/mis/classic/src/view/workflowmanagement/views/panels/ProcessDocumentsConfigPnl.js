/**
 * Created by Kip on 2/7/2019.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.ProcessDocumentsConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'processdocumentsconfigpnl',
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
                    handler: 'syncProcessApplicableDocumentTypes'
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
            value: 'documents'
        },
        {
            xtype: 'processworkflowstagesgrid',
            flex: 1,
            margin: 3
        },
        {
            xtype: 'processworkflowstagedocumentsgrid',
            flex: 1,
            margin: 3
        }
    ]
});
