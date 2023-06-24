Ext.define('Admin.view.audit_trail.views.panels.AuditDefinationConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'auditdefinationconfig',
    title: 'Audit Trail Definations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'auditdefinationconfigGrid'
        }
    ],

});
