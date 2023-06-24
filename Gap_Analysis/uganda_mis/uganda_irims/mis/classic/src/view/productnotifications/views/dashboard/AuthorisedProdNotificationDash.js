/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.productnotification.views.dashboards.AuthorisedProdNotificationDash', {
    extend: 'Ext.Container',
    xtype: 'authorisedprodnotificationdash',

    layout: 'border',
    items: [
        {
            xtype: 'authorisedprodnotificationdashgrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2,

        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ]
});