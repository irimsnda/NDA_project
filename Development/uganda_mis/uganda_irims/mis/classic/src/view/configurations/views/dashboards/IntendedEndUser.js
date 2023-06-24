/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.IntendedEndUser', {
    extend: 'Ext.container.Container',
    xtype: 'intendedEndUser',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'intendedEndUserPnl'
        }
    ]
});
