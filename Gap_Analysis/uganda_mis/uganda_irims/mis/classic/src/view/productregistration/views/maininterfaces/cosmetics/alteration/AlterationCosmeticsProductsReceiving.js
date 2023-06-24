/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.cosmetics.alteration.AlterationCosmeticsProductsReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'alterationcosmeticsproductreceiving',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [{
        xtype: 'alterationcosmeticsproductreceivingwizard'
    }]
});