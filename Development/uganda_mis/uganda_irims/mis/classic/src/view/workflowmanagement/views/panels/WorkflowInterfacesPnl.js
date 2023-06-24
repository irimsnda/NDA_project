/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.WorkflowInterfacesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'workflowinterfacespnl',
    title: 'WorkFlow Interfaces',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'workflowinterfacesgrid'
        }
    ]
});
