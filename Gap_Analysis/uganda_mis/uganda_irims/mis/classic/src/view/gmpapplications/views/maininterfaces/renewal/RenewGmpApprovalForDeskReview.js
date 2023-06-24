/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewGmpApprovalForDeskReview', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpApprovalForDeskReview',
    xtype: 'renewgmpapprovalfordeskreview',
    items: [
        {
            xtype: 'renewgmpapprovalfordeskreviewpanel'
        }
    ]
});