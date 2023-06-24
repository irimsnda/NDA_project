Ext.define('Admin.view.parameters.Currencies', {
    extend: 'Ext.panel.Panel',
    xtype: 'currencies',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'currenciesgrid',
        }
    ]
});