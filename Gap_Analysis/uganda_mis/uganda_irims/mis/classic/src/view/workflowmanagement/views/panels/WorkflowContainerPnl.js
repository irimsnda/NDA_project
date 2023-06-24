/**
 * Created by Kip on 9/13/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.WorkflowContainerPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'workflowcontainerpnl',
    layout: 'fit',
    viewModel: 'workflowmanagementvm',
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
                    //'font-style': 'italic',
                    'font-size': '17px',
                    'text-align': 'center'
                }
            }
            ]
        }
    ],
    items: [
        {
            xtype: 'workflowwizardfrm'
        }
    ]
});