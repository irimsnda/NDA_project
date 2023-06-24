Ext.define('Admin.view.configurations.views.dashboards.DocDistributionDirectiveConfig', {
    extend: 'Ext.container.Container',
    xtype: 'docdistributiondirectiveconfig',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    padding: '2 0 0 0',
    layout: 'border',

    items: [
        {
            xtype: 'docdistributiondirectiveunitsgrid',
            collapsible: true,
            split: true,
            region: 'west'
        },
        {
            xtype: 'docdistributiondirectiveusersGrid',
            region: 'center'
        }
    ]
});