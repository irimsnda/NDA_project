/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewGmpApprovals', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpApprovals',
    xtype: 'renewgmpapprovals',
    items: [
        {
            xtype: 'renewgmpapprovalspanel'
        }
    ]
});