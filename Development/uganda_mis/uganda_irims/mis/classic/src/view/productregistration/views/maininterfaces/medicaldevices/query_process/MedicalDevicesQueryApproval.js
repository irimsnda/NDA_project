/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.query_process.MedicalDevicesQueryApproval', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldevicesqueryapproval',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productqueryqpprovalpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'medicaldevicesproductsdetailspanel',
            productqueriespanel: 'drugsproductsqueriesgrid'
        }
    ]
});