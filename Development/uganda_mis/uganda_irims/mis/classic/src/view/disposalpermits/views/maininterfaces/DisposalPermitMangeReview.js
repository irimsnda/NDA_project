/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.disposalpermits.views.maininterfaces.DisposalPermitMangeReview', {
  extend: 'Ext.panel.Panel',
  xtype: 'disposalpermitmangereview', 
  controller: 'disposalpermitsvctr',
  viewModel: {
      type: 'disposalpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'disposalpermitmangereviewpnl',
          itemId:'main_processpanel',
          permitsdetails_panel: 'disposalapplicationswizardpreview',
          permitsverification_panel: 'disposalpermitverificationwizard'
      }
  ]
});