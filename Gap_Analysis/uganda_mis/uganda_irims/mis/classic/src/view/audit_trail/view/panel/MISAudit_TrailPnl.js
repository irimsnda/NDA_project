Ext.define('Admin.view.audit_trail.view.panel.MISAudit_TrailPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'mis_audit_trail',
    title: 'MIS Audit Trail',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'mis_audit_trailGrid'
        }
    ]
});
