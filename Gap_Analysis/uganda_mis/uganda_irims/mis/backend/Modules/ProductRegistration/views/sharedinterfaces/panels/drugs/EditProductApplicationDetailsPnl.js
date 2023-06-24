Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.common_interfaces.EditProductApplicationDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'editproductapplicationdetails',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items:[{
        xtype:'editdrugproductapplicationwizard',
        viewModel: 'productregistrationvm',
    }]
});