Ext.define('Admin.view.promotionmaterials.views.portalapplications.dashboards.OnlineMedicalDevicesPromoAdvertsDash', {
    extend: 'Ext.Container',
    xtype: 'onlinemedicaldevicespromoadvertsdash',
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
            value:4
        },
        {
            xtype: 'onlinepromoadvertsmedicaldevicesappgrid',
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