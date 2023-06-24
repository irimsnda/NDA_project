/**
 * Created by Kip on 11/20/2018.
 */
Ext.define('Admin.view.productnotification.views.dashboards.OnlineMedicalDevicesNotificationsDash', {
    extend: 'Ext.Container',
    xtype: 'onlinemedicaldevicesnotificationsdash',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 1
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 4
        },
        {
            xtype: 'onlinemedicaldevicesnotificationgrid',
            region: 'center',
            title: 'Online Application Submission',
            wizard_pnl: 'onlinemedicaldevicesnotificationrecwizard',
            margin: 2
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ]
});