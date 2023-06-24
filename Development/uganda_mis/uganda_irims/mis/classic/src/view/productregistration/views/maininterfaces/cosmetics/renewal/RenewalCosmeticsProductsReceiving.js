/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.renewal.RenewalCosmeticsProductsReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'renewalcosmeticsproductsreceiving',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [{
        xtype: 'renewalcosmeticsproductreceivingwizard'
    }]
});