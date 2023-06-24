Ext.define('Admin.view.promotionmaterials.views.portalapplications.dashboards.OnlineCosmeticsPromoAdvertsDash', {
    extend: 'Ext.Container',
    xtype: 'onlinecosmeticspromoadvertsdash',
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
            value:3
        },
        {
            xtype: 'onlinepromoadvertscosmeticsappgrid',
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