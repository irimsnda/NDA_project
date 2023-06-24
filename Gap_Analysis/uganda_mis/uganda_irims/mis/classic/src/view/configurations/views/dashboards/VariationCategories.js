/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.VariationCategories', {
    extend: 'Ext.container.Container',
    xtype: 'variationcategories',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'variationcategoriespnl'
        }
    ]
});
