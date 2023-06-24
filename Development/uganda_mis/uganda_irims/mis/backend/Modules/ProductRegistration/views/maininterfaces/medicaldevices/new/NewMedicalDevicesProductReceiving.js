/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.new.NewMedicalDevicesProductReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'newmedicaldevicesproductreceiving',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'newmedicaldevicesproductreceivingwizard'
        }
    ]
});