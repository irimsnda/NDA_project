/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.common_interfaces.DrugsManagerEvalAuditReview', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugsmanagerevalauditreview',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productsmanagerevalauditreviewpnl',//drugnewmanagerauditingpnl
            itemId:'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
        }
    ]
});