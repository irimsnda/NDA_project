Ext.define('Admin.view.promotionmaterials.views.portalapplications.dashboards.OnlinePromoAdvertsDash', {
    extend: 'Ext.Container',
    xtype: 'onlinepromoadvertsdash',
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
            value: 9
        },
        {
            xtype: 'onlinepromoadvertsanimalfeedsappgrid',
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