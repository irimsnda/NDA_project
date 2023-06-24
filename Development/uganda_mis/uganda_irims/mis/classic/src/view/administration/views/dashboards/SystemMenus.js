/**
 * Created by Kip on 7/9/2018.
 */
Ext.define('Admin.view.administration.views.dashboards.SystemMenus', {
    extend: 'Ext.container.Container',
    xtype: 'systemmenus',
    layout: 'responsivecolumn',
    controller: 'administrationvctr',
    viewModel: 'administrationvm',
    items: [
        {
            xtype: 'systemmenuspnl'
        }
    ]
});
