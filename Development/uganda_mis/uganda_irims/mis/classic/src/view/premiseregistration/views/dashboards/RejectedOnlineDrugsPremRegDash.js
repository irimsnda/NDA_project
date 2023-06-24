/**
 * Created by Kip on 4/27/2019.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.RejectedOnlineDrugsPremRegDash', {
    extend: 'Ext.Container',
    xtype: 'rejectedonlinedrugspremregdash',
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
            value: 2
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