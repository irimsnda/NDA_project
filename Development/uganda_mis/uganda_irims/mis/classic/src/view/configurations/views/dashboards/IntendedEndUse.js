/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.IntendedEndUse', {
    extend: 'Ext.container.Container',
    xtype: 'intendedEndUse',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'intendedEndUsePnl'
        }
    ]
});
