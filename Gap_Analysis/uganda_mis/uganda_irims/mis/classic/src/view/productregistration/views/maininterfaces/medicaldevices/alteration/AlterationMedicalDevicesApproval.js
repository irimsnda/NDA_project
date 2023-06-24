/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.alteration.AlterationMedicalDevicesApproval', {
    extend: 'Ext.panel.Panel',
    xtype: 'alterationmedicaldevicesapproval',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'alterationproductapprovalpnl',
            itemId: 'main_processpanel',
            productdetails_panel: 'medicaldevicesproductsdetailspanel',
        }
    ]
});

