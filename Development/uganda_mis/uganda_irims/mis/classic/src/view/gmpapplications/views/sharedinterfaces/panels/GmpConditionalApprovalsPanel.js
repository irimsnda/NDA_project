/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpConditionalApprovalsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gmpconditionalapprovalspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'gmpconditionalapprovalsgrid'
        }
    ]
});