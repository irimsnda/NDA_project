/**
 * Created by Kip on 9/23/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.WorkflowContainerPnlGeneric', {
    extend: 'Ext.panel.Panel',
    xtype: 'workflowcontainerpnlgeneric',
    layout: 'fit',
    viewModel: 'workflowmanagementvm',
    controller: 'workflowmanagementvctr',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 35,
            layout: 'fit',
            items: [{
                xtype: 'displayfield',
                name: 'workflow_name',
                labelAlign: 'right',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '17px',
                    'text-align': 'center'
                }
            }
            ]
        }
    ],
    items: [
        {
            xtype: 'workflowwizardfrmgeneric'
        }
    ]
});