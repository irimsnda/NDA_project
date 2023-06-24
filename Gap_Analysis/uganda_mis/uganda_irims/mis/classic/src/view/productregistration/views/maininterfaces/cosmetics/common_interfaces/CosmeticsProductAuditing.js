/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.cosmetics.common_interfaces.CosmeticsProductAuditing', {
    extend: 'Ext.panel.Panel',
    xtype: 'cosmeticsproductauditing',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',    
    items: [
        {
            xtype: 'cosmeticsproductauditingpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'cosmeticsproductsdetailspanel',
        }
    ]
});