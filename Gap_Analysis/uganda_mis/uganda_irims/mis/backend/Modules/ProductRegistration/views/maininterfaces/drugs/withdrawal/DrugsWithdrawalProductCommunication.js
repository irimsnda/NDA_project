
/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.withdrawal.DrugsWithdrawalProductCommunication', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugswithdrawalproductcommunication',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',

    items: [
        {
            xtype: 'drugswithdrawalproductcommunicationpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
        }
    ]
});

