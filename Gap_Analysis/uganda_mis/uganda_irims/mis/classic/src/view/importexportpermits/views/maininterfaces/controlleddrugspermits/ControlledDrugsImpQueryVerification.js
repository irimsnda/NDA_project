/**
 * Created by Softclans on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ControlledDrugsImpQueryVerification', {
  extend: 'Ext.panel.Panel',
  xtype: 'controlleddrugsimpqueryverification', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'importexportqueryverificationpnl',
          permitsdetails_panel: 'previewcontroldrugsimppermitdetails',
           itemId: 'main_processpanel',
      }
  ]
});