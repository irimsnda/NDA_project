Ext.define('Admin.view.parameters.Cities', {
    extend: 'Ext.panel.Panel',
    xtype: 'cities',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'citiesgrid'
        }
    ]
});