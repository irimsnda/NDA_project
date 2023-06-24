/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.withdrawal.WithdrawalDrugsProductsReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'withdrawaldrugsproductsreceiving',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [{
        xtype: 'withdrawaldrugsproductsreceivingwizard'
    }]
});