Ext.define('Admin.view.pv.views.dashboards.PvCnt', {
    extend: 'Ext.Container',
    xtype: 'pvCtn',
    controller: 'pvvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 24
        },
        {
            xtype: 'pvDashWrapper',
            region: 'center'
        },
        {
            xtype: 'pvtb',
            region: 'south'
        }
    ]
});