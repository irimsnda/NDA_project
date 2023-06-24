/**
 * Created by Kip on 6/7/2019.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.FoodGmpDismissedAppsDash', {
    extend: 'Ext.Container',
    xtype: 'foodgmpdismissedappsdash',
    layout: 'border',
    items: [
        {
            xtype: 'gmpdismissedappsgrid',
            region: 'center',
            title: 'Dismissed Applications',
            margin: 2,
            section: 1
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }

    ]
});