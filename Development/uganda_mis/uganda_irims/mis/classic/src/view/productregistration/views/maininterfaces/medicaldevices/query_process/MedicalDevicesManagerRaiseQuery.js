/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.query_process.MedicalDevicesManagerRaiseQuery', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevicesmanagerraisequery',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',    
    items: [
        {
            xtype: 'managerqueryprocesspnl',
            itemId:'main_processpanel',
            productdetails_panel: 'medicaldevicesproductsdetailspanel',
            productqueriespanel: 'drugsproductsqueriesgrid'
        }
    ]
});