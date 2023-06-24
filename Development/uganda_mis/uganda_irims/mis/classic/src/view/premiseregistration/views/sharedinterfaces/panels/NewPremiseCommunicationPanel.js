/**
 * Created by Kip on 11/13/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.NewPremiseCommunicationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newpremisecommunicationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'communicationsgrid'
        }
    ]
});