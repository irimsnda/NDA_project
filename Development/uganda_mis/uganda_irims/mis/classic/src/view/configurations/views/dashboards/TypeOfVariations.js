/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.TypeOfVariations', {
    extend: 'Ext.container.Container',
    xtype: 'typeofvariations',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'typeofvariationspnl'
        }
    ]
});
