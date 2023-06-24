/**
 * Created by Kip on 5/23/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.alteration.AltGmpReceiving', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpReceiving',
    xtype: 'altgmpreceiving',
    items: [
        {
            xtype: 'altgmpreceivingwizard'
        }
    ]
});