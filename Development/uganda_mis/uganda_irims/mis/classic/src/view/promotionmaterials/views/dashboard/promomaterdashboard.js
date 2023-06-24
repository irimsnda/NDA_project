Ext.define('Admin.view.promotionmaterials.views.dashboards.PromoMaterDashboard', {
    extend: 'Ext.Container',
    xtype: 'promomaterdashboard',
    layout: 'border',
    items: [
        {
            xtype: 'promotionmaterialhomegrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2,

        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ]
});