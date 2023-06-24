/**
 * Created by Kip on 5/27/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.alteration.AltGmpCommunicationPanel', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpManagersGenericPanel',
    xtype: 'altgmpcommunicationpanel',
    items: [
        {
            xtype: 'gmpwithdrawalcommunicationsgrid'
        }
    ]
});