/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.ProductSubCategories', {
    extend: 'Ext.container.Container',
    xtype: 'productSubCategories',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'productSubCategoriesPnl'
        }
    ]
});
