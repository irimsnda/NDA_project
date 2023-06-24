/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.view.productnotification.views.maininterfaces.medicaldevices.MedicalDevicesNotificationCertificateRelease', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevicesnotificationcertificaterelease',
    controller: 'productnotificationsvctr',
    viewModel: 'productnotificationsvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productnotificationscertificatereleasepnl',
            itemId:'main_processpanel',
            productdetails_panel: 'medicaldevicesnotificationdetailspanel',
        }
    ]
});