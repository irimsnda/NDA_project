/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.renewal.RenewalDrugsProductsReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'renewaldrugsproductsreceiving',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [{
        xtype: 'renewaldrugproductreceivingwizard'
    }]
});