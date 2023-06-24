/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.disposalpermits.views.maininterfaces.DisposalPermitVerification', {
  extend: 'Ext.panel.Panel',
  xtype: 'disposalpermitverification', 
  controller: 'disposalpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'disposalpermitverificationpnl',
          itemId:'main_processpanel',
          permitsdetails_panel: 'disposalapplicationspreviewpnl'
      }
  ]
});