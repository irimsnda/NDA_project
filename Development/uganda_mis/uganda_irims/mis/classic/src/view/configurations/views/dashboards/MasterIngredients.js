/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.MasterIngredients', {
    extend: 'Ext.container.Container',
    xtype: 'masterIngredients',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'masterIngredientsPnl'
        }
    ]
});
