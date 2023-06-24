Ext.define('Admin.view.promotionmaterials.views.dashboards.PromoAdvertCosmeticDashboard', {
	xtype: 'promoadvertcosmeticdashboard',
    extend: 'Ext.Container',
	layout: 'border',
    items: [
        {
            xtype: 'promotionadvertcosmeticshomegrid',
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