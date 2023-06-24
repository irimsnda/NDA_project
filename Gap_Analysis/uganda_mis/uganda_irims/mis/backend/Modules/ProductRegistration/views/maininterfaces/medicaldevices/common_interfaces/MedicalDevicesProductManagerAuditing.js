/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.new.MedicalDevicesProductManagerAuditing', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevicesproductmanagerauditing',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'medicalnewmanagerauditingpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'medicaldevicesproductsdetailspanel',
        }
    ]
});