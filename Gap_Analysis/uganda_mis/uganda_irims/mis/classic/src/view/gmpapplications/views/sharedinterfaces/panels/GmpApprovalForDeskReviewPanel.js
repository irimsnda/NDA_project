/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpApprovalForDeskReviewPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gmpapprovalfordeskreviewpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'approvalfordeskreviewgrid'
        }
    ]
});