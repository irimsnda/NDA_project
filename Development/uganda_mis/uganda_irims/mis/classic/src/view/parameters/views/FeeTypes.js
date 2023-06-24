Ext.define('Admin.view.parameters.FeeTypes', {
    extend: 'Ext.panel.Panel',
    xtype: 'feetypes',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'feetypesgrid',
        }
    ]
});