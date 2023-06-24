/**
 * Created by Kip on 2/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.dashboards.OnlineClinicalTrialDash', {
    extend: 'Ext.Container',
    xtype: 'onlineclinicaltrialdash',
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
            xtype: 'onlineclinicaltrialgrid',
            region: 'center',
            title: 'Submitted Applications',
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