/**
 * Created by Kip on 10/12/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.common_interfaces.MedicalDevicesProductInvoicing', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevicesproductinvoicing',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [{
            xtype: 'productInvoicingPnl',
            itemId:'main_processpanel',
            productdetails_panel: 'medicaldevicesproductsdetailspanel',
    }]
});