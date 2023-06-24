/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.DistributionCategory', {
    extend: 'Ext.container.Container',
    xtype: 'distributionCategory',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'distributionCategoryPnl'
        }
    ]
});
