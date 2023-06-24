/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.panels.Dmssitedefinationpnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'dmssitedefinationpnl',
    title: 'DMS Site Defination',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'dmssitedefinationgrid'
        }
    ]
});
