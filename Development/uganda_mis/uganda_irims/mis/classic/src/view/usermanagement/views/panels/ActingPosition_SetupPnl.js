
Ext.define('Admin.view.usermanagement.views.panels.ActingPosition_SetupPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'actingposition_setuppnl',
    title: 'Acting Position Setup',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'actingposition_setupgrid'
        }
    ]
});
