/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.view.productnotification.views.maininterfaces.medicaldevices.MedicalDevicesNotificationAssessmentStage', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevicesnotificationassessmentstage',
    controller: 'productnotificationsvctr',
    viewModel: 'productnotificationsvm',
    layout: 'fit',
    items: [
        {
            xtype: 'medicaldevicesnotificationassessmentpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'medicaldevicesnotificationdetailspanel',
        }
    ]
});