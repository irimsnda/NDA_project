/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.disposalpermits.views.maininterfaces.DisposalPermitRelease', {
  extend: 'Ext.panel.Panel',
  xtype: 'disposalpermitrelease', 
  controller: 'disposalpermitsvctr',
 
  viewModel: {
      type: 'disposalpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'disposalpermitreleasepnl',
           permitsdetails_panel: 'disposalapplicationspreviewpnl',
          permitsverification_panel: 'disposalpermitverificationwizard',
          itemId: 'main_processpanel'
      }
  ]
});