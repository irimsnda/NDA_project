/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.personaluserpermitsdeclaration.PersonalUserPermitsReceiving', {
  extend: 'Ext.panel.Panel',
  xtype: 'personaluserpermitsreceiving',
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'personaluserpermitsreceivingwizard'
      }
  ]
});