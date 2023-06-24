Ext.define('Admin.view.parameters.glAccounts', {
    extend: 'Ext.panel.Panel',
    xtype: 'glaccounts',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'glaccountsgrid',
        }
    ]
});