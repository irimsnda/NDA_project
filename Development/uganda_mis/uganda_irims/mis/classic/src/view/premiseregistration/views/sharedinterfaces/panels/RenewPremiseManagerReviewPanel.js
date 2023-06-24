/**
 * Created by Kip on 11/27/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.RenewPremiseManagerReviewPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'renewpremisemanagerreviewpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'managerreviewgrid'//managerreviewrenewalgrid'
        }
    ]
});