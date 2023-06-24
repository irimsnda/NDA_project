/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.cosmetics.new.NewCosmeticsProductReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'newcosmeticsproductreceiving',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    
    items: [
        {
            xtype: 'newcosmeticsproductreceivingwizard'
        }
    ]
});