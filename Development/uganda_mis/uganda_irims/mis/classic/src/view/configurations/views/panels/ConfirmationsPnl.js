Ext.define('Admin.view.configurations.views.panels.ConfirmationsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'confirmations',
    title: 'Confirmations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'confirmationsGrid'
        }
    ]
});
