/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewGmpReceiving', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpReceiving',
    xtype: 'newgmpreceiving',
    items: [
        {
            xtype: 'newgmpreceivingwizard'
        }
    ]
});