/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.PermitDeclarationManagerReview', {
  extend: 'Ext.panel.Panel',
  xtype: 'permitdeclarationmanagerreview', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'permitdeclarationmanagerreviewpnl'
      }
  ]
});