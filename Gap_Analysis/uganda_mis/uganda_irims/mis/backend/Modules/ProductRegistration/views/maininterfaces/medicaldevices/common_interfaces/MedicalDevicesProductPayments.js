/**
 * Created by Kip on 10/14/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.common_interfaces.MedicalDevicesProductPayments', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevicesproductpayments',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productpaymentpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'medicaldevicesproductsdetailspanel',
        }
    ]
});