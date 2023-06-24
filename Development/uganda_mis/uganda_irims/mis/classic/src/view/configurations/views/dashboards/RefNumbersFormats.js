/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.RefNumbersFormats', {
    extend: 'Ext.container.Container',
    xtype: 'refnumbersformats',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'refnumbersformatspnl'
        }
    ]
});
