
Ext.define('Admin.view.configurations.views.dashboards.CertificateConditions', {
    extend: 'Ext.container.Container',
    xtype: 'certificateconditions',
    layout: 'fit',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'certificateconditionspnl'
        }
    ]
});
