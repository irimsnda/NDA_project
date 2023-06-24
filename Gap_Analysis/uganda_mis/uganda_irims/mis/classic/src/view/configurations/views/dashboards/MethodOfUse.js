

/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.MethodOfUse', {
    extend: 'Ext.container.Container',
    xtype: 'methodOfUse',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'methodOfUsePnl'
        }
    ]
});
