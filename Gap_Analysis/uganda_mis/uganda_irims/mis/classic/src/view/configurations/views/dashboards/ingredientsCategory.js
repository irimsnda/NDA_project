
/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.IngredientsCategory', {
    extend: 'Ext.container.Container',
    xtype: 'ingredientsCategory',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'ingredientsCategoryPnl'
        }
    ]
});
