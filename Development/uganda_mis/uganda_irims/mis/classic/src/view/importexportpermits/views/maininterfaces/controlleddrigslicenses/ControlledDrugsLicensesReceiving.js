/**
 * Created by Softclans on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.controlleddrugspermits.ControlledDrugsLicensesReceiving', {
  extend: 'Ext.panel.Panel',
  xtype: 'controlleddrugslicensesreceiving',
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'controlleddrugslicensesreceivingwizard'
      }
  ]
});