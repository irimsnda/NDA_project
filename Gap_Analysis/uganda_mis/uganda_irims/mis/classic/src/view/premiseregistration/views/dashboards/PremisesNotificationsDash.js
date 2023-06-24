/**
 * Created by Kip on 5/23/2019.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.PremisesNotificationsDash', {
    extend: 'Ext.Container',
    xtype: 'premisesnotificationsdash',
    layout:'border',
    items: [
        {
            xtype: 'premisesnotificationsgrid',
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