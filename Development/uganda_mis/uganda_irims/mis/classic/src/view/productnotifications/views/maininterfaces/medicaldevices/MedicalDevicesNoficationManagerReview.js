/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.view.productnotification.views.maininterfaces.medicaldevices.MedicalDevicesNoficationManagerReview', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevicesnoficationmanagerreview',
    controller: 'productnotificationsvctr',
    viewModel: 'productnotificationsvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productnotificationmanagersssessmentpnl',
            itemId: 'main_processpanel',
            productdetails_panel: 'medicaldevicesnotificationdetailspanel',
        }
    ]
});