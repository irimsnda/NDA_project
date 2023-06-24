
Ext.define('Admin.view.onlineservices_configuration.views.panels.OnlineFormDefinationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'onlineFormDefinationPnl',
    title: 'Online Form Defination',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'onlineFormDefinationGrid'
        }
    ]
});
