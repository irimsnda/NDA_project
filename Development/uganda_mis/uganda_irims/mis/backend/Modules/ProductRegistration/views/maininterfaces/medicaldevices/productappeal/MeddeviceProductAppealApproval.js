/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.productappeal.MeddeviceProductAppealApproval', {
    extend: 'Ext.panel.Panel',
    xtype: 'meddeviceproductappealapproval',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productappealapprovalpnl',
            itemId: 'main_processpanel',
            productdetails_panel: 'medicaldevicesproductsdetailspanel',
        }
    ]
});

