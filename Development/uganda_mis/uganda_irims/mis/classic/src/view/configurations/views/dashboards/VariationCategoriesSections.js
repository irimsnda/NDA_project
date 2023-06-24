/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.VariationCategoriesSections', {
    extend: 'Ext.container.Container',
    xtype: 'variationcategoriessections',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'variationcategoriessectionspnl'
        }
    ]
});
