/**
 * Created by Kip on 10/12/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.cosmetics.common_interfaces.CosmeticsProductInvoicing', {
    extend: 'Ext.panel.Panel',
    xtype: 'cosmeticsproductinvoicing',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [{
            xtype: 'productInvoicingPnl',
            itemId:'main_processpanel',
            productdetails_panel: 'cosmeticsproductsdetailspanel',
    }]
});