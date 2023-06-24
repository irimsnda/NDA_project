
Ext.define('Admin.view.configurations.views.dashboards.RegulationRegistration', {
    extend: 'Ext.container.Container',
    xtype: 'regulationregistration',
    layout: 'fit',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'regulationregistrationpnl'
        }
    ]
});
