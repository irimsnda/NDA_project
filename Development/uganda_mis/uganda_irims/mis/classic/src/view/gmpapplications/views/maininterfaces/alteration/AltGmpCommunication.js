/**
 * Created by Kip on 5/27/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.alteration.AltGmpCommunication', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpCommunication',
    xtype: 'altgmpcommunication',

    items: [
        {
            xtype: 'altgmpcommunicationpanel'
        }
    ]
});