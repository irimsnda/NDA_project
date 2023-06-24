Ext.define('Admin.view.parameters.Regions', {
    extend: 'Ext.panel.Panel',
    xtype: 'provinces_regions',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'regionsgrid'
        }
    ]
});