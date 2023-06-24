/**
 * Created by Kip on 6/27/2019.
 */
Ext.define('Admin.view.usermanagement.views.dashboards.UsersSignsSetUp', {
    extend: 'Ext.panel.Panel',
    xtype: 'userssignssetup',
    title: 'Signature SetUp',
    controller: 'usermanagementvctr',
    viewModel: 'usermanagementvm',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'userssignssetupgrid'
        }
    ]
});

