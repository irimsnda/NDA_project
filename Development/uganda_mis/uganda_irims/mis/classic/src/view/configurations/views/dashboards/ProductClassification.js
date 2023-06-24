/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.ProductClassification', {
    extend: 'Ext.container.Container',
    xtype: 'productClassification',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'productClassificationPnl'
        }
    ]
});
