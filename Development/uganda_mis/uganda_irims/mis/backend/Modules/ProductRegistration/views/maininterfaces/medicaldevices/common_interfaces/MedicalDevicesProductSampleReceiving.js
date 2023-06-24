/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.common_interfaces.MedicalDevicesProductSampleReceiving', {
    extend: 'Ext.form.Panel',
    xtype: 'medicaldevicesproductsamplereceiving',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [{
        xtype: 'medicaldevicesproductsamplereceivingpnl',
        viewModel: 'productregistrationvm',
    }]
});