/**
 * Created by Kip on 9/13/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.WorkflowsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'workflowspnl',
    title: 'Systems WorkFlows',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'workflowsgrid'
        }
    ]
});
