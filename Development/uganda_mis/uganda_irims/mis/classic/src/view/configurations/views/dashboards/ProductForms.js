

/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.ProductForms', {
    extend: 'Ext.container.Container',
    xtype: 'productForms',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'productFormsPnl'
        }
    ]
});
