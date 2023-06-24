

/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.commoninterfaces.SpecialCaseApplicationApprovalPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'specialcaseapplicationapprovalpnl',
    layout: 'fit',
    viewModel: {
        type: 'importexportpermitsvm'
    },
    items:[{
        xtype:'specialimportexportpermitapprovalwizard'
    }]
});