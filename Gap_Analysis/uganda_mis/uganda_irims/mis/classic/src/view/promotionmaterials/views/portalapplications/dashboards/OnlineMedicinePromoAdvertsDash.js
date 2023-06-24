Ext.define('Admin.view.promotionmaterials.views.portalapplications.dashboards.OnlineMedicinePromoAdvertsDash', {
    extend: 'Ext.Container',
    xtype: 'onlinemedicinepromoadvertsdash',
    layout:'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 14
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 2
        },
        {
            xtype: 'onlinepromoadvertsmedicineappgrid',
            region: 'center',
            title: 'Submitted Applications',
            margin:2
        },{
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }

    ]
});