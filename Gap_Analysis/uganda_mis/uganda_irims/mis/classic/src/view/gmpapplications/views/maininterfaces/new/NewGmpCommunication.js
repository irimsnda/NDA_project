/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewGmpCommunication', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpCommunication',
    xtype: 'newgmpcommunication',
    items: [
        {
            xtype: 'newgmpcommunicationpanel'
        }
    ]
});