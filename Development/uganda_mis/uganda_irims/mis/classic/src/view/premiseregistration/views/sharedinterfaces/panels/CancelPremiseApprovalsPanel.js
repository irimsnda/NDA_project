/**
 * Created by Kip on 5/5/2019.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.CancelPremiseApprovalsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'cancelpremiseapprovalspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'approvalscancellationgrid'
        }
    ]
});