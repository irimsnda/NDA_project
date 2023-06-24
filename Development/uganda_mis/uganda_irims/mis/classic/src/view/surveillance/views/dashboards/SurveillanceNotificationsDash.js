/**
 * Created by Kip on 5/23/2019.
 */
Ext.define('Admin.view.surveillance.views.dashboards.SurveillanceNotificationsDash', {
    extend: 'Ext.Container',
    xtype: 'surveillancenotificationsdash',
    layout:'border',
    items: [
        {
            xtype: 'surveillancenotificationsgrid',
            region: 'center',
            title: 'Active Notifications',
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