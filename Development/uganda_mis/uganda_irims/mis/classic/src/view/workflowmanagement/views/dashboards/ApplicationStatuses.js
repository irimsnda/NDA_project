/**
 * Created by Kip on 9/17/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.dashboards.ApplicationStatuses', {
    extend: 'Ext.container.Container',
    xtype: 'applicationstatuses',
    layout: 'responsivecolumn',
    controller: 'workflowmanagementvctr',
    viewModel: 'workflowmanagementvm',
    items: [
        {
            xtype: 'applicationstatusespnl'
        }
    ]
});
