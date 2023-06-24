Ext.define('Admin.view.parameters.DeviceTypes', {
    extend: 'Ext.panel.Panel',
    xtype: 'devicetypes',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'devicetypesgrid',
        }
    ]
});