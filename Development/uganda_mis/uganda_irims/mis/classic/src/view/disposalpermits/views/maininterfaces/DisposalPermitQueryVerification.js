/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.disposalpermits.views.maininterfaces.DisposalPermitQueryVerification', {
  extend: 'Ext.panel.Panel',
  xtype: 'disposalpermitqueryverification', 
  controller: 'disposalpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'disposalpermitsqueryverificationpnl',
          permitsdetails_panel: 'disposalapplicationspreviewpnl'
      }
  ]
});