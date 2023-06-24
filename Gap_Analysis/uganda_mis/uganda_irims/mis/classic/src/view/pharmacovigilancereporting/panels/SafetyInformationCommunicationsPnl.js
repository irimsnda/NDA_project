/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.pharmacovigilancereporting.views.panels.SafetyInformationCommunicationsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'safetyinformationcommunicationspnl',
    height: Ext.Element.getViewportHeight() - 118,
    autoScroll: true,
    scrollable: true,
    items: [
        {
            xtype: 'safetyinformationcommunicationsfrm',
            title:'Safety Alert Reports Details'
        }
    ]
});