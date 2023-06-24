
Ext.define('Admin.view.premiseregistration.views.dashboards.PreInspectionDrugsPremRegDash', {
    extend: 'Ext.Container',
    xtype: 'preinspectiondrugspremregdash',
    layout:'border',
    items: [
        {
            xtype: 'drugspremreggrid',
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