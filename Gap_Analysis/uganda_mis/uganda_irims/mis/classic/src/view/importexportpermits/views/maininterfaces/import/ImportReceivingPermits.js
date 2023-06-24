/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportReceivingPermits', {
  extend: 'Ext.panel.Panel',
  xtype: 'importreceivingpermits',
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'importexportreceivingpermitswizard'
      }
  ]
});