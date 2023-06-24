/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpCommunicationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gmpcommunicationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'gmpcommunicationsgrid'
        }
    ]
});