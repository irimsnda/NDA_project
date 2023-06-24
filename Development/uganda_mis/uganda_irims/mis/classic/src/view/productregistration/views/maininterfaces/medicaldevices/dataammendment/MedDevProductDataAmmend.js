/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.dataammendment.MedDevProductDataAmmend', {
    extend: 'Ext.panel.Panel',
    xtype: 'meddevproductdataammend',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'meddevproductdataammendwizard'
        }
    ]
});