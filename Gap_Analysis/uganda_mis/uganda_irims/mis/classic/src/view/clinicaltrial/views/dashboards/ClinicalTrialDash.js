/**
 * Created by Kip on 1/15/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.dashboards.ClinicalTrialDash', {
    extend: 'Ext.Container',
    xtype: 'clinicaltrialdash',
    layout:'border',
    items: [
        {
            xtype: 'clinicaltrialgrid',
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