Ext.define('Admin.view.gmpapplications.views.panels.EditGmpApplicationDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'editgmpapplicationdetails',
    controller: 'gmpapplicationsvctr',
    viewModel: 'gmpapplicationsvm',
    layout: 'fit',
    items:[{
        xtype:'editgmpapplicationwizard',
        viewModel: 'gmpapplicationsvm',
    }]
});