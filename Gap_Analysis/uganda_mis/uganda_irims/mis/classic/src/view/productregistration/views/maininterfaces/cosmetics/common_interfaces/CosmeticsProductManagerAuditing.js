/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.cosmetics.common_interfaces.CosmeticsProductManagerAuditing', {
    extend: 'Ext.panel.Panel',
    xtype: 'cosmeticsproductmanagerauditing',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productmanagerauditingpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'cosmeticsproductsdetailspanel',
        }
    ]
});