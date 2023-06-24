/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.PermitDeclarationManagerReviewPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Import/Export Permit Permit Review',
    xtype: 'permitdeclarationmanagerreviewpnl',
    layout: 'fit',
    permitsdetails_panel: 'previewdeclaredimportexportpermitdetails',
    itemId: 'main_processpanel',
    layout: 'fit',
    defaults: {
        split: true,
    }, viewModel: {
        type: 'importexportpermitsvm'
    },
    items:[{
        xtype:'importexportdeclaredpermitmanagerreviewwizard'
    }]
});