/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.InspectedApprovedPremisesInspectionDash', {
    extend: 'Ext.Container',
    xtype: 'inspectedapprovedpremisesinspectiondash',
    layout:'border',
    items: [
        {
            xtype: 'inspectedapprovedpremisesinspectiondashgrid',
            region: 'center',
            title: 'Inspection Premises ',
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