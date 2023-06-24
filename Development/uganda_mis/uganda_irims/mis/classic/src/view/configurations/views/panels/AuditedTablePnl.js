Ext.define('Admin.view.configurations.views.panels.AuditedTablePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'auditedTablePnl',
    title: 'Audited Tables',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'auditedTableGrid'
        }
    ],

});
