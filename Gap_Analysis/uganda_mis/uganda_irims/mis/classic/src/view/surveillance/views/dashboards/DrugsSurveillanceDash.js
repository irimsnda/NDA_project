/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.dashboards.DrugsSurveillanceDash', {
    extend: 'Ext.Container',
    xtype: 'drugssurveillancedash',
    layout:'border',
    items: [
        {
            xtype: 'drugssurveillancegrid',
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