/**
 * Created by Kip on 6/25/2019.
 */
Ext.define('Admin.view.surveillance.views.dashboards.FoodPmsDismissedAppsDash', {
    extend: 'Ext.Container',
    xtype: 'foodpmsdismissedappsdash',
    layout:'border',
    items: [
        {
            xtype: 'pmsdismissedappsgrid',
            region: 'center',
            title: 'Dismissed Applications',
            margin:2,
            section: 1
        },{
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }

    ]
});