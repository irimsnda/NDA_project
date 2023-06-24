/**
 * Created by Kip on 11/27/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.RenewPremiseApprovalsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'renewpremiseapprovalspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'approvalsgrid'
        }
    ]
});