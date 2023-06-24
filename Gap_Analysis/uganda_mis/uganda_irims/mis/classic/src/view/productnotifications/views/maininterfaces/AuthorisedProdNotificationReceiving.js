/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productnotification.views.maininterfaces.AuthorisedProdNotificationReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'authorisedprodnotificationreceiving',
    controller: 'productnotificationsvctr',
    viewModel: 'productnotificationsvm',
    layout: 'fit',
    items: [
        {
            xtype: 'authorisedprodnotificationreceivingwizard'
        }
    ]
});