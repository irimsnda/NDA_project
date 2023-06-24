/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.special_export.SpecialCaseApplicationApproval', {
    extend: 'Ext.panel.Panel',
    xtype: 'specialcaseapplicationapproval',
    controller: 'importexportpermitsvctr',
    viewModel: 'importexportpermitsvm',
    layout: 'fit',
    items: [
        {
            xtype: 'specialcaseapplicationapprovalpnl',
            itemId: 'main_processpanel',
            permitsdetails_panel: 'importexportdetailspanel',
        }
    ]
});