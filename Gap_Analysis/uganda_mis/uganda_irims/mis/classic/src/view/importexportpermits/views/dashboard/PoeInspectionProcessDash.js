/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.PoeInspectionProcessDash', {
    extend: 'Ext.Container',
    xtype: 'poeinspectionprocessdash',
    layout: 'border',
    items: [
        {
            xtype: 'poeinspectionprocessdashgrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ]
});