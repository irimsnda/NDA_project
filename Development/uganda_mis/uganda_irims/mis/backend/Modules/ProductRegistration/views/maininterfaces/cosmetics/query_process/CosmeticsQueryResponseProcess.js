/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.cosmetics.query_process.CosmeticsQueryResponseProcess', {
    extend: 'Ext.panel.Panel',
    xtype: 'cosmeticsqueryresponseprocess',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productqueryqpprovalpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'cosmeticsproductsdetailspanel',
            productqueriespanel: 'allqueryresponsesgrid'
        }
    ]
});
