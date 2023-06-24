/**
 * Created by Kip on 1/9/2019.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.OnlineFoodGmpDash', {
    extend: 'Ext.Container',
    xtype: 'onlinefoodgmpdash',
    layout:'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 3
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 1
        },
        {
            xtype: 'onlinegmpapplicationsgrid',
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