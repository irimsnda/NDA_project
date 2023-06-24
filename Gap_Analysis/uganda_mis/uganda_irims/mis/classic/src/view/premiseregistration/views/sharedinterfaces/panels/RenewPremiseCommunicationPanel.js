/**
 * Created by Kip on 11/27/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.RenewPremiseCommunicationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'renewpremisecommunicationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'communicationsgrid'//communicationsrenewalgrid'
        }
    ]
});