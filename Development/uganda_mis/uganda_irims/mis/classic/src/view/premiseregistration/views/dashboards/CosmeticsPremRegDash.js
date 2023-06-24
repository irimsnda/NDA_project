/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.CosmeticsPremRegDash', {
    extend: 'Ext.Container',
    xtype: 'cosmeticspremregdash',
    layout:'border',
    items: [
        {
            xtype: 'cosmeticspremreggrid',
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