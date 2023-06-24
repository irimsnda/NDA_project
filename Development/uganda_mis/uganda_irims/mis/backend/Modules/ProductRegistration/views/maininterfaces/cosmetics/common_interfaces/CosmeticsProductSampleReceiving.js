/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.cosmetics.common_interfaces.CosmeticsProductSampleReceiving', {
    extend: 'Ext.form.Panel',
    xtype: 'cosmeticsproductsamplereceiving',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [{
        xtype: 'cosmeticsproductsamplereceivingpnl',
        viewModel: 'productregistrationvm',
    }]
});