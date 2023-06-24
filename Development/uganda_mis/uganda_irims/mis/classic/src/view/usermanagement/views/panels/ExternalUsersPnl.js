//deplicated
Ext.define('Admin.view.usermanagement.views.panels.ExternalUsersPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'externaluserspnl',
    title: 'External Users',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    itemId: 'externalUsersDashboard',
    items: [
        {
            xtype: 'externalusersgrid'
        }
    ]
});
