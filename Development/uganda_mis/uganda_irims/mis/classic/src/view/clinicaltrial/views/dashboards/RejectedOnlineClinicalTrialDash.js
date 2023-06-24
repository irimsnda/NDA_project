/**
 * Created by Kip on 6/7/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.dashboards.RejectedOnlineClinicalTrialDash', {
    extend: 'Ext.Container',
    xtype: 'rejectedonlineclinicaltrialdash',
    layout:'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 7
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 5
        },
        {
            xtype: 'rejectedonlineclinicaltrialgrid',
            region: 'center',
            title: 'Rejected Applications',
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