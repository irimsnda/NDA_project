/**
 * Created by Softclans on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportReceivingAmendmentPermits', {
  extend: 'Ext.panel.Panel',
  xtype: 'importreceivingamendmentpermits',
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [ {
          xtype: 'importreceivingamendmentpermitswizard'
      }
  ]
});