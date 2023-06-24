/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.ProductSpecialcategory', {
    extend: 'Ext.container.Container',
    xtype: 'productSpecialcategory',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'productSpecialcategoryPnl'
        }
    ]
});
