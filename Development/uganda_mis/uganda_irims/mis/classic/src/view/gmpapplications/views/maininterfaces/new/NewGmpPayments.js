/**
 * Created by Kip on 12/25/2018.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewGmpPayments', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpPayments',
    xtype: 'newgmppayments',
    items: [
        {
            xtype: 'newgmppaymentspanel'
        }
    ]
});