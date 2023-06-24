/**
 * Created by Kip on 12/10/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.AltPremiseApprovalsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'altpremiseapprovalspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'approvalsalterationgrid'
        }
    ]
});