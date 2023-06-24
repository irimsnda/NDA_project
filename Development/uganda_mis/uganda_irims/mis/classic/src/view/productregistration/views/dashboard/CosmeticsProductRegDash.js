Ext.define('Admin.view.productregistration.views.dashboards.CosmeticsProductregdash', {
    extend: 'Ext.Container',
    xtype: 'cosmeticsproductregdash',
    layout: 'border',
    items: [
        {
            xtype: 'cosmeticsproductregistrationgrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ]
});