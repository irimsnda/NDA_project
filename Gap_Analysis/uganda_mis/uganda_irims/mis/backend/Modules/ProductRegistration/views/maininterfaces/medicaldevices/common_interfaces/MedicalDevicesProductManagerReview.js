/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.common_interfaces.MedicalDevicesProductManagerReview', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevicesproductmanagerreview',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productsmanagerevalauditreviewpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
        }
    ]
});