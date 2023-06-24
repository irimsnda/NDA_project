/**
 * Created by Kip on 8/15/2019.
 */
Ext.define('Admin.view.configurations.views.dashboards.PortalAppsInitialStatuses', {
    extend: 'Ext.container.Container',
    xtype: 'portalappsinitialstatuses',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'portalappsinitialstatusespnl'
        }
    ]
});
