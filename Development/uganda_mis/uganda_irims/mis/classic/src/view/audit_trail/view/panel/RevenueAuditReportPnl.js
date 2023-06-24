Ext.define('Admin.view.audit_trail.views.panels.RevenueAuditReportPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'revenueauditreportpnl',
    title: 'Revenue Audit Trail Report',
    controller: 'audit_trialViewCtr',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    tbar: [{
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 16,
    }],

   listeners: {
        beforerender: 'loadApplicationReport'
        },

    items: [],

});
