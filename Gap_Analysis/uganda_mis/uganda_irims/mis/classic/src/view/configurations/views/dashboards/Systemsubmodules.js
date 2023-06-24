
/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.Systemsubmodules', {
    extend: 'Ext.container.Container',
    xtype: 'systemsubmodules',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'systemsubmodulespnl'
        }
    ]
});
