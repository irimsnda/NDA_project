/**
 * Created by Softclans on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportExportManagerPermitReview', {
  extend: 'Ext.panel.Panel',
  xtype: 'importexportmanagerpermitreview', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items:[{
    xtype:'importexportmanagerpermitreviewpnl',
    permitsdetails_panel: 'previewimportexportpermitdetails',
    itemId: 'main_processpanel',
}]
});