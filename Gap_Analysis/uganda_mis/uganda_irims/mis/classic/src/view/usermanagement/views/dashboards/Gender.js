/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.usermanagement.views.dashboards.Gender', {
    extend: 'Ext.container.Container',
    xtype: 'gender',
    layout: 'responsivecolumn',
    controller: 'usermanagementvctr',
    viewModel: 'usermanagementvm',
    items: [
        {
            xtype: 'genderpnl'
        }
    ]
});
