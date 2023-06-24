/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.cosmetics.common_interfaces.CosmeticsProductApproval', {
    extend: 'Ext.panel.Panel',
    xtype: 'cosmeticsproductapproval',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',

    items: [
        {
            xtype: 'newProductApprovalPnl',
            itemId:'main_processpanel',
            productdetails_panel: 'cosmeticsproductsdetailspanel'
        }
    ]
});