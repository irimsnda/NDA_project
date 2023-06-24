Ext.define('Admin.view.audit_trail.view.panel.PortalAudit_TrailPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'portal_audit_trail',
    title: 'Portal Audit Trail',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'portal_audit_trailGrid'
        }
    ]
});
