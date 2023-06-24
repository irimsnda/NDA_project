/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.cosmetics.common_interfaces.CosmeticsProductEvaluation', {
    extend: 'Ext.panel.Panel',
    xtype: 'cosmeticsproductevaluation',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'cosmeticsevaluationpnl',
            itemId: 'main_processpanel',
            productdetails_panel: 'cosmeticsproductsdetailspanel',
        }
    ]
});