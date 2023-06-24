Ext.define('Admin.view.audit_trail.views.panels.AuditReportConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'auditreportconfig',
    title: 'Audit Trail Report Configuration',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'auditreportconfigGrid'
        }
    ],

});
