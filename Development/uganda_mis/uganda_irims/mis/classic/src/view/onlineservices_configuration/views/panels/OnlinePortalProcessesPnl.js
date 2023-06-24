Ext.define('Admin.view.onlineservices_configuration.views.panels.OnlinePortalProcessesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'onlineportalprocesses',
    title: 'Online Portal Processes',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'onlineportalprocessesGrid'
        }
    ]
});
