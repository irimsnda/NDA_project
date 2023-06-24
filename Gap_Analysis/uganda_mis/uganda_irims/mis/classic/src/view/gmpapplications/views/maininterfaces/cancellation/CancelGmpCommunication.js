/**
 * Created by Kip on 5/22/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.cancellation.CancelGmpCommunication', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpCommunication',
    xtype: 'cancelgmpcommunication',

    items: [
        {
            xtype: 'cancelgmpcommunicationpanel'
        }
    ]
});