Ext.define('Admin.view.usermanagement.views.dashboards.ApiUsers', {
    extend: 'Ext.container.Container',
    xtype: 'apiUsers',
    layout: 'fit',
    controller: 'usermanagementvctr',
    viewModel: 'usermanagementvm',
    items: [
        {
            xtype: 'apiuserspnl'
        }
    ]
});
