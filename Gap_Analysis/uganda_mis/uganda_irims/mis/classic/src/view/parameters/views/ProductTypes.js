Ext.define('Admin.view.parameters.ProductTypes', {
    extend: 'Ext.panel.Panel',
    xtype: 'producttypes',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'producttypesgrid',
        }
    ]
});