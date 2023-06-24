/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.panels.Documentsrepositorystructurepnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'documentsrepositorystructurepnl',
    title: 'Documents Repository Structure',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'hbox'
    },
    items: [{
            xtype: 'documentsrepositorystructuregrid'
        }
    ]
});
