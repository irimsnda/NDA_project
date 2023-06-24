Ext.define('Admin.view.surveillance.views.containers.DrugsPmsProgramCtn', {
    extend: 'Ext.Container',
    xtype: 'drugspmsprogramctn',
    margin: '3 0 0 0',
    controller: 'surveillancevctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 5
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 2
        },
        {
            xtype: 'pmsprogrampnl',
            region: 'center'
        },
        {
            xtype: 'drugspmsprogramtb',
            region: 'south'
        }
    ]
});