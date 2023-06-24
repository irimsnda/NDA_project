/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.CosmeticsGmpDash', {
    extend: 'Ext.Container',
    xtype: 'cosmeticsgmpdash',
    layout:'border',
    items: [
        {
            xtype: 'cosmeticsgmpgrid',
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