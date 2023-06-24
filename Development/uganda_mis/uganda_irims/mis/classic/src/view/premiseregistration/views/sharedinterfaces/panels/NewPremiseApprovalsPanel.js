/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.NewPremiseApprovalsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newpremiseapprovalspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'approvalsgrid'
        }
    ]
});