/**
 * Created by Kip on 12/7/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.AlterationSetup', {
    extend: 'Ext.container.Container',
    xtype: 'alterationsetup',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'alterationsetuppnl'
        }
    ]
});
