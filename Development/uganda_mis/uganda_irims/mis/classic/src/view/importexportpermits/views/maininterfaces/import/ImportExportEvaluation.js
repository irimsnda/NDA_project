/**
 * Created by Softclans on 10/16/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportExportEvaluation', {
    extend: 'Ext.panel.Panel',
    xtype: 'importexportevaluation',
    controller: 'importexportpermitsvctr',
    viewModel: 'importexportpermitsvm',
    layout: 'fit',
    items: [{
            xtype: 'importexportevaluationpnl',
            itemId: 'main_processpanel',
            permitsdetails_panel: 'previewimportexportpermitdetails',
    }]

});