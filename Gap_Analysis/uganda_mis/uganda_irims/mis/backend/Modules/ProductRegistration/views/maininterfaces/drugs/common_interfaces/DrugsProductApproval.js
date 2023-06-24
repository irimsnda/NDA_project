/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.common_interfaces.DrugsProductApproval', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugsproductapproval',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',

    items: [
        {
            xtype: 'newProductApprovalPnl',
            itemId:'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
        }
    ]
});