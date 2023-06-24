/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.productnotification.views.dashboards.AuthorisedProdNotificationDashwrapper', {
    extend: 'Ext.Container',
    xtype: 'authorisedprodnotificationdashwrapper',
	itemId:'authorisedprodnotificationdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'authorisedprodnotificationdash'
        }
    ]
});