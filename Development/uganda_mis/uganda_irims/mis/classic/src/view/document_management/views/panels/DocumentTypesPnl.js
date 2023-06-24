/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.panels.DocumentTypesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'documenttypespnl',
    title: 'Documents Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'documenttypesgrid'
        }
    ]
});
