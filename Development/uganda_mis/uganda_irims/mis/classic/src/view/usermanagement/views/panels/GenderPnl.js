
Ext.define('Admin.view.usermanagement.views.panels.GenderPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'genderpnl',
    title: 'Gender',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'gendergrid'
        }
    ]
});
