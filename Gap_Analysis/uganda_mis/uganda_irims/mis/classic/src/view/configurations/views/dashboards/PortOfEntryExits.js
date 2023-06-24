/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.PortOfEntryExits', {
    extend: 'Ext.container.Container',
    xtype: 'portofentryexits',
    layout: 'fit',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'portofentryexitspnl'
        }
    ]
});
