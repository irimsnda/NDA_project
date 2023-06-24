/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewGmpCommunication', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpCommunication',
    xtype: 'renewgmpcommunication',
    items: [
        {
            xtype: 'renewgmpcommunicationpanel'
        }
    ]
});