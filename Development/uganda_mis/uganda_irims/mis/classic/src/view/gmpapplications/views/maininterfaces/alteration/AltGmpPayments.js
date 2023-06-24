/**
 * Created by Kip on 5/23/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.alteration.AltGmpPayments', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpPayments',
    xtype: 'altgmppayments',
    items: [
        {
            xtype: 'altgmppaymentspanel'
        }
    ]
});