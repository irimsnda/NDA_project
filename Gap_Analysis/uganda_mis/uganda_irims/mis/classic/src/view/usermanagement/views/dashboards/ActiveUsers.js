/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.usermanagement.views.dashboards.ActiveUsers', {
    extend: 'Ext.container.Container',
    xtype: 'activeusers',
    layout: 'responsivecolumn',
    controller: 'usermanagementvctr',
    viewModel: 'usermanagementvm',
    items: [
        {
            xtype: 'activeuserspnl'
        }
    ]
});
