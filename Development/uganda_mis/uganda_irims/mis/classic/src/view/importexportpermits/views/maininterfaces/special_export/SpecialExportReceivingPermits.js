/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.special_export.SpecialExportReceivingPermits', {
    extend: 'Ext.panel.Panel',
    xtype: 'specialexportreceivingpermits',
    controller: 'importexportpermitsvctr',
    viewModel: {
        type: 'importexportpermitsvm'
    },
    layout: 'fit',
    items: [
        {
            xtype: 'specialexportreceivingpermitswizard'
        }
    ]
});