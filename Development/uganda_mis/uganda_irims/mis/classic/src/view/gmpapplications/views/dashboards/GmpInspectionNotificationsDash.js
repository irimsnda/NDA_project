/**
 * Created by Kip on 5/22/2019.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.GmpInspectionNotificationsDash', {
    extend: 'Ext.Container',
    xtype: 'gmpinspectionnotificationsdash',
    layout:'border',
    items: [
        {
            xtype: 'gmpnotificationsgrid',
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