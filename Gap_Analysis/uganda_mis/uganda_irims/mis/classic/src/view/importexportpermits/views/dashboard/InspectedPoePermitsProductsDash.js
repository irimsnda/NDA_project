/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.InspectedPoePermitsProductsDash', {
    extend: 'Ext.Container',
    xtype: 'inspectedpoepermitsproductsdash',
    layout: 'border',
    items: [
        {
            xtype: 'inspectedpoepermitsproductsdashgrid',//inspectedpoepermitsdashgrid
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