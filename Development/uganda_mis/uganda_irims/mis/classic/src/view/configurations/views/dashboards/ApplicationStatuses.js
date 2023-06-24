/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.ApplicationStatuses', {
    extend: 'Ext.container.Container',
    xtype: 'applicationstatuses',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'applicationstatusespnl'
        }
    ]
});
