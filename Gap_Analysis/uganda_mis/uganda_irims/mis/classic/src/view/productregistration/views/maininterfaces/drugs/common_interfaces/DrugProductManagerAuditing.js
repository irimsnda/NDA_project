/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.common_interfaces.DrugProductManagerAuditing', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugproductmanagerauditing',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'drugnewmanagerauditingpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
        }
    ]
});