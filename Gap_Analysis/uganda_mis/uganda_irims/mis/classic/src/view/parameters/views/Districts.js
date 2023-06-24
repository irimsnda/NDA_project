Ext.define('Admin.view.parameters.Districts', {
    extend: 'Ext.panel.Panel',
    xtype: 'districts',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'districtsgrid'
        }
    ]
});