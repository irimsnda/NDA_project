/**
 * Created by Softclans on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.controlleddrugspermits.ControlDrugsLicManagerEvaluation', {
  extend: 'Ext.panel.Panel',
  xtype: 'controldrugslicmanagerevaluation', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items:[{
      xtype:'controldrugsimpmanagerevaluationpnl',
      itemId:'main_processpanel',
      permitsdetails_panel:'previewcontroldrugslicpermitdetails'
  }]
});