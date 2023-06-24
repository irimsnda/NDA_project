/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewGmpDeskReviewScheduling', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpDeskReviewScheduling',
    xtype: 'renewgmpdeskreviewscheduling',
    items: [
        {
            xtype: 'renewgmpdeskreviewschedulingpanel'
        }
    ]
});
