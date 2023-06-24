/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.view.productnotification.views.maininterfaces.medicaldevices.medicaldevicesnotificationapproval', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevicesnotificationapproval',
    controller: 'productnotificationsvctr',
    viewModel: 'productnotificationsvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productnotificationsapprovalpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'medicaldevicesnotificationdetailspanel',
        }
    ]
});