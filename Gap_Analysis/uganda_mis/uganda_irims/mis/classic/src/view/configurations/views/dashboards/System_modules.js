
/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.System_modules', {
    extend: 'Ext.container.Container',
    xtype: 'system_modules',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'system_modulespnl'
        }
    ]
});
