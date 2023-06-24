Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.common_panels.RegistrationQueryResponseDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'registrationqueryresponsedetailsPnl',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items:[{
        xtype:'registrationproductpreviewqueryWizard',
        viewModel: 'productregistrationvm',
    }]
});