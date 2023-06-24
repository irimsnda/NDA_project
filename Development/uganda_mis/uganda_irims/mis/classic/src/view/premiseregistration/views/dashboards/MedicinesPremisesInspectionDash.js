/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.MedicinesPremisesInspectionDash', {
    extend: 'Ext.Container',
    xtype: 'medicinespremisesinspectiondash',
    layout:'border',
    items: [
        {
            xtype: 'premisesinspectiondashgrid',
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