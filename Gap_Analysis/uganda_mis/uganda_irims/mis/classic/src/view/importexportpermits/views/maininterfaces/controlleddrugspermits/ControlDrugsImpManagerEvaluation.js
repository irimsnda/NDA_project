/**
 * Created by Softclans on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.controlleddrugspermits.ControlDrugsImpManagerEvaluation', {
  extend: 'Ext.panel.Panel',
  xtype: 'controldrugsimpmanagerevaluation', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items:[{
      xtype:'controldrugsimpmanagerevaluationpnl',
      itemId:'main_processpanel',
      permitsdetails_panel:'previewcontroldrugsimppermitdetails'
  }]
});