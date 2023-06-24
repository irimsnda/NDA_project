/**
 * Created by Kip on 9/4/2018.
 */
Ext.define('Admin.view.usermanagement.views.dashboards.UnBlockedUsers', {
    extend: 'Ext.container.Container',
    xtype: 'unblockedusers',
    layout: 'responsivecolumn',
    controller: 'usermanagementvctr',
    viewModel: 'usermanagementvm',
    items: [
        {
            xtype: 'panel',
            title: 'Blocked Users',
            userCls: 'big-100 small-100',
            itemId: 'BlockedUsersDashboard',
            height: Ext.Element.getViewportHeight() - 118,
            layout:{
                type: 'fit'
            },
            items: [
                {
                    xtype: 'unblockedusersgrid'
                }
            ]
        }
    ]
});
