/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.controldocument_management.views.dashboard.ControlDocument_ManagementDash', {
    extend: 'Ext.Container',
    xtype: 'controldocument_managementdash',
    layout: 'border',
    items: [
        {
            xtype: 'controldocument_managementdashgrid',//controldocument_managementdashgrid
            region: 'center',
            title: 'Active Tasks',
            margin: 2
        },{
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 2
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ]
});