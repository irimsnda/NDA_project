Ext.define('Admin.view.parameters.CostCenters', {
    extend: 'Ext.panel.Panel',
    xtype: 'costcenters',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'costcentersgrid',
        }
    ]
});