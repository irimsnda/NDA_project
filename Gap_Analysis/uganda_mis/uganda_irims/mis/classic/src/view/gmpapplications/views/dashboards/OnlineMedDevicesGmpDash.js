/**
 * Created by Kip on 1/9/2019.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.OnlineMedDevicesGmpDash', {
    extend: 'Ext.Container',
    xtype: 'onlinemeddevicesgmpdash',
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
            value: 4
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