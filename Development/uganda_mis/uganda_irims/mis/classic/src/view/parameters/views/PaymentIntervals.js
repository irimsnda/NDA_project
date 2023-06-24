Ext.define('Admin.view.parameters.PaymentIntervals', {
    extend: 'Ext.panel.Panel',
    xtype: 'paymentintervals',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'paymentintervalsgrid'
        }
    ]
});