/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportExportPremisesValidation', {
  extend: 'Ext.panel.Panel',
  xtype: 'importexportpremisesvalidation', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items:[{
    xtype:'importexportpremisesvalidationpnl'
}]
});