/**
 * Created by Kip on 6/7/2019.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.RejectedOnlineFoodPremRegDash', {
    extend: 'Ext.Container',
    xtype: 'rejectedonlinefoodpremregdash',
    layout:'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 2
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 1
        },
        {
            xtype: 'rejectedonlinepremregistrationgrid',
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