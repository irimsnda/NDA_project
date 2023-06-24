/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.renewal.RenewalMedicalDevicesReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'renewalmedicaldevicesreceiving',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [{
        xtype: 'renewalmedicaldevicesreceivingwizard'
    }]
});