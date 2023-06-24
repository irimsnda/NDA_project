/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.dataammendment.MedicineProductDataAmmend', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicineproductdataammend',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'medicineproductdataammendwizard'
        }
    ]
});