/**
 * Created by Kip on 6/7/2019.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.MedDevicesPremRegDismissedAppsDash', {
    extend: 'Ext.Container',
    xtype: 'meddevicespremregdismissedappsdash',
    layout:'border',
    items: [
        {
            xtype: 'premregdismissedappsgrid',
            region: 'center',
            title: 'Dismissed Applications',
            margin:2,
            section: 4
        },{
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }

    ]
});