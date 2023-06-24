/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.controlleddrugspermits.NarcoticsDrugsPermitApproval', {
  extend: 'Ext.panel.Panel',
  xtype: 'narcoticsdrugspermitapproval', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'narcoticsdrugspermitapprovalpnl'
      }
  ]
});