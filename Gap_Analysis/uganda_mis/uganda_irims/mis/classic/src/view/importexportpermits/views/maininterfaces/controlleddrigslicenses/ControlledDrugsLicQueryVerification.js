/**
 * Created by Softclans on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ControlledDrugsLicQueryVerification', {
  extend: 'Ext.panel.Panel',
  xtype: 'controlleddrugslicqueryverification', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'importexportqueryverificationpnl',
             permitsdetails_panel: 'previewcontroldrugslicpermitdetails',
          itemId: 'main_processpanel',
      }
  ]
});