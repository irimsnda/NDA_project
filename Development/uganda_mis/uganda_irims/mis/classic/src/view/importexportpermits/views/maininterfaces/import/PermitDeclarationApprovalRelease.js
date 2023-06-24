/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.PermitDeclarationApprovalRelease', {
  extend: 'Ext.panel.Panel',
  xtype: 'permitdeclarationapprovalrelease', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'permitdeclarationapprovalreleasepnl'
      }
  ]
});