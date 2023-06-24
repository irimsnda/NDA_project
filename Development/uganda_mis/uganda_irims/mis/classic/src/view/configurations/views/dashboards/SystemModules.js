/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.SystemModules', {
    extend: 'Ext.container.Container',
    xtype: 'systemModules',
    layout: 'fit',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'systemModulesPnl'
        }
    ]
});
