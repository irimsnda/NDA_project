/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.dashboards.FoodSurveillanceDash', {
    extend: 'Ext.Container',
    xtype: 'foodsurveillancedash',
    layout:'border',
    items: [
        {
            xtype: 'foodsurveillancegrid',
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