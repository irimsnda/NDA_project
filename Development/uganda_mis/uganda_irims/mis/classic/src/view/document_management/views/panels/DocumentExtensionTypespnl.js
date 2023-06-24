/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.panels.DocumentExtensionTypespnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'documentextensiontypespnl',
    title: 'Documents Extension Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'documentextensiontypesgrid'
        }
    ]
});
