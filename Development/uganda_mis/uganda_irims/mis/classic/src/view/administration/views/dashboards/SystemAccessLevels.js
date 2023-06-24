/**
 * Created by Kip on 7/10/2018.
 */
Ext.define('Admin.view.administration.views.dashboards.SystemAccessLevels', {
    extend: 'Ext.container.Container',
    xtype: 'systemaccesslevels',
    layout: 'responsivecolumn',
    controller: 'administrationvctr',
    viewModel: 'administrationvm',
    items: [
        {
            xtype: 'systemaccesslevelspnl'
        }
    ]
});
