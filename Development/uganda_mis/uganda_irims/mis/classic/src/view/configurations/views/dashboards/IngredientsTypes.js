
/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.IngredientsTypes', {
    extend: 'Ext.container.Container',
    xtype: 'ingredientsTypes',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'ingredientsTypesPnl'
        }
    ]
});
