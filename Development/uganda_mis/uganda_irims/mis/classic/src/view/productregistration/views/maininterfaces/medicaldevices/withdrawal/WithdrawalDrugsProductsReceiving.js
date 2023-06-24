/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.withdrawal.MedicalDevicesWithdrawalReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicaldeviceswithdrawalreceiving',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [{
        xtype: 'medicaldeviceswithdrawalreceivingwizard'
    }]
});