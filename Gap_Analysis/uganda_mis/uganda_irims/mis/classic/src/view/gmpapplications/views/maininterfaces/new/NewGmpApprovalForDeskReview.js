/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewGmpApprovalForDeskReview', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpApprovalForDeskReview',
    xtype: 'newgmpapprovalfordeskreview',
    items: [
        {
            xtype: 'newgmpapprovalfordeskreviewpanel'
        }
    ]
});