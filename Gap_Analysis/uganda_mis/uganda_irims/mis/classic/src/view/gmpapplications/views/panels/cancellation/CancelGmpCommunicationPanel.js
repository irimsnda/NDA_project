/**
 * Created by Kip on 5/22/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.cancellation.CancelGmpCommunicationPanel', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpManagersGenericPanel',
    xtype: 'cancelgmpcommunicationpanel',
    items: [
        {
            xtype: 'gmpwithdrawalcommunicationsgrid'
        }
    ]
});