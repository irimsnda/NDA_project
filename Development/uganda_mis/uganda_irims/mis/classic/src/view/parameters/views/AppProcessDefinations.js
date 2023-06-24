Ext.define('Admin.view.parameters.AppProcessDefinations', {
    extend: 'Ext.panel.Panel',
    xtype: 'appProcessDefinations',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'appProcessDefinationGrid',
        }
    ]
});