/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.common_interfaces.DrugProductAuditing', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugproductauditing',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',    
    items: [
        {
            xtype: 'drugnewauditingpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
        }
    ]
});