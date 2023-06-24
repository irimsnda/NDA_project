/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.special_export.SpecialExportManagerEvaluation', {
    extend: 'Ext.panel.Panel',
    xtype: 'specialexportmanagerevaluation',
    controller: 'importexportpermitsvctr',
    viewModel: 'importexportpermitsvm',
    layout: 'fit',
    items: [
        {
            xtype: 'importexportmanagerevaluationpnl',
            itemId: 'main_processpanel',
            permitsdetails_panel: 'importexportdetailspanel',
        }
    ]
});