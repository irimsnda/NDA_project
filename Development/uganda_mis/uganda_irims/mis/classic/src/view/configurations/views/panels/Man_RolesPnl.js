Ext.define('Admin.view.configurations.views.panels.Man_RolesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'man_roles',
    title: 'Classification Rules',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'man_rolesGrid'
        }
    ]
});
