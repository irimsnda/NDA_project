Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.common_interfaces.EditMedicalDeviceApplicationDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'editmedicaldeviceapplicationdetails',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items:[{
        xtype:'editmedicaldevicesapplicationwizard',
        viewModel: 'productregistrationvm',
    }]
});