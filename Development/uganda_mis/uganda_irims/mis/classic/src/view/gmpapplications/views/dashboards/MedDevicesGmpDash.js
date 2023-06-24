/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.MedDevicesGmpDash', {
    extend: 'Ext.Container',
    xtype: 'meddevicesgmpdash',
    layout:'border',
    items: [
        {
            xtype: 'meddevicesgmpgrid',
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