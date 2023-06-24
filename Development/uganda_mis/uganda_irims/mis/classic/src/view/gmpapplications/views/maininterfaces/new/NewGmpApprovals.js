/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewGmpApprovals', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpApprovals',
    xtype: 'newgmpapprovals',
    items: [
        {
            xtype: 'newgmpapprovalspanel'
        }
    ]
});