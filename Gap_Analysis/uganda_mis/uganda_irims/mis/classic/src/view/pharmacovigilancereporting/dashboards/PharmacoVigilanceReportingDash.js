/**
 * Created by Kip on 1/15/2019.
 */
Ext.define('Admin.view.pharmacovigilancereporting.views.dashboards.PharmacoVigilanceReportingDash', {
    extend: 'Ext.Container',
    xtype: 'pharmacovigilancereportingdash',
    layout:'border',
    items: [
        {
            xtype: 'pharmacovigilancereportingdashgrid',
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