/**
 * Created by Kip on 8/24/2018.
 */
Ext.define('Admin.view.administration.views.dashboards.MenuProcesses', {
    extend: 'Ext.container.Container',
    xtype: 'menuprocesses',
    layout: 'responsivecolumn',
    controller: 'administrationvctr',
    viewModel: 'administrationvm',
    items: [
        {
            xtype: 'menuprocessespnl'
        }
    ]
});
