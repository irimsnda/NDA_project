/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.dashboards.MedDevicesSurveillanceDash', {
    extend: 'Ext.Container',
    xtype: 'meddevicessurveillancedash',
    layout:'border',
    items: [
        {
            xtype: 'meddevicessurveillancegrid',
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