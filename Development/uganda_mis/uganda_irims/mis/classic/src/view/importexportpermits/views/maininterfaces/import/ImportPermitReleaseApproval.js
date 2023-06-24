/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportPermitReleaseApproval', {
  extend: 'Ext.panel.Panel',
  xtype: 'importpermitreleaseapproval', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'importexportpermitapprovalpnl'
      }
  ]
});