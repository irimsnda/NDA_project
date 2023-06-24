/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.usermanagement.views.dashboards.UserTitles', {
    extend: 'Ext.container.Container',
    xtype: 'usertitles',
    layout: 'responsivecolumn',
    controller: 'usermanagementvctr',
    viewModel: 'usermanagementvm',
    items: [
        {
            xtype: 'usertitlespnl'
        }
    ]
});
