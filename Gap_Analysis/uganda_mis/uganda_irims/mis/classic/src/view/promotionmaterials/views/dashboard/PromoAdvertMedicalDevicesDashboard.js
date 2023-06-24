Ext.define('Admin.view.promotionmaterials.views.dashboards.PromoAdvertMedicalDevicesDashboard', {
	xtype: 'promoadvertmedicaldevicesdashboard',
    extend: 'Ext.Container',
	layout: 'border',
    items: [
        {
            xtype: 'promotionadvertmedicaldeviceshomegrid',
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