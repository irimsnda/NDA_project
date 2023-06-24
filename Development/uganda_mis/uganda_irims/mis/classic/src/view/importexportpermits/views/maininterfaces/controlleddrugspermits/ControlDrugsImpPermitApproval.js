/**
 * Created by Softclans on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.controlleddrugspermits.ControlDrugsImpPermitApproval', {
  extend: 'Ext.panel.Panel',
  xtype: 'controldrugsimppermitapproval', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'controldrugsimppermitapprovalpnl'
      }
  ]
});