/**
 * Created by Kip on 5/6/2019.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.CancelPremiseCommunicationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'cancelpremisecommunicationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'communicationsgrid'
        }
    ]
});