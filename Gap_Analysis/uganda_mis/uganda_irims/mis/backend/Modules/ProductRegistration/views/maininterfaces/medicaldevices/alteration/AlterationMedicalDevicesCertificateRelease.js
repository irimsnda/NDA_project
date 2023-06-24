
/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.alteration.AlterationMedicalDevicesCertificateRelease', {
    extend: 'Ext.panel.Panel',
    xtype: 'alterationmedicaldevicescertificaterelease',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',

    items: [
        {
            xtype: 'alterationproductcertificatereleasepnl',
            itemId:'main_processpanel',
            productdetails_panel: 'medicaldevicesproductsdetailspanel',
        }
    ]
});

