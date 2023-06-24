/**
 * Created by Kip on 5/21/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.cancellation.CancelGmpReceiving', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpReceiving',
    xtype: 'cancelgmpreceiving',
    items: [
        {
            xtype: 'cancelgmpreceivingwizard'
        }
    ]
});