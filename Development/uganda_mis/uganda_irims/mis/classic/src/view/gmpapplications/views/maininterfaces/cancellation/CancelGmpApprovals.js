/**
 * Created by Kip on 5/21/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.cancellation.CancelGmpApprovals', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpApprovals',
    xtype: 'cancelgmpapproval',
    items: [
        {
            xtype: 'cancelgmpapprovalspanel'
        }
    ]
});