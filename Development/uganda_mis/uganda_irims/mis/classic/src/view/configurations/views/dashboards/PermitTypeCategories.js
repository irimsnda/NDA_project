/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.PermitTypeCategories', {
    extend: 'Ext.container.Container',
    xtype: 'permittypecategories',
    layout: 'fit',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'permittypecategoriespnl'
        }
    ]
});
