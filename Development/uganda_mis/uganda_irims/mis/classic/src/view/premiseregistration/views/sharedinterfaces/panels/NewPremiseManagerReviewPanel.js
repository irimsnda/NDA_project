/**
 * Created by Kip on 11/13/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.NewPremiseManagerReviewPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newpremisemanagerreviewpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'managerreviewgrid'
        }
    ]
});