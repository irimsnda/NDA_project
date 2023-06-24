/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.MedDevicesPremRegDash', {
    extend: 'Ext.Container',
    xtype: 'meddevicespremregdash',
    layout:'border',
    items: [
        {
            xtype: 'meddevicespremreggrid',
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