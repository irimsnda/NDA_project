/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.ImportExportPermitManagerReviewPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Import/Export Permit Permit Review',
    xtype: 'importexportpermitmanagerreviewpnl',
    layout: 'fit',
    permitsdetails_panel: 'previewimportexportpermitdetails',
    itemId: 'main_processpanel',
    layout: 'fit',
    defaults: {
        split: true,
    }, viewModel: {
        type: 'importexportpermitsvm'
    },
    
    items:[{
        xtype:'importexportpermitmanagerreviewwizard'
    }]
});