/**
 * Created by Kip on 5/27/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.alteration.AltGmpApprovals', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpApprovals',
    xtype: 'altgmpapprovals',
    items: [
        {
            xtype: 'altgmpapprovalspanel'
        }
    ]
});