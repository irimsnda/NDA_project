/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.DeclImpExpManagerQueryVerification', {
  extend: 'Ext.panel.Panel',
  xtype: 'declimpexpmanagerqueryverification', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'declimpexpmanagerqueryverificationpnl'
      }
  ]
});