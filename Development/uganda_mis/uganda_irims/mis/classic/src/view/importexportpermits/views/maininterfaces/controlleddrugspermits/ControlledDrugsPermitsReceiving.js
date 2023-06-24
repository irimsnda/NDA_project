/**
 * Created by Softclans on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.controlleddrugspermits.ControlledDrugsPermitsReceiving', {
  extend: 'Ext.panel.Panel',
  xtype: 'controlleddrugspermitsreceiving',
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'controlleddrugspermitsreceivingwizard'
      }
  ]
});