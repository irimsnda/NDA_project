/**
 * Created by Kip on 12/13/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.AltPremiseCommunicationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'altpremisecommunicationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'communicationsgrid'
        }
    ]
});