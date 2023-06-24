Ext.define('Admin.view.parameters.CostTypes', {
    extend: 'Ext.panel.Panel',
    xtype: 'costtypes',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'costtypesgrid',
        }
    ]
});