/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewGmpDeskReviewProcess', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpDeskReviewProcess',
    xtype: 'newgmpdeskreviewprocess',
    items: [
        {
            xtype: 'newgmpdeskreviewprocesspanel'
        }
    ]
});
