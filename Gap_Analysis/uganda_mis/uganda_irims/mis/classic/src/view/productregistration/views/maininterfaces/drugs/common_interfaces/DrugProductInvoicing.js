/**
 * Created by Kip on 10/12/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.common_interfaces.DrugProductInvoicing', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugproductinvoicing',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [{
            xtype: 'productInvoicingPnl',
            itemId:'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
    }]
});