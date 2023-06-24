/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.panels.Repositoryrootfolderpnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'repositoryrootfolderpnl',
    title: 'Repository Root Folder',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'repositoryrootfoldergrid'
        }
    ]
});
