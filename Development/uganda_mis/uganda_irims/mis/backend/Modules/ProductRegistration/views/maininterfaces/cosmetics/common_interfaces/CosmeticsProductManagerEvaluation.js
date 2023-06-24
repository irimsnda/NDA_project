/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.cosmetics.common_interfaces.CosmeticsProductManagerEvaluation', {
    extend: 'Ext.panel.Panel',
    xtype: 'cosmeticsproductmanagerevaluation',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productmanagerevaluationpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'cosmeticsproductsdetailspanel',
        }
    ]
});
