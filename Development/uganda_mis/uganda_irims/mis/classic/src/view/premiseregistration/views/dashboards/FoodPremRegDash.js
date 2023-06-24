/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.FoodPremRegDash', {
    extend: 'Ext.Container',
    xtype: 'foodpremregdash',
    layout:'border',
    items: [
        {
            xtype: 'foodpremreggrid',
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