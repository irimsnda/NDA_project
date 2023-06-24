/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.panels.DirectoratesUnitsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'directoratesunitspnl',
    title: 'Directorates Units',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'directoratesunitsgrid'
        }
    ]
});
