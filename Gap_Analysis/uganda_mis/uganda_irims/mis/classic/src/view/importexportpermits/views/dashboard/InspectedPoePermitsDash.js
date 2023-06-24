/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.InspectedPoePermitsDash', {
    extend: 'Ext.Container',
    xtype: 'inspectedpoepermitsdash',
    layout: 'border',
    items: [
        {
            xtype: 'inspectedpoepermitsdashgrid',
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