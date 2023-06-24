Ext.define('Admin.view.parameters.RevenueTypes', {
    extend: 'Ext.panel.Panel',
    xtype: 'revenueType',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'revenueTypesgrid',
        }
    ]
});