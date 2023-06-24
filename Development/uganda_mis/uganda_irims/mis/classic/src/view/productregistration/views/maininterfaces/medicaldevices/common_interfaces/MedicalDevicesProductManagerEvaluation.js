/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.common_interfaces.MedicalDevicesProductManagerEvaluation', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevicesproductmanagerevaluation',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productmanagerevaluationpnl',
            itemId: 'main_processpanel',
            productdetails_panel: 'medicaldevicesproductsdetailspanel',
        }
    ]
});