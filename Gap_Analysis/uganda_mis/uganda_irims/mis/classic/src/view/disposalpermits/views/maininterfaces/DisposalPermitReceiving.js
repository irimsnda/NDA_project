/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.disposalpermits.views.maininterfaces.DisposalPermitReceiving', {
  extend: 'Ext.panel.Panel',
  xtype: 'disposalpermitreceiving', 
  controller: 'disposalpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'disposalpermitreceivingpnl',
          itemId:'main_processpanel',
          permitsdetails_panel: 'disposalapplicationswizard'
      }
  ]
});