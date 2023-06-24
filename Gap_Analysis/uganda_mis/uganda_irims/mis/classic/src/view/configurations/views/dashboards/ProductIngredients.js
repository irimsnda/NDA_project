/**
 * Created by onesmas on 09/07/2019.
 */
Ext.define('Admin.view.configurations.views.dashboards.ProductIngredients', {
    extend: 'Ext.container.Container',
    xtype: 'productIngredients',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'productIngredientsPnl'
        }
    ]
});
