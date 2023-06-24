/**
 * Created by Kip on 5/23/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.dashboards.ClinicalTrialNotificationsDash', {
    extend: 'Ext.Container',
    xtype: 'clinicaltrialnotificationsdash',
    layout:'border',
    items: [
        {
            xtype: 'clinicaltrialnotificationsgrid',
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