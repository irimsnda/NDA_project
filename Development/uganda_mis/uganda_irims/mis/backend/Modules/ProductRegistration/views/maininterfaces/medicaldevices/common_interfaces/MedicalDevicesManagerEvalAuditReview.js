/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.common_interfaces.MedicalDevicesManagerEvalAuditReview', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevicesmanagerevalauditreview',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productsmanagerevalauditreviewpnl',//drugnewmanagerauditingpnl
            itemId:'main_processpanel',
            productdetails_panel: 'medicaldevicesproductsdetailspanel',
        }
    ]
});