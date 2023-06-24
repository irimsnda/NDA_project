Ext.define('Admin.view.usermanagement.views.panels.ApiUsersPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'apiuserspnl',
    title: 'API Users',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    itemId: 'ApiUsersDashboard',
    items: [
        {
            xtype: 'apiusersgrid'
        }
    ]
});
