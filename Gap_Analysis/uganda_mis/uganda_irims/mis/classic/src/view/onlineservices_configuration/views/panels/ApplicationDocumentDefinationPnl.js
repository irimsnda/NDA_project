/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.panels.ApplicationDocumentDefinationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationdocumentdefinationpnl',
    title: 'Applications Applicable Documents',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'applicationdocumentdefinationgrid'
        }
    ]
});
