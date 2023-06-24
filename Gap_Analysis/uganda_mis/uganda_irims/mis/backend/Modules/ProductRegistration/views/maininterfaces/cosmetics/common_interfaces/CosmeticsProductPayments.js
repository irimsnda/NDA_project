/**
 * Created by Kip on 10/14/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.cosmetics.common_interfaces.CosmeticsProductPayments', {
    extend: 'Ext.panel.Panel',
    xtype: 'cosmeticsproductpayments',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productpaymentpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'cosmeticsproductsdetailspanel',
        }
    ]
});