/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.cosmetics.withdrawal.WithdrawalCosmeticsProductsReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'withdrawalcosmeticsproductsreceiving',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [{
        xtype: 'withdrawalcosmeticsproductsreceivingwizard'
    }]
});