/**
 * Created by Kip on 11/20/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.OnlineDrugsPremRegDash', {
    extend: 'Ext.Container',
    xtype: 'onlinedrugspremregdash',
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
            xtype: 'onlinepremregistrationgrid',
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