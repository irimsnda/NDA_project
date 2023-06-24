/**
 * Created by Kip on 5/21/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.cancellation.CancelGmpApprovalsPanel', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpManagersGenericPanel',
    xtype: 'cancelgmpapprovalspanel',
    items: [
        {
            xtype: 'gmpcancellationapprovalsgrid'
        }
    ]
});