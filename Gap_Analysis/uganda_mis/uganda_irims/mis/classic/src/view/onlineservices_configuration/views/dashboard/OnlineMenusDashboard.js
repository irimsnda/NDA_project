/**
 * Created by Kip on 7/9/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.dashboard.OnlineMenusDashboard', {
    extend: 'Ext.container.Container',
    xtype: 'onlinemenus',
    layout: 'responsivecolumn',
    controller: 'onlineservicesconfVctr',
    viewModel: 'administrationvm',
    items: [
        {
            xtype: 'onlinemenuspnl'
        }
    ]
});
