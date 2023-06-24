/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportExportManagerSubmission', {
  extend: 'Ext.panel.Panel',
  xtype: 'importexportmanagersubmission', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items:[{
    xtype:'importexportmanagersubmissionpnl'
}]
});