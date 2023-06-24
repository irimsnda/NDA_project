/**
 * Created by Kip on 11/25/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.ProcessFormConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'processformconfigpnl',
    controller: 'workflowmanagementvctr',
    viewModel: 'workflowmanagementvm',
    padding: '2 0 0 0',
    height: '100%',
    layout: 'border',
    defaults:{
        collapsible: true,
        split: true,
        titleCollapse: true
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
                    handler: 'syncProcessAmendableParts'
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
            name: 'module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'form_id'
        },
        {
            xtype: 'processformfieldsgrid',
            flex: 1,
            region: 'center'
        },
        {
            xtype: 'processotherpartsgrid',// processformsgrid',
            flex: 1,
            region: 'east'
        }
    ]
});
