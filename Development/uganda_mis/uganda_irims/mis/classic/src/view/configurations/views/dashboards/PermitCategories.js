/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.PermitCategories', {
    extend: 'Ext.container.Container',
    xtype: 'permitcategories',
    layout: 'fit',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'permitcategoriespnl'
        }
    ]
});
