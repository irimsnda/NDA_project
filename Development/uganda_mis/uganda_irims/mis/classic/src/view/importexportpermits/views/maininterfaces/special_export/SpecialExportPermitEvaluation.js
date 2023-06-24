/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.special_export.SpecialExportPermitEvaluation', {
    extend: 'Ext.panel.Panel',
    xtype: 'specialexportpermitevaluation',
    controller: 'importexportpermitsvctr',
    viewModel: 'importexportpermitsvm',
    layout: 'fit',
    items: [
        {
            xtype: 'importexportpermitevaluationpnl',
            itemId: 'main_processpanel',
            permitsdetails_panel: 'importexportdetailspanel',
        }
    ]
});