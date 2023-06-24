/**
 * Created by Softclans on 10/16/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.controlleddrugspermits.ControlDrugsLicEvaluation', {
    extend: 'Ext.panel.Panel',
    xtype: 'controldrugslicevaluation',
    controller: 'importexportpermitsvctr',
    viewModel: 'importexportpermitsvm',
    layout: 'fit',
    items: [{
            xtype: 'controldrugsimpevaluationpnl',
            itemId: 'main_processpanel',
            permitsdetails_panel: 'previewcontroldrugslicpermitdetails',
    }]

});