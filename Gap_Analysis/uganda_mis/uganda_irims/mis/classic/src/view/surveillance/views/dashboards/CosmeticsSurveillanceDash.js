/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.dashboards.CosmeticsSurveillanceDash', {
    extend: 'Ext.Container',
    xtype: 'cosmeticssurveillancedash',
    layout:'border',
    items: [
        {
            xtype: 'cosmeticssurveillancegrid',
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