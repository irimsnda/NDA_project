/**
 * Created by Kip on 9/13/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.dashboards.TfdaProcesses', {
    extend: 'Ext.container.Container',
    xtype: 'tfdaprocesses',
    layout: 'responsivecolumn',
    controller: 'workflowmanagementvctr',
    viewModel: 'workflowmanagementvm',
    items: [
        {
            xtype: 'tfdaprocessespnl'
        }
    ]
});
