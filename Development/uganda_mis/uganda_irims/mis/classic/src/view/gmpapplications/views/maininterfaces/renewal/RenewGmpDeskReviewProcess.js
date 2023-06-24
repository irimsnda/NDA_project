/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewGmpDeskReviewProcess', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpDeskReviewProcess',
    xtype: 'renewgmpdeskreviewprocess',
    items: [
        {
            xtype: 'renewgmpdeskreviewprocesspanel'
        }
    ]
});
