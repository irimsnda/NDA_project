Ext.define('Admin.view.clinicaltrial.views.panels.EditClinicalTrialApplicationDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'editclinicaltrialapplicationdetailsPnl',
    controller: 'clinicaltrialvctr',
    viewModel: 'clinicaltrialvm',
    layout: 'fit',
    items:[{
        xtype:'clinicaltrialappmoredetailswizard',
        viewModel: 'clinicaltrialvm',
    }]
});