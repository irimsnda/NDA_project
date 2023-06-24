/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.ProductCategories', {
    extend: 'Ext.container.Container',
    xtype: 'productCategories',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'productCategoriesPnl'
        }
    ]
});
