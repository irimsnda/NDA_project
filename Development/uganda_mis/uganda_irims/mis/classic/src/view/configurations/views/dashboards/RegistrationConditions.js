
Ext.define('Admin.view.configurations.views.dashboards.RegistrationConditions', {
    extend: 'Ext.container.Container',
    xtype: 'registrationconditions',
    layout: 'fit',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'registrationconditionspnl'
        }
    ]
});
