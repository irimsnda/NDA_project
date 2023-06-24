/**
 * Created by Kip on 9/3/2018.
 */
Ext.define('Admin.view.usermanagement.views.dashboards.BlockedUsers', {
    extend: 'Ext.container.Container',
    xtype: 'blockedusers',
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
                    xtype: 'blockedusersgrid'
                }
            ]
        }
    ]
});
