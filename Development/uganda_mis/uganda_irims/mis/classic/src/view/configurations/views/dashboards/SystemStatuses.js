/**
 * Created by Kip on 12/7/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.SystemStatuses', {
    extend: 'Ext.container.Container',
    xtype: 'systemstatuses',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'systemstatusespnl'
        }
    ]
});
