/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.licenseapps.LicenceApplicationReceivingPermits', {
  extend: 'Ext.panel.Panel',
  xtype: 'licenceapplicationreceivingpermits',
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'licenceapplicationreceivingpermitswizard'
      }
  ]
});