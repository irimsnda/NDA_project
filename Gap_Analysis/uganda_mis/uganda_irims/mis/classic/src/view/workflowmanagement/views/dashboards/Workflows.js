/**
 * Created by Kip on 9/13/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.dashboards.Workflows', {
    extend: 'Ext.container.Container',
    xtype: 'workflows',
    layout: 'responsivecolumn',
    controller: 'workflowmanagementvctr',
    viewModel: 'workflowmanagementvm',
    items: [
        {
            xtype: 'workflowspnl'
        }
    ]
});
