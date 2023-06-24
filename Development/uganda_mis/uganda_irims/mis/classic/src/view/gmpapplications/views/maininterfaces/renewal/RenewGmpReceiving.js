/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewGmpReceiving', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpReceiving',
    xtype: 'renewgmpreceiving',
    items: [
        {
            xtype: 'renewgmpreceivingwizard'
        }
    ]
});