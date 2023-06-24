Ext.define('Admin.view.productregistration.views.maininterfaces.medicaldevices.common_interfaces.EditMedicalDevicesApplication', {
    extend: 'Ext.panel.Panel',
    xtype: 'editmedicaldevicesapplication',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [{
        xtype: 'editmedicaldevicesapplicationwizard'
    }]
});