Ext.define('Admin.view.parameters.CostCategories', {
    extend: 'Ext.panel.Panel',
    xtype: 'costcategories',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'costcategoriesgrid',
        }
    ]
});