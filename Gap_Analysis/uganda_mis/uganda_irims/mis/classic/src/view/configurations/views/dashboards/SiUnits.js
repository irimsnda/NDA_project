/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.SiUnits', {
    extend: 'Ext.container.Container',
    xtype: 'siUnits',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'siUnitsPnl'
        }
    ]
});
