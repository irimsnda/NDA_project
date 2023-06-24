Ext.define('Admin.view.parameters.TransactionTypes', {
    extend: 'Ext.panel.Panel',
    xtype: 'transactiontypes',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'transactiontypesgrid',
        }
    ]
});