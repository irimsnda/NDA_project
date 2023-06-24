/**
 * Created by Kip on 12/14/2018.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.FoodGmpDash', {
    extend: 'Ext.Container',
    xtype: 'foodgmpdash',
    layout:'border',
    items: [
        {
            xtype: 'foodgmpgrid',
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