/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.usermanagement.views.dashboards.SystemDashboards', {
    extend: 'Ext.container.Container',
    xtype: 'systemdashboards',
    layout: 'responsivecolumn',
    controller: 'usermanagementvctr',
    viewModel: 'usermanagementvm',
    items: [
        {
            xtype: 'systemdashboardspnl'
        }
    ]
});
