Ext.define('Admin.view.parameters.CostSubCategories', {
    extend: 'Ext.panel.Panel',
    xtype: 'costsubcategories',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'costsubcategoriesgrid',
        }
    ]
});