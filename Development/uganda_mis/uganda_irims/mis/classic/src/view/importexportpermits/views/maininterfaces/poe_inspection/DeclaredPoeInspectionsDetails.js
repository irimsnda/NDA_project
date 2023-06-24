/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.poe_inspection.DeclaredPoeInspectionsDetails', {
    extend: 'Ext.panel.Panel',
    xtype: 'declaredpoeinspectionsdetails',
    controller: 'importexportpermitsvctr',
    viewModel: {
        type: 'importexportpermitsvm'
    },
    layout: 'fit',
    items: [
        {
            xtype: 'declaredpoeinspectionsdetailswizard'//receivingpoeinspectionswizard
        }
    ]
});