/**
 * Created by Kip on 7/11/2018.
 */
Ext.define('Admin.view.administration.views.dashboards.SystemUserGroups', {
    extend: 'Ext.container.Container',
    xtype: 'systemusergroups',
    layout: 'responsivecolumn',
    controller: 'administrationvctr',
    viewModel: 'administrationvm',
    items: [
        {
            xtype: 'systemusergroupspnl'
        }
    ]
});
