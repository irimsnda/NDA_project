/**
 * Created by Kip on 9/12/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.WorkflowActionsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'workflowactionspnl',
    title: 'Workflow Actions',
    userCls: 'big-100 small-100',
    itemId: 'WorkflowActionsDashboard',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'workflowactionsgrid'
        }
    ]
});
