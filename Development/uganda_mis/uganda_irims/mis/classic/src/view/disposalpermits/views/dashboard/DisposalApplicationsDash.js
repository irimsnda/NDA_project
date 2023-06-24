/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.disposalpermits.views.dashboard.DisposalApplicationsDash', {
    extend: 'Ext.Container',
    xtype: 'disposalapplicationsdash',
    layout: 'border',
    items: [
        {
            xtype: 'disposalapplicationsdashgrid',
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