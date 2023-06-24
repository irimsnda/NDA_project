/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.food.import.ControlledDrugsReceivingPermits', {
  extend: 'Ext.panel.Panel',
  xtype: 'controlleddrugsreceivingpermits',
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'controlleddrugsreceivingpermitswizard'
      }
  ]
});