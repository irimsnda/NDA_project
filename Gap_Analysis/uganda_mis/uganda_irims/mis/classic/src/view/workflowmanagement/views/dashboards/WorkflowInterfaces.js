/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.dashboards.WorkflowInterfaces', {
    extend: 'Ext.container.Container',
    xtype: 'workflowinterfaces',
    layout: 'responsivecolumn',
    controller: 'workflowmanagementvctr',
    viewModel: 'workflowmanagementvm',
    items: [
        {
            xtype: 'workflowinterfacespnl'
        }
    ]
});
