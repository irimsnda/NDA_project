/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpApprovalsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gmpapprovalspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'gmpapprovalsgrid'
        }
    ]
});