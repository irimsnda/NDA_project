/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportExportProductsValidation', {
  extend: 'Ext.panel.Panel',
  xtype: 'importexportproductsvalidation', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items:[{
    xtype:'importexportproductsvalidationpnl'
}]
});