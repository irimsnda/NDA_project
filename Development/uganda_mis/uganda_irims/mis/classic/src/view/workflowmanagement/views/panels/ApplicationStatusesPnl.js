/**
 * Created by Kip on 9/17/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.ApplicationStatusesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationstatusespnl',
    title: 'Workflow Application Statuses',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'applicationstatusesgrid'
        }
    ]
});
