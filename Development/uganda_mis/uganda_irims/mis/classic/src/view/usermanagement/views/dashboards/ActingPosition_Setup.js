/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.usermanagement.views.dashboards.ActingPosition_Setup', {
    extend: 'Ext.container.Container',
    xtype: 'actingposition_setup',
    layout: 'responsivecolumn',
    controller: 'usermanagementvctr',
    viewModel: 'usermanagementvm',
    items: [
        {
            xtype: 'actingposition_setuppnl'
        }
    ]
});
