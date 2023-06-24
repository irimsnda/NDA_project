/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportPermitManagerReview', {
  extend: 'Ext.panel.Panel',
  xtype: 'importpermitmanagerreview', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'importexportpermitmanagerreviewpnl'
      }
  ]
});