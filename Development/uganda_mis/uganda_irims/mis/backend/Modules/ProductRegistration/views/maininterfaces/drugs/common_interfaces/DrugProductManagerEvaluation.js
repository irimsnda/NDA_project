/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.common_interfaces.DrugProductManagerEvaluation', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugproductmanagerevaluation',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productmanagerevaluationpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
        }
    ]
});