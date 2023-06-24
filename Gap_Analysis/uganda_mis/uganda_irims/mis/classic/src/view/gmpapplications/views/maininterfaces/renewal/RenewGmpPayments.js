/**
 * Created by Kip on 12/25/2018.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewGmpPayments', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpPayments',
    xtype: 'renewgmppayments',
    items: [
        {
            xtype: 'renewgmppaymentspanel'
        }
    ]
});