/**
 * Created by Kip on 5/23/2019.
 */
Ext.define('Admin.view.productregistration.views.dashboard.ProductsNotificationsDash', {
    extend: 'Ext.Container',
    xtype: 'productsnotificationsdash',
    layout:'border',
    items: [
        {
            xtype: 'productsnotificationsgrid',
            region: 'center',
            title: 'Active Notifications',
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