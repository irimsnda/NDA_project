/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.MigrationSetup', {
    extend: 'Ext.container.Container',
    xtype: 'migrationsetup',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'migrationsetuppnl'
        }
    ]
});
