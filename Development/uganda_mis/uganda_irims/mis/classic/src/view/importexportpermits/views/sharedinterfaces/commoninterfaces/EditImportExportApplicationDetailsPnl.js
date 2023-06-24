Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.commoninterfaces.EditImportExportApplicationDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'editimportexportapplicationdetails',
    controller: 'importexportpermitsvctr',
    viewModel: 'importexportpermitsvm',
    layout: 'fit',
    items:[{
        xtype:'importexportedittingswizard',
        viewModel: 'importexportpermitsvm',
    }]
});