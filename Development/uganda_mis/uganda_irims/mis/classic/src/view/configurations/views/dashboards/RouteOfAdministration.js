/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.RouteOfAdministration', {
    extend: 'Ext.container.Container',
    xtype: 'routeOfAdministration',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'routeOfAdministrationPnl'
        }
    ]
});
