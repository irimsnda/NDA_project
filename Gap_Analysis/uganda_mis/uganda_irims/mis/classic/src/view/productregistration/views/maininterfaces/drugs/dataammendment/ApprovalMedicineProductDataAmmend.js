/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.dataammendment.ApprovalMedicineProductDataAmmend', {
    extend: 'Ext.panel.Panel',
    xtype: 'approvalmedicineproductdataammend',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'approvalproductdataammendpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
        }
    ]
});