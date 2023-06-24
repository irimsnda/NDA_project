/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.alteration.AlterationDrugsProductsReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'alterationdrugsproductreceiving',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [{
        xtype: 'alterationdrugproductreceivingwizard'
    }]
});