
Ext.define('Admin.view.drugshopregistration.views.dashboards.DrugShopRegDash', {
    extend: 'Ext.Container',
    xtype: 'drugshopregdash',
    layout:'border',
    items: [
        {
            xtype: 'drugshopreggrid',
            region: 'center',
            title: 'Active Tasks',
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