Ext.define('Admin.view.parameters.ElementsCost', {
    extend: 'Ext.panel.Panel',
    xtype: 'elementscost',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'elementscostgrid',
        }
    ]
});