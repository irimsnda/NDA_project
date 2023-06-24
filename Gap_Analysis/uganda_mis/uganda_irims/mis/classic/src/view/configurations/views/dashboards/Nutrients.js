/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.Nutrients', {
    extend: 'Ext.container.Container',
    xtype: 'nutrients',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'nutrientsPnl'
        }
    ]
});
