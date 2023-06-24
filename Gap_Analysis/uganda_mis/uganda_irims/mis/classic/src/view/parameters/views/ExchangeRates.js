Ext.define('Admin.view.parameters.ExchangeRates', {
    extend: 'Ext.panel.Panel',
    xtype: 'exchangerates',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'exchangeratesgrid',
        }
    ]
});