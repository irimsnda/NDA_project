/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.common_interfaces.MedicalDevicesCertificateRelease', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevicescertificateRelease',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',

    items: [
        {
            xtype: 'productCertificateReleasePnl',
            itemId: 'main_processpanel',
            productdetails_panel: 'medicaldevicesproductsdetailspanel',
        }
    ]
});