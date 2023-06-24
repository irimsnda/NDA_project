/**
 * Created by Kip on 7/11/2019.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.NewPremisePostPaymentReviewPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newpremisepostpaymentreviewpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'managerpostpaymentreviewgrid'
        }
    ]
});